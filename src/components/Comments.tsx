import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillChatLeftTextFill, BsChatLeftText } from "react-icons/bs";
import { BiLike } from "react-icons/bi";

interface CommentsDataType {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

function Comments() {
  const [comments, setComments] = useState<CommentsDataType[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => setComments(res.data))
      .catch((e) => console.log(e));

    // fetch("https://jsonplaceholder.typicode.com/comments")
    //   .then((res) => console.log(res.json()))
    //   .catch((e) => console.log(e));
  }, []);

  return (
    <article className="my-4">
      <h1 className="border-b-2 border-[rgba(0,0,0,0.15)] mb-2">
        댓글수 {comments.length}
      </h1>

      {comments.map((item) => (
        <div
          className="border-b-2 border-[rgba(0,0,0,0.15)] mb-4"
          key={item.id}
        >
          <div className="flex items-center border-b-[1px] border-[rgba(0,0,0,0.1)]">
            <img alt="user" />
            <h1>{item.name}</h1>
          </div>

          <div>
            <p>{item.body}</p>
          </div>

          <div className="flex">
            <div className="flex mr-3 items-center">
              <BiLike className="mr-1" />
              <span>12</span>
            </div>

            <div className="flex items-center">
              <BsChatLeftText className="mr-1" />
              <span>3</span>
            </div>
          </div>
        </div>
      ))}
    </article>
  );
}

export default Comments;
