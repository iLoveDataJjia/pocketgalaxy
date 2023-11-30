"use client";

import { useState } from "react";
import { PageTitle } from "@/components/atoms/PageTitle";
import { SearchBar } from "@/components/atoms/SearchBar";
import { DockerHubLink } from "@/components/molecules/DockerHubLink";
import { GitHubLink } from "@/components/molecules/GitHubLink";
import { SparKaiKuLink } from "@/components/molecules/SparKaiKuLink";
import { ConnectorCarousel } from "@/components/organisms/ConnectorCarousel";
import { ConnectorType } from "@/helpers/ConnectorType";
import { ConnectorPannel } from "@/components/organisms/ConnectorPannel";
import moment from "moment";
import { ConnectorEditingPannel } from "@/components/organisms/ConnectorEditingPannel";
import { ConnectorForm } from "@/components/organisms/ConnectorForm";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <main className="flex flex-col items-center space-y-4">
      <SparKaiKuLink />
      <DockerHubLink />
      <GitHubLink />
      <PageTitle text="Connections (31/33)" />
      <ConnectorCarousel />
      <SearchBar
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <div className="space-y-4">
        <ConnectorPannel
          type={ConnectorType.PostgreSQL}
          name="MyElephantConnection"
          updatedAt={moment("2023-11-28T05:14:15.370Z")}
          isUp={true}
        />
        <ConnectorPannel
          type={ConnectorType.MySQL}
          name="BabyDolphinCo"
          updatedAt={moment("2023-11-14T05:14:15.370Z")}
          isUp={undefined}
        />
        <ConnectorPannel
          type={ConnectorType.MinIO}
          name="FlamencoOhYeah"
          updatedAt={moment("2022-11-28T05:14:15.370Z")}
          isUp={false}
        />
      </div>
      <PageTitle text="Create new connection" />
      <ConnectorEditingPannel
        type={ConnectorType.PostgreSQL}
        name="MyElephantConnection"
      />
      <ConnectorForm />
    </main>
  );
}
