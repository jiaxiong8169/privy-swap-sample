import {
  OpenOceanWidget,
  WidgetConfig,
  ChainId,
  useAvailableChains,
} from "@openocean.finance/widget";
import { useSyncWagmiConfig } from "@openocean.finance/wallet-management";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useEffect, useMemo } from "react";

const widgetConfig: WidgetConfig = {
  buildUrl: false,
  theme: {
    container: {
      border: "1px solid rgb(234, 234, 234)",
      borderRadius: "16px",
    },
  },
  fromChain: ChainId.BAS,
  toChain: ChainId.BAS,
  fromToken: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
  toToken: "0x1C4CcA7C5DB003824208aDDA61Bd749e55F463a3",
  chains: {
    allow: [ChainId.BAS],
  },
  fromAmount: 0,
  integrator: "VIRTUALs Protocol",
  sdkConfig: {
    rpcUrls: {
      [ChainId.BAS]: [import.meta.env.VITE_BASE_RPC ?? ""],
    },
  },
  slippage: 0.005,
};

export const Openocean = () => {
  const { chains } = useAvailableChains();
  // is this needed?
  // useSyncWagmiConfig(config, [], chains);
  const { user, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();

  const targetWallet = useMemo(() => {
    return wallets?.find(
      (wallet) =>
        wallet.address.toLowerCase() === user?.wallet?.address?.toLowerCase()
    );
  }, [wallets, user]);

  useEffect(() => {
    if (!!targetWallet) {
      // Set as Wagmi active wallet
      setActiveWallet(targetWallet);
    }
  }, [targetWallet]);

  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-4">
      <p>User wallet: {user?.wallet?.address || "None"}</p>
      <p>Is user wallet connected?: {!!targetWallet?.address ? "Yes" : "No"}</p>
      {!user ? (
        <button
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      )}
      <OpenOceanWidget
        integrator="VIRTUALs Protocol"
        config={widgetConfig}
        walletConfig={{
          onConnect: () => {
            login();
          },
        }}
      />
    </div>
  );
};
