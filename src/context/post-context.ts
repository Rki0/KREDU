import { createContext } from "react";

export const PostContext = createContext<boolean | null | any>({
  postData: {},
  purpose: "",
});
