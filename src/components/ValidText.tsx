import React from "react";

interface ValidTextProps {
  validText: string;
}

function ValidText(props: ValidTextProps) {
  return (
    <p className="text-green-500 font-bold w-[250px] text-center sm:w-[400px] md:w-[500px] lg:w-[500px]">
      {props.validText}
    </p>
  );
}

export default ValidText;
