import { DeskproAppProvider } from "@deskpro/app-sdk";
import { Routes, HashRouter, Route } from "react-router-dom";

import { Main } from "./pages/Main";

import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";

import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import { Feedback } from "./pages/Feedback";

function App() {
  return (
    <DeskproAppProvider>
      <HashRouter>
        <Routes>
          <Route index path="/" element={<Main />}></Route>
          <Route index path="/feedback/:id" element={<Feedback />}></Route>
        </Routes>
      </HashRouter>
    </DeskproAppProvider>
  );
}

export default App;
