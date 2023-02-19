import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";

interface PostHandleButtonProps {
  postId: string;
  text: string;
  purpose: string;
}

function PostHandleButton(props: PostHandleButtonProps) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const navigate = useNavigate();

  const updateHandler = async () => {
    navigate(
      `/${props.purpose === "lecture" ? "lecture" : "qa"}/update/${
        props.postId
      }`
    );
  };

  const deleteHandler = async () => {
    if (props.purpose === "lecture") {
      if (!auth.manager) {
        return alert("매니저만 사용 가능한 기능입니다.");
      }

      const wantDelete = window.confirm("정말 강의를 삭제하시겠습니까?");

      if (!wantDelete) {
        return;
      }

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/delete/${props.postId}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.deleteSuccess) {
          alert("강의 삭제 성공!");
          navigate("/lecture");
        }
      } catch (err) {}
    }

    if (props.purpose === "QandA") {
      if (!auth.isLoggedIn) {
        return alert("로그인이 필요한 기능입니다.");
      }

      const wantDelete = window.confirm("정말 게시물을 삭제하시겠습니까?");

      if (!wantDelete) {
        return;
      }

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/qa/${props.postId}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.deleteSuccess) {
          alert("게시글 삭제 성공!");
          navigate("/qa");
        }
      } catch (err) {}
    }
  };

  return (
    <button
      type="button"
      className="px-2 mx-1 text-xl border-2 border-black rounded hover:text-white hover:bg-black"
      onClick={props.text === "수정" ? updateHandler : deleteHandler}
    >
      {props.text}
    </button>
  );
}

export default PostHandleButton;
