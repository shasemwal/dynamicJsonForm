import type { JSX } from "react";

export type FieldConfig = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  enable?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  placeholder?: string;
  defaultValue?: any;
  description?: string;
  tooltip?: string;
  layout?: { span?: number; inline?: boolean };
  customComponent?: React.ReactNode | ((props: any) => JSX.Element);
  options?: { label: string; value: string }[];
  dependencies?: string[];
  validations?: { rule: string; value?: any; message: string }[];
  fileConfig?: { accept: string[]; maxSizeMB: number; multiple: boolean };
  conditions?: { key: string; value: any; actions: string[] }[];
  onClick?: string;
};

export type Props = {
  config: FieldConfig[];
  onSubmit: (data: any) => void;
};
