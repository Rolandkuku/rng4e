// @flow
import React, { useState } from "react";
import {
  ScrollView,
  View,
  PixelRatio,
  StyleSheet,
  Linking
} from "react-native";
import { WebView } from "react-native-webview";
import FastImage from "react-native-fast-image";
import { decode } from "he";

import { htmlDocument, getDocumentHeighJS } from "../utils";
import { H1, H3, Text } from "../components";
import { MARGIN_BASE, MARGIN_XLARGE, MARGIN_LARGE } from "../styles";
import type { Post as PostType } from "../types";

const styles = StyleSheet.create({
  container: { padding: MARGIN_BASE },
  titleContainer: {
    marginHorizontal: MARGIN_BASE,
    marginBottom: MARGIN_XLARGE,
    marginTop: MARGIN_LARGE
  },
  title: { fontWeight: "bold" },
  imageContainer: { flex: 1 },
  image: { minHeight: 200 },
  webViewContainer: {
    flex: 1,
    paddingHorizontal: MARGIN_BASE,
    marginVertical: MARGIN_LARGE
  },
  webView: { fontSize: 40 }
});

function Post({ post, isNews }: { post: PostType, isNews: boolean }) {
  this.defaultProps = {
    isNews: false
  };
  const [webViewHeight, setWebViewHeight] = useState(1000);

  if (!post.id) {
    return (
      <View>
        <Text>Article not found</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <H1 style={styles.title}>{decode(post.title)}</H1>
        <Text>
          Par <H3>{post.author.name}</H3> {post.date}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <FastImage
          source={{ uri: post.thumbnail_images.full.url }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.webViewContainer}>
        <WebView
          style={[styles.webView, { height: webViewHeight }]}
          source={{ html: htmlDocument(post.content) }}
          scrollEnabled={false}
          injectedJavaScript={getDocumentHeighJS}
          onShouldStartLoadWithRequest={request => {
            const shouldOpenInBrowser = request.url !== "about:blank";
            if (shouldOpenInBrowser) {
              Linking.openURL(request.url);
            }
            return !shouldOpenInBrowser;
          }}
          onMessage={e => {
            setWebViewHeight(
              Number(e.nativeEvent.data / PixelRatio.get() + MARGIN_LARGE)
            );
          }}
          allowsFullscreenVideo
        />
      </View>
    </ScrollView>
  );
}

export { Post };
