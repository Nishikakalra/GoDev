# Developer Interview Assistant

A production-level ChatGPT-style interview assistant built with React + Vite, focused on DSA, JavaScript, and React concepts.

## Architecture

```
UI Layer (Components)
    ↓
Business Logic (Custom Hooks)
    ↓
Service Layer (API Integration)
    ↓
Gemini API
```

## Features

- ✅ ChatGPT-style interface with sidebar
- ✅ Multiple chat sessions with history
- ✅ Real-time streaming AI responses
- ✅ Persistent storage (localStorage)
- ✅ Auto-generated chat titles
- ✅ Clean, scalable architecture
- ✅ Dark mode UI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your Gemini API key to `.env`:
```
VITE_GEMINI_API_KEY=your_actual_api_key
```

3. Run development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/       # UI components
│   ├── Sidebar.jsx
│   ├── ChatArea.jsx
│   ├── Message.jsx
│   └── ChatInput.jsx
├── hooks/           # Custom hooks
│   └── useChat.js
├── services/        # API layer
│   └── geminiService.js
├── pages/           # Page components
│   └── Home.jsx
└── utils/           # Utilities
    └── routes.jsx
```

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Gemini API (streaming)
- localStorage for persistence

## Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file
