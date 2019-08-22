import React from "react";

import { PostList } from ".";
import type { Navigator } from "../types";

function ArticlesScreen({ navigation }: { navigation: Navigator }) {
  return (
    <PostList
      onPostPress={post => navigation.navigate("ArticleDetails", { post })}
    />
  );
}

export { ArticlesScreen };
