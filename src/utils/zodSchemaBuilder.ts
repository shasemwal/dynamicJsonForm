import { z } from 'zod';

type FieldConfig = {
  name: string;
  type: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    email?: boolean;
    regex?: string;
    errorMessage?: string;
  };
};

export function buildZodSchema(config: FieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  config.forEach(field => {
    const error = field.validation?.errorMessage || 'Invalid input';
    let schema: z.ZodTypeAny;

    if (field.type === 'number') {
      schema = z.preprocess(
        val => (val === '' || val === null || val === undefined ? undefined : Number(val)),
        z.number({ invalid_type_error: error })
      );

      if (field.validation?.min !== undefined) {
        schema = schema.refine(val => val >= field.validation!.min!, {
          message: error,
        });
      }

      if (field.validation?.max !== undefined) {
        schema = schema.refine(val => val <= field.validation!.max!, {
          message: error,
        });
      }
    } else {
      schema = z.string({ required_error: error });

      if (field.validation?.minLength) {
        schema = schema.min(field.validation.minLength, { message: error });
      }

      if (field.validation?.maxLength) {
        schema = schema.max(field.validation.maxLength, { message: error });
      }

      if (field.validation?.regex) {
        schema = schema.regex(new RegExp(field.validation.regex), { message: error });
      }

      if (field.validation?.email) {
        schema = schema.email({ message: error });
      }
    }

    if (!field.required) {
      schema = schema.optional();
    }

    shape[field.name] = schema;
  });

  return z.object(shape);
}
