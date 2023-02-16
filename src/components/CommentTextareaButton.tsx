import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";

interface ButtonProps {
  buttonType: "submit" | "button" | "reset";
  children: React.ReactNode;
  clickHandler?: () => void;
}

function CommentTextareaButton(props: ButtonProps) {
  const auth = useContext(AuthContext);

  return (
    <button
      type={props.buttonType}
      disabled={!auth.isLoggedIn}
      onClick={props.clickHandler}
      className="px-2 border-2 rounded border-[rgba(0,0,0,0.5)] hover:border-transparent hover:bg-[#64b5f6] hover:text-white disabled:cursor-not-allowed"
    >
      {props.children}
    </button>
  );
}

export default CommentTextareaButton;
