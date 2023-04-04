import { createContext } from "react";

export const SubCommentContext = createContext<any>({
  creator: "",
  date: "",
  email: "",
  id: "",
  image: "",
  lecture: "",
  like: 0,
  likedUser: [],
  mainComment: "",
  nickname: "",
  processedDate: 0,
  text: "",
  _id: "",
});
