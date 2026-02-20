# 🎵 Lo-Fi Prompt Studio

> An AI-powered Lo-Fi music prompt generator — pick your **weather** and **mood**, get a studio-ready prompt for any AI music generator instantly.

![Lo-Fi Prompt Studio](https://img.shields.io/badge/Built%20With-React%20%2B%20Vite-646cff?style=flat-square&logo=vite)
![Powered by Groq](https://img.shields.io/badge/AI-Groq%20%7C%20Llama%203.3%2070B-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- 🌦️ **8 Weather conditions** — Rainy, Foggy, Cloudy, Sunny, Snowy, Stormy, Windy, Clear Night
- 🎭 **8 Mood options** — Focused, Calm, Melancholic, Nostalgic, Peaceful, Dreamy, Tired, Creative
- ⚡ **Instant prompt generation** using Groq's ultra-fast inference (Llama 3.3 70B)
- 📋 **One-click copy** — paste the prompt directly into any AI music generator
- 🎨 **Dark Lo-Fi UI** — animated gradient blobs, glassmorphism cards, smooth animations
- 📱 **Fully responsive** — works on mobile and desktop

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A free [Groq API key](https://console.groq.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Aayush31-Ai/meditation.git
cd meditation

# 2. Install dependencies
npm install

# 3. Set up your environment variables
cp .env.example .env
```

Open `.env` and add your Groq API key:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 7](https://vite.dev) | Build tool & dev server |
| [Groq API](https://console.groq.com) | AI inference (Llama 3.3 70B) |
| [OpenAI SDK](https://www.npmjs.com/package/openai) | Groq-compatible API client |

---

## 📁 Project Structure

```
src/
├── App.jsx                    # Main UI — weather/mood selection + result display
├── App.css                    # Component styles (dark Lo-Fi theme)
├── index.css                  # Global base styles
└── services/
    └── aiMusicPromptService.js  # Groq API integration & system prompt
```

---

## 🎯 How It Works

1. Select a **weather condition** (e.g. Rainy)
2. Select your **mood** (e.g. Focused)
3. Click **Generate Lo-Fi Prompt**
4. The AI returns a detailed music generation prompt including:
   - Tempo (BPM)
   - Instruments (piano, vinyl crackle, pads, etc.)
   - Background ambience (rain, wind, night sounds)
   - Emotional tone & beat style
5. **Copy** the prompt and paste it into any AI music generator (Suno, Udio, etc.)

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GROQ_API_KEY` | ✅ Yes | Your Groq API key from [console.groq.com](https://console.groq.com) |

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 📦 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 📄 License

MIT © [Aayush31-Ai](https://github.com/Aayush31-Ai)
