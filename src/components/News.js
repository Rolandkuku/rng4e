// @flow
import React, { useState, useEffect } from "react";
import moment from "moment";
import { List } from "immutable";
import { Text, View, StyleSheet, SectionList } from "react-native";

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

function News(): React$Element<typeof View> {
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
          renderItem={({ item, index, section }) => (
            <View key={index}>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

export { News };
