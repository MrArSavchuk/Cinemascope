import styled from "styled-components";

const Btn = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--stroke);
  background: var(--brand);
  color: #0b1220;
  font-weight: 800;
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
`;

export default function ThemeToggle({ themeMode, toggle }) {
  return (
    <Btn onClick={toggle} title="Toggle theme">
      {themeMode === "dark" ? "Light Theme" : "Dark Theme"}
    </Btn>
  );
}
