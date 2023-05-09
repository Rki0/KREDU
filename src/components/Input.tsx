import React, { useState, useReducer, useEffect } from "react";
import { BiShow, BiHide } from "react-icons/bi";

import { validate } from "../utils/validators";
import UnValidText from "./UnValidText";
import ValidText from "./ValidText";

interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onInput: (id: string, value: string, isValid: boolean) => void;
  maxLength?: number;
  minLength?: number;
  validators: any[];
  unValidText?: string;
  validText?: string;
}

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };

    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

function Input(props: InputProps) {
  const [showPswd, setShowPswd] = useState(false);

  const showPswdHandler = () => {
    setShowPswd((prev) => !prev);
  };

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      validators: props.validators,
    });
  };

  return (
    <div className="flex flex-col items-start mb-2 ">
      <label htmlFor={props.id} className="font-bold">
        {props.label}
      </label>

      <div className="relative">
        <input
          id={props.id}
          type={
            props.id === "email" || props.id === "nickname"
              ? props.type
              : showPswd
              ? "text"
              : "password"
          }
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          minLength={props.minLength}
          value={props.value}
          onChange={changeHandler}
          onBlur={touchHandler}
          required
          className="pl-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#e57373] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px]"
        />

        {props.type === "password" && (
          <div onClick={showPswdHandler} className="absolute top-3 right-3">
            {showPswd ? <BiShow /> : <BiHide />}
          </div>
        )}
      </div>

      {!inputState.isValid && inputState.isTouched && props.unValidText && (
        <UnValidText unValidText={props.unValidText} />
      )}

      {inputState.isValid && props.validText && (
        <ValidText validText={props.validText} />
      )}
    </div>
  );
}

export default Input;
