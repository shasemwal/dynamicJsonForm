import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildZodSchema } from "../utils/zodSchemaBuilder";
import formConfig from "../config/formConfig.json";
import { useEffect } from "react";

import DynamicFieldRenderer from "./DynamicFormRenderer";

const DynamicForm = () => {
  const schema = buildZodSchema(formConfig);
  const methods = useForm({ resolver: zodResolver(schema) });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const conditionalFields = formConfig
    .filter((field) => field.conditional)
    .map((field) => field.conditional!.field);

  useEffect(
    () => {
      conditionalFields.forEach((dep) => {
        const value = watch(dep);
        formConfig.forEach((field) => {
          if (field.conditional?.field === dep) {
            const shouldEnable = value === field.conditional.value;
            setValue(field.name, shouldEnable ? "" : undefined);
          }
        });
      });
    },
    conditionalFields.map((dep) => watch(dep))
  );

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {formConfig.map((field) => (
          <DynamicFieldRenderer
            key={field.name}
            field={field}
            control={control}
            errors={errors}
            watch={watch}
          />
        ))}

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default DynamicForm;
