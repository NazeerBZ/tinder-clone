import { create } from "apisauce";
import { BASE_URL, API_TIMEOUT, REQUEST_TYPE } from "../config/WebServices";

const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

export async function callRequest(
  url,
  payload,
  routeParameter = "",
  headers = {}
) {
  // get attributes from url
  const { route, type, access_token_required } = url;

  // set route url
  const routeUrl = routeParameter !== "" ? `${route}/${routeParameter}` : route;

  // set X-API-TOKEN
  if (access_token_required) {
    // headers[X_API_TOKEN] = DataHandler.getAccessToken();
  }

  // init header object
  const headerObject = {
    headers,
  };

  // log sending data
  console.log("URL => ", routeUrl);
  console.log("Header => ", headerObject);
  console.log("Payload => ", payload);

  // init response
  let response;

  // on type send request
  switch (type) {
    case REQUEST_TYPE.GET:
      response = await api.get(routeUrl, payload, headerObject);
      break;
    case REQUEST_TYPE.POST:
      response = await api.post(routeUrl, payload, headerObject);
      break;
    case REQUEST_TYPE.DELETE:
      response = await api.delete(routeUrl, payload, headerObject);
      break;
    case REQUEST_TYPE.PUT:
      response = await api.put(routeUrl, payload, headerObject);
      break;
    default:
      response = await api.get(route, payload, headerObject);
  }

  // Log receiving data
  console.log(`${routeUrl} response => `, response);

  return handleResponse(response);
}

export function handleResponse(response) {
  return new Promise((resolve, reject) => {
    // network error  internet not working
    const isNetWorkError = response.problem === "NETWORK_ERROR";
    // client error
    const isClientError = response.problem === "CLIENT_ERROR";
    // kick user from server
    const isKickUser = response.status === 403;
    // server maintenance
    const isServerMaintenance = response.status === 503;
    // if response is valid
    const isResponseValid =
      response.ok && response.data && response.data.message;
    if (isResponseValid) {
      resolve(response.data);
    } else if (isNetWorkError) {
      reject({
        message: "Internet connection error",
        statusCode: response.status,
      });
    } else if (isKickUser) {
      reject({
        message: "Your account token has been expired. Please login again",
        statusCode: response.status,
      });
    } else if (isServerMaintenance) {
      reject({
        message: "Server is temporarily unavailable",
        statusCode: response.status,
      });
    } else if (isClientError) {
      reject({
        message: response.data.message || "Something went wrong",
        statusCode: response.status,
      });
    } else {
      reject({
        message: "Something went wrong",
        statusCode: response.status,
      });
    }
  });
}
