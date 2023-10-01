import Form from "./Form";

/**
 * @type {React.FC<InputHTMLAttributes<HTMLInputElement>>}
 */
const Input = (props) => {
  const ref = Form.bind(props.name);

  input: {
    color: green;
    display: block;
    margin: 12, auto;
    fontSize: 16;
    padding: 0.6, 1.0;
    borderRadius: 10;
    borderColor: 0xe1e1e133;
    backgroundColor: 0xeee1;
    color: white;
  }

  <input {...props} ref={ref} />
};

export default Input;