import React, { useContext, useState } from "react";
import { BsTrash, BsTrashFill } from "react-icons/bs";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hoc/http-hook";

interface TrashButtonProps {
  postId: string;
  deleteHandler: (id: string) => void;
  purpose: string;
}

function TrashButton(props: TrashButtonProps) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const { postId, deleteHandler, purpose } = props;
  const [trashHover, setTrashHover] = useState(false);

  const trashHoverEnterHandler = () => {
    setTrashHover(true);
  };

  const trashHoverLeaveHandler = () => {
    setTrashHover(false);
  };

  const onClickHandler = async () => {
    if (!auth.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    if (purpose === "QandA") {
      const wantDelete = window.confirm("정말 게시글을 삭제하시겠습니까?");

      if (!wantDelete) {
        return;
      }

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/qa/${postId}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.deleteSuccess) {
          deleteHandler(postId);
          alert("게시글 삭제 성공!");
        }
      } catch (err) {}
    }

    if (purpose === "lecture") {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/users/dislikeLecture/${postId}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.deleteSuccess) {
          deleteHandler(postId);
        }
      } catch (err) {}
    }
  };

  return (
    <button
      type="button"
      onClick={onClickHandler}
      className="flex items-center justify-center w-1/12"
      onMouseEnter={trashHoverEnterHandler}
      onMouseLeave={trashHoverLeaveHandler}
    >
      {trashHover ? <BsTrashFill size={25} /> : <BsTrash size={25} />}
    </button>
  );
}

export default TrashButton;
