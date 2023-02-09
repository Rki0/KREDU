export default function sortDateAscending(dataArray: any) {
  dataArray.forEach((item: any) => {
    const date = item.date;

    let [yymmdd, time] = date.split(" ");

    const numOfyymmdd = yymmdd.replace(/[.]/g, "");

    const numOftime = time.replace(/[:]/g, "");

    item.processedDate = Number(numOfyymmdd + numOftime);
  });

  return dataArray.sort((a: any, b: any) => b.processedDate - a.processedDate);
}
