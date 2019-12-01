// @flow
import axios from "axios";
import type {Posts} from "../types/";

export * from "./localStorage";

async function fetchNews(): Promise<Posts> {
  try {
    const newsQuery = await axios.get(
      "https://www.girondins4ever.com/api/get_recent_posts/?post_type=breves&count=20"
    );
    return newsQuery.data.posts;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchArticles(): Promise<Posts> {
  try {
    const newsQuery = await axios.get(
      "https://www.girondins4ever.com/api/get_recent_posts/?count=10"
    );
    return newsQuery.data.posts;
  } catch (error) {
    throw new Error(error);
  }
}

export {fetchNews, fetchArticles};
