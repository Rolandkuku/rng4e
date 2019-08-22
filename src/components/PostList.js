// @flow
import React, { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleSheet, SectionList, TouchableOpacity } from "react-native";

import { fetchNews, fetchArticles } from "../services";
import { parseDataForSectionList } from "../utils";
import { BASE_MARGIN, SMALL_MARGIN } from "../styles";
import { Badge, Text, H2 } from ".";
import type { Post } from "../types";

const styles = StyleSheet.create({
  container: {
    padding: BASE_MARGIN
  },
  sectionTitle: {
    fontWeight: "bold"
  },
  thumbnail: {
    width: 130,
    height: 100
  },
  postLine: {
    flexDirection: "row",
    margin: BASE_MARGIN
  },
  titleContainer: {
    marginLeft: BASE_MARGIN,
    flex: 1
  },
  badge: {
    position: "absolute",
    top: SMALL_MARGIN,
    left: SMALL_MARGIN
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
    [data, isNews]
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
              <View style={styles.postLine}>
                <View>
                  <FastImage
                    style={styles.thumbnail}
                    resizeMode="cover"
                    source={{ uri: item.thumbnail_images.full.url }}
                  />
                  <Badge style={styles.badge}>{item.categories[0].title}</Badge>
                </View>
                <View style={styles.titleContainer}>
                  <Text>{item.date}</Text>
                  <Text numberOfLines={3}>{decodeURI(item.title)}</Text>
                  <Text numberOfLines={2}>
                    {JSON.stringify(item.excerpt.replace("<p>", ""))}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export { PostList };
