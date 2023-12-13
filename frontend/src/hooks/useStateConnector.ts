import { Connector } from "../helpers/Connector";
import { useState } from "react";
import { components } from "../services/backend/endpoints";

export function useStateConnector(connector: Connector) {
  return {
    [Connector.PostgreSQL]: useState<
      components["schemas"]["PostgreSqlInfoIDto"]
    >({
      type: "postgresql",
      host: "",
      port: 5432,
      database: "",
      user: "",
      password: null,
    }),
    [Connector.MySQL]: useState<components["schemas"]["MySqlInfoIDto"]>({
      type: "mysql",
      host: "",
      port: 3306,
      database: "",
      user: "",
      password: null,
    }),
    [Connector.MariaDB]: useState<components["schemas"]["PostgreSqlInfoIDto"]>({
      type: "postgresql",
      host: "",
      port: 5432,
      database: "",
      user: "",
      password: null,
    }),
    [Connector.MongoDB]: useState<components["schemas"]["PostgreSqlInfoIDto"]>({
      type: "postgresql",
      host: "",
      port: 5432,
      database: "",
      user: "",
      password: null,
    }),
    [Connector.MinIO]: useState<components["schemas"]["PostgreSqlInfoIDto"]>({
      type: "postgresql",
      host: "",
      port: 5432,
      database: "",
      user: "",
      password: null,
    }),
  }[connector];
}
