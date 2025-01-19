import { lazy, Suspense } from 'react'
import './App.css'
import ErrorBoundary from './Components/ErrorBoundary'
const HomePage = lazy(() => import('./Pages/Home'))

function App() {

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
