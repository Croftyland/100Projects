import api from "../apis/jsonPlaceholder";

export const onSubmitOne = (values) => async (dispatch) => {
  function onSuccess(res) {
    dispatch({ type: "MOVIE_ADDED", payload: res.data.data });
    return res;
  }
  function onError(error) {
    dispatch({ type: "FETCH_MOVIE_FAILURE", payload: error });
    return error;
  }
  try {
    const res = await api.insertMovie(values);
    return onSuccess(res);
  } catch (error) {
    if (error.response.status === 400) {
      console.log("Such card was already added");
    } else {
      onError(error);
    }
  }
};
