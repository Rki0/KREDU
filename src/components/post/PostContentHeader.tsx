import React from "react";

import { AiOutlinePaperClip } from "react-icons/ai";

interface PostContentHeaderProps {
  title: string;
  date: string;
  files: any;
  purpose: string;
  nickname?: string;
}

function PostContentHeader(props: PostContentHeaderProps) {
  const downloadFile = async (fileName: string, index: number) => {
    const responseData = await fetch(
      `${process.env.REACT_APP_BASE_URL}/download/${
        props.purpose === "lecture" ? "lecture" : "qa"
      }/${fileName}`
    );

    const blobData = await responseData.blob();
    const url = window.URL.createObjectURL(blobData);
    const link = document.createElement("a");
    link.href = url;
    link.download = `첨부 자료 ${index + 1}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
      <h1>제목 : {props.title}</h1>

      {props.nickname && <p>작성자 : {props.nickname}</p>}

      <p>업로드 날짜 : {props.date}</p>

      <p>첨부 파일 : </p>

      {props.files.map((file: any, index: number) => (
        <button
          className="flex items-center"
          onClick={() =>
            downloadFile(
              file.split(
                `uploads/${
                  props.purpose === "QandA" ? "questions" : "attachments"
                }/`
              )[1],
              index
            )
          }
          key={index}
        >
          <AiOutlinePaperClip className="mr-2" />
          {
            file.split(
              `uploads/${
                props.purpose === "QandA" ? "questions" : "attachments"
              }/`
            )[1]
          }
        </button>
      ))}
    </div>
  );
}

export default PostContentHeader;
