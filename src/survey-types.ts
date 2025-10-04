export interface Survey {
    code: string;
    title: string;
    description?: string | null;
    children?: QuestionnaireItem[] | null;
}

/**
 * Survey as sent to the API when creating or updating
 */
export interface SurveyResponse extends Survey {
    uuid: string;
}

type QuestionnaireItem = Block | BreakPage | Loop | QuestionNumber | QuestionChoice | QuestionString | Text;
type QuestionItemOptions = ElementOptionsBlock | ElementOptionsLoop | ElementOptionsMarker | QuestionOptionsNumber | QuestionOptionsChoice | QuestionOptionsString | ElementOptionsTermination;

export interface SortableItem {
    /**
     * Auto-generated unique identifier
     * @type {string}
     * @memberof SortableItem
     */
    id: string;
    
    /**
     * Code of the item (must be unique in the questionnaire)
     * @type {string}
     * @memberof SortableItem
     */
    code: string;
    parentIndex?: number | null;
    index: number;
    depth: number;
    isLast: boolean;
    parentIndexes?: number[] | null;
}

export interface BaseRowColumnOptions {
    condition?: ElementCondition<"show"> | null;
    noRandomize?: boolean | null;
}

export interface SurveyChildren<O = QuestionItemOptions, R = BaseRowColumnOptions, C = BaseRowColumnOptions> extends SortableItem {
    label: string;
    type: "block" | "breakPage" | "loop" | "marker" | "number" | "quota" | "choice" | "string" | "termination" | "text";
    options: O;
    children?: QuestionnaireItem[];
    rows?: ElementRow<R>[] | null;
    columns?: ElementColumn<C>[] | null;
}

export interface ElementColumn<O> extends SortableItem {
    label: string;
    options?: O | null;
}

export interface ElementRow<O> extends SortableItem {
    label: string;
    options?: O | null;
}

export interface LoopConcept extends SortableItem {
    label: string;
    condition?: ElementCondition<"iterate"> | null;
}

export interface ElementConditionRule {
    negate?: boolean;
    code: string;
    rowCode?: string;
    columnCode?: string;
    operator?: "=" | "!=" | ">" | "<" | ">=" | "<=" | "contains" | "not_contains" | "set" | "not_set";
    value?: string;
    gate?: "and" | "or";
}

export interface ElementCondition<A = "show"> {
    action: A;
    rules: ElementConditionRule[];
}

// OPTIONS INTERFACES
export interface BaseQuestionOptions {
    hidden?: boolean | null;
    condition?: ElementCondition<"show"|"require"> | null;
    required?: boolean | null;
    randomizeRows?: boolean | null;
    randomizeColumns?: boolean | null;
}

export interface ElementOptionsBlock {
    condition?: ElementCondition | null;
    showLabel?: boolean | null;
}

export interface ElementOptionsText {
    condition?: ElementCondition | null;
}

export interface ElementOptionsLoop {
    condition?: ElementCondition | null;
}

export interface ElementOptionsMarker {
    condition?: ElementCondition<"set"> | null;
}

export interface ElementOptionsTermination {
    condition?: ElementCondition<"set"> | null;
}

export interface QuestionOptionsString extends BaseQuestionOptions {
    multiline?: boolean | null;
    placeholder?: string | null;
    regex?: string | null;
    width?: number | null; // width of the input field in pixels
    height?: number | null; // only applies if multiline is true
    minLength?: number | null;
    maxLength?: number | null;
    verifier?: "email" | "number" | "url";
    naOption?: boolean | null;
    naLabel?: string | null;
}

export interface QuestionOptionsNumber extends BaseQuestionOptions {
    placeholder?: string | null;
    min?: number | null;
    max?: number | null;
    width?: number | null; // width of the input field in pixels
    integer?: boolean | null;
    decimalPlaces?: number | null; // number of decimal places if integer is false
    fixedValues?: number[] | null; // predefined fixed values that the user can select
    naOption?: boolean | null;
    naLabel?: string | null;
}

export interface QuestionRowOptionsChoice extends BaseRowColumnOptions {
    exclusive?: boolean | null; // if true, selecting this row will deselect all other rows in the same question if multipleSelection is true
}

export interface QuestionColumnOptionsChoice extends BaseRowColumnOptions {
    exclusive?: boolean | null; // if true, selecting this column will deselect all other columns in the same question if multipleSelection is true
}

export interface QuestionOptionsChoice extends BaseQuestionOptions {
    multipleSelection?: boolean | null;
    minSelections?: number | null; // minimum number of selections if multipleSelection is true
    maxSelections?: number | null; // maximum number of selections if multipleSelection is true
}


// ELEMENT INTERFACES

// non question elements

export interface Block extends Omit<SurveyChildren<ElementOptionsBlock>, 'label' | 'rows' | 'columns'> {
    type: "block";
}

export interface BreakPage extends Omit<SurveyChildren<null>, 'label' | 'children' | 'options' | 'rows' | 'columns'> {
}

export interface Loop extends Omit<SurveyChildren<ElementOptionsLoop>, 'label' | 'rows' | 'columns'> {
    type: "loop";
    concepts?: LoopConcept[];
}

export interface Text extends Omit<SurveyChildren<ElementOptionsText>, 'children' | 'rows' | 'columns'> {
    type: "text";
}

// question elements

export interface QuestionNumber extends Omit<SurveyChildren<QuestionOptionsNumber, BaseRowColumnOptions, BaseRowColumnOptions>, 'children'> {
    help?: string | null;
    type: "number";
}

export interface QuestionChoice extends Omit<SurveyChildren<QuestionOptionsChoice, QuestionRowOptionsChoice, QuestionColumnOptionsChoice>, 'children'> {
    help?: string | null;
    type: "choice";
}

export interface QuestionString extends Omit<SurveyChildren<QuestionOptionsString, BaseRowColumnOptions, BaseRowColumnOptions>, 'children'> {
    help?: string | null;
    type: "string";
}

