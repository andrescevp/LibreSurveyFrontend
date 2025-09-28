import { useState } from 'react'
import './App.css'
import { SurveyEditor } from './survey-editor'
import type { Survey } from './survey-types'

function App() {
  const [survey, setSurvey] = useState<Survey | null>(null)

  const handleSaveSurvey = (updatedSurvey: Survey) => {
    setSurvey(updatedSurvey)
    console.log('Survey saved:', updatedSurvey)
  }

  const handlePreviewSurvey = (surveyToPreview: Survey) => {
    console.log('Preview survey:', surveyToPreview)
  }

  return (
    <div className="h-screen overflow-hidden">
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

export default App
