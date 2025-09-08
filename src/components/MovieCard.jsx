import styled from "styled-components";
import { IMG } from "../api/tmdb";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  transition: transform .2s, box-shadow .2s;
  border: 1px solid var(--stroke);
  background: ${({ theme }) => theme.panel};
  backdrop-filter: blur(4px);

  &:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,.35); }
`;

const Poster = styled.div`
  aspect-ratio: 2/3;
  background: #131313;
  display: flex; align-items: center; justify-content: center;

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

const Body = styled.div`
  padding: 12px;
  flex: 1; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 { font-size: 16px; margin: 0 0 8px; }
  .meta { color: var(--muted); font-size: 13px; display: flex; gap: 8px; }
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding: 12px;

  button, a {
    flex: 1;
    border-radius: 10px;
    border: 1px solid var(--stroke);
    font-weight: 700;
    padding: 10px 0;
    min-height: 42px;
    line-height: 1.2;
    text-align: center;
    display: flex; justify-content: center; align-items: center;
  }

  button {
    background: #232323;
    color: #fff;                         
    text-shadow: 0 1px 1px rgba(0,0,0,.35);
  }

  button.danger {
    background: #8b2d2d;
    color: #fff;
    text-shadow: 0 1px 1px rgba(0,0,0,.4);
  }

  a {
    background: var(--brand);
    color: #0b1220;
  }
`;

function getTitle(item){ return item.title || item.name || 'Untitled'; }
function getYear(item){ const d = item.release_date || item.first_air_date || ''; return d ? d.slice(0,4) : '—'; }
function tmdbUrl(item, type){ return `https://www.themoviedb.org/${type}/${item.id}`; }

export default function MovieCard({ item, type, onOpen, onLike, onRemove, inFavorites=false }) {
  const poster = IMG.poster(item.poster_path);
  return (
    <Card>
      <Poster onClick={() => onOpen(item)}>
        {poster ? <img src={poster} alt={getTitle(item)} loading="lazy" /> : <span>No poster</span>}
      </Poster>

      <Body>
        <h3 title={getTitle(item)}>{getTitle(item)}</h3>
        <div className="meta">
          <span>⭐ {item.vote_average?.toFixed(1) ?? '—'}</span>
          <span>{getYear(item)}</span>
        </div>
      </Body>

      <Footer>
        {inFavorites ? (
          <button className="danger" onClick={() => onRemove(item)}>🗑 Remove</button>
        ) : (
          <button onClick={() => onLike(item)}>❤️Favorite</button>
        )}
        <a href={tmdbUrl(item, type)} target="_blank" rel="noopener noreferrer">TMDB</a>
      </Footer>
    </Card>
  );
}
