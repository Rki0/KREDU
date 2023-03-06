import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button";
import PostInput from "../../components/PostInput";
import Layout from "../../layout/Layout";
import { useForm } from "../../hoc/useForm";
import FileUpload from "../../components/FileUpload";
import getYoutubeLink from "../../utils/getYoutubeLink";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";

function LectureUpdatePage() {
  const auth = useContext(AuthContext);
  const [loadedData, setLoadedData] = useState<any>();

  const [formState, inputHandler, setFormData] = useForm(
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
  const lectureId = params.lectureId;

  useEffect(() => {
    // 결국, 수정할 때는 파일명을 내가 올린 것 그대로 보는게 좋기 때문에..
    // 파일을 저장할 때는 이름을 그대로 사용하는게 좋을지도 모르겠다.
    const loadLectureData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/${lectureId}`
        );

        setLoadedData(responseData.lecture);

        if (!!responseData.lecture) {
          setFormData({
            title: {
              value: responseData.lecture.title,
              isValid: true,
            },
            description: {
              value: responseData.lecture.description,
              isValid: true,
            },
            link: {
              value: responseData.lecture.link,
              isValid: true,
            },
            file: {
              value: responseData.lecture.file,
            },
          });
        }
      } catch (err) {}
    };

    loadLectureData();
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);

    const parsedLink = getYoutubeLink(formState.inputs.link.value);
    formData.append("link", parsedLink);

    for (const file of formState.inputs.file.value) {
      if (!!file.type) {
        formData.append("files", file);
      } else {
        formData.append("initialFiles", file.path);
      }
    }

    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/lecture/update/${lectureId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (response.updateSuccess) {
        alert("강의 수정 성공!");
        navigate(`/lecture/${lectureId}`);
      }
    } catch (err) {}
  };

  return (
    <Layout>
      {!isLoading && loadedData && (
        <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
          <form className="flex flex-col" onSubmit={submitHandler}>
            <div className="py-1 border-b-2 border-[#ffcdd2]">
              작성자 : 관리자
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

            <PostInput
              id="link"
              label="영상 링크 :"
              type="text"
              placeholder="유튜브 영상 링크를 입력해주세요"
              required
              value={formState.inputs.link.value}
              onInput={inputHandler}
              isTextarea={false}
              initialValue={formState.inputs.link.value}
            />

            <FileUpload
              id="file"
              onInput={inputHandler}
              initialValue={formState.inputs.file.value}
              purpose="lecture"
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

export default LectureUpdatePage;
