import { Routes, Route, BrowserRouter } from "react-router-dom";
import Connections from "./app/connections/page";
import ConnectionsCreate from "./app/connections/create/page";
import ConnectionsUpdate from "./app/connections/update/page";

export default function App() {
  return (
    <main>
      <BrowserRouter basename="/app">
        <Routes>
          <Route path="/connections" element={<Connections />} />
          <Route path="/connections/create" element={<ConnectionsCreate />} />
          <Route path="/connections/update" element={<ConnectionsUpdate />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
