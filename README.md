# Keeper App

A modern, sophisticated note-taking application built with React, featuring advanced search, sorting, and a beautiful UI.

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app) *(Replace with your actual deployment URL)*

## ✨ Features

- **Create Notes**: Add new notes with titles and content
- **Edit Notes**: Modify existing notes with ease
- **Delete Notes**: Remove notes you no longer need
- **Search Functionality**: Find notes quickly with real-time search
- **View Modes**: Switch between grid and list views
- **Local Storage**: Your notes are saved locally in your browser
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Alert System**: User-friendly notifications for all actions

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Avik-Studio/keeper-App.git
cd keeper-App
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Building for Production

```bash
npm run build
```

## 📱 Usage

1. **Creating a Note**: Click in the text area at the top and start typing your note title and content.
2. **Searching Notes**: Use the search bar in the header to find specific notes.
3. **Switching Views**: Click the view toggle button to switch between grid and list views.
4. **Editing Notes**: Click the edit icon on any note to modify it.
5. **Deleting Notes**: Click the delete icon to remove a note.

## 🎨 Components

- **Header**: Navigation and search functionality
- **NoteForm**: Form for creating new notes
- **Note**: Individual note display with edit/delete options
- **Stats**: Shows note count and search statistics
- **Footer**: App footer
- **Alert**: Notification system

## 🔧 Custom Hooks

- **useLocalStorage**: Manages local storage operations
- **useAlert**: Handles alert notifications

## 📂 Project Structure

```
src/
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── Note/
│   ├── NoteForm/
│   └── Stats/
├── Hooks/
│   ├── useAlert.js
│   └── useLocalStorage.js
├── UI/
│   ├── Alert/
│   └── Button/
├── Utils/
│   ├── constants.js
│   └── helpers.js
├── App.jsx
└── index.js
```
