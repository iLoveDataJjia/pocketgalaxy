import PostgreSQL from "/connectors/PostgreSQL.webp";
import MySQL from "/connectors/MySQL.webp";
import MariaDB from "/connectors/MariaDB.webp";
import MongoDB from "/connectors/MongoDB.webp";
import MinIO from "/connectors/MinIO.webp";
import { useMemo } from "react";
import { Connector } from "../../helpers/Connector";

interface Props {
  connector: Connector;
  className?: string;
}

export function ConnectorImg({ connector, className }: Props) {
  const convertToSrcPath = useMemo(
    () => ({
      [Connector.PostgreSQL]: PostgreSQL,
      [Connector.MySQL]: MySQL,
      [Connector.MariaDB]: MariaDB,
      [Connector.MongoDB]: MongoDB,
      [Connector.MinIO]: MinIO,
    }),
    []
  );

  const srcPath = convertToSrcPath[connector];
  return (
    <img
      src={srcPath}
      alt={connector}
      className={className ? ` ${className}` : ""}
    />
  );
}
