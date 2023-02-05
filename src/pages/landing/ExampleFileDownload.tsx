import React from "react";

function ExampleFileDownload() {
  return (
    <a
      href="/ch1.pdf"
      download="Ch.0 교안"
      className="flex justify-center my-4 font-bold lg:text-2xl"
    >
      👉🏻 Ch.0 교안 다운로드
    </a>
  );
}

export default ExampleFileDownload;
