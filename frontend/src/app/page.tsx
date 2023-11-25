"use client";

import { Header } from "@/components/atoms/Header";
import { ConnectorButtonLabeled } from "@/components/molecules/ConnectorButtonLabeled";
import { SearchBar } from "@/components/atoms/SearchBar";
import { useState } from "react";
import { DockerHubLink } from "@/components/molecules/DockerHubLink";
import { GitHubLink } from "@/components/molecules/GitHubLink";
import { SparKaiKuLink } from "@/components/molecules/SparKaiKuLink";
import { ChevronButton } from "@/components/atoms/ChevronButton";
import { ConnectorCarousel } from "@/components/organisms/ConnectorCarousel";

export default function Home() {
  const [value, setValue] = useState("");
  return (
    <main className="flex flex-col items-center space-y-4">
      <SparKaiKuLink />
      <DockerHubLink />
      <GitHubLink />
      <Header text="Connections (31/33)" />
      <ChevronButton
        type="left"
        active={true}
        onClick={() => console.log("Left")}
      />
      <ChevronButton
        type="right"
        active={false}
        onClick={() => console.log("Right")}
      />
      <ConnectorButtonLabeled
        type="PostgreSQL"
        className="text-white"
        onClick={() => console.log("PostgreSQL")}
      />
      <ConnectorButtonLabeled
        type="MySQL"
        className="text-white"
        onClick={() => console.log("MySQL")}
      />
      <ConnectorButtonLabeled
        type="MariaDB"
        className="text-white"
        onClick={() => console.log("MariaDB")}
      />
      <ConnectorButtonLabeled
        type="MongoDB"
        className="text-white"
        onClick={() => console.log("MongoDB")}
      />
      <ConnectorButtonLabeled
        type="MinIO"
        className="text-white"
        onClick={() => console.log("MinIO")}
      />
      <ConnectorCarousel />
      <SearchBar
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </main>
  );
}
