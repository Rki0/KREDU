import React from "react";

import { AiOutlinePaperClip } from "react-icons/ai";

interface ContentPropsType {
  title: string;
  date: string;
  link: string;
  description: string;
  files: string[];
}

function LectureContent(props: ContentPropsType) {
  const downloadFile = async (fileName: string, index: number) => {
    const responseData = await fetch(
      `${process.env.REACT_APP_BASE_URL}/download/${fileName}`
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
    props && (
      <div>
        <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
          <h1>강의 제목 : {props.title}</h1>
          <p>업로드 날짜 : {props.date}</p>

          <p>교안 : </p>
          {props.files.map((file, index) => (
            <button
              className="flex items-center"
              onClick={() =>
                downloadFile(file.split("uploads/attachments/")[1], index)
              }
              key={index}
            >
              <AiOutlinePaperClip className="mr-2" />
              {file.split("uploads/attachments/")[1]}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-4">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${props.link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <section className="mb-10">{props.description}</section>
      </div>
    )
  );
}

export default LectureContent;
