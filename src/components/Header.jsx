import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Bar = styled.header`
  position: sticky; top: 0; z-index: 10;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--stroke);
`;

const Row = styled.nav`
  max-width: 1280px; margin: 0 auto; padding: 12px 16px;
  display: grid;
  grid-template-columns: 200px 1fr auto auto; /* добавили 4-й столбец под Toggle */
  gap: 12px; align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled(Link)`
  font-weight: 800; font-size: 20px; letter-spacing: .5px; color: var(--brand);
`;

const SearchForm = styled.form`
  display: flex; gap: 8px;

  input {
    flex: 1;
    padding: 10px 12px;
    /* цвета берутся из globalStyles (theme.panel/var(--text)) */
  }

  button {
    padding: 10px 14px;
    border-radius: 10px;
    border: 1px solid var(--stroke);
    background: var(--brand);
    color: #0b1220;
    font-weight: 800;
  }
`;

const NavLinks = styled.div`
  display: flex; gap: 8px; justify-self: end;

  .nav-link {
    padding: 10px 12px;
    border: 1px solid var(--stroke);
    border-radius: 10px;
    font-weight: 700;
    background: ${({ theme }) => theme.panel};
  }
  .nav-link.active {
    background: var(--brand);
    color: #0b1220;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
  }
`;

export default function Header({ themeMode, onToggleTheme }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  const onSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (q.trim()) next.set("q", q.trim()); else next.delete("q");
    next.set("page", "1");
    navigate({ pathname: "/", search: `?${next.toString()}` });
    window.dispatchEvent(new CustomEvent("cinescope:search", { detail: q.trim() }));
  };

  return (
    <Bar>
      <Row>
        <Brand to="/">🎬 CineScope</Brand>

        <SearchForm onSubmit={onSubmit}>
          <input
            type="search"
            placeholder="Search by title (e.g., Inception)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">Search</button>
        </SearchForm>

        <NavLinks>
          <NavLink to="/" end className={({isActive}) => `nav-link ${isActive ? 'active':''}`}>Home</NavLink>
          <NavLink to="/favorites" className={({isActive}) => `nav-link ${isActive ? 'active':''}`}>Favorites</NavLink>
        </NavLinks>

        {/* Вернули переключатель темы */}
        <ThemeToggle themeMode={themeMode} toggle={onToggleTheme} />
      </Row>
    </Bar>
  );
}
