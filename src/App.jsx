import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyles";
import Header from "./components/Header";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import { darkTheme, lightTheme } from "./theme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const [themeMode, setThemeMode] = useLocalStorage("theme", "dark");
  const [mediaType, setMediaType] = useState("movie"); // 'movie' | 'tv'

  useEffect(() => {
    alert(
      "⚠️ Disclaimer:\n\nThis site may display content rated 18+.\nIt is not recommended for minors or sensitive audiences.\nViewer discretion is advised."
    );
  }, []);

  const toggleTheme = () =>
    setThemeMode((m) => (m === "dark" ? "light" : "dark"));
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <GlobalStyle />
        <Header themeMode={themeMode} onToggleTheme={toggleTheme} />
        <Routes>
          <Route
            path="/"
            element={<Home mediaType={mediaType} setMediaType={setMediaType} />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
