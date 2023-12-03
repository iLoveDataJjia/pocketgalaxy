"use client";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Connections from "@/app/app/(connections)/appPage";
import ConnectionsCreate from "@/app/app/(connections)/(create)/appPage";
import ConnectionsUpdate from "@/app/app/(connections)/(update)/appPage";

export default function Page() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/app"
            element={<Navigate to="/app/connections" replace={true} />}
          />
          <Route path="/app/connections" element={<Connections />} />
          <Route
            path="/app/connections/create"
            element={<ConnectionsCreate />}
          />
          <Route
            path="/app/connections/update"
            element={<ConnectionsUpdate />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
