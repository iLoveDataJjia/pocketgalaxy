import { SearchBar } from "../../components/molecules/SearchBar";
import { ConnectorCarousel } from "../../components/organisms/ConnectorCarousel";
import { AppLayout } from "../../components/templates/AppLayout";
import { useState } from "react";

export default function Page() {
  const header = "Connections (31/33)";
  const [searchInput, setSearchInput] = useState("");

  return (
    <AppLayout h1={header}>
      <ConnectorCarousel />
      <SearchBar
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </AppLayout>
  );
}
