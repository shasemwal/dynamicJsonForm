import React from "react";
import { Controller } from "react-hook-form";

type FieldConfig = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  conditional?: {
    field: string;
    value: any;
    action: "enable" | "disable";
  };
};

type Props = {
  field: FieldConfig;
  control: any;
  errors: any;
  watch: any;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "1rem",
};


const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '0.8rem',
  marginTop: '0.25rem',
  marginLeft: 'auto',
  marginRight: '0',
};


const fieldWrapperStyle: React.CSSProperties = {
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "#FFFFFF",
  minWidth: "120px",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const radioGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
};

const DynamicFieldRenderer: React.FC<Props> = ({
  field,
  control,
  errors,
  watch,
}) => {
  const watchedValue = field.conditional?.field
    ? watch(field.conditional.field)
    : undefined;
  const isDisabled =
    field.conditional?.action === "enable"
      ? watchedValue !== field.conditional.value
      : field.conditional?.action === "disable"
      ? watchedValue === field.conditional.value
      : false;

  const errorMessage = errors?.[field.name]?.message;

  return (
    <div style={fieldWrapperStyle}>
      <div style={rowStyle}>
        <label style={labelStyle}>{field.label}</label>
        <Controller
          name={field.name}
          control={control}
          render={({ field: controllerField }) => {
            switch (field.type) {
              case "text":
              case "email":
              case "number":
              case "date":
                return (
                  <input
                    {...controllerField}
                    type={field.type}
                    placeholder={field.placeholder}
                    disabled={isDisabled}
                    value={controllerField.value ?? ""}
                    onChange={controllerField.onChange}
                    style={inputStyle}
                  />
                );

              case "radio":
                return (
                  <div style={radioGroupStyle}>
                    {field.options?.map((opt) => (
                      <label key={opt}>
                        <input
                          type="radio"
                          value={opt}
                          checked={controllerField.value === opt}
                          onChange={() => controllerField.onChange(opt)}
                          disabled={isDisabled}
                        />{" "}
                        {opt}
                      </label>
                    ))}
                  </div>
                );

              case "dropdown":
                return (
                  <select
                    {...controllerField}
                    disabled={isDisabled}
                    value={controllerField.value ?? ""}
                    onChange={controllerField.onChange}
                    style={inputStyle}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                );

              case "checkbox":
                return (
                  <label>
                    <input
                      type="checkbox"
                      checked={!!controllerField.value}
                      onChange={(e) =>
                        controllerField.onChange(e.target.checked)
                      }
                      disabled={isDisabled}
                      style={{ marginRight: "0.5rem" }}
                    />
                    {field.label}
                  </label>
                );

              default:
                return (
                  <input
                    {...controllerField}
                    disabled={isDisabled}
                    style={inputStyle}
                  />
                );
            }
          }}
        />
      </div>
      {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
    </div>
  );
};

export default DynamicFieldRenderer;
