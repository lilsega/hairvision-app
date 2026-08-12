import { FlowProvider, useFlow } from './context/FlowContext'
import { AppDataProvider } from './context/AppDataContext'
import { CornerNav } from './components/CornerNav/CornerNav'
import { Home } from './screens/Home/Home'
import { ClientProfile } from './screens/ClientProfile/ClientProfile'
import { Suggestions } from './screens/Suggestions/Suggestions'
import { HaircutTypes } from './screens/HaircutTypes/HaircutTypes'
import { CutAdjustments } from './screens/CutAdjustments/CutAdjustments'
import { SummaryReview } from './screens/SummaryReview/SummaryReview'
import { ResultPreview } from './screens/ResultPreview/ResultPreview'
import { SaveProfile } from './screens/SaveProfile/SaveProfile'

function Stage() {
  const { step } = useFlow()

  switch (step) {
    case 'home':
      return <Home />
    case 'clientProfile':
      return <ClientProfile />
    case 'suggestions':
      return <Suggestions />
    case 'haircutTypes':
      return <HaircutTypes />
    case 'cutAdjustments':
      return <CutAdjustments />
    case 'summaryReview':
      return <SummaryReview />
    case 'resultPreview':
      return <ResultPreview />
    case 'saveProfile':
      return <SaveProfile />
    default:
      return <Home />
  }
}

export default function App() {
  return (
    <AppDataProvider>
      <FlowProvider>
        <div className="app-shell">
          <Stage />
          <CornerNav />
        </div>
      </FlowProvider>
    </AppDataProvider>
  )
}
