import { combineReducers } from "redux";

import requestFlags from "./requestFlags";
import cards from "./cards";

export default combineReducers({ requestFlags, cards });
