import React from 'react';
import type { FieldConfig } from '../types/FieldConfig';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  field: FieldConfig;
  methods: UseFormReturn<any> & {
    buttonHandlers?: Record<string, (methods: any) => void>;
  };
};

const FormField: React.FC<Props> = ({ field, methods }) => {
  const {
    register,
    control,
    setError,
    clearErrors,
    setValue,
    getValues,
    formState: { errors }
  } = methods;

  if (field.hidden) return null;

  const fieldClass = `form-field ${field.layout?.inline ? 'inline' : ''}`;

  const commonProps = {
    ...register(field.name),
    placeholder: field.placeholder,
    disabled: field.disabled === true || field.enable === false,
    readOnly: field.readOnly,
    defaultValue: field.defaultValue
  };

  if (field.type === 'button') {
    return (
      <div key={field.name} className={fieldClass}>
        <button
          type="button"
          onClick={() => {
            const handler = field.onClick && methods.buttonHandlers?.[field.onClick];
            if (handler) {
              handler({ getValues, setValue, setError, clearErrors });
            }
          }}
        >
          {field.label}
        </button>
      </div>
    );
  }

  if (field.customComponent) {
    const CustomComponent = field.customComponent;
    return (
      <div key={field.name} className={fieldClass}>
        <label>
          {field.label}
          {field.required && <span className="required-asterisk">*</span>}
          {field.tooltip && <span className="tooltip"> ({field.tooltip})</span>}
        </label>
        {typeof CustomComponent === 'function' ? (
          <CustomComponent
            name={field.name}
            control={control}
            register={register}
            disabled={field.disabled}
            readOnly={field.readOnly}
            defaultValue={field.defaultValue}
          />
        ) : (
          CustomComponent
        )}
        {field.description && <div className="description">{field.description}</div>}
        {errors[field.name] && <div className="error">{errors[field.name]?.message as string}</div>}
      </div>
    );
  }

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number':
      case 'date':
        return <input type={field.type} {...commonProps} />;
      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map(opt => (
              <label key={opt.value} className="radio-option">
                <input
                  type="radio"
                  value={opt.value}
                  {...register(field.name)}
                  disabled={field.disabled}
                />
                {opt.label}
              </label>
            ))}
          </div>
        );
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <label>
            <input type="checkbox" {...register(field.name)} />
            {field.label}
          </label>
        );
      case 'file':
        return <input type="file" {...register(field.name)} />;
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  return (
    <div key={field.name} className={fieldClass}>
      <label>
        {field.label}
        {field.required && <span className="required-asterisk">*</span>}
        {field.tooltip && <span className="tooltip"> ({field.tooltip})</span>}
      </label>
      {renderInput()}
      {field.description && <div className="description">{field.description}</div>}
      {errors[field.name] && <div className="error">{errors[field.name]?.message as string}</div>}
    </div>
  );
};

export default FormField;
