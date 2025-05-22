import React from 'react';
import DynamicForm from './components/DynamicForm';
import formConfig from './config/formConfig.json'; // or inline

const App = () => {
  const handleSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return <DynamicForm config={formConfig} onSubmit={handleSubmit} />;
};

export default App;
