import { Provider } from '@expressive/react';

import Form from './form/Form';
import Input from './form/Input';

class Control extends Form {
  firstname = "";
  lastname = "";
  email = "";
}

const Demo = () => {
  h1: {
    fontSize: 1.3;
    lineHeight: 1.1;
    textAlign: center;
  }

  <Provider for={Control}>
    <h1>Example Form</h1>
    <Input name="firstname" placeholder="Firstname" />
    <Input name="lastname" placeholder="Lastname" />
    <Input name="email" placeholder="Email Address" />
    <Alert />
  </Provider>
};

const Alert = () => {
  const alertValues = Form.get(form => () => {
    const current = form.get();
    const values = JSON
      .stringify(current, null, 2)
      .replace(/[",]/g, "")
      .slice(2, -2);

    alert(`Current values in form are:\n\n` + values);
  });

  button: {
    display: block;
    margin: auto;
    borderRadius: 8;
    border: '1px', solid, transparent;
    padding: 0.4, 0.8;
    fontSize: 0.8;
    fontWeight: 500;
    fontFamily: inherit;
    backgroundColor: 0x1a1a1a;
    cursor: pointer;
    transition: borderColor, "0.25s";
    userSelect: none;

    css: hover: {
      borderColor: 0x646cff;
    }

    css: active: {
      outline: 4, auto, '-webkit-focus-ring-color';
    }
  }

  <button onClick={alertValues}>
    Show Values
  </button>
}

export default Demo;
