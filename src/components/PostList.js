// @flow
import React, { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import {
  View,
  StyleSheet,
  SectionList,
  ScrollView,
  RefreshControl,
  TouchableNativeFeedback
} from "react-native";
import { decode } from "he";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";

import { fetchNews, fetchArticles } from "../services";
import { parseDataForSectionList } from "../utils";
import {
  BASE_MARGIN,
  SMALL_MARGIN,
  COLOR_PRIMARY,
  COLOR_WHITE,
  COLOR_BLACK
} from "../styles";
import { Badge, Text, H3 } from ".";
import type { Post } from "../types";

const styles = StyleSheet.create({
  container: {
    padding: BASE_MARGIN,
    color: COLOR_BLACK
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
    padding: BASE_MARGIN
  },
  titleContainer: {
    marginLeft: BASE_MARGIN,
    flex: 1
  },
  postLineOdd: {
    backgroundColor: COLOR_PRIMARY
  },
  postTextOdd: {
    color: COLOR_WHITE
  },
  badge: {
    position: "absolute",
    top: SMALL_MARGIN,
    left: SMALL_MARGIN
  },
  placeholder: {
    padding: BASE_MARGIN
  },
  placeholderMedia: {
    width: 130,
    height: 100,
    marginRight: BASE_MARGIN
  }
});

async function fetch(setLoading, setData, isNews) {
  setLoading(true);
  const news = isNews ? await fetchNews() : await fetchArticles();
  setData(parseDataForSectionList(news));
  setLoading(false);
}

const getOddTextColor = index => (index % 2 !== 0 ? styles.postTextOdd : null);

const PostLinePlaceholder = () => {
  const placeholders = [];
  for (let i = 0; i <= 20; i++) {
    placeholders.push(
      <Placeholder
        key={i}
        style={styles.placeholder}
        Animation={Fade}
        Left={() => <PlaceholderMedia style={styles.placeholderMedia} />}
      >
        <PlaceholderLine width={30} />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine width={50} />
      </Placeholder>
    );
  }
  return placeholders;
};

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
  const [refreshing, setRefreshing] = useState(false);
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

  function onRefresh() {
    fetch(setRefreshing, setData, isNews);
  }
  /**
   * Main render.
   */
  return (
    <View>
      {loading ? (
        <ScrollView style={styles.container}>
          <PostLinePlaceholder />
        </ScrollView>
      ) : (
        <SectionList
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
            <TouchableNativeFeedback
              key={index}
              onPress={() => onPostPress(item)}
            >
              <View
                style={[
                  styles.postLine,
                  index % 2 !== 0 ? styles.postLineOdd : null
                ]}
              >
                <View>
                  <FastImage
                    style={styles.thumbnail}
                    resizeMode="cover"
                    source={{ uri: item.thumbnail_images.full.url }}
                  />
                  <Badge style={styles.badge}>{item.categories[0].title}</Badge>
                </View>
                <View style={[styles.titleContainer]}>
                  <Text small style={[getOddTextColor(index)]}>
                    {item.date}
                  </Text>
                  <H3 style={[getOddTextColor(index)]} numberOfLines={3}>
                    {decode(item.title)}
                  </H3>
                  <Text style={[getOddTextColor(index)]} numberOfLines={2}>
                    {decode(item.excerpt.replace("<p>", ""))}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          )}
        />
      )}
    </View>
  );
}

export { PostList };
