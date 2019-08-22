// @flow
import React, { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity
} from "react-native";

import { fetchNews, fetchArticles } from "../services";
import { parseDataForSectionList } from "../utils";
import { BASE_MARGIN } from "../styles";
import type { Post } from "../types";

const styles = StyleSheet.create({
  container: {
    padding: BASE_MARGIN
  },
  sectionTitle: {
    fontWeight: "900"
  },
  thumbnail: {
    width: 100,
    height: 100
  }
});

async function fetch(setLoading, setData, isNews) {
  setLoading(true);
  const news = isNews ? await fetchNews() : await fetchArticles();
  setData(parseDataForSectionList(news));
  setLoading(false);
}

function PostList({
  onPostPress,
  isNews
}: {
  onPostPress: Post => any,
  isNews: boolean
}): React$Element<typeof View> {
  this.defaultProps = {
    isNews: false
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  /**
   * Hook effect that fetches news upon mount.
   */
  useEffect(
    function() {
      if (!data.length) {
        fetch(setLoading, setData, isNews);
      }
    },
    [data]
  );
  /**
   * Main render.
   */
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <SectionList
          sections={data}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionTitle}>{title}</Text>
          )}
          renderItem={({
            item,
            index,
            section
          }: {
            item: Post,
            index: number,
            section: *
          }) => (
            <TouchableOpacity key={index} onPress={() => onPostPress(item)}>
              <View>
                <FastImage
                  style={styles.thumbnail}
                  resizeMode="contain"
                  source={{ uri: item.thumbnail_images.full.url }}
                />
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export { PostList };
