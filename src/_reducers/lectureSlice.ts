import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

// 강의 등록
interface MyKnownErrorLectureWrite {
  message: string;
  lectureWriteSuccess: boolean;
}

interface LectureWriteDataFromServerType {
  lectureWriteSuccess?: boolean;
  message?: string;
  error?: any;
}

interface LectureWriteDataToSubmit {
  title: string;
  date: string;
  link: string;
  // file: string | Blob;
  description: string;
  writer: string;
}

// interface LectureWriteDataToSubmit {
//   // formData: FormData;
//   formData: FormData;
//   // title: string;
//   // date: string;
//   // link: string;
//   // file: string | Blob;
//   // description: string;
//   // writer: string;
// }

export const writeLecture = createAsyncThunk<
  LectureWriteDataFromServerType,
  LectureWriteDataToSubmit,
  { rejectValue: MyKnownErrorLectureWrite }
>("lecture/write", async (lectureWriteInfo, thunkAPI) => {
  try {
    const { data } = await axios.post("/api/lecture/write", lectureWriteInfo, {
      withCredentials: true,
    });

    // const { data } = await axios({
    //   method: "POST",
    //   url: "/api/lecture/write",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: lectureWriteInfo,
    // });

    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue({
      message: "강의 등록 API 통신 실패",
      lectureWriteSuccess: false,
    });
  }
});

// 모든 강의 불러오기
interface lectureListType {
  _id: string | undefined;
  title: string | undefined;
  date: string | undefined;
  description: string | undefined;
  link: string | undefined;
  like: number | undefined;
  see: number | undefined;
  writer: string | undefined;
  comments: Array<any> | undefined;
}

interface MyKnownErrorLoadAllLecture {
  message: string;
  loadLectureSuccess: boolean;
  lectureList?: Array<lectureListType>;
}

interface LoadAllLectureDataFromServerType {
  loadLectureSuccess?: boolean;
  lectureList?: Array<lectureListType>;
  message?: string;
  error?: any;
}

export const loadAllLecture = createAsyncThunk<
  LoadAllLectureDataFromServerType,
  null,
  { rejectValue: MyKnownErrorLoadAllLecture }
>("lecture/load/all", async (lectureInfo, thunkAPI) => {
  try {
    const { data } = await axios.get("/api/lecture/load/all", {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue({
      message: "강의 목록 불러오기 API 통신 실패",
      loadLectureSuccess: false,
    });
  }
});

// 특정 강의 불러오기
interface MyKnownErrorLoadOneLecture {
  message: string;
  loadOneLectureSuccess: boolean;
  // lecture?: Array<any>;
  lecture?: any;
}

interface LoadOneLectureDataFromServerType {
  loadOneLectureSuccess?: boolean;
  message?: string;
  error?: any;
  // lecture: Array<any>;
  // lecture: string | number | any | undefined;
  lecture: any;
}

interface LoadOneLectureDataToSubmit {
  lectureNum: number;
}

export const loadOneLecture = createAsyncThunk<
  LoadOneLectureDataFromServerType,
  LoadOneLectureDataToSubmit,
  { rejectValue: MyKnownErrorLoadOneLecture }
>("lecture/load/one", async (oneLectureInfo, thunkAPI) => {
  try {
    const { data } = await axios.post("/api/lecture/load/one", oneLectureInfo, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue({
      message: "특정 강의 불러오기 API 통신 실패",
      loadOneLectureSuccess: false,
    });
  }
});

// 특정 강의 댓글 작성하기
interface MyKnownErrorWriteLectureComment {
  message: string;
  addCommentSuccess: boolean;
}

interface WriteCommentLectureDataFromServerType {
  addCommentSuccess?: boolean;
  message?: string;
  error?: any;
}

interface WriteCommentLectureDataToSubmit {
  lectureId: number;
  comments: any;
}

export const writeCommentLecture = createAsyncThunk<
  WriteCommentLectureDataFromServerType,
  WriteCommentLectureDataToSubmit,
  { rejectValue: MyKnownErrorWriteLectureComment }
>("lecture/ouutercomment", async (writeCommentInfo, thunkAPI) => {
  try {
    const { data } = await axios.post(
      "/api/lecture/outtercomment",
      writeCommentInfo,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue({
      message: "강의 댓글 쓰기 API 통신 실패",
      addCommentSuccess: false,
    });
  }
});

// slice
export interface InitailStateType {
  lectureData: any;
  oneLecture: any;
  successData: any;
  error:
    | null
    | unknown
    | undefined
    | MyKnownErrorLectureWrite
    | MyKnownErrorLoadAllLecture;
  loading: boolean;
}

const initialState: InitailStateType = {
  lectureData: {},
  oneLecture: {},
  successData: {},
  error: null,
  loading: false,
};

export const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 강의 등록 builder
    builder
      // 통신 중
      .addCase(writeLecture.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // 통신 성공
      .addCase(writeLecture.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.lectureData = payload;
      })
      // 통신 에러
      .addCase(writeLecture.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });

    // 강의 목록 불러오기 builder
    builder
      // 통신 중
      .addCase(loadAllLecture.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // 통신 성공
      .addCase(loadAllLecture.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.lectureData = payload;
      })
      // 통신 에러
      .addCase(loadAllLecture.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });

    // 특정 강의 불러오기 builder
    builder
      // 통신 중
      .addCase(loadOneLecture.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // 통신 성공
      .addCase(loadOneLecture.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.oneLecture = payload;
      })
      // 통신 에러
      .addCase(loadOneLecture.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });

    // 강의 댓글 쓰기 builder
    builder
      // 통신 중
      .addCase(writeCommentLecture.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      // 통신 성공
      .addCase(writeCommentLecture.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.successData = payload;
      })
      // 통신 에러
      .addCase(writeCommentLecture.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      });
  },
});

export default lectureSlice.reducer;
