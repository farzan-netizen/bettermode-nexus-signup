import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { NotFound } from '@/pages/not-found'
import { SignupPage } from '@/pages/signup'
import { WizardPage } from '@/pages/wizard'
import { RouteProvider } from '@/providers/router-provider'
import { ThemeProvider } from '@/providers/theme'
import { ErrorBoundary } from '@/components/error-boundary'
import { RoutePaths } from '@/constants/routes'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { store } from './store'
import { Provider as ReduxProvider } from 'react-redux'

import '@/styles/globals.css'

const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_GQL_GLOBAL_ENDPOINT }),
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <ThemeProvider>
            <BrowserRouter>
              <RouteProvider>
                <Routes>
                  <Route
                    path={RoutePaths.HOME}
                    element={<Navigate to={RoutePaths.SIGNUP} />}
                  />
                  <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
                  <Route path={RoutePaths.WIZARD} element={<WizardPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </RouteProvider>
            </BrowserRouter>
          </ThemeProvider>
        </ApolloProvider>
      </ReduxProvider>
    </ErrorBoundary>
  </StrictMode>,
)
