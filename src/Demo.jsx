import { Provider } from '@expressive/react';

import Form from './form/Form';
import Input from './form/Input';

class Control extends Form {
  firstname = "";
  lastname = "";
  email = "";
}

const Demo = () => {
  return (
    <Provider for={Control}>
      <h1>Example Form</h1>
      <Input name="firstname" placeholder="Firstname" />
      <Input name="lastname" placeholder="Lastname" />
      <Input name="email" placeholder="Email Address" />
      <Alert />
    </Provider>
  );
};

const Alert = () => {
  const alertValues = Form.get(form => () => {
    const values = JSON
      .stringify(form.get(), null, 2)
      .replace(/[",]/g, "")
      .slice(2, -2);

    alert(`Current values in form are:\n\n` + values);
  });

  <button onClick={alertValues}>
    Show Values
  </button>
}

export default Demo;
