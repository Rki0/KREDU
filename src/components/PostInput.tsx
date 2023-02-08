import React, { useEffect, useState } from "react";

interface PostInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onInput: (id: string, value: string, isValid: null) => void;
  maxLength?: number;
  minLength?: number;
  required: boolean;
  isTextarea: boolean;
  initialValue?: string;
}

function PostInput(props: PostInputProps) {
  const [text, setText] = useState(
    props.initialValue ? props.initialValue : ""
  );

  const textChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const { id, onInput } = props;

  useEffect(() => {
    onInput(id, text, null);
  }, [id, text, onInput]);

  if (props.isTextarea) {
    return (
      <textarea
        placeholder="내용을 입력하세요(최대 1000자)"
        minLength={props.minLength}
        maxLength={props.maxLength}
        required={props.required}
        value={text}
        onChange={textChangeHandler}
        className="h-[20em] py-1 border-b-2 resize-none outline-none border-[#ffcdd2]"
      />
    );
  }

  return (
    <div className="py-2 border-b-2 border-[#ffcdd2]">
      <label htmlFor={props.id} className="w-1/6 mr-2">
        {props.label}
      </label>

      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        minLength={props.minLength}
        value={text}
        onChange={textChangeHandler}
        required={props.required}
        className="w-5/6 outline-none"
      />
    </div>
  );
}

export default PostInput;
