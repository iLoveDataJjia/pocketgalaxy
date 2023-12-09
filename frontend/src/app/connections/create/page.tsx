import { AppLayout } from "../../../components/templates/AppLayout";
import { useLocation } from "react-router-dom";
import { Connector } from "../../../helpers/Connector";
import { CardLayout } from "../../../components/organisms/CardLayout";
import { ConnectorCarousel } from "../../../components/organisms/ConnectorCarousel";
import { useState } from "react";
import { ConnectorImg } from "../../../components/atoms/ConnectorImg";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../../components/molecules/InputText";

export default function Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const foundConnector = new URLSearchParams(location.search).get("connector");
  if (!foundConnector) navigate("/app/connections");
  const connector = Connector[foundConnector as keyof typeof Connector];

  const Image = ({ className }: { className: string }) => (
    <ConnectorImg connector={connector} className={className} />
  );
  const [connName, setConnName] = useState("");
  const desc = [connector.toString(), "Editing . . ."];
  const [host, setHost] = useState("");
  const [port, setPort] = useState(5432);
  const [database, setDatabase] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState(undefined);

  return (
    <AppLayout h1={"Create new connection"}>
      <CardLayout
        title={connName}
        Img={Image}
        desc={desc}
        botLeft={{
          text: "← Tap to go back",
          onClick: () => navigate("/app/connections"),
        }}
      />
      <ConnectorCarousel />
      <div className="md:flex md:flex-wrap md:gap-x-4 md:gap-y-3">
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
          onChange={(event) => setPort(event.target.value)}
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
    </AppLayout>
  );
}
