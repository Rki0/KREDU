import React, { useEffect } from "react";

import SubComment from "./SubComment";
import { useHttpClient } from "../../hoc/http-hook";
import sortDateDescending from "../../utils/sortDateDescending";

interface SubCommentsProps {
  mainCommentId: string;
  writer: string;
  setSubComments: React.Dispatch<React.SetStateAction<any[]>>;
  subComments: any[];
  createdSubComments: any[];
  createdSubCommentsDeleteHandler: (id: string) => void;
  setCreatedSubComments: React.Dispatch<any>;
}

function SubComments(props: SubCommentsProps) {
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchSubComment = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/subcomments/${props.mainCommentId}`
        );

        if (responseData.subComments) {
          const sortedData = sortDateDescending(responseData.subComments);

          props.setSubComments(sortedData);
        }
      } catch (err) {}
    };

    fetchSubComment();
  }, []);

  const deleteHandler = (commentId: string) => {
    props.setSubComments((prev: any) =>
      prev.filter((subComment: any) => subComment.id !== commentId)
    );
  };

  return (
    <div className="pl-4">
      {props.subComments &&
        props.subComments.map((subComment: any, index: number) => (
          <SubComment
            subCommentData={subComment}
            writer={props.writer}
            deleteHandler={deleteHandler}
            key={index}
            createdSubCommentsDeleteHandler={
              props.createdSubCommentsDeleteHandler
            }
            setSubComments={props.setSubComments}
            setCreatedSubComments={props.setCreatedSubComments}
            mainCommentId={props.mainCommentId}
          />
        ))}
    </div>
  );
}

export default SubComments;
