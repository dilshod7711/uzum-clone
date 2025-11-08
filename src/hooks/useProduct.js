import { useEffect, useReducer } from "react";
import { API } from "../helpers/API/api";

const initialState = {
  data: [],
  isLoading: false,
  setEror: "",
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_DATA":
      return { ...state, data: payload };
    case "ISLOADING":
      return { ...state, isLoading: !state.isLoading };
    case "ERROR":
      return { ...state, setEror: payload };
    default:
      return state;
  }
}

export function useProducts(url) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({
      type: "ISLOADING",
    });
    API.get("/products")
      .then((res) => dispatch({ type: "ADD_DATA", payload: res.data.products }))
      .catch((eror) =>
        dispatch({ type: "ERROR", payload: eror.message || "Xatolik" })
      )
      .finally(() =>
        dispatch({
          type: "ISLOADING",
        })
      );
  }, [url]);
  return state;
}
