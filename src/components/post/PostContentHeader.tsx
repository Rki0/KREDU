import React, { useContext } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
      <h1>
        {t("post.title")} : {postData.title}
      </h1>

      {postData.nickname && (
        <p>
          {t("post.writer")} : {postData.nickname}
        </p>
      )}

      <p>
        {t("post.date")} : {postData.date}
      </p>

      <p>{t("post.file")} : </p>

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
