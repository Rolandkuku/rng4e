// @flow
import { List } from "immutable";
import type { Post } from "../types";

type Section = {
  title: string,
  data: Array<Post>
};

function parseDataForSectionList(data: Array<Post>) {
  const groupedData: Array<Section> = List(data)
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
