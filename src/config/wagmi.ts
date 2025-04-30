import { http } from 'viem'
import { base } from 'viem/chains'

import { createConfig } from '@privy-io/wagmi'

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})
