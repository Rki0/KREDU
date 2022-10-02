import Layout from "../../layout/Layout";
import { useState, useMemo } from "react";

function WishWritePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handler run");
    setTitle(e.target.value);
  };

  const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // 날짜 데이터 받아오기
  const date = useMemo(() => {
    return new Date().toLocaleDateString();
  }, []);

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <form className="flex flex-col">
          <div className="border-b-2">작성자 : 작성자가 보입니다.</div>

          <div className="border-b-2">작성일 : {date}</div>

          <div className="border-b-2">
            <label className="mr-2">제목 :</label>
            <input
              type="text"
              placeholder="제목을 입력하세요(5 ~ 20자)"
              minLength={5}
              maxLength={20}
              value={title}
              onChange={titleHandler}
              className="w-[250px]"
            />
          </div>

          <div className="border-b-2">
            <label className="mr-2">첨부 파일 :</label>
            <input type="file" className="w-[250px]" />
          </div>

          <textarea
            placeholder="내용을 입력하세요(5 ~ 500자)"
            minLength={5}
            maxLength={500}
            value={text}
            onChange={textHandler}
            className="border-b-2"
          />

          <div>
            <button className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer">
              취소
            </button>
            <button className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer">
              등록
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default WishWritePage;
