import styled from "styled-components";
import { useEffect, useState } from "react";
import tmdb from "../api/tmdb";

/* Responsive panel with consistent input styling */
const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(160px, 1fr));
  gap: 12px;
  padding: 12px;
  margin: 12px 0;
  border-radius: 14px;

  @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 700px)  { grid-template-columns: 1fr; }

  select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--stroke);
    background: ${({ theme }) => theme.panel};
    color: var(--text);
    outline: none;
  }

  .reset-btn {
    grid-column: 1 / -1;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--stroke);
    background: #8b2d2d;
    color: #fff;
    font-weight: 800;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid var(--stroke);
    border-radius: 10px;
    background: ${({ theme }) => theme.panel};
    font-weight: 600;
  }

  /* Neon highlight when 18+ is enabled */
  .row.adult {
    border-color: #ff4da6;
    box-shadow:
      0 0 0 2px rgba(255,77,166,.35) inset,
      0 0 14px rgba(255,77,166,.6);
    color: #ff4da6;
  }

  .row input[type="checkbox"] {
    accent-color: #ff4da6;
  }
`;

export default function Filters({
  mediaType, setMediaType,
  genre, setGenre,
  year, setYear,
  sortBy, setSortBy,
  includeAdult, setIncludeAdult,
  onReset,
}) {
  const [genres, setGenres] = useState([]);

  // Load genres for current media type
  useEffect(() => {
    let cancelled = false;
    tmdb
      .get(`/genre/${mediaType}/list`)
      .then((res) => {
        if (!cancelled) setGenres(res.data?.genres || []);
      })
      .catch(() => {
        if (!cancelled) setGenres([]);
      });
    return () => { cancelled = true; };
  }, [mediaType]);

  // Years 1950..current
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

  return (
    <Wrap className="panel">
      {/* Genre */}
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      {/* Year */}
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">All years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="popularity.desc">Popularity ↓</option>
        <option value="popularity.asc">Popularity ↑</option>
        <option value="vote_average.desc">Rating ↓</option>
        <option value="vote_average.asc">Rating ↑</option>
        <option value="primary_release_date.desc">Release date ↓</option>
        <option value="primary_release_date.asc">Release date ↑</option>
        <option value="vote_count.desc">Vote count ↓</option>
        <option value="vote_count.asc">Vote count ↑</option>
      </select>

      {/* Movies / TV */}
      <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
      </select>

      {/* 18+ toggle */}
      <label
        className={`row ${includeAdult ? "adult" : ""}`}
        title="Include adult content in results"
      >
        <input
          type="checkbox"
          checked={includeAdult}
          onChange={(e) => setIncludeAdult(e.target.checked)}
        />
        Include 18+ content
      </label>

      {/* Reset all */}
      <button type="button" className="reset-btn" onClick={onReset}>
        Remove all filters
      </button>
    </Wrap>
  );
}
