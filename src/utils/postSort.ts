interface PostingDataType {
  _id: string;
  title: string;
  date: string;
  like: number;
  see: number;
  comments: Array<any>;
}

export class PostSort {
  static titleAscending(data: PostingDataType[]) {
    const sortedData = data.sort((a: PostingDataType, b: PostingDataType) => {
      if (a.title > b.title) return 1;
      else if (a.title < b.title) return -1;
      else return 0;
    });

    return sortedData;
  }

  static titleDescending(data: PostingDataType[]) {
    const sortedData = data.sort((a: PostingDataType, b: PostingDataType) => {
      if (a.title > b.title) return -1;
      else if (a.title < b.title) return 1;
      else return 0;
    });

    return sortedData;
  }

  static dateAscending(data: PostingDataType[]) {
    const sortedData = data.sort((a: PostingDataType, b: PostingDataType) => {
      if (a.date > b.date) return 1;
      else if (a.date < b.date) return -1;
      else return 0;
    });

    return sortedData;
  }

  static dateDescending(data: PostingDataType[]) {
    const sortedData = data.sort((a: PostingDataType, b: PostingDataType) => {
      if (a.date > b.date) return -1;
      else if (a.date < b.date) return 1;
      else return 0;
    });

    return sortedData;
  }

  static likeAscending(data: PostingDataType[]) {
    const sortedData = data.sort((a: PostingDataType, b: PostingDataType) => {
      if (a.like > b.like) return 1;
      else if (a.like < b.like) return -1;
      else return 0;
    });

    return sortedData;
  }

  static likeDescending(data: PostingDataType[]) {
    const sortedData = data.sort((a: PostingDataType, b: PostingDataType) => {
      if (a.like > b.like) return -1;
      else if (a.like < b.like) return 1;
      else return 0;
    });

    return sortedData;
  }

  static commentAscending(data: PostingDataType[]) {
    const sortedData = data.sort((a: PostingDataType, b: PostingDataType) => {
      if (a.comments.length > b.comments.length) return 1;
      else if (a.comments.length < b.comments.length) return -1;
      else return 0;
    });

    return sortedData;
  }

  static commentDescending(data: PostingDataType[]) {
    const sortedData = data.sort((a: PostingDataType, b: PostingDataType) => {
      if (a.comments.length > b.comments.length) return -1;
      else if (a.comments.length < b.comments.length) return 1;
      else return 0;
    });

    return sortedData;
  }
}
