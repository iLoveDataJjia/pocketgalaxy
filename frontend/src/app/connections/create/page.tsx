import { AppLayout } from "../../../components/templates/AppLayout";
import { useLocation } from "react-router-dom";
import { Connector } from "../../../helpers/Connector";
import { CardLayout } from "../../../components/molecules/CardLayout";
import { ConnectorCarousel } from "../../../components/organisms/ConnectorCarousel";
import { useState } from "react";
import { ConnectorImg } from "../../../components/atoms/ConnectorImg";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../../components/molecules/InputText";
import { Button } from "../../../components/molecules/Button";
import { useStateConnector } from "../../../hooks/useStateConnector";

export default function Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const foundConnector = new URLSearchParams(location.search).get("connector");
  if (!foundConnector) navigate("/app/connections");
  const connector = Connector[foundConnector as keyof typeof Connector];

  const Image = ({ className }: { className: string }) => (
    <ConnectorImg connector={connector} className={className} />
  );
  const [name, setName] = useState("");
  const [connectorState, setConnectorState] = useStateConnector(connector);

  return (
    <AppLayout h1={"Create new connection"}>
      <CardLayout
        title={name}
        Img={Image}
        desc={[connector, "Editing . . ."]}
        botLeft={{
          text: "← Tap to go back",
          onClick: () => navigate("/app/connections"),
        }}
      />
      <ConnectorCarousel />
      <div className="md:flex md:flex-wrap md:gap-x-4 md:gap-y-2.5 max-md:space-y-2.5">
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
      </div>
      <div className="flex md:space-x-4 max-md:justify-between">
        <Button
          label={"Test"}
          color="sky"
          onClick={() => console.log(connector)}
        />
        <Button
          label={"Connect"}
          color="emerald"
          onClick={() => console.log("Connect")}
        />
      </div>
    </AppLayout>
  );
}
