function App() {
  const [themeMode, setThemeMode] = useLocalStorage("theme", "dark");
  const [mediaType, setMediaType] = useState("movie");

  // === Disclaimer Alert ===
  useEffect(() => {
    alert(
      "⚠️ Disclaimer:\n\nThis site may display content rated 18+.\nIt is not recommended for minors or sensitive audiences.\nViewer discretion is advised."
    );
  }, []);
  // ========================

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
