import { InputText } from "../molecules/InputText";
import { components } from "../../services/backend/endpoints";
import { Connector } from "../../helpers/Connector";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  useStateConnectorFields:
    | {
        type: Connector.PostgreSQL;
        useState: [
          components["schemas"]["PostgreSqlInfoIDto"],
          React.Dispatch<
            React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
          >
        ];
      }
    | {
        type: Connector.MySQL;
        useState: [
          components["schemas"]["MySqlInfoIDto"],
          React.Dispatch<
            React.SetStateAction<components["schemas"]["MySqlInfoIDto"]>
          >
        ];
      }
    | {
        type: Connector.MariaDB;
        useState: [
          components["schemas"]["PostgreSqlInfoIDto"],
          React.Dispatch<
            React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
          >
        ];
      }
    | {
        type: Connector.MongoDB;
        useState: [
          components["schemas"]["PostgreSqlInfoIDto"],
          React.Dispatch<
            React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
          >
        ];
      }
    | {
        type: Connector.MinIO;
        useState: [
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
  useStateConnectorFields,
}: Props) {
  const fields = (() => {
    switch (useStateConnectorFields.type) {
      case Connector.PostgreSQL:
        return (
          <PostgreSQLFields
            connectorFields={useStateConnectorFields.useState[0]}
            setConnectorFields={useStateConnectorFields.useState[1]}
          />
        );
      case "mysql":
        return (
          <MySQLFields
            connectorFields={connectorFields}
            setConnectorFields={setConnectorFields}
          />
        );
      default:
        return (
          <PostgreSQLFields
            connectorFields={connectorFields}
            setConnectorFields={setConnectorFields}
          />
        );
    }
  })();

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

interface PostgreSQLProps {
  connectorFields: components["schemas"]["PostgreSqlInfoIDto"];
  setConnectorFields: React.Dispatch<
    React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
  >;
}

function PostgreSQLFields({ value, onChange }: PostgreSQLProps) {
  return (
    <>
      <InputText
        type="text"
        label="Host"
        required={true}
        value={value.host}
        onChange={onChange}
      />
      <InputText
        type="number"
        label="Port"
        required={true}
        value={value.port}
        onChange={onChange}
      />
      <InputText
        type="text"
        label="Database"
        required={true}
        value={value.database}
        onChange={onChange}
      />
      <InputText
        type="text"
        label="User"
        required={true}
        value={value.user}
        onChange={onChange}
      />
      <InputText
        type="password"
        label="Password"
        required={false}
        value={value.password ? value.password : ""}
        onChange={onChange}
      />
    </>
  );
}

interface MySQLProps {
  connectorFields: components["schemas"]["MySqlInfoIDto"];
  setConnectorFields: React.Dispatch<
    React.SetStateAction<components["schemas"]["MySqlInfoIDto"]>
  >;
}

function MySQLFields({ connectorFields, setConnectorFields }: MySQLProps) {
  return (
    <>
      <InputText
        type="text"
        label="Host"
        required={true}
        value={connectorFields.host}
        onChange={(event) =>
          setConnectorFields((connectorFields) => ({
            ...connectorFields,
            host: event.target.value,
          }))
        }
      />
      <InputText
        type="number"
        label="Port"
        required={true}
        value={connectorFields.port}
        onChange={onChange}
      />
      <InputText
        type="text"
        label="User"
        required={true}
        value={connectorFields.user}
        onChange={onChange}
      />
      <InputText
        type="password"
        label="Password"
        required={false}
        value={connectorFields.password ? connectorFields.password : ""}
        onChange={onChange}
      />
    </>
  );
}
