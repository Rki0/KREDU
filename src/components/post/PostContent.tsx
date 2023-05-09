import React, { useContext } from "react";

import { PostContext } from "../../context/post-context";
import PostContentHeader from "./PostContentHeader";
import Carousel from "./Carousel";

export interface FilesType {
  path: string;
  name: string;
  ext: string;
}

function PostContent() {
  const { postData, purpose } = useContext(PostContext);

  return (
    postData && (
      <div>
        <PostContentHeader />

        {purpose === "QandA" && (
          // <div className="flex justify-center w-full">
          //   <Carousel />
          // </div>
          <div className="flex justify-center">
            <Carousel />
          </div>
        )}

        {purpose === "lecture" && postData.link && (
          <div className="flex justify-center mb-4">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${postData.link}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <section className="w-full mb-10">
          <p className="whitespace-pre-wrap">{postData.description}</p>
        </section>
      </div>
    )
  );
}

export default PostContent;
