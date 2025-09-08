import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import SkeletonCard from "../components/SkeletonCard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "../context/ToastContext";

export default function Home({ mediaType, setMediaType }) {
  // URL state
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  // UI / data state
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [pending, setPending] = useState(false);

  // filters / query
  const [query, setQuery] = useState(params.get("q") || "");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [includeAdult, setIncludeAdult] = useState(false); // family-friendly by default

  // favorites
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const { push } = useToast();

  // Sync from URL on mount & when params change externally
  useEffect(() => {
    const q = params.get("q") || "";
    setQuery(q);

    const p = parseInt(params.get("page") || "1", 10);
    setPage(Number.isFinite(p) ? p : 1);
  }, [params]);

  // Optional: listen to custom search event from Header (fallback)
  useEffect(() => {
    const onSearch = (e) => {
      const q = (e.detail || "").trim();
      const next = new URLSearchParams(params);
      if (q) next.set("q", q);
      else next.delete("q");
      next.set("page", "1");
      navigate({ pathname: "/", search: `?${next.toString()}` });
    };
    window.addEventListener("cinescope:search", onSearch);
    return () => window.removeEventListener("cinescope:search", onSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce query to avoid spamming the API
  const debouncedQuery = useDebounce(query, 400);

  // Load data
  useEffect(() => {
    let cancel = false;

    async function load() {
      setPending(true);
      try {
        const paramsBase = { page };
        let url = `/${mediaType}/popular`;
        let reqParams = { ...paramsBase };

        if (debouncedQuery) {
          url = `/search/${mediaType}`;
          reqParams.query = debouncedQuery;
          reqParams.include_adult = includeAdult;
        } else {
          url = `/discover/${mediaType}`;
          reqParams.with_genres = genre || undefined;
          if (mediaType === "movie")
            reqParams.primary_release_year = year || undefined;
          else reqParams.first_air_date_year = year || undefined;
          reqParams.sort_by = sortBy;
          reqParams.include_adult = includeAdult;
        }

        const res = await tmdb.get(url, { params: reqParams });
        if (cancel) return;

        setItems(res.data.results || []);
        setTotal(res.data.total_pages || null);
      } catch (e) {
        if (!cancel) {
          setItems([]);
          setTotal(null);
          push("Failed to load data from TMDB", "error");
        }
      } finally {
        if (!cancel) setPending(false);
      }
    }

    load();
    return () => {
      cancel = true;
    };
  }, [
    page,
    debouncedQuery,
    genre,
    year,
    sortBy,
    mediaType,
    includeAdult,
    push,
  ]);

  // Handlers
  const onOpen = (item) => setSelectedId(item.id);
  const onClose = () => setSelectedId(null);

  const addToFavorites = (item) => {
    const id = item.id;
    const stored = [...favorites];
    if (!stored.some((x) => x.id === id && x.media_type === mediaType)) {
      stored.push({ ...item, media_type: mediaType });
      setFavorites(stored);
      push("Added to Favorites", "info");
    }
  };

  const updatePageAndURL = (p) => {
    setPage(p);
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    setParams(next, { replace: true });
  };

  const gridCols = useMemo(
    () => "repeat(auto-fill, minmax(180px, 1fr))",
    []
  );

  return (
    <div className="container">
      <Filters
        mediaType={mediaType}
        setMediaType={(v) => {
          if (v !== mediaType) {
            setMediaType(v);
            updatePageAndURL(1);
          }
        }}
        genre={genre}
        setGenre={(v) => {
          setGenre(v);
          updatePageAndURL(1);
        }}
        year={year}
        setYear={(v) => {
          setYear(v);
          updatePageAndURL(1);
        }}
        sortBy={sortBy}
        setSortBy={(v) => {
          setSortBy(v);
          updatePageAndURL(1);
        }}
        includeAdult={includeAdult}
        setIncludeAdult={(v) => {
          setIncludeAdult(v);
          updatePageAndURL(1);
        }}
        onReset={() => {
          setGenre("");
          setYear("");
          setSortBy("popularity.desc");
          setIncludeAdult(false); // back to family-friendly
          // clear search + reset page in URL
          const next = new URLSearchParams(params);
          next.delete("q");
          next.set("page", "1");
          setParams(next, { replace: true });
        }}
      />

      {query ? (
        <div
          className="panel"
          style={{ color: "var(--muted)", marginBottom: 8, padding: 10 }}
        >
          Showing search results for: <strong>{query}</strong>
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: 16,
          alignItems: "stretch",
        }}
      >
        {pending
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : items.map((item) => (
              <MovieCard
                key={`${mediaType}-${item.id}`}
                item={item}
                type={mediaType}
                onOpen={onOpen}
                onLike={addToFavorites}
              />
            ))}
      </div>

      <Pagination
        page={page}
        setPage={updatePageAndURL}
        totalPages={total}
      />

      <MovieModal id={selectedId} type={mediaType} onClose={onClose} />
    </div>
  );
}

/** Debounce helper */
function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
