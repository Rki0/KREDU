import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import PostInput from "../../components/PostInput";
import Layout from "../../layout/Layout";
import { useForm } from "../../hoc/useForm";
import FileUpload from "../../components/FileUpload";
import getDate from "../../utils/getDate";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";
import Modal from "../../shared/Modal";
import { useTranslation } from "react-i18next";

function LectureWritePage() {
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
      },
      link: {
        value: "",
      },
      file: {
        value: null,
      },
      description: {
        value: "",
      },
    },
    null
  );

  const [isModalOpen, seteIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const cancelHandler = () => {
    const cancel = window.confirm(
      "취소할 경우 모든 내용이 사라집니다. 그래도 괜찮으신가요?"
    );

    if (cancel) {
      navigate(-1);
    }
  };

  const { sendRequest } = useHttpClient();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth.isLoggedIn) {
      return alert("로그인이 필요한 기능입니다.");
    }

    const formData = new FormData();

    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);

    const submitTime = getDate();
    formData.append("date", submitTime);

    for (const file of formState.inputs.file.value) {
      formData.append("files", file);
    }

    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/qa/write`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (response.uploadSuccess) {
        seteIsModalOpen(true);
      }
    } catch (err) {}
  };

  const closeModalHandler = () => {
    seteIsModalOpen(false);
    navigate("/qa");
  };

  const { t } = useTranslation();

  return (
    <Layout>
      {isModalOpen && (
        <Modal
          closeHandler={closeModalHandler}
          text="강의 등록 성공!"
          footer={
            <>
              <button
                onClick={closeModalHandler}
                className="px-2 font-semibold border-2 border-black rounded hover:cursor-pointer hover:text-white hover:bg-[#F8BBD0]"
              >
                확인
              </button>
            </>
          }
        />
      )}

      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="py-1 border-b-2 border-[#ffcdd2]">
            {t("qa.write.writer")} {auth.nickname}
          </div>

          <PostInput
            id="title"
            label={t("qa.write.title")}
            type="text"
            placeholder={t("qa.write.titlePlaceholder")}
            required
            value={formState.inputs.title.value}
            onInput={inputHandler}
            minLength={1}
            maxLength={30}
            isTextarea={false}
          />

          <FileUpload id="file" onInput={inputHandler} purpose="QandA" />

          <PostInput
            id="description"
            placeholder={t("qa.write.inputPlaceholder")}
            required
            value={formState.inputs.description.value}
            onInput={inputHandler}
            minLength={1}
            maxLength={1000}
            isTextarea={true}
          />

          <div>
            <Button
              submitMode={false}
              clickHandler={cancelHandler}
              isValid={false}
            >
              {t("qa.write.cancel")}
            </Button>

            <Button submitMode={true} isValid={true}>
              {t("qa.write.submit")}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default LectureWritePage;
