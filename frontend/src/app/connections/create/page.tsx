import { AppLayout } from "../../../components/templates/AppLayout";
import { useLocation } from "react-router-dom";
import { Connector } from "../../../helpers/Connector";
import { CardLayout } from "../../../components/organisms/CardLayout";

export default function Page() {
  const header = "Create new connection";
  const location = useLocation();
  const foundConnector = new URLSearchParams(location.search).get("connector");
  const connector = foundConnector
    ? Connector[foundConnector as keyof typeof Connector]
    : undefined;

  return (
    <AppLayout h1={header}>
      <CardLayout />
    </AppLayout>
  );
}
