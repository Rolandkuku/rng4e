import React from "react";

import { PostList } from ".";
import type { Navigator } from "../types";

function NewsScreen({ navigation }: { navigation: Navigator }) {
  return (
    <PostList
      isNews
      onPostPress={post => navigation.navigate("NewsDetails", { post })}
    />
  );
}

export { NewsScreen };
