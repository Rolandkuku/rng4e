// @flow
import React, { useState, useEffect } from "react";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { List } from "immutable";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity
} from "react-native";

import { fetchNews } from "../services";
import type { Post } from "../types";

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

async function fetch(setLoading, setData) {
  setLoading(true);
  const news = await fetchNews();
  console.log(news);
  const groupedNews = List(news)
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
  setData(groupedNews);
  setLoading(false);
}

function News({ navigation }): React$Element<typeof View> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  /**
   * Hook effect that fetches news upon mount.
   */
  useEffect(
    function() {
      if (!data.length) {
        fetch(setLoading, setData);
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
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
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
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("NewsDetails", { details: item })
              }
            >
              <View>
                <FastImage
                  style={{ width: 100, height: 100 }}
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

export { News };
