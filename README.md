# 🎬 CineScope

CineScope is a modern web app for **searching movies and TV shows** powered by [TheMovieDB API](https://www.themoviedb.org/).  
It delivers an elegant interface with **dark/light themes, favorites management, advanced filters**, and **fullscreen modals** with detailed info.

---

## ✨ Features

- 🔍 **Search movies & TV shows** by title or genre  
- 🎭 **Filters** by genre, year, popularity, rating, and vote count  
- 🎚 **18+ content toggle** with neon highlight  
- 🌓 **Dark/Light mode** with custom backgrounds  
- ❤️ **Favorites page** (add/remove & clear all) stored in local storage  
- 🖼 **Fullscreen modal** with detailed overview, cast list, and TMDB link  
- 🖱 **Pagination** (no infinite scroll for stability on Netlify)  
- ⚡ Built with **React + Vite + Styled Components + Axios**

---

## 🚀 Demo

Deployed on **Netlify** (auto-deploy from GitHub).  
👉 [Live Demo](https://cinemascope123.netlify.app/)  

---

## 🛠 Tech Stack

- **React 18** + **Vite**
- **Styled Components** for styling
- **Axios** for API requests
- **React Router DOM** for routing
- **TMDB API** for movies/TV data
- **LocalStorage** for favorites & theme persistence

---

## 🔑 Setup

1. Clone repository:
   ```bash
   git clone https://github.com/MrArSavchuk/Cinemascope
   cd cinescope
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your [TMDB API key](https://developers.themoviedb.org/3/getting-started/introduction):
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   ```

4. Run locally:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📂 Project Structure

```
cinescope/
├── public/              # static assets (favicons, backgrounds, redirects)
├── src/
│   ├── api/             # TMDB axios client
│   ├── components/      # reusable UI components
│   ├── context/         # Toast + Theme context
│   ├── hooks/           # custom hooks (localStorage, debounce)
│   ├── pages/           # Home + Favorites pages
│   ├── styles/          # global styles & themes
│   ├── App.jsx          # main app component
│   └── main.jsx         # Vite entry point
└── README.md
```

---

## 💡 Why CineScope?

Unlike raw TMDB explorers, CineScope is designed for **everyday movie discovery**:  
- Clean, modern design (2025-ready 🎨)  
- Focused on **usability and performance** (pagination > infinite scroll)  
- **Favorites** stored locally, never lost between sessions  
- Intuitive filters to cut through noise and find hidden gems  

If you love cinema and want a slick tool to explore it — CineScope is for you.  

---

## 📜 License

MIT — free to use and modify.  

---

Made with ❤️ by CineScope Dev
