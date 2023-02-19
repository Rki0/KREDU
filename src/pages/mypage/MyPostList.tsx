import React from "react";
import { Link } from "react-router-dom";

import TrashButton from "../../components/TrashButton";

interface PostListProps {
  data: any;
  deleteHandler: (id: string) => void;
  purpose: string;
}

function MyPostList(props: PostListProps) {
  const { data, deleteHandler, purpose } = props;

  return data.map((post: any, index: number) => (
    <div
      className="flex items-center justify-between border-b-2 border-[rgba(255,164,161,0.3)] hover:bg-[rgba(0,0,0,0.05)] px-2"
      key={post.id}
    >
      <Link
        to={`/${purpose === "lecture" ? "lecture" : "qa"}/${post.id}`}
        className="flex items-center w-11/12 py-2"
      >
        {purpose === "lecture" && (
          <div className="w-1/3 max-w-[120px] mr-2">
            <img
              alt="thumbnail"
              src={`https://img.youtube.com/vi/${post.link}/mqdefault.jpg`}
            />
          </div>
        )}

        <div className="w-2/3">
          <h2 className="text-xl font-bold truncate">{post.title}</h2>

          <p>{post.date}</p>

          <p className="truncate">{post.description}</p>
        </div>
      </Link>

      <TrashButton
        postId={post.id}
        deleteHandler={deleteHandler}
        purpose={purpose}
      />
    </div>
  ));
}

export default MyPostList;
