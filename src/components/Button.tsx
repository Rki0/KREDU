import React from "react";

interface ButtonProps {
  isValid: boolean;
  children: React.ReactNode;
  submitMode: boolean;
  clickHandler?: () => void;
}

function Button(props: ButtonProps) {
  if (!props.submitMode) {
    return (
      <button
        type="button"
        onClick={props.clickHandler}
        className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold"
      >
        {props.children}
      </button>
    );
  }

  return (
    <button
      type="submit"
      className={
        props.isValid
          ? "font-bold border-2 border-[#ffcdd2] rounded w-32 hover:bg-[#ffcdd2] hover:text-white sm:w-[150px] lg:text-lg xl:text-xl "
          : "font-bold border-2 border-[#ffcdd2] hover:border-[#ef9a9a] rounded w-32 bg-[#ffcccb] hover:bg-[#ef9a9a] hover:text-white sm:w-[150px] lg:text-lg xl:text-xl cursor-not-allowed"
      }
      disabled={!props.isValid}
    >
      {props.children}
    </button>
  );
}

export default Button;
