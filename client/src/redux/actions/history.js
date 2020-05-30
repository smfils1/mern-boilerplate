import axios from "axios";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const requestHistory = ({ maxPages, logs, error }) => {
  return {
    type: "REQUEST_HISTORY",
    payload: { maxPages, logs, error },
  };
};

const historyUpdateError = (error) => {
  return {
    type: "HISTORY_UPDATE_ERROR",
    payload: { error },
  };
};

const fetchHistory = (page, limit) => {
  return async (dispatch) => {
    try {
      const {
        data: { history },
      } = await api.get(`/api/history?page=${page}&limit=${limit}`);
      dispatch(
        requestHistory({
          maxPages: history.maxPages,
          logs: history.results,
          error: "",
        })
      );
    } catch (err) {
      const error = err.response ? err.response.data.message : "Server is down";
      dispatch(
        requestHistory({
          logs: null,
          message: error,
        })
      );
    }
  };
};

const updateHistory = (count) => {
  return async (dispatch) => {
    try {
      await api.post("/api/history", { count });
    } catch (err) {
      dispatch(historyUpdateError(err));
    }
  };
};

export { fetchHistory, updateHistory };
