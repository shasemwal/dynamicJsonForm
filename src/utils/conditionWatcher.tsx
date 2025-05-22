import type { FieldConfig } from '../types/FieldConfig';

/**
 * Applies conditional logic to form fields based on current form values.
 * @param config - The original form configuration.
 * @param values - The current values of the form fields.
 * @returns Updated form configuration with conditions applied.
 */
export const conditionWatcher = (config: FieldConfig[], values: Record<string, any>) => {
  return config.map(field => {
    let updatedField = { ...field };

    field.conditions?.forEach(condition => {
      const targetValue = values[condition.key];
      const shouldApply = targetValue === condition.value;

      condition.actions.forEach(action => {
        if (shouldApply) {
          switch (action) {
            case 'hide': updatedField.hidden = true; break;
            case 'unhide': updatedField.hidden = false; break;
            case 'require': updatedField.required = true; break;
            case 'optional': updatedField.required = false; break;
            case 'disable': updatedField.disabled = true; break;
            case 'enable': updatedField.disabled = false; break;
            case 'readonly': updatedField.readOnly = true; break;
            case 'editable': updatedField.readOnly = false; break;
          }
        }
      });
    });

    return updatedField;
  });
};
