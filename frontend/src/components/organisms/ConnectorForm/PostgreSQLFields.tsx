import { InputText } from "../../molecules/InputText";
import { components } from "../../../services/backend/endpoints";

interface PostgreSQLProps {
  connectorFields: components["schemas"]["PostgreSqlInfoIDto"];
  setConnectorFields: React.Dispatch<
    React.SetStateAction<components["schemas"]["PostgreSqlInfoIDto"]>
  >;
}

export function PostgreSQLFields({
  connectorFields,
  setConnectorFields,
}: PostgreSQLProps) {
  return (
    <>
      <InputText
        type="text"
        label="Host"
        required={true}
        value={connectorFields.host}
        onChange={(event) =>
          setConnectorFields((fields) => ({
            ...fields,
            host: event.target.value,
          }))
        }
      />
      <InputText
        type="number"
        label="Port"
        required={true}
        value={connectorFields.port}
        onChange={(event) =>
          setConnectorFields((fields) => ({
            ...fields,
            port: parseInt(event.target.value),
          }))
        }
      />
      <InputText
        type="text"
        label="Database"
        required={true}
        value={connectorFields.database}
        onChange={(event) =>
          setConnectorFields((fields) => ({
            ...fields,
            database: event.target.value,
          }))
        }
      />
      <InputText
        type="text"
        label="User"
        required={true}
        value={connectorFields.user}
        onChange={(event) =>
          setConnectorFields((fields) => ({
            ...fields,
            user: event.target.value,
          }))
        }
      />
      <InputText
        type="password"
        label="Password"
        required={false}
        value={connectorFields.password ? connectorFields.password : ""}
        onChange={(event) =>
          setConnectorFields((fields) => ({
            ...fields,
            password: event.target.value == "" ? null : event.target.value,
          }))
        }
      />
    </>
  );
}
