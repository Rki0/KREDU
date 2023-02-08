import React, { useContext, useState } from "react";

import { BsTrash, BsTrashFill } from "react-icons/bs";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hoc/http-hook";

interface TrashButtonProps {
  lectureId: string;
  deleteHandler: (id: string) => void;
}

function TrashButton(props: TrashButtonProps) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const { lectureId, deleteHandler } = props;
  const [trashHover, setTrashHover] = useState(false);

  const trashHoverEnterHandler = () => {
    setTrashHover(true);
  };

  const trashHoverLeaveHandler = () => {
    setTrashHover(false);
  };

  const onClickHandler = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/users/dislikeLecture/${lectureId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.deleteSuccess) {
        deleteHandler(lectureId);
      }
    } catch (err) {}
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
