"use client";

import { PageTitle } from "@/components/atoms/PageTitle";
import { ConnectorButtonLabeled } from "@/components/molecules/ConnectorButtonLabeled";
import { SearchBar } from "@/components/atoms/SearchBar";
import { useState } from "react";
import { DockerHubLink } from "@/components/molecules/DockerHubLink";
import { GitHubLink } from "@/components/molecules/GitHubLink";
import { SparKaiKuLink } from "@/components/molecules/SparKaiKuLink";
import { ChevronButton } from "@/components/atoms/ChevronButton";
import { ConnectorCarousel } from "@/components/organisms/ConnectorCarousel";
import { ConnectorType } from "@/helpers/ConnectorType";
import { ConnectorPannel } from "@/components/organisms/ConnectorPannel";

export default function Home() {
  const [value, setValue] = useState("");
  return (
    <main className="flex flex-col items-center space-y-4">
      <SparKaiKuLink />
      <DockerHubLink />
      <GitHubLink />
      <PageTitle text="Connections (31/33)" />
      <ConnectorCarousel />
      <SearchBar
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <ConnectorPannel
        type={ConnectorType.PostgreSQL}
        name="MyElephantConnection"
        updatedAt=""
        isUp={true}
      />
    </main>
  );
}
