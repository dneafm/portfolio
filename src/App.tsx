/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Casefiles } from "./pages/Casefiles";
import { KyberNetwork } from "./pages/casefiles/KyberNetwork";
import { Factor } from "./pages/casefiles/Factor";
import { VNG } from "./pages/casefiles/VNG";
import { DJTrade } from "./pages/casefiles/DJTrade";
import { AgentBoard } from "./pages/casefiles/AgentBoard";
import { Experiments } from "./pages/Experiments";
import { ExperimentDetail } from "./pages/ExperimentDetail";
import { Notes } from "./pages/Notes";
import { NoteDetail } from "./pages/NoteDetail";
import { CV } from "./pages/CV";
import { Contact } from "./pages/Contact";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="casefiles" element={<Casefiles />} />
            <Route path="casefiles/kyber-network" element={<KyberNetwork />} />
            <Route path="casefiles/factor" element={<Factor />} />
            <Route path="casefiles/vng" element={<VNG />} />
            <Route path="casefiles/dj-trade" element={<DJTrade />} />
            <Route path="casefiles/agentboard" element={<AgentBoard />} />
            <Route path="operator-lab" element={<Experiments />} />
            <Route path="operator-lab/:id" element={<ExperimentDetail />} />
            <Route path="experiments" element={<Navigate to="/operator-lab" replace />} />
            <Route path="experiments/:id" element={<Navigate to="/operator-lab" replace />} />
            <Route path="notes" element={<Notes />} />
            <Route path="notes/:id" element={<NoteDetail />} />
            <Route path="cv" element={<CV />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
