// import React from "react";

// interface CommentUserProfileProps {
//   image: string;
// }

// function CommentUserProfileImg(props: CommentUserProfileProps) {
//   return (
//     <div>
//       <div className="overflow-hidden w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full mr-2">
//         <img
//           alt="profile"
//           src={
//             props.image
//               ? `${process.env.REACT_APP_ASSET_URL}/${props.image}`
//               : process.env.PUBLIC_URL + `/img/profile.jpg`
//           }
//         />
//       </div>
//     </div>
//   );
// }

// export default CommentUserProfileImg;

import React, { useContext } from "react";
import { CommentContext } from "../../context/comment-context";
import { SubCommentContext } from "../../context/subcomment-context";

interface CommentUserProfileProps {
  image: string;
}

function CommentUserProfileImg(props: CommentUserProfileProps) {
  return (
    <div>
      <div className="overflow-hidden w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full mr-2">
        <img
          alt="profile"
          src={
            props.image
              ? `${process.env.REACT_APP_ASSET_URL}/${props.image}`
              : process.env.PUBLIC_URL + `/img/profile.jpg`
          }
        />
      </div>
    </div>
  );
}

export default CommentUserProfileImg;
