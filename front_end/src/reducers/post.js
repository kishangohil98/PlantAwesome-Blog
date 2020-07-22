import {
  ADD_POST,
  POST_ERROR,
  GET_POSTS,
  POST_AGAIN,
  GET_MYBLOG,
  UPDATE_LIKES,
  CLEAR_POST,
  DELETE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  mypost: [],
  postLoading: true,
  error: {},
  postedSuccessfully: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        postLoading: false,
        postedSuccessfully: true,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        postLoading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case GET_MYBLOG:
      return {
        ...state,
        mypost: payload,
        postLoading: false,
      };
    case DELETE_POST:
      return {
        posts: state.posts.filter((post) => post._id !== payload),
        mypost: state.mypost.filter((post) => post._id !== payload),
        postLoading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? {
                ...post,
                likes: payload.likes,
              }
            : post
        ),
        mypost: state.mypost.map((post) =>
          post._id === payload.id
            ? {
                ...post,
                likes: payload.likes,
              }
            : post
        ),
      };

    case POST_AGAIN:
      return {
        ...state,
        postedSuccessfully: false,
        postLoading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        mypost: [],
        posts: [],
        postLoading: false,
      };
    default:
      return state;
  }
}
