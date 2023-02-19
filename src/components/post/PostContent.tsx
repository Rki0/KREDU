import React from "react";

import PostContentHeader from "./PostContentHeader";

interface ContentPropsType {
  title: string;
  date: string;
  link?: string;
  description: string;
  files: string[];
  purpose: string;
  nickname?: string;
}

function PostContent(props: ContentPropsType) {
  return (
    props && (
      <div>
        <PostContentHeader
          title={props.title}
          date={props.date}
          files={props.files}
          purpose={props.purpose}
          nickname={props.nickname}
        />

        {/* 질문 게시판에서는 파일 미리보기를 슬라이드 형태로 보여주는게 나으려나? */}

        {props.purpose === "lecture" && props.link && (
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
        )}

        <section className="mb-10">{props.description}</section>
      </div>
    )
  );
}

export default PostContent;
