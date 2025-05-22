import { z, ZodType } from 'zod';
import type { FieldConfig } from '../types/FieldConfig';

export const buildZodSchema = (config: FieldConfig[]) => {
  const shape: Record<string, ZodType<any>> = {};

  config.forEach(field => {
    if (field.type === 'button') return;

    let schema: ZodType<any>;
    const isString = ['text', 'email', 'url'].includes(field.type);
    const isNumber = field.type === 'number';

    if (isString) schema = z.string();
    else if (isNumber) {
      schema = z.union([z.string(), z.number()])
        .transform(val => (typeof val === 'string' ? Number(val) : val))
        .refine(val => !isNaN(val), { message: 'Must be a number' });
    } else if (field.type === 'checkbox') schema = z.boolean();
    else if (field.type === 'file') schema = z.any();
    else schema = z.any();

    if (field.required) {
      schema = schema.refine(val => val !== undefined && val !== '', {
        message: `${field.label} is required`,
      });
    }

    field.validations?.forEach(({ rule, value, message }) => {
      switch (rule) {
        case 'required':
          schema = schema.refine(val => val !== undefined && val !== '', { message });
          break;
        case 'minLength':
          if (schema instanceof z.ZodString) schema = schema.min(value, { message });
          break;
        case 'maxLength':
          if (schema instanceof z.ZodString) schema = schema.max(value, { message });
          break;
        case 'min':
          if (isNumber) schema = schema.refine((val: number) => val >= value, { message });
          break;
        case 'max':
          if (isNumber) schema = schema.refine((val: number) => val <= value, { message });
          break;
        case 'pattern':
          if (schema instanceof z.ZodString) schema = schema.regex(new RegExp(value), { message });
          break;
        case 'email':
          if (schema instanceof z.ZodString) schema = schema.email({ message });
          break;
        case 'url':
          if (schema instanceof z.ZodString) schema = schema.url({ message });
          break;
        case 'fileType':
          schema = schema.refine(
            (file: File | undefined) =>
              file instanceof File && value.includes(`.${file.name.split('.').pop()}`),
            { message }
          );
          break;
        case 'fileSize':
          schema = schema.refine(
            (file: File | undefined) =>
              file instanceof File && file.size / 1024 / 1024 <= value,
            { message }
          );
          break;
      }
    });

    shape[field.name] = schema;
  });

  return z.object(shape);
};
