import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { PostContext } from "../../context/post-context";
import { useHttpClient } from "../../hoc/http-hook";
import Modal from "../../shared/Modal";

interface PostHandleButtonProps {
  text: string;
}

function PostHandleButton(props: PostHandleButtonProps) {
  const auth = useContext(AuthContext);
  const { postData, purpose } = useContext(PostContext);

  const { sendRequest } = useHttpClient();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateHandler = async () => {
    navigate(
      `/${purpose === "lecture" ? "lecture" : "qa"}/update/${postData._id}`
    );
  };

  const askDelete = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "visible";
    setIsModalOpen(false);
  };

  const deleteHandler = async () => {
    setIsModalOpen(false);

    if (purpose === "lecture") {
      if (!auth.manager) {
        return alert("매니저만 사용 가능한 기능입니다.");
      }

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/delete/${postData._id}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.deleteSuccess) {
          navigate("/lecture");
        }
      } catch (err) {}
    }

    if (purpose === "QandA") {
      if (!auth.isLoggedIn) {
        return alert("로그인이 필요한 기능입니다.");
      }

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/qa/${postData._id}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.deleteSuccess) {
          navigate("/qa");
        }
      } catch (err) {}
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          text={`정말 ${
            purpose === "lecture" ? "강의를" : "게시글을"
          } 삭제하시겠습니까?`}
          closeHandler={closeModal}
          footer={
            <>
              <button
                onClick={closeModal}
                className="px-2 font-semibold border-2 border-black rounded hover:cursor-pointer hover:text-white hover:bg-[#F8BBD0] mr-2"
              >
                취소
              </button>
              <button
                onClick={deleteHandler}
                className="px-2 font-semibold border-2 border-black rounded hover:cursor-pointer hover:text-white hover:bg-[#F8BBD0]"
              >
                확인
              </button>
            </>
          }
        />
      )}

      <button
        type="button"
        className="px-2 mx-1 text-xl border-2 border-black rounded hover:text-white hover:bg-black"
        onClick={props.text === "수정" ? updateHandler : askDelete}
      >
        {props.text}
      </button>
    </>
  );
}

export default PostHandleButton;
