import { InputText } from "../../molecules/InputText";
import { components } from "../../../services/backend/endpoints";
import { Connector } from "../../../helpers/Connector";
import { PostgreSQLFields } from "./PostgreSQLFields";
import { MySQLFields } from "./MySQLFields";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  connector: Connector;
  allConnectorFieldsState: {
    [Connector.PostgreSQL]: [
      components["schemas"]["PostgreSqlInfoIDto"],
      React.Dispatch<
        React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
      >
    ];
    [Connector.MySQL]: [
      components["schemas"]["MySqlInfoIDto"],
      React.Dispatch<
        React.SetStateAction<components["schemas"]["MySqlInfoIDto"]>
      >
    ];
    [Connector.MariaDB]: [
      components["schemas"]["PostgreSqlInfoIDto"],
      React.Dispatch<
        React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
      >
    ];
    [Connector.MongoDB]: [
      components["schemas"]["PostgreSqlInfoIDto"],
      React.Dispatch<
        React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
      >
    ];
    [Connector.MinIO]: [
      components["schemas"]["PostgreSqlInfoIDto"],
      React.Dispatch<
        React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
      >
    ];
  };
}

export function ConnectorForm({
  name,
  setName,
  connector,
  allConnectorFieldsState,
}: Props) {
  const buildConnectorFields = () => {
    switch (connector) {
      case Connector.PostgreSQL:
        return (
          <PostgreSQLFields
            connectorFields={allConnectorFieldsState[connector][0]}
            setConnectorFields={allConnectorFieldsState[connector][1]}
          />
        );
      case Connector.MySQL:
        return (
          <MySQLFields
            connectorFields={allConnectorFieldsState[connector][0]}
            setConnectorFields={allConnectorFieldsState[connector][1]}
          />
        );
      case Connector.MariaDB:
        return (
          <PostgreSQLFields
            connectorFields={allConnectorFieldsState[connector][0]}
            setConnectorFields={allConnectorFieldsState[connector][1]}
          />
        );
      case Connector.MongoDB:
        return (
          <PostgreSQLFields
            connectorFields={allConnectorFieldsState[connector][0]}
            setConnectorFields={allConnectorFieldsState[connector][1]}
          />
        );
      case Connector.MinIO:
        return (
          <PostgreSQLFields
            connectorFields={allConnectorFieldsState[connector][0]}
            setConnectorFields={allConnectorFieldsState[connector][1]}
          />
        );
    }
  };

  const fields = buildConnectorFields();
  return (
    <form className="md:flex md:flex-wrap md:gap-x-4 md:gap-y-2.5 max-md:space-y-2.5">
      <InputText
        type="text"
        label="Name"
        required={true}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {fields}
    </form>
  );
}
