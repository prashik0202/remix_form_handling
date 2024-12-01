import React from 'react'

interface SelectFieldProps {
  name : string,
  error? : string[] | undefined | null,
  onChangeHandle? : React.ChangeEventHandler<HTMLSelectElement>;
  value? : string;
  options : string[];
  defaultPlacholder : string
  disabled? : boolean
  style? : string
}


const SelectField = ({ name, error, onChangeHandle, options, defaultPlacholder, disabled, style } : SelectFieldProps) => {
  return (
    <select
      name={name}
      className={`border border-b focus:outline-none w-full p-2 rounded-md ${
        error ? "border-red-500" : ""
      } ${style}`}
      onChange={onChangeHandle}
      disabled={disabled}
    >
      <option value="">{defaultPlacholder}</option>
      {
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      }
    </select>   
  )
}

export default SelectField