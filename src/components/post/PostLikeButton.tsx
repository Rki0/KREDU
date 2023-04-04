// import React, { useContext, useState, useEffect } from "react";

// import { AuthContext } from "../../context/auth-context";
// import { useHttpClient } from "../../hoc/http-hook";
// import LikeThumb from "./LikeThumb";

// interface PostLikeButtonProps {
//   postId: string;
//   like: number;
//   purpose: string;
// }

// function PostLikeButton(props: PostLikeButtonProps) {
//   const [liked, setLiked] = useState(false);
//   const [likeNum, setLikeNum] = useState(props.like);

//   const auth = useContext(AuthContext);
//   const { sendRequest } = useHttpClient();

//   useEffect(() => {
//     if (!auth.isLoggedIn) {
//       return;
//     }

//     const checkAlreadyLike = async () => {
//       try {
//         const responseData = await sendRequest(
//           `${process.env.REACT_APP_BASE_URL}/users/checkLike/${
//             props.purpose === "lecture" ? "lecture" : "qa"
//           }/${props.postId}`,
//           "GET",
//           null,
//           {
//             Authorization: "Bearer " + auth.token,
//           }
//         );

//         if (responseData.isLiked) {
//           setLiked(responseData.isLiked);
//         }
//       } catch (err) {}
//     };

//     checkAlreadyLike();
//   }, []);

//   const likeHandler = async () => {
//     if (!auth.isLoggedIn) {
//       return alert("로그인이 필요한 기능입니다.");
//     }

//     try {
//       const responseData = await sendRequest(
//         `${process.env.REACT_APP_BASE_URL}/${
//           props.purpose === "lecture" ? "lecture" : "qa"
//         }/like/${props.postId}`,
//         "PATCH",
//         null,
//         {
//           Authorization: "Bearer " + auth.token,
//         }
//       );

//       if (responseData.likeSuccess) {
//         setLiked(true);
//         setLikeNum((prev) => prev + 1);
//       }
//     } catch (err) {}
//   };

//   const dislikeHandler = async () => {
//     if (!auth.isLoggedIn) {
//       return alert("로그인이 필요한 기능입니다.");
//     }

//     try {
//       const responseData = await sendRequest(
//         `${process.env.REACT_APP_BASE_URL}/${
//           props.purpose === "lecture" ? "lecture" : "qa"
//         }/dislike/${props.postId}`,
//         "PATCH",
//         null,
//         {
//           Authorization: "Bearer " + auth.token,
//         }
//       );

//       if (responseData.disLikeSuccess) {
//         setLiked(false);
//         setLikeNum((prev) => prev - 1);
//       }
//     } catch (err) {}
//   };

//   return (
//     <div className="flex justify-center mb-4">
//       <div className="flex flex-col items-center justify-center">
//         <button
//           className={`flex items-center px-2 py-1 mb-2 border-2 rounded hover:bg-[rgba(0,0,0,0.1)] ${
//             liked ? "border-[#ffcdd2]" : "border-black"
//           }`}
//           onClick={liked ? dislikeHandler : likeHandler}
//         >
//           {liked ? <LikeThumb isLike={true} /> : <LikeThumb isLike={false} />}

//           <span
//             className={`text-xl font-semibold ${liked && "text-[#ffcdd2]"}`}
//           >
//             {likeNum}
//           </span>
//         </button>

//         {liked && auth.isLoggedIn && props.purpose === "lecture" && (
//           <span className="text-[#ffcdd2] font-bold">
//             마이페이지에서 강의를 확인할 수 있어요!
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PostLikeButton;

import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../context/auth-context";
import { PostContext } from "../../context/post-context";
import { useHttpClient } from "../../hoc/http-hook";
import LikeThumb from "./LikeThumb";

function PostLikeButton() {
  const auth = useContext(AuthContext);
  const { postData, purpose } = useContext(PostContext);

  const [liked, setLiked] = useState(false);
  const [likeNum, setLikeNum] = useState(postData?.like);

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      return;
    }

    const checkAlreadyLike = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/users/checkLike/${
            purpose === "lecture" ? "lecture" : "qa"
          }/${postData._id}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.isLiked) {
          setLiked(responseData.isLiked);
        }
      } catch (err) {}
    };

    checkAlreadyLike();
  }, []);

  const likeHandler = async () => {
    if (!auth.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/${
          purpose === "lecture" ? "lecture" : "qa"
        }/like/${postData._id}`,
        "PATCH",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.likeSuccess) {
        setLiked(true);
        setLikeNum((prev: number) => prev + 1);
      }
    } catch (err) {}
  };

  const dislikeHandler = async () => {
    if (!auth.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/${
          purpose === "lecture" ? "lecture" : "qa"
        }/dislike/${postData._id}`,
        "PATCH",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.disLikeSuccess) {
        setLiked(false);
        setLikeNum((prev: number) => prev - 1);
      }
    } catch (err) {}
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="flex flex-col items-center justify-center">
        <button
          className={`flex items-center px-2 py-1 mb-2 border-2 rounded hover:bg-[rgba(0,0,0,0.1)] ${
            liked ? "border-[#ffcdd2]" : "border-black"
          }`}
          onClick={liked ? dislikeHandler : likeHandler}
        >
          {liked ? <LikeThumb isLike={true} /> : <LikeThumb isLike={false} />}

          <span
            className={`text-xl font-semibold ${liked && "text-[#ffcdd2]"}`}
          >
            {likeNum}
          </span>
        </button>

        {liked && auth.isLoggedIn && purpose === "lecture" && (
          <span className="text-[#ffcdd2] font-bold">
            마이페이지에서 강의를 확인할 수 있어요!
          </span>
        )}
      </div>
    </div>
  );
}

export default PostLikeButton;
