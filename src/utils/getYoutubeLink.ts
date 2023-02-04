export default function getYoutubeLink(fullLink: string) {
  let parsedLink;

  // 영상 id 부분만 파싱("=" 이후 부분)
  const videoIdStartIndex = fullLink.indexOf("=") + 1;

  // 영상 id 부분만 파싱("&" 이전 부분)
  if (fullLink.includes("&")) {
    const videoIdEndIndex = fullLink.indexOf("&");

    // "=" + 1 인덱스부터 끝까지가 영상 id
    parsedLink = fullLink.slice(videoIdStartIndex, videoIdEndIndex);
  } else {
    parsedLink = fullLink.slice(videoIdStartIndex);
  }

  return parsedLink;
}
