import styled from "styled-components";

const Box = styled.div`
  display: flex; justify-content: center; gap: 8px; padding: 18px 0;

  button, span {
    border-radius: 10px; border: 1px solid var(--stroke);
    background: rgba(0,0,0,.35); color: var(--text);
    padding: 10px 14px; min-width: 90px; text-align: center; font-weight: 700;
  }
  button[disabled] { opacity: .5; cursor: not-allowed; }
`;

export default function Pagination({ page, setPage, totalPages }) {
  const maxPages = Math.min(totalPages || 500, 500);
  return (
    <Box className="panel">
      <button onClick={() => setPage(1)} disabled={page === 1}>« First</button>
      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹ Prev</button>
      <span>Page {page}{maxPages ? ` / ${maxPages}` : ""}</span>
      <button onClick={() => setPage(p => p + 1)} disabled={maxPages ? page >= maxPages : false}>Next ›</button>
      <button onClick={() => setPage(maxPages || (page + 1))} disabled={!maxPages || page >= maxPages}>Last »</button>
    </Box>
  );
}
