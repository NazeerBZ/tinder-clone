import _ from "lodash";
import { normalize, schema } from "normalizr";

function normalizeData(data, id = "_id") {
  const offerSchema = new schema.Entity("listItems", {}, { idAttribute: id });
  const offerListSchema = [offerSchema];
  const normalizedData = normalize(data, offerListSchema);
  return {
    ids: normalizedData.result,
    items: normalizedData.entities.listItems || {},
  };
}

function isEmpty(data) {
  return _.isEmpty(data);
}

function isEqual(data1, data2) {
  return _.isEqual(data1, data2);
}

function concat(data1, data2) {
  return _.concat(data1, data2);
}
export default {
  normalizeData,
  isEmpty,
  isEqual,
  concat,
};
