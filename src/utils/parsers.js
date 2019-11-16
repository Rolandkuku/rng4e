// @flow
import { List } from "immutable";
import moment from "moment";
import type { Post } from "../types";

type Section = {
  title: string,
  data: Array<Post>
};

const months = {
  janvier: "january",
  février: "february",
  mars: "march",
  avril: "april",
  mai: "may",
  juin: "june",
  juillet: "july",
  août: "august",
  septembre: "september",
  octobre: "october",
  novembre: "november",
  décembre: "december"
};

// Parsing date like: samedi 16 novembre 2019 à 21:34
const getOKDate = date => {
  const a = date.split(" ");
  a.splice(4, 1);
  a.splice(2, 1, months[a[2]]);
  return a.slice(1).join(" ");
};

function parseDataForSectionList(data: Array<Post>) {
  const groupedData: Array<Section> = List(data)
    .sortBy(p => -moment(getOKDate(p.date)).format("x"))
    .groupBy(item =>
      item.date
        .split(" ")
        .slice(0, 4)
        .join(" ")
    )
    .toArray()
    .map(([title, list]) => ({
      title,
      data: list.toArray()
    }));
  return groupedData;
}

export { parseDataForSectionList };
