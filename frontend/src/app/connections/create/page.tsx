import { AppLayout } from "../../../components/templates/AppLayout";
import { useLocation } from "react-router-dom";
import { Connector } from "../../../helpers/Connector";
import { CardLayout } from "../../../components/molecules/CardLayout";
import { ConnectorCarousel } from "../../../components/organisms/ConnectorCarousel";
import { useState } from "react";
import { ConnectorImg } from "../../../components/atoms/ConnectorImg";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/molecules/Button";
import { useStateAllConnectorFields } from "../../../hooks/useStateConnectorFields";
import { ConnectorForm } from "../../../components/organisms/ConnectorForm";
import { useMutation } from "@tanstack/react-query";
import { backend } from "../../../services/backend";
import { paths } from "../../../services/backend/endpoints";

export default function Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const foundConnector = new URLSearchParams(location.search).get("connector");
  if (!foundConnector) navigate("/app/connections");
  const connector = Connector[foundConnector as keyof typeof Connector];

  const [name, setName] = useState("");
  const allConnectorFieldsState = useStateAllConnectorFields();
  const { mutate: testStatus, data: isUp } = useMutation({
    mutationFn: (
      payload: paths["/connections/test-status"]["post"]["requestBody"]["content"]["application/json"]
    ) => {
      return backend.post<
        paths["/connections/test-status"]["post"]["responses"]["200"]["content"]["application/json"]
      >("/connections/test-status", payload);
    },
  });
  const {
    mutate: createConnection,
    data: connections,
    error,
  } = useMutation({
    mutationFn: (
      payload: paths["/connections"]["post"]["requestBody"]["content"]["application/json"]
    ) => {
      return backend.post<
        paths["/connections"]["post"]["responses"]["200"]["content"]["application/json"]
      >("/connections", payload);
    },
  });
  console.log(connections);
  console.log(error?.message);

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
        connector={connector}
        allConnectorFieldsState={allConnectorFieldsState}
      />
      <div className="flex md:space-x-4 max-md:justify-between">
        <Button
          label={"Test"}
          color="sky"
          onClick={() => testStatus(allConnectorFieldsState[connector][0])}
        />
        <Button
          label={"Connect"}
          color="emerald"
          onClick={() =>
            createConnection({
              name: name,
              connector_info: allConnectorFieldsState[connector][0],
            })
          }
        />
      </div>
    </AppLayout>
  );
}
