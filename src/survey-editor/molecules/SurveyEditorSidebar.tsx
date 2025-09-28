import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/molecules/Tabs';
import { SurveyMetaForm } from './SurveyMetaForm';
import { QuestionItemList } from './QuestionItemList';
import { Settings, FileText } from 'lucide-react';
import type { Survey } from '../../survey-types';
import type { QuestionnaireItem } from '../types';

interface SurveyEditorSidebarProps {
    survey: Survey;
    activeTab: string;
    selectedQuestionIndex: number | null;
    onTabChange: (tab: string) => void;
    onSurveyMetaUpdate: (survey: Survey) => void;
    onQuestionsUpdate: (questions: QuestionnaireItem[]) => void;
    onQuestionSelect: (question: QuestionnaireItem, index: number) => void;
    onAddQuestion: (type: QuestionnaireItem['type'], parentIndex?: number) => void;
}

export function SurveyEditorSidebar({
    survey,
    activeTab,
    selectedQuestionIndex,
    onTabChange,
    onSurveyMetaUpdate,
    onQuestionsUpdate,
    onQuestionSelect,
    onAddQuestion,
}: SurveyEditorSidebarProps) {
    return (
        <div className="w-80 border-r bg-card flex flex-col">
            <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1 flex flex-col">
                <TabsList className="grid grid-cols-2 m-4">
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                    </TabsTrigger>
                    <TabsTrigger value="questions" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Questions
                    </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    <TabsContent value="settings" className="mt-0">
                        <SurveyMetaForm
                            initialData={survey}
                            onSave={onSurveyMetaUpdate}
                        />
                    </TabsContent>

                    <TabsContent value="questions" className="mt-0">
                        <QuestionItemList
                            items={survey.children || []}
                            onUpdate={onQuestionsUpdate}
                            onSelectItem={onQuestionSelect}
                            selectedIndex={selectedQuestionIndex ?? undefined}
                            onAddItem={onAddQuestion}
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}