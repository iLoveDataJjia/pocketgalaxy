import { InputText } from "../../molecules/InputText";
import { components } from "../../../services/backend/endpoints";

interface MySQLProps {
  connectorFields: components["schemas"]["MySqlInfoIDto"];
  setConnectorFields: React.Dispatch<
    React.SetStateAction<components["schemas"]["MySqlInfoIDto"]>
  >;
}

export function MySQLFields({
  connectorFields,
  setConnectorFields,
}: MySQLProps) {
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
        onChange={(event) =>
          setConnectorFields((fields) => ({
            ...fields,
            port: parseInt(event.target.value),
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
            password: event.target.value,
          }))
        }
      />
    </>
  );
}
