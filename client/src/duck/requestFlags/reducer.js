import Immutable from "seamless-immutable";

import { REQUEST, SUCCESS, FAILURE, RESET } from "../ActionTypes";

const initialState = Immutable({});

const regularExpression = new RegExp(
  `(.*)_(${REQUEST}|${SUCCESS}|${FAILURE}|${RESET})`
);

export default (state: Object = initialState, action: Object) => {
  const {
    type,
    errorList,
    errorMessage,
    isPullToRefresh,
    reset,
    identifier,
    page,
    isResetData,
    data,
  } = action;
  const matches = regularExpression.exec(type);

  if (!matches) return state;
  const [, requestName, requestState] = matches;
  // const totalRecords = data instanceof Array ? data.length : 0;

  const requestIdentifier =
    identifier && identifier !== ""
      ? `${requestName}_${identifier}`
      : requestName;

  //const totalRecords = page?.totalDocs ?? 0;
  //const nextPage = page && page.page ? page.page + 1 : 1;
  let totalRecords = 0;
  if (page && page.totalDocs) {
    totalRecords = page.totalDocs;
  } else if (page && page.total) {
    totalRecords = page.total;
  } else if (
    state[requestIdentifier] &&
    state[requestIdentifier].totalRecords
  ) {
    totalRecords = state[requestIdentifier].totalRecords;
  }
  /*
  const totalRecords =
    page && page.totalDocs
      ? page.totalDocs
      : page && page.total
      ? page.total
      : 0;
  */

  const nextPage =
    page && page.page
      ? page.page + 1
      : page && page.current_page
      ? page.current_page + 1
      : 1;

  if (isResetData) {
    return Immutable.merge(state, {
      [requestIdentifier]: {
        loading: true,
        failure: false,
        isPullToRefresh: false,
        reset: false,
        totalRecords: 0,
      },
    });
  }

  if (requestState === RESET) {
    return Immutable.merge(state, {
      [requestIdentifier]: {},
    });
  }

  let lastRecordsLength = 0;
  if (requestState === SUCCESS) {
    lastRecordsLength = data?.length ?? 0;
  } else if (
    state[requestIdentifier] &&
    state[requestIdentifier].lastRecordsLength
  ) {
    lastRecordsLength = state[requestIdentifier].lastRecordsLength;
  }

  return Immutable.merge(state, {
    [requestIdentifier]: {
      loading: requestState === REQUEST,
      failure: requestState === FAILURE,
      reset: reset || false,
      isPullToRefresh: isPullToRefresh || false,
      errorList: errorList || "",
      errorMessage: errorMessage || "",
      totalRecords,
      nextPage,
      lastRecordsLength,
    },
  });
};
