import { useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "../context/ToastContext";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
  padding: 6px 10px;
  border-radius: 10px;
  background: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,.55)" : "rgba(0,0,0,.35)"};
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,.45);
`;

const ClearBtn = styled.button`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--stroke);
  background: #8b2d2d;
  color: #fff;
  font-weight: 800;
`;

export default function FavoritesPage() {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [selected, setSelected] = useState(null);
  const { push } = useToast();

  const removeOne = (item) => {
    const updated = favorites.filter(
      (m) => !(m.id === item.id && m.media_type === item.media_type)
    );
    setFavorites(updated);
    push("Removed from Favorites", "info");
  };

  const clearAll = () => {
    setFavorites([]);
    push("Favorites cleared", "info");
  };

  return (
    <div className="container">
      <Bar>
        <Title>❤️ Your Favorites</Title>
        {favorites.length > 0 && (
          <ClearBtn onClick={clearAll}>Clear All</ClearBtn>
        )}
      </Bar>

      {favorites.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>
          No favorites yet. Add some from Home!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {favorites.map((m) => (
            <MovieCard
              key={`${m.media_type}-${m.id}`}
              item={m}
              type={m.media_type}
              onOpen={() => setSelected({ id: m.id, type: m.media_type })}
              onRemove={removeOne}
              inFavorites
            />
          ))}
        </div>
      )}

      <MovieModal
        id={selected?.id}
        type={selected?.type || "movie"}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
