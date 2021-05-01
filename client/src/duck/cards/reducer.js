import { GET_CARDS } from "./types";
import { Util } from "../../utils";

const initialState = { data: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS.SUCCESS: {
      const { items } = Util.normalizeData(action.data);
      return {
        data: { ...state.data, ...items },
      };
    }

    default:
      return state;
  }
};
