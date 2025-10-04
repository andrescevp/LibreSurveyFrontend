
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css'
import { AuthProvider, ProtectedRoute, PublicRoute, LoginForm } from './auth'
import { HomePage, SurveyEditorPage } from './pages'
import { queryClient, devToolsConfig } from '@lib/queries/queryClient'

// Login Page Component (public)
function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <LoginForm
          onSuccess={() => {
            // Navigation is handled by the auth system
            console.log('Login successful')
          }}
          showForgotPassword={false} // Not implemented yet
        />
      </div>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute redirectTo="/dashboard">
                  <LoginPage />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <SurveyEditorPage />
                </ProtectedRoute>
              }
            />

            {/* Home route */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>

      {/* Development tools - only in development */}
      {import.meta.env.DEV && (
        <ReactQueryDevtools
          initialIsOpen={devToolsConfig.initialIsOpen}
          position={devToolsConfig.position}
          toggleButtonProps={devToolsConfig.toggleButtonProps}
        />
      )}
    </QueryClientProvider>
  )
}

export default App
