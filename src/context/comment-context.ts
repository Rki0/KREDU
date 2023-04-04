import { createContext } from "react";

export const CommentContext = createContext<any>({
  commentData: {},
  creator: "",
  date: "",
  email: "",
  id: "",
  image: "",
  lecture: "",
  like: 0,
  likedUser: [],
  nickname: "",
  processedDate: 0,
  subComments: [],
  text: "",
  _id: "",
});
