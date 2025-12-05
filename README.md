# NullPoint - Negative Scientific Data Marketplace (MVP)

NullPoint is a conceptual data marketplace where failed scientific experiments (negative findings) are bought and sold. It aims to enable researchers to turn "sunk costs" into revenue and prevent other researchers from wasting time repeating the same mistakes.

This project is a fully functional frontend prototype developed using React and TypeScript. There is no backend connection; all data and business logic are simulated on the client side (mock data).

## 🚀 Features

*   **Marketplace:** Detailed filtering (Category, Stage, Price), search, and sorting capabilities.
*   **Data Visualization:** Dynamic charts (Line, Scatter, Bar) and data tables specific to the experiment category in the details view.
*   **Multi-language Support (i18n):** Instant switching between English and Turkish.
*   **Dashboard:** User credits, purchase history, and spending analytics.
*   **Upload Simulation:** Multi-step data upload form.
*   **Documentation Pages:** Informative pages for Privacy, IP Rights, and Verification processes.

## 🛠️ Tech Stack

*   **Core:** React 18, TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Charts:** Recharts
*   **State Management:** React Context API (for i18n) & Local State (useState/useReducer)
*   **Build/Bundler:** (Vite or Create React App depending on environment)

## 📂 Installation and Running

This project requires a modern Node.js environment.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Development Server:**
    ```bash
    npm start
    # or
    npm run dev
    ```

3.  **Open in Browser:**
    The application will typically run at `http://localhost:3000` or `http://localhost:5173`.

## 🧪 Mock Data Structure

Instead of a database, the application uses a rich mock data set defined in the `constants.ts` file. Data resets every time the page is refreshed, but purchases and uploads made during the session are kept in the state.

## 📄 License

This project is an MVP prototype created for educational and presentation purposes.