import React from "react";
import { Link } from "react-router-dom";

interface StyledLinkTagProps {
  text: string;
  to: string;
  data?: any;
}

function MyPageStyledLinkTag(props: StyledLinkTagProps) {
  const userInfo = props.data || null;

  return (
    <Link
      to={props.to}
      className="text-lg hover:bg-[#ffa4a2] hover:text-white py-2 px-2 border-t-2 border-[#ffa4a2] last:border-y-2"
      state={{ userInfo }}
    >
      <div className="flex justify-between">
        <span>{props.text}</span>

        <div>&gt;</div>
      </div>
    </Link>
  );
}

export default MyPageStyledLinkTag;
