import ServerComponent from "./ServerComponent";

import ClientOptimistic from "./ClientOptimistic";

export default function page() {
  const detail = ServerComponent();
  return <ClientOptimistic detail={detail} />;
}
