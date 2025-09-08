import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --brand: ${({ theme }) => theme.brand};
    --accent: ${({ theme }) => theme.accent};
    --stroke: ${({ theme }) => theme.stroke};
    --text: ${({ theme }) => theme.text};
    --muted: ${({ theme }) => theme.muted};
  }

  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }

  body {
    margin: 0;
    font-family: "Roboto", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    color: var(--text);
    background: center / cover no-repeat url(${({ theme }) => theme.bgImage});
    background-attachment: fixed;
  }

  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; }

  .container { max-width: 1280px; margin: 0 auto; padding: 16px; }

  .panel {
    background: ${({ theme }) => theme.panel};
    border: 1px solid var(--stroke);
    border-radius: 14px;
    backdrop-filter: blur(6px);
  }

  /* повысим читаемость заголовков на светлом фоне */
  h2, h3 { text-shadow: 0 1px 2px rgba(0,0,0,.35); }

  /* единый стиль для инпутов/селектов */
  input[type="search"], input[type="text"], select {
    color: var(--text);
    background: ${({ theme }) => theme.panel};
    border: 1px solid var(--stroke);
    border-radius: 10px;
    outline: none;
  }

  /* активная нав-ссылка */
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
