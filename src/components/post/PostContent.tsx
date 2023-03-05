import React from "react";

import FileImg from "./FileImg";
import PostContentHeader from "./PostContentHeader";

export interface FilesType {
  path: string;
  name: string;
  ext: string;
}

interface ContentPropsType {
  title: string;
  date: string;
  link?: string;
  description: string;
  files: FilesType[];
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

        {props.purpose === "QandA" &&
          props.files.map((file, index) => <FileImg file={file} key={index} />)}

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

        {/* <section className="w-full mb-10">
          <p className="whitespace-pre-wrap" style={{ wordWrap: "break-word" }}>
            {props.description}
          </p>
        </section> */}

        <section className="w-full mb-10">
          <p className="whitespace-pre-wrap">{props.description}</p>
        </section>
      </div>
    )
  );
}

export default PostContent;
