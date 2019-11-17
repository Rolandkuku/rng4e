// @flow
import AsyncStorage from "@react-native-community/async-storage";
import { OrderedMap } from "immutable";
import type { Posts } from "../types";

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
