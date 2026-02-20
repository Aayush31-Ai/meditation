import { useState } from 'react';
import './App.css';
import { createLofiMusicPrompt } from './services/aiMusicPromptService';

const WEATHER_OPTIONS = [
  { value: 'rainy',       label: 'Rainy',       icon: '🌧️' },
  { value: 'foggy',       label: 'Foggy',       icon: '🌫️' },
  { value: 'cloudy',      label: 'Cloudy',      icon: '☁️' },
  { value: 'sunny',       label: 'Sunny',       icon: '☀️' },
  { value: 'snowy',       label: 'Snowy',       icon: '❄️' },
  { value: 'stormy',      label: 'Stormy',      icon: '⛈️' },
  { value: 'windy',       label: 'Windy',       icon: '💨' },
  { value: 'clear night', label: 'Clear Night', icon: '🌙' },
];

const MOOD_OPTIONS = [
  { value: 'focused',      label: 'Focused',      icon: '🎯' },
  { value: 'calm',         label: 'Calm',         icon: '🧘' },
  { value: 'melancholic',  label: 'Melancholic',  icon: '🫧' },
  { value: 'nostalgic',    label: 'Nostalgic',    icon: '🕰️' },
  { value: 'peaceful',     label: 'Peaceful',     icon: '🌿' },
  { value: 'dreamy',       label: 'Dreamy',       icon: '✨' },
  { value: 'tired',        label: 'Tired',        icon: '🌙' },
  { value: 'creative',     label: 'Creative',     icon: '🎨' },
];

function SelectionCard({ option, selected, onClick }) {
  return (
    <button
      className={`option-card ${selected ? 'option-card--selected' : ''}`}
      onClick={() => onClick(option.value)}
      type="button"
    >
      <span className="option-card__icon">{option.icon}</span>
      <span className="option-card__label">{option.label}</span>
    </button>
  );
}

function App() {
  const [weather, setWeather] = useState('');
  const [mood, setMood] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const canGenerate = weather && mood && !loading;

  async function handleGenerate() {
    if (!canGenerate) return;
    setLoading(true);
    setError('');
    setPrompt('');
    setCopied(false);
    try {
      const result = await createLofiMusicPrompt({ weather, mood });
      setPrompt(result);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="app">
      {/* Background blobs */}
      <div className="bg-blob bg-blob--1" />
      <div className="bg-blob bg-blob--2" />
      <div className="bg-blob bg-blob--3" />

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header__badge">AI Music Generator</div>
          <h1 className="header__title">
            Lo-Fi <span className="header__title--accent">Prompt</span> Studio
          </h1>
          <p className="header__subtitle">
            Select your weather &amp; mood — get a studio-ready Lo-Fi prompt instantly
          </p>
        </header>

        {/* Weather Section */}
        <section className="section">
          <h2 className="section__title">
            <span className="section__num">01</span>
            Current Weather
          </h2>
          <div className="options-grid">
            {WEATHER_OPTIONS.map((opt) => (
              <SelectionCard
                key={opt.value}
                option={opt}
                selected={weather === opt.value}
                onClick={setWeather}
              />
            ))}
          </div>
        </section>

        {/* Mood Section */}
        <section className="section">
          <h2 className="section__title">
            <span className="section__num">02</span>
            Your Mood
          </h2>
          <div className="options-grid">
            {MOOD_OPTIONS.map((opt) => (
              <SelectionCard
                key={opt.value}
                option={opt}
                selected={mood === opt.value}
                onClick={setMood}
              />
            ))}
          </div>
        </section>

        {/* Generate Button */}
        <div className="generate-wrap">
          <button
            className={`generate-btn ${!canGenerate ? 'generate-btn--disabled' : ''}`}
            onClick={handleGenerate}
            disabled={!canGenerate}
            type="button"
          >
            {loading ? (
              <>
                <span className="spinner" />
                Composing your vibe…
              </>
            ) : (
              <>
                <span>🎵</span>
                Generate Lo-Fi Prompt
              </>
            )}
          </button>
          {(!weather || !mood) && !loading && (
            <p className="generate-hint">
              {!weather && !mood
                ? 'Choose a weather condition and a mood to continue'
                : !weather
                ? 'Choose a weather condition to continue'
                : 'Choose a mood to continue'}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="error-box">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Result */}
        {prompt && (
          <div className="result-card">
            <div className="result-card__header">
              <div className="result-card__meta">
                <span className="result-tag">{WEATHER_OPTIONS.find(w => w.value === weather)?.icon} {weather}</span>
                <span className="result-tag">{MOOD_OPTIONS.find(m => m.value === mood)?.icon} {mood}</span>
              </div>
              <button
                className={`copy-btn ${copied ? 'copy-btn--copied' : ''}`}
                onClick={handleCopy}
                type="button"
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="result-card__divider" />
            <p className="result-card__prompt">{prompt}</p>
          </div>
        )}

        <footer className="footer">
          Powered by Groq &amp; Llama 3.3 · Lo-Fi Prompt Studio
        </footer>
      </div>
    </div>
  );
}

export default App;
