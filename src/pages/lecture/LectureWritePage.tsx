import Layout from "../../layout/Layout";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reducerhooks";
import { writeLecture } from "../../_reducers/lectureSlice";
import axios from "axios";

function LectureWritePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<string | Blob>("");

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const date = useMemo(() => {
    return new Date().toLocaleDateString();
  }, []);

  const linkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 유튜브 링크를 가져옴.
    let fullLink = e.target.value;

    // 영상 id 부분만 파싱("=" 이후 부분)
    const videoIdStartIndex = fullLink.indexOf("=") + 1;

    // 영상 id 부분만 파싱("&" 이전 부분)
    if (fullLink.includes("&")) {
      const videoIdEndIndex = fullLink.indexOf("&");

      // "=" + 1 인덱스부터 끝까지가 영상 id
      setLink(fullLink.slice(videoIdStartIndex, videoIdEndIndex));
    } else {
      setLink(fullLink.slice(videoIdStartIndex));
    }
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);

    // 파일 한 개만 업로드 가능할 떄
    // let file = e.target.files[0];

    // let formData = new FormData();

    // formData.append("files", file);

    // console.log(file);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cancelHandler = () => {
    navigate(-1);
  };

  const userData = useAppSelector((state) => state.user.userData);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);

    axios({
      method: "POST",
      url: "/api/lecture/write",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        alert("강의 등록 성공!");

        navigate("/lecture");
      })
      .catch((err) => {
        console.log(err);
      });

    // let body = {
    //   title: title,
    //   date: date,
    //   link: link,
    //   description: text,
    //   writer: userData.email,
    // };

    // console.log(file.name);

    // // 나는 submit할 때 모든 데이터를 한번에 전달하고 싶으니까 여기에서 FormData 쓰는게 좋을듯
    // let formData = new FormData();

    // formData.append("test", "test입니다");
    // formData.append("file", file);
    // formData.append("data", JSON.stringify(body));

    // file이라는 state에 자료가 잘 들어간 것 처럼 보이나
    // 실제로 api 통신을 해보면
    // 서버에는 file이 {} 로 찍힌다.
    // 즉, 별도로 file을 다른 형태로 만들어줘야한다는 뜻
    // const obj: any = {};
    // formData.forEach((value, key) => (obj[key] = value));
    // console.log("obj", obj);

    // 음...formData로 보내려면
    // 나머지 input 값들도 전부 append를 활용해서 formData에 넣고
    // formData만 서버에 보내야할 것 같다.
    // formData를 보내면 나머지 애들이 사라져버린다.

    // let body = {
    //   title: title,
    //   date: date,
    //   link: link,
    //   // file: file,
    //   file: formData,
    //   description: text,
    //   writer: userData.email,
    // };

    // dispatch(writeLecture(body))
    //   .then((res) => {
    //     alert("강의 등록 성공!");

    //     navigate("/lecture");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // dispatch(writeLecture(formData))
    //   .then((res) => {
    //     alert("강의 등록 성공!");

    //     navigate("/lecture");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="border-b-2">작성자 : 관리자</div>

          <div className="border-b-2">작성일 : {date}</div>

          <div className="border-b-2">
            <label className="mr-2">제목 :</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              required
              value={title}
              onChange={titleHandler}
              className="w-[250px]"
            />
          </div>

          <div className="border-b-2">
            <label className="mr-2">영상 링크 :</label>
            <input
              type="text"
              className="w-[250px]"
              placeholder="유튜브 영상 링크를 입력해주세요"
              value={link}
              onChange={linkHandler}
              required
            />
          </div>

          <div className="border-b-2">
            <label className="mr-2">첨부 파일 :</label>
            {/* <input type="file" className="w-[250px]" /> */}
            <input
              type="file"
              className="w-[250px]"
              onChange={fileUploadHandler}
            />
            {/* <input
              type="file"
              className="w-[250px]"
              multiple
              onChange={fileUploadHandler}
            /> */}
          </div>

          <textarea
            placeholder="내용을 입력하세요(5 ~ 500자)"
            minLength={5}
            maxLength={500}
            value={text}
            onChange={textHandler}
            className="border-b-2"
            required
          />

          <div>
            <button
              type="button"
              onClick={cancelHandler}
              className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default LectureWritePage;
