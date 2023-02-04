import React from "react";

function MainDescription() {
  return (
    <p className="mb-4 text-center text-md md:text-xl lg:text-2xl xl:text-3xl lg:mb-6">
      시중에 있는 한국어 교육 책에는
      <br />
      <span className="text-[#e57373] font-bold">
        책에서만 쓰는 말들이 많다.
      </span>
      <br />
      하지만, 사람들은{" "}
      <span className="text-[#e57373] font-bold">드라마나 노래,</span>
      <br />
      <span className="text-[#e57373] font-bold">
        친구와의 대화 등을 통해
      </span>{" "}
      한국말을 접하게 되고
      <br />
      이로 인하여 책에서 배운 한국말을
      <br />
      <span className="text-[#e57373] font-bold">
        제대로 사용하지 못하게된다.
      </span>
      <br />
      그래서 생각했다.
      <br />
      책이 아닌{" "}
      <span className="text-[#64b5f6] font-bold">대화로 가르쳐보자고.</span>
    </p>
  );
}

export default MainDescription;
