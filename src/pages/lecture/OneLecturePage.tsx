import Layout from "../../layout/Layout";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlinePaperClip } from "react-icons/ai";
import CommentTextarea from "../../components/CommentTextarea";
import Comments from "../../components/Comments";

function OneLecturePage() {
  const params = useParams();
  // console.log(params);

  // useLocation 사용시 이전 페이지에서 넘어오는 것을 거쳐야지 데이터 전송이 됨에 주의
  // 새로고침만 하면 의미없음
  const location = useLocation();
  const data = location.state;
  // console.log(data);

  const navigate = useNavigate();

  const goBack = () => {
    // 둘의 성능 차이?
    // 뒤로 돌아갔을 때 페이지네이션 이동 했던게 다시 리셋되는 이슈 발생
    // navigate("/lecture");
    navigate(-1);
  };

  return (
    <Layout>
      <div className="mt-4 px-2 md:px-4 lg:px-10">
        <article className="mb-4 pb-2 border-b-2 border-[rgba(0,0,0,0.2)]">
          <div
            className="flex mb-2 rounded border-2 border-[#ffcdd2] w-full hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            onClick={goBack}
          >
            <button>
              <AiOutlineLeft />
            </button>

            <p>강의 목록으로 돌아가기</p>
          </div>

          <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
            <h1>강의 제목 : {data.title}</h1>
            <p>업로드 날짜 : {data.id}</p>
            <div>
              <AiOutlinePaperClip />
              교안 다운로드
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/V-MdUgZI9u4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <section>
            영상 관련 설명 써있는 곳. Lorem ipsum dolor sit amet consectetur
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

        <CommentTextarea />

        <Comments />
      </div>
    </Layout>
  );
}

export default OneLecturePage;
