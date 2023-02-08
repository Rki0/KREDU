import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hoc/http-hook";

interface PostHandleButtonProps {
  lectureId: string;
  text: string;
}

function PostHandleButton(props: PostHandleButtonProps) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const navigate = useNavigate();

  const updateHandler = async () => {
    navigate(`/lecture/update/${props.lectureId}`);
  };

  const deleteHandler = async () => {
    if (!auth.manager) {
      alert("매니저만 사용 가능한 기능입니다.");
      return;
    }

    const wantDelete = window.confirm("정말 강의를 삭제하시겠습니까?");

    if (!wantDelete) {
      return;
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/lecture/delete/${props.lectureId}`,
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
