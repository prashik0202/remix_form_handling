import React from 'react';

interface TextFieldpProps {
  type : string,
  name : string,
  placeholder? :string,
  value? : string,
  onChange? : React.ChangeEventHandler<HTMLInputElement>;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
  error? : string[] | undefined | null
  maxLength? : number
  style? : string
}

const TextField = ( { type, name, placeholder, value, error, maxLength, onInput, style } : TextFieldpProps) => {
  return (
    <input
      type={type}
      name={name}
      maxLength={maxLength}
      onInput={onInput}
      placeholder={placeholder}
      className={`border focus:outline-none w-full p-2 rounded-md ${
        error ? "border-red-500" : ""
      } ${style}`}
    />
  )
}

export default TextField