# Wolfe's Word Book

Wolfe's Word Book is an interactive web application designed to help Chinese students learn and memorize English words. It features a modern, mobile-first design with a swipeable card interface for engaging spelling practice.

## ✨ Features

-   **Interactive Word Cards:** Swipe through a gallery of word cards to practice spelling.
-   **Character Input:** Type characters into individual boxes with a clean, focused design.
-   **Audio Pronunciation:** Listen to word pronunciations with a simple click.
-   **Responsive Design:** Optimized for a seamless experience on both mobile and desktop devices.
-   **Modern UI:** A clean and intuitive interface built with a custom color theme.

## 🛠️ Tech Stack

-   **Frontend:** [React](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Linting:** [ESLint](https://eslint.org/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v20.x or later recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone <your-repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd wolfe_word_book
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the Vite development server. The `host: true` setting in `vite.config.js` allows you to access the application from other devices on the same network (e.g., your mobile phone for testing).

## 📁 Project Structure

```
wolfe_word_book/
├── public/              # Static assets
├── src/                 # Source code
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # Reusable React components
│   ├── pages/           # Main page components
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles and Tailwind CSS configuration
│   └── main.jsx         # Application entry point
├── .gitignore           # Git ignore file
├── index.html           # Main HTML file
├── package.json         # Project dependencies and scripts
├── README.md            # This file
└── vite.config.js       # Vite configuration
```

## 📄 License

This project is licensed under the MIT License.
