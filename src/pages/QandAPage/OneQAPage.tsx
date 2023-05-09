// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import Layout from "../../layout/Layout";
// import GoToPreviousPage from "../../components/GoToPreviousPage";
// import { useHttpClient } from "../../hoc/http-hook";
// import { AuthContext } from "../../context/auth-context";
// import PostLikeButton from "../../components/post/PostLikeButton";
// import PostHandleDiv from "../../components/post/PostHandleDiv";
// import PostContent from "../../components/post/PostContent";
// import CommentsDiv from "../../components/comment/CommentsDiv";

// function OneWishPage() {
//   const [qa, setQa] = useState<any>();

//   const params = useParams();
//   const qaId = params.qaId;

//   const auth = useContext(AuthContext);
//   const { isLoading, sendRequest } = useHttpClient();

//   useEffect(() => {
//     const fetchQA = async () => {
//       try {
//         const responseData = await sendRequest(
//           `${process.env.REACT_APP_BASE_URL}/qa/${qaId}`
//         );

//         if (responseData.qa) {
//           setQa(responseData.qa);
//         }
//       } catch (err) {}
//     };

//     fetchQA();
//   }, []);

//   return (
//     <Layout>
//       <div className="px-2 mt-4 md:px-4 lg:px-10">
//         <article className="mb-4 pb-2 border-b-2 border-[rgba(0,0,0,0.2)]">
//           <GoToPreviousPage text="질문 게시판으로 돌아가기" to="/qa" />

//           {isLoading && <div>데이터 로딩중...</div>}

//           {qa && (
//             <PostContent
//               title={qa.title}
//               date={qa.date}
//               description={qa.description}
//               files={qa.file}
//               purpose="QandA"
//               nickname={qa.writer.nickname}
//             />
//           )}

//           {qa && (
//             <PostLikeButton like={qa.like} postId={qa._id} purpose="QandA" />
//           )}

//           {qa && auth.isLoggedIn && auth.userId === qa.writer._id && (
//             <PostHandleDiv postId={qa._id} purpose="QandA" />
//           )}
//         </article>

//         {/* {qa && <CommentsDiv lectureId={qa._id} writer={qa.writer} />} */}
//       </div>
//     </Layout>
//   );
// }

// export default OneWishPage;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "../../layout/Layout";
import GoToPreviousPage from "../../components/GoToPreviousPage";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";
import PostLikeButton from "../../components/post/PostLikeButton";
import PostHandleDiv from "../../components/post/PostHandleDiv";
import PostContent from "../../components/post/PostContent";
import CommentsDiv from "../../components/comment/CommentsDiv";
import { PostContext } from "../../context/post-context";

function OneWishPage() {
  const [qa, setQa] = useState<any>();

  const params = useParams();
  const qaId = params.qaId;

  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/qa/${qaId}`
        );

        if (responseData.qa) {
          setQa(responseData.qa);
        }
      } catch (err) {}
    };

    fetchQA();
  }, []);

  const { t } = useTranslation();

  return (
    <Layout>
      <PostContext.Provider
        value={{
          postData: qa,
          purpose: "QandA",
        }}
      >
        <div className="px-2 mt-4 md:px-4 lg:px-10">
          <article className="mb-4 pb-2 border-b-2 border-[rgba(0,0,0,0.2)]">
            <GoToPreviousPage text={t("qa.backToTable")} to="/qa" />

            {isLoading && <div>데이터 로딩중...</div>}

            <PostContent />

            <PostLikeButton />

            {auth.isLoggedIn && auth.userId === qa?.writer._id && (
              <PostHandleDiv />
            )}
          </article>
        </div>
      </PostContext.Provider>
    </Layout>
  );
}

export default OneWishPage;
