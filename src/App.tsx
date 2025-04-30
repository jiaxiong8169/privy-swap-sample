import { OpenOceanWidget, openOceanTheme } from '@openocean.finance/widget'
import { QueryClientProvider } from '@tanstack/react-query'
import { WalletHeader } from './components/WalletHeader'
import { queryClient } from './config/queryClient'
import { WalletProvider } from './providers/SyncedWalletProvider'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <WalletHeader />
        <OpenOceanWidget
          integrator="vite-example"
          config={{
            theme: openOceanTheme,
            variant: 'compact',
            subvariant: 'split',
            appearance: 'dark',
            chains: { allow: [8453, 1151111081099710] },
          }}
        />
      </WalletProvider>
    </QueryClientProvider>
  )
}

export default App
