import { loginProps } from "../../models/model";

function Button({ text, disabled, type }: loginProps) {
    return (
      <button
        type={type}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }

  
  Button.DefaultProps = {
    type: "button",
  }
  export default Button;
  