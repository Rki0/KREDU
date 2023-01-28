import React from "react";

interface UnValidTextProps {
  unValidText: string;
}

function UnValidText(props: UnValidTextProps) {
  return (
    <p className="text-red-500 font-bold w-[250px] text-center sm:w-[400px] md:w-[500px] lg:w-[500px]">
      {props.unValidText}
    </p>
  );
}

export default UnValidText;
