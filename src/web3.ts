import { createConfig } from "@privy-io/wagmi";
import { base } from "viem/chains";
import { http } from "wagmi";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(import.meta.env.VITE_BASE_RPC),
  },
});
