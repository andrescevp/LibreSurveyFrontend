
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, ProtectedRoute, PublicRoute, LoginForm, useAuth } from './auth'
import { SurveyEditor } from './survey-editor'
import type { Survey } from './survey-types'

// Dashboard Component (protected)
function Dashboard() {
  const { user, logout } = useAuth()

  const handleSaveSurvey = (updatedSurvey: Survey) => {
    console.log('Survey saved:', updatedSurvey)
  }

  const handlePreviewSurvey = (surveyToPreview: Survey) => {
    console.log('Preview survey:', surveyToPreview)
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* Simple header with user info and logout */}
      <div className="bg-background border-b border-border px-4 py-2 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-foreground">LibreSurvey</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.username}
          </span>
          <button
            onClick={logout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <SurveyEditor
        initialSurvey={{
          code: 'demo_survey',
          title: 'Demo Survey',
          description: 'A sample survey to demonstrate the editor',
        }}
        onSave={handleSaveSurvey}
        onPreview={handlePreviewSurvey}
      />
    </div>
  )
}

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
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
