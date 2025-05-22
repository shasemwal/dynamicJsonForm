# 🚀 Dynamic Form POC (React + TypeScript + Zod)

This project demonstrates a dynamic, schema-driven form built in React using a JSON configuration. It supports:

- Dynamic field rendering
- Conditional logic (enable/disable/hide/show/require fields)
- Zod-based validation
- Custom button handlers (e.g., OTP)
- Controlled components using `react-hook-form`

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── DynamicForm.tsx                # Main form component using react-hook-form
│   └── FormField.tsx                  # Renders individual form fields based on config
├── config/
│   └── formConfig.json                # JSON schema defining fields, types, validations
├── types/
│   └── FieldConfig.ts                 # Type definitions for form config
├── utils/
│   ├── zodSchemaBuilder.ts            # Builds Zod schema from JSON config
│   ├── conditionWatcher.ts            # Applies conditional logic to fields
│   └── buttonHandlers.ts              # Custom button logic (e.g., send OTP)
├── styles/
│   └── FormStyles.css                 # Basic styling for form layout and errors
├── App.tsx                            # Main app component
└── main.tsx                           # Entry point
```

---

## 🧩 Components Overview

### `DynamicForm.tsx`

- Uses `react-hook-form` to manage form state.
- Loads the JSON config and renders fields using `FormField`.
- Applies Zod validation schema generated from `zodSchemaBuilder`.
- Applies conditional logic using `conditionWatcher`.
- Injects `buttonHandlers` for custom button actions like OTP.

### `FormField.tsx`

- Renders inputs (`text`, `email`, `number`, `date`, `radio`, `select`, `checkbox`, `file`, `button`) based on field type.
- Supports custom components.
- Displays error messages and descriptions.
- Handles OTP button logic using `buttonHandlers` without direct DOM manipulation.

### `formConfig.json`

- Defines each field with:
  - `name`, `label`, `type`
  - `required`, `options`, `placeholder`
  - `validations` (e.g., minLength, regex, errorMessage)
  - `conditions` for dynamic behavior (e.g., hide, disable, require)

Example:
```json
{
  "name": "projectCode",
  "label": "Project Code",
  "type": "text",
  "required": true,
  "enable": true,
  "readOnly": false,
  "hidden": false,
  "placeholder": "Enter your project code",
  "defaultValue": "",
  "description": "Unique code assigned to each project",
  "tooltip": "Format: PRJ-XXXX",
  "layout": { "span": 6, "inline": false },
  "customComponent": null,
  "options": [],
  "dependencies": ["department", "projectType"],
  "validations": [
    {
      "rule": "pattern",
      "value": "^PRJ-[0-9]{4}$",
      "message": "Code must follow the format PRJ-XXXX"
    },
    {
      "rule": "minLength",
      "value": 8,
      "message": "Too short for a valid project code"
    }
  ],
  "fileConfig": { "accept": [], "maxSizeMB": 0, "multiple": false },
  "conditions": [
    {
      "key": "projectType",
      "value": "internal",
      "actions": ["readonly", "optional"]
    }
  ]
}
```

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

```bash
npm run dev
```

### 3. Open in browser

Visit http://localhost:5173

---

## ➕ Adding New Fields

To add a new field:

1. Open `formConfig.json`
2. Add a new object like:

```json
{
  "name": "phone",
  "label": "Phone Number",
  "type": "text",
  "required": true,
  "validations": [
    {
      "rule": "pattern",
      "value": "^[0-9]{10}$",
      "message": "Phone number must be 10 digits"
    }
  ]
}
```

---

## 🧠 Extending the Form

- Add new field types in `FormField.tsx`
- Add new validation rules in `zodSchemaBuilder.ts`
- Add new conditional actions in `conditionWatcher.ts`
- Add new button behaviors in `buttonHandlers.ts`
- Add layout wrappers or sections in `DynamicForm.tsx`

---

## 📦 Built With

- React
- TypeScript
- Zod
- React Hook Form
- Vite