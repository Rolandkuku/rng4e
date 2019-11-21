// @flow
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import { OrderedMap } from "immutable";
import type { Posts } from "../types";

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

async function getLocalPosts(isNews: boolean): Posts {
  try {
    const data = await AsyncStorage.getItem(
      `rng4e/${isNews ? "news" : "articles"}`
    );
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (e) {
    resetLocalPosts(isNews);
    throw new Error(e);
  }
}

async function setLocalPosts(posts: Posts, isNews: boolean) {
  try {
    const oldPosts = (await getLocalPosts(isNews)) || [];
    const toSave = OrderedMap([...oldPosts, ...posts].map(p => [p.id, p]))
      .toList()
      .sortBy(p => -moment(getOKDate(p.date)).format("x"))
      .toArray();
    AsyncStorage.setItem(
      `rng4e/${isNews ? "news" : "articles"}`,
      JSON.stringify(toSave.slice(0, 100)) // We only want to store up to 100 posts.
    );
    return toSave;
  } catch (e) {
    resetLocalPosts(isNews);
    throw new Error(e);
  }
}

async function resetLocalPosts(isNews: boolean) {
  try {
    return AsyncStorage.removeItem(`rng4e/${isNews ? "news" : "articles"}`);
  } catch (e) {
    throw new Error(e);
  }
}

export { getLocalPosts, setLocalPosts, resetLocalPosts };
