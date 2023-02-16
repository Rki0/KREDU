import Layout from "../../layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlinePaperClip } from "react-icons/ai";
import CommentTextarea from "../../components/CommentTextarea";
import Comments from "../../components/Comments";

function OneWishPage() {
  const navigate = useNavigate();

  const goBack = () => {
    // 둘의 성능 차이?
    // 뒤로 돌아갔을 때 페이지네이션 이동 했던게 다시 리셋되는 이슈 발생
    // navigate("/lecture");
    navigate(-1);
  };

  const location = useLocation();
  const data = location.state;

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-4 lg:px-10">
        <article className="mb-4 pb-2 border-b-2 border-[rgba(0,0,0,0.2)]">
          <div
            className="flex mb-2 rounded border-2 border-[#ffcdd2] w-full hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            onClick={goBack}
          >
            <button>
              <AiOutlineLeft />
            </button>

            <p>컨텐츠 건의 목록으로 돌아가기</p>
          </div>

          <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
            <h1>제목 : {data.title}</h1>
            <p>업로드 날짜 : {data.id}</p>
            <div>
              <AiOutlinePaperClip />
              첨부 자료 파일 이름
            </div>
          </div>

          <section>
            유저의 건의 사항이 써있는 곳. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Harum minima modi beatae culpa tempore laboriosam
            enim repellendus architecto, accusamus odit id, neque velit
            eligendi, laudantium pariatur maiores assumenda asperiores. Neque?
            Unde cumque possimus quas sequi reiciendis magnam tempora?
            Cupiditate, perspiciatis ipsam optio nemo exercitationem inventore
            quo ut blanditiis tempore et nihil! Veritatis ea quidem adipisci
            dolorum aperiam aliquam odio? Nesciunt! Porro alias nesciunt ab
            atque ex molestiae nemo voluptatibus est culpa earum error accusamus
            dolores libero dolorum accusantium facere vero aperiam veritatis,
            aut ut eius officiis nisi blanditiis itaque! Tempora!
            Necessitatibus, doloribus atque magnam totam dolor nobis deserunt,
            quae quibusdam dolore cum fuga eveniet! Nemo, eveniet et. Quos
            perferendis expedita quasi iusto quas, libero unde cum explicabo
            ducimus voluptates inventore?
          </section>
        </article>

        {/* <CommentTextarea />

        <Comments /> */}
      </div>
    </Layout>
  );
}

export default OneWishPage;
