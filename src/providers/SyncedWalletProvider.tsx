import {
  convertExtendedChain,
  isExtendedChain,
  useSyncWagmiConfig,
} from "@openocean.finance/wallet-management";
import { useAvailableChains } from "@openocean.finance/widget";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "@privy-io/wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";
import { type Chain, base } from "viem/chains";
import { PRIVY_APP_ID, PRIVY_CLIENT_ID, privyConfig } from "../config/privy";
import { queryClient } from "../config/queryClient";
import { wagmiConfig } from "../config/wagmi";
import { SolanaProvider } from "./SolanaProvider";

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const { chains } = useAvailableChains();

  const supportedChains: Chain[] = (chains?.map((chain) =>
    isExtendedChain(chain) ? convertExtendedChain(chain) : chain
  ) as [Chain, ...Chain[]]) || [base];

  useSyncWagmiConfig(wagmiConfig, [], chains);
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      // clientId={PRIVY_CLIENT_ID}
      config={{
        ...privyConfig,
        defaultChain: base,
        supportedChains,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <SolanaProvider>
          <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
            {children}
          </WagmiProvider>
        </SolanaProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
