import { Connector } from "../../helpers/Connector";
import { InputText } from "../molecules/InputText";
import { paths }

interface Props {
  type: Connector;
  nameValue: string,
  nameOnChange: ,
   
  onChange: 
}

export function ConnectorForm({ type }: Props) {
  return (
    <form className="md:flex md:flex-wrap md:gap-x-4 md:gap-y-2.5 max-md:space-y-2.5">
      
    </form>
  );
}

interface PostgreSQLProps {

}

function PostgreSQLFields() {
  return (
    <>
      <InputText
        type="text"
        label="Name"
        required={true}
        value={connName}
        onChange={(event) => setConnName(event.target.value)}
      />
      <InputText
        type="text"
        label="Host"
        required={true}
        value={host}
        onChange={(event) => setHost(event.target.value)}
      />
      <InputText
        type="number"
        label="Port"
        required={true}
        value={port}
        onChange={(event) => setPort(parseInt(event.target.value))}
      />
      <InputText
        type="text"
        label="Database"
        required={true}
        value={database}
        onChange={(event) => setDatabase(event.target.value)}
      />
      <InputText
        type="text"
        label="User"
        required={true}
        value={user}
        onChange={(event) => setUser(event.target.value)}
      />
      <InputText
        type="password"
        label="Password"
        required={false}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </>
  );
}
