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
import { useBackend } from "../../../services/backend";
import { paths } from "../../../services/backend/endpoints";
import { Text } from "../../../components/atoms/Text";
import { LoadingText } from "../../../components/atoms/LoadingText";

export default function Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const allConnectorFieldsState = useStateAllConnectorFields();
  const { backend } = useBackend();
  const {
    mutate: testStatus,
    data: isUp,
    isPending: isCreating,
  } = useMutation({
    mutationFn: (
      payload: paths["/connections/test-status"]["post"]["requestBody"]["content"]["application/json"]
    ) => {
      return backend
        .post<
          paths["/connections/test-status"]["post"]["responses"]["200"]["content"]["application/json"]
        >("/connections/test-status", payload)
        .then((_) => _.data);
    },
  });
  const {
    mutate: createConnection,
    data: connections,
    isPending: isTesting,
  } = useMutation({
    mutationFn: (
      payload: paths["/connections"]["post"]["requestBody"]["content"]["application/json"]
    ) => {
      return backend
        .post<
          paths["/connections"]["post"]["responses"]["200"]["content"]["application/json"]
        >("/connections", payload)
        .then((_) => _.data);
    },
  });

  function extractConnectorFromURLParams() {
    const foundConnector = new URLSearchParams(location.search).get(
      "connector"
    );
    if (!foundConnector) navigate("/app/connections");
    return Connector[foundConnector as keyof typeof Connector];
  }

  const connector = extractConnectorFromURLParams();
  return (
    <AppLayout h1={"Create new connection"}>
      <CardLayout
        title={name}
        Img={({ className }: { className: string }) => (
          <ConnectorImg connector={connector} className={className} />
        )}
        desc={[<Text text={connector} />, <LoadingText text={"Editing"} />]}
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
      <div className="flex md:space-x-4 max-md:justify-between py-2">
        <Button
          label={"Test"}
          color="sky"
          loading={isCreating}
          disabled={isTesting}
          onClick={() => testStatus(allConnectorFieldsState[connector][0])}
        />
        <Button
          label={"Connect"}
          color="emerald"
          loading={isTesting}
          disabled={isCreating}
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
