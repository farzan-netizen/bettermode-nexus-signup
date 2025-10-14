import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { NotFound } from '@/pages/not-found'
import { SignupPage } from '@/pages/signup'
import { WizardPage } from '@/pages/wizard'
import { RouteProvider } from '@/providers/router-provider'
import { ThemeProvider } from '@/providers/theme'
import { WidgetConfigProvider } from '@/providers/widget-config-provider'
import { ErrorBoundary } from '@/components/error-boundary'
import { AdminProvider } from '@/hooks/use-admin'
import '@/styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AdminProvider>
        <ThemeProvider>
          <WidgetConfigProvider>
            <BrowserRouter>
              <RouteProvider>
                <Routes>
                  <Route path="/" element={<Navigate to="/signup" />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/wizard" element={<WizardPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </RouteProvider>
            </BrowserRouter>
          </WidgetConfigProvider>
        </ThemeProvider>
      </AdminProvider>
    </ErrorBoundary>
  </StrictMode>,
)
