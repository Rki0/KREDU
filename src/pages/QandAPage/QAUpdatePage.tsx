import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button";
import PostInput from "../../components/PostInput";
import Layout from "../../layout/Layout";
import { useForm } from "../../hoc/useForm";
import FileUpload from "../../components/FileUpload";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";

function QAUpdatePage() {
  const auth = useContext(AuthContext);
  const [loadedData, setLoadedData] = useState<any>();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
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

  const navigate = useNavigate();

  const cancelHandler = () => {
    const cancel = window.confirm(
      "취소할 경우 변경 사항이 초기화됩니다. 그래도 괜찮으신가요?"
    );

    if (cancel) {
      navigate(-1);
    }
  };

  const { isLoading, sendRequest } = useHttpClient();

  const params = useParams();
  const qaId = params.qaId;

  useEffect(() => {
    const loadQAData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/qa/${qaId}`
        );

        setLoadedData(responseData.qa);

        if (!!responseData.qa) {
          setFormData({
            title: {
              value: responseData.qa.title,
              isValid: true,
            },
            description: {
              value: responseData.qa.description,
              isValid: true,
            },
            file: {
              value: responseData.qa.file,
            },
          });
        }
      } catch (err) {}
    };

    loadQAData();
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);

    for (const file of formState.inputs.file.value) {
      formData.append("files", file);
    }

    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/qa/update/${qaId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (response.updateSuccess) {
        alert("게시글 수정 성공!");
        navigate(`/qa/${qaId}`);
      }
    } catch (err) {}
  };

  return (
    <Layout>
      {!isLoading && loadedData && (
        <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="py-1 border-b-2 border-[#ffcdd2]">
              작성자 : {auth.nickname}
            </div>

            <PostInput
              id="title"
              label="제목 :"
              type="text"
              placeholder="제목을 입력하세요(최소 1자, 최대 30자)"
              required
              value={formState.inputs.title.value}
              onInput={inputHandler}
              minLength={1}
              maxLength={30}
              isTextarea={false}
              initialValue={formState.inputs.title.value}
            />

            <FileUpload
              id="file"
              onInput={inputHandler}
              initialValue={formState.inputs.file.value}
              purpose="QandA"
            />

            <PostInput
              id="description"
              placeholder="내용을 입력하세요(최소 1자, 최대 1000자)"
              required
              value={formState.inputs.description.value}
              onInput={inputHandler}
              minLength={1}
              maxLength={1000}
              isTextarea={true}
              initialValue={formState.inputs.description.value}
            />

            <div>
              <Button
                submitMode={false}
                clickHandler={cancelHandler}
                isValid={false}
              >
                취소
              </Button>

              <Button submitMode={true} isValid={true}>
                등록
              </Button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
}

export default QAUpdatePage;
