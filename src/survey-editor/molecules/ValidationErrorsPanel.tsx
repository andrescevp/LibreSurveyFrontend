import type { ValidationError } from '../validation/types';
import { Badge } from '@ui/atoms/Badge';

interface ValidationErrorsPanelProps {
    validationErrors: ValidationError[];
    showWarnings?: boolean;
    showInfo?: boolean;
}

export function ValidationErrorsPanel({
    validationErrors,
    showWarnings = true,
    showInfo = false
}: ValidationErrorsPanelProps) {
    const errors = validationErrors.filter(error => error.severity === 'error');
    const warnings = validationErrors.filter(error => error.severity === 'warning');
    const infos = validationErrors.filter(error => error.severity === 'info');

    if (validationErrors.length === 0) {
        return (
            <div className="border-t bg-accent/5 p-4">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Survey validation passed with no issues</span>
                </div>
            </div>
        );
    }

    return (
        <div className="border-t bg-muted/5 p-4 space-y-3">
            {errors.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive" className="text-xs">
                            {errors.length} Error{errors.length === 1 ? '' : 's'}
                        </Badge>
                    </div>
                    <ul className="space-y-1">
                        {errors.map((error, index) => (
                            <li key={`error-${index}`} className="text-sm text-destructive flex items-start gap-2">
                                <span className="text-destructive/60 mt-0.5">•</span>
                                <div className="flex-1">
                                    <span>{error.message}</span>
                                    {error.field && (
                                        <span className="text-xs text-destructive/60 ml-2">
                                            ({error.field})
                                        </span>
                                    )}
                                    {error.code && (
                                        <span className="text-xs text-destructive/60 ml-1">
                                            [{error.code}]
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showWarnings && warnings.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                            {warnings.length} Warning{warnings.length === 1 ? '' : 's'}
                        </Badge>
                    </div>
                    <ul className="space-y-1">
                        {warnings.map((warning, index) => (
                            <li key={`warning-${index}`} className="text-sm text-yellow-700 flex items-start gap-2">
                                <span className="text-yellow-600 mt-0.5">⚠</span>
                                <div className="flex-1">
                                    <span>{warning.message}</span>
                                    {warning.field && (
                                        <span className="text-xs text-yellow-600 ml-2">
                                            ({warning.field})
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showInfo && infos.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                            {infos.length} Info
                        </Badge>
                    </div>
                    <ul className="space-y-1">
                        {infos.map((info, index) => (
                            <li key={`info-${index}`} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">ℹ</span>
                                <div className="flex-1">
                                    <span>{info.message}</span>
                                    {info.field && (
                                        <span className="text-xs text-muted-foreground ml-2">
                                            ({info.field})
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}