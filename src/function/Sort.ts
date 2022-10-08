/**
 * sorting lecture title
 * @param dataList data of all lecture
 * @param titleSort check ascending order(true) or descending order(false)
 */
export function titleSortFunc(dataList: any, titleSort: boolean) {
  if (titleSort) {
    // 오름차순 정렬
    dataList.sort((a: any, b: any) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    // 내림차순 정렬
    dataList.sort((a: any, b: any) => {
      if (a.title > b.title) {
        return -1;
      } else if (a.title < b.title) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

/**
 * sorting lecture date
 * @param dataList data of all lecture
 * @param dateSort check ascending order(true) or descending order(false)
 */
export function dateSortFunc(dataList: any, dateSort: boolean) {
  if (dateSort) {
    // 오름차순 정렬
    dataList.sort((a: any, b: any) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    // 내림차순 정렬
    dataList.sort((a: any, b: any) => {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

/**
 * sorting lecture like
 * @param dataList data of all lecture
 * @param likeSort check ascending order(true) or descending order(false)
 */
export function likeSortFunc(dataList: any, likeSort: boolean) {
  if (likeSort) {
    // 오름차순 정렬
    dataList.sort((a: any, b: any) => {
      if (a.like < b.like) {
        return -1;
      } else if (a.like > b.like) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    // 내림차순 정렬
    dataList.sort((a: any, b: any) => {
      if (a.like > b.like) {
        return -1;
      } else if (a.like < b.like) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

/**
 * sorting lecture comment length
 * @param dataList data of all lecture
 * @param commentSort check ascending order(true) or descending order(false)
 */
export function commentSortFunc(dataList: any, commentSort: boolean) {
  if (commentSort) {
    // 오름차순 정렬
    dataList.sort((a: any, b: any) => {
      if (a.comments.length < b.comments.length) {
        return -1;
      } else if (a.comments.length > b.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    // 내림차순 정렬
    dataList.sort((a: any, b: any) => {
      if (a.comments.length > b.comments.length) {
        return -1;
      } else if (a.comments.length < b.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
