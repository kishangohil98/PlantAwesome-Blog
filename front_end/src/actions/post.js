import axios from "axios";
import {
  ADD_POST,
  POST_ERROR,
  GET_POSTS,
  POST_AGAIN,
  GET_MYBLOG,
  UPDATE_LIKES,
  DELETE_POST,
} from "./types";
import { setAlert } from "./alert";
//Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

//get my blog
export const getMyPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post/myblog");

    dispatch({
      type: GET_MYBLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

//add post
export const addPost = (title, body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    //body
  };
  const data = JSON.stringify({ title, body });
  try {
    const res = await axios.post("/api/post", data, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Blog Posted Successfully", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

//add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
    dispatch(setAlert("Like added successfully", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

//remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
    dispatch(setAlert("Like removed successfully", "danger"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
//Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Deleted Successfully", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

//post again enable
export const postAgain = () => async (dispatch) => {
  try {
    await dispatch({
      type: POST_AGAIN,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
