// import Comment from "./Comment";
// import CreatedComments from "./CreatedComments";
// import FixedComment from "./FixedComment";

// export interface CommentsDataType {
//   creator: string;
//   date: string;
//   // email: string;
//   id: string;
//   image: string;
//   lecture: string;
//   like: number;
//   nickname: string;
//   text: string;
//   _v: number;
//   _id: string;
//   likedUser: string[];
//   subComments: any;
// }

// interface CommentsProps {
//   commentsData: CommentsDataType[];
//   writer: string;
//   deleteHandler: (id: string) => void;
//   createdComments: any;
//   createdDeleteHandler: (id: string) => void;
//   fixedComment: CommentsDataType[];
//   fixedCommentDeleteHandler: (id: string) => void;
//   setFixedComment: React.Dispatch<any>;
//   setIsDeleteFix: React.Dispatch<React.SetStateAction<boolean>>;
//   setRawCommentsData: React.Dispatch<any>;
// }

// function Comments(props: CommentsProps) {
//   return (
//     <article className="my-4">
//       <div className="border-b-2 border-[rgba(0,0,0,0.15)] flex justify-between">
//         <h1>댓글수 {props.commentsData.length}</h1>

//         {/* 최신순 정렬에 필요한 것 : 날짜 데이터 - 만들어둔 함수로 파싱해서 비교 */}
//         {/* 인기순 정렬에 필요한 것 : 좋아요 수 */}
//         <select>
//           <option value="최신순">최신순</option>
//           <option value="최신순">인기순</option>
//         </select>
//       </div>

//       {props.fixedComment.length !== 0 && (
//         <FixedComment
//           comment={props.fixedComment}
//           writer={props.writer}
//           deleteHandler={props.deleteHandler}
//           fixedCommentDeleteHandler={props.fixedCommentDeleteHandler}
//           setFixedComment={props.setFixedComment}
//           setIsDeleteFix={props.setIsDeleteFix}
//           setRawCommentsData={props.setRawCommentsData}
//         />
//       )}

//       {/* <CreatedComments
//         createdComments={props.createdComments}
//         writer={props.writer}
//         deleteHandler={props.createdDeleteHandler}
//       /> */}
//       <CreatedComments
//         createdComments={props.createdComments}
//         writer={props.writer}
//         deleteHandler={props.createdDeleteHandler}
//         setFixedComment={props.setFixedComment}
//       />

//       {props.commentsData.map((comment: CommentsDataType, index: number) => (
//         <Comment
//           comment={comment}
//           writer={props.writer}
//           deleteHandler={props.deleteHandler}
//           setFixedComment={props.setFixedComment}
//           key={index}
//         />
//       ))}
//     </article>
//   );
// }

// export default Comments;

import { CommentContext } from "../../context/comment-context";
import Comment from "./Comment";
import CreatedComments from "./CreatedComments";
import FixedComment from "./FixedComment";

export interface CommentsDataType {
  creator: string;
  date: string;
  email: string;
  id: string;
  image: string;
  lecture: string;
  like: number;
  nickname: string;
  text: string;
  _v: number;
  _id: string;
  likedUser: string[];
  subComments: any;
  processedDate: number;
}

interface CommentsProps {
  commentsData: CommentsDataType[];
  deleteHandler: (id: string) => void;
  createdComments: any;
  createdDeleteHandler: (id: string) => void;
}

function Comments(props: CommentsProps) {
  return (
    <article className="my-4">
      <div className="border-b-2 border-[rgba(0,0,0,0.15)] flex justify-between">
        <h1>댓글수 {props.commentsData.length}</h1>

        {/* 최신순 정렬에 필요한 것 : 날짜 데이터 - 만들어둔 함수로 파싱해서 비교 */}
        {/* 인기순 정렬에 필요한 것 : 좋아요 수 */}
        <select>
          <option value="최신순">최신순</option>
          <option value="최신순">인기순</option>
        </select>
      </div>

      <CreatedComments
        createdComments={props.createdComments}
        deleteHandler={props.createdDeleteHandler}
      />

      {/* {props.commentsData.map((comment: CommentsDataType, index: number) => (
        <Comment
          comment={comment}
          deleteHandler={props.deleteHandler}
          key={index}
        />
      ))} */}

      {props.commentsData.map((comment: CommentsDataType, index: number) => (
        <CommentContext.Provider
          value={{
            commentData: comment,
            creator: comment.creator,
            date: comment.date,
            email: comment.email,
            id: comment.id,
            image: comment.image,
            lecture: comment.lecture,
            like: comment.like,
            likedUser: comment.likedUser,
            nickname: comment.nickname,
            processedDate: comment.processedDate,
            subComments: comment.subComments,
            text: comment.text,
            _id: comment._id,
          }}
          key={index}
        >
          <Comment comment={comment} deleteHandler={props.deleteHandler} />
        </CommentContext.Provider>
      ))}
    </article>
  );
}

export default Comments;
