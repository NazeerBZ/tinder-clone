import { fork } from "redux-saga/effects";

import cards from "./cards/saga";

export default function* root() {
  yield fork(cards);
}
