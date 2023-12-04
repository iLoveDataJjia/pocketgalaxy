import { ConnectorCarousel } from "../../components/organisms/ConnectorCarousel";
import { AppLayout } from "../../components/templates/AppLayout";

export default function Page() {
  const header = "Connections (31/33)";

  return (
    <AppLayout h1={header}>
      <ConnectorCarousel />
    </AppLayout>
  );
}
