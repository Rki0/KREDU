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
  }, []);

  // const comments = [
  //   {
  //     id: 1,
  //     name: "hi1",
  //     body: "blablabla",
  //   },
  //   {
  //     id: 2,
  //     name: "hi",
  //     body: "blablabla2",
  //   },
  //   {
  //     id: 3,
  //     name: "hi",
  //     body: "blablab3333la",
  //   },
  //   {
  //     id: 4,
  //     name: "hi",
  //     body: "blabla44bla",
  //   },
  //   {
  //     id: 5,
  //     name: "hi",
  //     body: "blablabla",
  //   },
  //   {
  //     id: 6,
  //     name: "hi",
  //     body: "blablabffla",
  //   },
  //   {
  //     id: 7,
  //     name: "hi",
  //     body: "blabla13434bla",
  //   },
  //   {
  //     id: 8,
  //     name: "hi",
  //     body: "blabl9999abla",
  //   },
  //   {
  //     id: 9,
  //     name: "hi666",
  //     body: "blablabla",
  //   },
  //   {
  //     id: 10,
  //     name: "hi",
  //     body: "blablab55555la",
  //   },
  //   {
  //     id: 11,
  //     name: "55555hi",
  //     body: "bla4bla4bla",
  //   },
  //   {
  //     id: 12,
  //     name: "hi",
  //     body: "blablaasdfsdfdsfasfbla",
  //   },
  //   {
  //     id: 13,
  //     name: "hi",
  //     body: "blablr213424abla",
  //   },
  //   {
  //     id: 14,
  //     name: "2512412414hi",
  //     body: "blab12124labla",
  //   },
  //   {
  //     id: 15,
  //     name: "h564679i",
  //     body: "blablabla",
  //   },
  // ];

  const [isLoaded, setIsLoaded] = useState(false);

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

      <div>loading...</div>
    </article>
  );
}

export default Comments;
