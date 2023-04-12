// import React from "react";

// import { AiOutlinePaperClip } from "react-icons/ai";

// interface FilesType {
//   path: string;
//   name: string;
//   ext: string;
// }

// interface PostContentHeaderProps {
//   title: string;
//   date: string;
//   files: FilesType[];
//   purpose: string;
//   nickname?: string;
// }

// function PostContentHeader(props: PostContentHeaderProps) {
//   const downloadFile = async (file: FilesType, index: number) => {
//     const fileNameInDB = file.path.split(
//       `uploads/${props.purpose === "QandA" ? "questions" : "attachments"}/`
//     )[1];

//     const responseData = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/download/${
//         props.purpose === "lecture" ? "lecture" : "qa"
//       }/${fileNameInDB}`
//     );

//     const blobData = await responseData.blob();
//     const url = window.URL.createObjectURL(blobData);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `${file.name}.${file.ext}`;
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
//       <h1>제목 : {props.title}</h1>

//       {props.nickname && <p>작성자 : {props.nickname}</p>}

//       <p>업로드 날짜 : {props.date}</p>

//       <p>첨부 파일 : </p>

//       {props.files.map((file: any, index: number) => (
//         <button
//           className="flex items-center"
//           onClick={() => downloadFile(file, index)}
//           key={index}
//         >
//           <AiOutlinePaperClip className="mr-2" />

//           {`${file.name}.${file.ext}`}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default PostContentHeader;

import React, { useContext } from "react";

import { AiOutlinePaperClip } from "react-icons/ai";
import { PostContext } from "../../context/post-context";

interface FilesType {
  path: string;
  name: string;
  ext: string;
}

function PostContentHeader() {
  const { postData, purpose } = useContext(PostContext);

  const downloadFile = async (file: FilesType, index: number) => {
    const fileNameInDB = file.path.split(
      `uploads/${purpose === "QandA" ? "questions" : "attachments"}/`
    )[1];

    const responseData = await fetch(
      `${process.env.REACT_APP_BASE_URL}/download/${
        purpose === "lecture" ? "lecture" : "qa"
      }/${fileNameInDB}`
    );

    const blobData = await responseData.blob();
    const url = window.URL.createObjectURL(blobData);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.name}.${file.ext}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
      <h1>제목 : {postData.title}</h1>

      {postData.nickname && <p>작성자 : {postData.nickname}</p>}

      <p>업로드 날짜 : {postData.date}</p>

      <p>첨부 파일 : </p>

      {postData.file?.map((file: any, index: number) => (
        <button
          className="flex items-center"
          onClick={() => downloadFile(file, index)}
          key={index}
        >
          <AiOutlinePaperClip className="mr-2" />

          {`${file.name}.${file.ext}`}
        </button>
      ))}
    </div>
  );
}

export default PostContentHeader;
