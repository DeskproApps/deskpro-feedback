import { DeskproAppProvider } from "@deskpro/app-sdk";
import { Routes, HashRouter, Route } from "react-router-dom";

import { Main } from "./pages/Main";

import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";

import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import { Feedback } from "./pages/Feedback";
import { ErrorBoundary } from "@sentry/react";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";

function App() {
  return (
    <DeskproAppProvider>
      <HashRouter>
        <ErrorBoundary fallback={ErrorFallback}>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route index path="/feedback/:id" element={<Feedback />}></Route>
          </Routes>
        </ErrorBoundary>
      </HashRouter>
    </DeskproAppProvider>
  );
}

export default App;
