import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hoc/http-hook";

import LikeThumb from "./LikeThumb";

interface PostLikeButtonProps {
  lectureId: string;
  like: number;
}

function PostLikeButton(props: PostLikeButtonProps) {
  const auth = useContext(AuthContext);

  const [liked, setLiked] = useState(false);
  const [likeNum, setLikeNum] = useState(props.like);

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      return;
    }

    const checkAlreadyLike = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/users/checkLike`,
          "POST",
          JSON.stringify({
            lectureId: props.lectureId,
          }),
          {
            "Content-Type": "application/json",
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
    if (auth.isLoggedIn) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/like/auth`,
          "PATCH",
          JSON.stringify({
            lectureId: props.lectureId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.likeSuccess) {
          setLiked(true);
          setLikeNum((prev) => prev + 1);
        }
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/like`,
          "PATCH",
          JSON.stringify({
            lectureId: props.lectureId,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        if (responseData.likeSuccess) {
          setLiked(true);
          setLikeNum((prev) => prev + 1);
        }
      } catch (err) {}
    }
  };

  const dislikeHandler = async () => {
    if (auth.isLoggedIn) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/dislike/auth`,
          "PATCH",
          JSON.stringify({
            lectureId: props.lectureId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.disLikeSuccess) {
          setLiked(false);
          setLikeNum((prev) => prev - 1);
        }
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/dislike`,
          "PATCH",
          JSON.stringify({
            lectureId: props.lectureId,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        if (responseData.disLikeSuccess) {
          setLiked(false);
          setLikeNum((prev) => prev - 1);
        }
      } catch (err) {}
    }
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

        {liked && auth.isLoggedIn && (
          <span className="text-[#ffcdd2] font-bold">
            마이페이지에서 강의를 확인할 수 있어요!
          </span>
        )}
      </div>
    </div>
  );
}

export default PostLikeButton;
