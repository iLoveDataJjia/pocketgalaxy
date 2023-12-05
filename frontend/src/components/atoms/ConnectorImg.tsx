import PostgreSQL from "/connectors/PostgreSQL.webp";
import MySQL from "/connectors/MySQL.webp";
import MariaDB from "/connectors/MariaDB.webp";
import MongoDB from "/connectors/MongoDB.webp";
import MinIO from "/connectors/MinIO.webp";
import { useMemo } from "react";

interface Props {
  connector: "PostgreSQL" | "MySQL" | "MariaDB" | "MongoDB" | "MinIO";
  className?: string;
}

export function ConnectorImg({ connector, className }: Props) {
  const convertToSrcPath = useMemo(
    () => ({
      ["PostgreSQL"]: PostgreSQL,
      ["MySQL"]: MySQL,
      ["MariaDB"]: MariaDB,
      ["MongoDB"]: MongoDB,
      ["MinIO"]: MinIO,
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
