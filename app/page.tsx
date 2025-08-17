import Image from "next/image";
import ServerComponent from "./feed/ServerComponent";
import ClientOptimistic from "./feed/ClientOptimistic";

export default function Home() {
  const detail = ServerComponent();

  return (
    <div className="text-white w-[80%] m-auto mt-10">
      <h1 className="text-semibold text-2xl text-center pb-2 text-white shadow-2xs shadow-red-400">
        All post by users
      </h1>
      <ClientOptimistic detail={detail} />
    </div>
  );
}
