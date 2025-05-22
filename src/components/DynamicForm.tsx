import React, { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildZodSchema } from '../utils/buildZodSchema';
import { conditionWatcher } from '../utils/ConditionWatcher';
import { buttonHandlers } from '../utils/buttonHandler';
import type { FieldConfig, Props } from '../types/FieldConfig';
import FormField from './FormField';
import './styles/FormStyles.css';

const DynamicForm: React.FC<Props> = ({ config, onSubmit }) => {
  const [formConfig, setFormConfig] = useState(config);

  const defaultValues = useMemo(() => {
    const values: Record<string, any> = {};
    config.forEach(field => {
      values[field.name] = field.defaultValue ?? '';
    });
    return values;
  }, [config]);

  const schema = useMemo(() => buildZodSchema(formConfig), [formConfig]);

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = methods;

  const allValues = useWatch({ control });

  useEffect(() => {
    const updatedConfig = conditionWatcher(config, allValues);
    setFormConfig(updatedConfig);
  }, [allValues, config]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formConfig.map(field => (
        <FormField
          key={field.name}
          field={field}
          methods={{ ...methods, buttonHandlers }}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
