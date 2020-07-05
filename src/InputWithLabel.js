import React from "react";
import { Input, InputLabel } from "@material-ui/core";

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <InputLabel htmlFor={id}>Search for:</InputLabel>
      <Input
        variant="outlined"
        fullWidth
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

export default InputWithLabel;
