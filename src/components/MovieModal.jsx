// ЗАМЕНИ файл целиком
import { useEffect, useState } from "react";
import styled from "styled-components";
import tmdb, { IMG } from "../api/tmdb";

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,.85);        /* было .75 → .85 */
  display: grid; place-items: center; padding: 24px; z-index: 20;
`;

const Panel = styled.div`
  width: min(1200px, 100%);
  max-height: 92vh;
  overflow: auto;
  background: rgba(0,0,0,.70);        /* было .6 → .70 */
  border: 1px solid var(--stroke);
  border-radius: 16px;
`;

const Banner = styled.div`
  position: relative;
  height: 360px;
  background: #111;
  img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: .95; }
`;

const Content = styled.div`
  padding: 16px 18px 22px;

  h2 { margin: 10px 0 6px; text-shadow: 0 1px 2px rgba(0,0,0,.45); }

  .row { color: var(--muted); font-size: 14px; margin-bottom: 12px; display: flex; gap: 14px; flex-wrap: wrap; }

  .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 18px; }
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }

  .cast { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 14px; }

  .close { margin-top: 12px; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--stroke); background: #222; color: #fff; font-weight: 700; }
`;

export default function MovieModal({ id, type, onClose }) {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancel = false;
    setPending(true);
    tmdb.get(`/${type}/${id}`, { params: { append_to_response: "credits" } })
      .then(res => { if (!cancel) setData(res.data); })
      .catch(() => {})
      .finally(() => { if (!cancel) setPending(false); });
    return () => { cancel = true; };
  }, [id, type]);

  if (!id) return null;

  const title = data ? (data.title || data.name) : '';
  const year = data ? ((data.release_date || data.first_air_date || '').slice(0,4) || '—') : '—';
  const runtime = data ? (data.runtime || data.episode_run_time?.[0]) : null;

  return (
    <Overlay onClick={onClose}>
      <Panel onClick={(e) => e.stopPropagation()}>
        {pending && <div style={{ padding: 16 }}>Loading…</div>}
        {data && (
          <>
            <Banner>
              {IMG.backdrop(data.backdrop_path) && <img src={IMG.backdrop(data.backdrop_path)} alt="" />}
            </Banner>

            <Content>
              <h2>{title}</h2>
              <div className="row">
                <span>⭐ {data.vote_average?.toFixed(1) ?? "—"}</span>
                <span>{year}</span>
                {runtime ? <span>{runtime} min</span> : null}
                {data.genres?.length ? <span>{data.genres.map(g => g.name).join(", ")}</span> : null}
              </div>

              <div className="grid">
                <div>
                  <h3>Overview</h3>
                  <p>{data.overview || "No overview."}</p>
                </div>
                <div>
                  <h3>Top Cast</h3>
                  <div className="cast">
                    {data.credits?.cast?.slice(0, 9).map(c => (
                      <div key={`${c.credit_id}-${c.cast_id}`}>
                        <strong>{c.name}</strong>
                        <div style={{ color: "var(--muted)" }}>{c.character}</div>
                      </div>
                    )) || <div>No cast info.</div>}
                  </div>
                </div>
              </div>

              <a
                href={`https://www.themoviedb.org/${type}/${data.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on TMDB
              </a>

              <div>
                <button className="close" onClick={onClose}>Close</button>
              </div>
            </Content>
          </>
        )}
      </Panel>
    </Overlay>
  );
}
