import "./App.css";
import { Openocean } from "./Openocean";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { base } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { config } from "./web3";

export const queryClient = new QueryClient();

function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID!}
      config={{
        loginMethods: ["email", "wallet"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: base,
        appearance: {
          theme: "light",
          accentColor: "#43BDCE",
          walletChainType: "ethereum-only",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <Openocean />
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default App;
