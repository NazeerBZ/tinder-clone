import { call, put, takeLatest } from "redux-saga/effects";
import { successGetCards, failureGetCards } from "./actions";
import { callRequest } from "../../utils/ApiSauce.js";
import { GET_CARDS } from "./types";
import { API_GET_CARDS } from "../../config/WebServices";

function* watchGetCardsRequest(action) {
  const { payload } = action;
  try {
    const response = yield call(callRequest, API_GET_CARDS, payload);
    yield put(successGetCards(response?.data?.result ?? []));
  } catch (err) {
    yield put(failureGetCards(err.message));
  }
}

export default function* root() {
  yield takeLatest(GET_CARDS.REQUEST, watchGetCardsRequest);
}
