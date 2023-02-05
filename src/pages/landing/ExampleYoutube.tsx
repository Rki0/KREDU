import React from "react";

function ExampleYoutube() {
  return (
    <div className="flex justify-center">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/V-MdUgZI9u4"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default ExampleYoutube;
