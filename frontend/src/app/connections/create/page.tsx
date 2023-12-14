import { AppLayout } from "../../../components/templates/AppLayout";
import { useLocation } from "react-router-dom";
import { Connector } from "../../../helpers/Connector";
import { CardLayout } from "../../../components/molecules/CardLayout";
import { ConnectorCarousel } from "../../../components/organisms/ConnectorCarousel";
import { useState } from "react";
import { ConnectorImg } from "../../../components/atoms/ConnectorImg";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/molecules/Button";
import { useStateConnectorFields } from "../../../hooks/useStateConnectorFields";
import { ConnectorForm } from "../../../components/organisms/ConnectorForm";

export default function Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const foundConnector = new URLSearchParams(location.search).get("connector");
  if (!foundConnector) navigate("/app/connections");
  const connector = Connector[foundConnector as keyof typeof Connector];

  const [name, setName] = useState("");
  const [connectorFields, setConnectorFields] =
    useStateConnectorFields(connector);

  switch (connectorFieldsUseState[0].type) {
    case "postgresql":
      return { a: connectorFieldsUseState[1] };
  }

  return (
    <AppLayout h1={"Create new connection"}>
      <CardLayout
        title={name}
        Img={({ className }: { className: string }) => (
          <ConnectorImg connector={connector} className={className} />
        )}
        desc={[connector, "Editing . . ."]}
        botLeft={{
          text: "← Tap to go back",
          onClick: () => navigate("/app/connections"),
        }}
      />
      <ConnectorCarousel />
      <ConnectorForm
        name={name}
        setName={setName}
        connectorFields={connectorFields}
        setConnectorFields={(event) => setConnectorFields(event)}
      />
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
