# NullPoint Architecture Documentation

This document explains the technical structure, design decisions, and data flow of the NullPoint application.

## 1. Directory Structure

The project is organized in a feature-based and modular structure:

```
src/
├── components/
│   └── ui/
│       ├── Elements.tsx   # Reusable UI components (Cards, Modals, Badges)
│       └── Layout.tsx     # Page skeleton (Navbar, Footer)
├── pages/
│   ├── Dashboard.tsx      # User panel and charts
│   ├── Docs.tsx           # Static content documentation pages
│   ├── Landing.tsx        # Welcome page (Hero section)
│   ├── Marketplace.tsx    # Main listing, filtering logic
│   └── Upload.tsx         # Multi-step form structure
├── constants.ts           # Mock data and data generation functions
├── i18n.tsx               # Language management (Context API)
├── types.ts               # TypeScript interfaces and type definitions
├── App.tsx                # Main routing and global state management
└── index.tsx              # Application entry point
```

## 2. Architectural Decisions

### A. State Management
Since the project is an MVP, **React Built-in State** and **Prop Drilling** were preferred over external libraries like Redux or Zustand.
*   **Global Data (User, Experiments):** Kept at the top level in `App.tsx` and passed down to child components as props.
*   **Language Management:** Used `React Context API` (`I18nProvider`) as it needs to be accessed from everywhere in the application.
*   **Local State:** Forms, modal open/close states, and filters are managed within their respective components using `useState`.

### B. Data Model and Mocking
Since there is no real Backend, there is a `constants.ts` file acting as the "Database".
*   **Dynamic Data Generation:** The `generateExperiments` function generates random but consistent data sets when the application starts.
*   **Data Preview:** Tables and chart data shown in experiment details are algorithmically generated based on the experiment category (Antiviral, Battery, etc.).

### C. Routing
Instead of React Router, a simple **State-Based Routing** is used (`currentView` state).
*   The `ViewState` type (`'landing' | 'marketplace' | ...`) determines which component to render.
*   This method maintains the Single Page Application (SPA) feel while reducing setup complexity.

## 3. Data Flow

1.  **Initialization:** `App.tsx` loads, `INITIAL_USER` and `MOCK_EXPERIMENTS` data are loaded into the state.
2.  **Viewing:** User enters the `Marketplace` page. Filtering operations are done instantly within `Marketplace.tsx` using `useMemo`.
3.  **Interaction (Purchase):**
    *   User clicks the "Purchase" button.
    *   The `handlePurchase` function is triggered.
    *   Deducted from user credits -> Added to purchase history -> Experiment download count incremented.
    *   All these updates are done at once via React State update batching.

## 4. UI/UX Design Principles

*   **Tailwind CSS:** Used for rapid prototyping and a consistent design system.
*   **Color Palette:** `Slate` (Gray) and `Deep Blue` were used for scientific reliability, and `Emerald` (Green) for success/confirmation states.
*   **Responsive:** Mobile and desktop compatibility ensured with the grid system (`grid-cols-1 md:grid-cols-3`).