import { GET_CARDS } from "./types";

export function requestGetCards() {
  return {
    type: GET_CARDS.REQUEST,
  };
}

export function successGetCards(data) {
  return {
    data,
    type: GET_CARDS.SUCCESS,
  };
}

export function failureGetCards(errorMessage) {
  return {
    errorMessage,
    type: GET_CARDS.FAILURE,
  };
}
