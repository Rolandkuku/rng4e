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

import {
  fetchNews,
  fetchArticles,
  getLocalPosts,
  setLocalPosts,
  resetLocalPosts
} from "../services";
import { parseDataForSectionList } from "../utils";
import {
  MARGIN_BASE,
  MARGIN_SMALL,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_WHITE,
  COLOR_BLACK
} from "../styles";
import { Badge, Text, H3 } from ".";
import type { Post } from "../types";

const styles = StyleSheet.create({
  container: {
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
    padding: MARGIN_BASE
  },
  titleContainer: {
    marginLeft: MARGIN_BASE,
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
    top: MARGIN_SMALL,
    left: MARGIN_SMALL
  },
  placeholder: {
    padding: MARGIN_BASE
  },
  placeholderMedia: {
    width: 130,
    height: 100,
    marginRight: MARGIN_BASE
  },
  errorMessageContainer: {
    padding: MARGIN_BASE
  },
  errorMessageText: {
    color: COLOR_SECONDARY
  }
});

const NETWORK_ERROR_TEXT =
  "Erreur pendant le chargement ☹️. Tape pour réessayer.";

async function fetch(setLoading, setData, setError, isNews) {
  setLoading(true);
  try {
    // Get local data and render.
    const localData = await getLocalPosts(isNews);
    setData(parseDataForSectionList(localData));
    // Then, fetch online data.
    const onlineData = isNews ? await fetchNews() : await fetchArticles();
    const newData = await setLocalPosts(onlineData, isNews);
    setError(null);
    setData(parseDataForSectionList(newData));
  } catch (e) {
    resetLocalPosts(isNews);
    setError(NETWORK_ERROR_TEXT);
  }
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

function PostLine({ post, index, onPostPress }) {
  return (
    <TouchableNativeFeedback key={index} onPress={() => onPostPress(post)}>
      <View
        style={[styles.postLine, index % 2 !== 0 ? styles.postLineOdd : null]}
      >
        <View>
          <FastImage
            style={styles.thumbnail}
            resizeMode="cover"
            source={{ uri: post.thumbnail_images.full.url }}
          />
          {post.categories.length ? (
            <Badge style={styles.badge}>{post.categories[0].title}</Badge>
          ) : null}
        </View>
        <View style={[styles.titleContainer]}>
          <Text small style={[getOddTextColor(index)]}>
            {post.date}
          </Text>
          <H3 style={[getOddTextColor(index)]} numberOfLines={3}>
            {decode(post.title)}
          </H3>
          <Text style={[getOddTextColor(index)]} numberOfLines={2}>
            {decode(post.excerpt.replace("<p>", ""))}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const ErrorMessage = ({ children, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.errorMessageContainer}>
      <Text styles={styles.errorMessageText}>{children}</Text>
    </View>
  </TouchableNativeFeedback>
);

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
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  /**
   * Hook effect that fetches news upon mount.
   */
  useEffect(
    function() {
      if (!data.length && !loading && !refreshing) {
        fetch(setLoading, setData, setError, isNews);
      }
    },
    [data, isNews, loading, refreshing]
  );

  function onRefresh() {
    if (!refreshing && !loading) {
      fetch(setRefreshing, setData, setError, isNews);
    }
  }
  /**
   * Main render.
   */
  return (
    <View>
      {error ? <ErrorMessage onPress={onRefresh}>{error}</ErrorMessage> : null}
      {data.length === 0 ? (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
            <View style={{ padding: MARGIN_BASE }}>
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
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
            <PostLine post={item} index={index} onPostPress={onPostPress} />
          )}
        />
      )}
    </View>
  );
}

export { PostList };
