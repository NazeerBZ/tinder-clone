export const BASE_URL = "http://localhost:8001/api/v1/";
export const API_TIMEOUT = 30000;
export const X_API_TOKEN = "X-Access-Token";

// REQUEST TYPES
export const REQUEST_TYPE = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};

// ROUTES LIST

export const API_GET_CARDS = {
  route: "cards",
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_CARD = {
  route: "cards/addCard",
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
