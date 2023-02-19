import React, { useContext } from "react";
import { BsFillPinFill } from "react-icons/bs";

import CommentUpdateInput from "./CommentUpdateInput";
import CommentStateButton from "./CommentStateButton";
import { AuthContext } from "../../context/auth-context";

interface CommentContentProps {
  writer: string;
  creator: string;
  nickname: string;
  date: string;
  text: string;
  commentId: string;
  wantUpdate: boolean;
  setWantUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isSubComment: boolean;
  comment?: any;
  commentState: boolean;
  setCommentState: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentHover: React.Dispatch<React.SetStateAction<boolean>>;
  isCommentHover: boolean;
  deleteHandler: (id: string) => void;
  commentUpdateHandler: () => void;
  setWantShowSubComment?: React.Dispatch<React.SetStateAction<boolean>>;
  isFixed?: boolean;
  setFixedComment?: React.Dispatch<any>;
  fixedCommentDeleteHandler?: (id: string) => void;
  setIsDeleteFix?: React.Dispatch<React.SetStateAction<boolean>>;
  setRawCommentsData?: React.Dispatch<any>;
}

function CommentContent(props: CommentContentProps) {
  const auth = useContext(AuthContext);

  return (
    <div className="flex flex-col w-full">
      {props.isFixed && (
        <div className="flex items-center mb-1">
          <BsFillPinFill />

          <h1>글쓴이가 고정함</h1>
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex">
          <h1
            className={
              props.writer === props.creator
                ? "bg-slate-300 rounded px-1 mr-4"
                : "mr-4"
            }
          >
            {props.nickname}
          </h1>

          <p>{props.date}</p>
        </div>

        {props.writer === auth.userId ||
        props.comment.creator === auth.userId ? (
          <CommentStateButton
            commentState={props.commentState}
            setCommentState={props.setCommentState}
            writer={props.writer}
            setIsCommentHover={props.setIsCommentHover}
            isCommentHover={props.isCommentHover}
            deleteHandler={props.deleteHandler}
            commentId={props.comment._id}
            commentUpdateHandler={props.commentUpdateHandler}
            wantUpdate={props.wantUpdate}
            isSubComment={props.isSubComment}
            setWantShowSubComment={props.setWantShowSubComment}
            isFixed={props.isFixed}
            setFixedComment={props.setFixedComment}
            fixedCommentDeleteHandler={props.fixedCommentDeleteHandler}
            creator={props.comment.creator}
            setIsDeleteFix={props.setIsDeleteFix}
            setRawCommentsData={props.setRawCommentsData}
          />
        ) : null}
      </div>

      {props.wantUpdate ? (
        <CommentUpdateInput
          text={props.text}
          commentId={props.commentId}
          setWantUpdate={props.setWantUpdate}
          isSubComment={props.isSubComment}
          comment={props.comment}
        />
      ) : (
        <p className="w-full overflow-hidden break-all whitespace-pre-wrap">
          {props.text}
        </p>
      )}
    </div>
  );
}

export default CommentContent;
