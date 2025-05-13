# 🚀 Dynamic Form POC (React + TypeScript + Zod)

This project demonstrates a dynamic form built in React using a JSON configuration. It supports:

- Dynamic field rendering
- Conditional logic (enable/disable fields)
- Zod-based validation
- Error handling
- Controlled components
---

## 📁 Folder Structure

```
src/
├── components/
│   └── DynamicFieldRenderer.tsx       # Renders individual form fields based on config
├── config/
│   └── formConfig.json                # JSON schema defining fields, types, validations
├── utils/
│   └── zodSchemaBuilder.ts            # Builds Zod schema from JSON config
├── App.tsx                            # Main app component
├── DynamicForm.tsx                    # Renders the full form using react-hook-form
└── main.tsx                           # Entry point
```
---

## 🧩 Components Overview

### `DynamicForm.tsx`
- Uses `react-hook-form` to manage form state.
- Loads the JSON config and renders fields using `DynamicFieldRenderer`.
- Applies Zod validation schema generated from `zodSchemaBuilder`.

### `DynamicFieldRenderer.tsx`
- Renders inputs (`text`, `email`, `number`, `date`, `radio`, `dropdown`, `checkbox`) based on field type.
- Applies conditional logic (e.g., disable if another field has a certain value).
- Displays error messages below inputs.
- Uses inline styles or CSS Modules for layout.

### `formConfig.json`
- Defines each field with:
  - `name`, `label`, `type`
  - `required`, `options`, `placeholder`
  - `validation` (e.g., minLength, regex, errorMessage)
  - `conditional` logic

### `zodSchemaBuilder.ts`
- Converts the JSON config into a Zod schema.
- Supports string, number, email, regex, min/max length, and custom error messages.

---

## 🛠️ Getting Started

### 1. Install dependencies

``` npm install ```


### 2. Run the app

``` npm run dev ```


### 3. Open in browser

Visit http://localhost:5173

---

## ➕ Adding New Fields

To add a new field:
1. Open `formConfig.json`
2. Add a new object like:

```
{ "name": "phone", "label": "Phone Number", "type": "text", "required": true, "validation": { "regex": "^[0-9]{10}$", "errorMessage": "Phone number must be 10 digits" } }
```


---

## 🧠 Extending the Form

- Add new field types (e.g., file upload) in `DynamicFieldRenderer.tsx`
- Add new validation rules in `zodSchemaBuilder.ts`
- Add sections or layout wrappers in `DynamicForm.tsx`

---

## 📦 Built With

- React
- TypeScript
- Zod
- React Hook Form
- Vite

