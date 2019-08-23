// @flow
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  PixelRatio,
  StyleSheet,
  Linking
} from "react-native";
import { WebView } from "react-native-webview";
import FastImage from "react-native-fast-image";

import { htmlDocument, getDocumentHeighJS } from "../utils";
import { BASE_MARGIN } from "../styles";
import type { Post as PostType } from "../types";

const styles = StyleSheet.create({
  container: { padding: BASE_MARGIN },
  imageContainer: { flex: 1 },
  image: { minHeight: 200 },
  webViewContainer: { flex: 1, padding: BASE_MARGIN * 2 },
  webView: { fontSize: 40 }
});

function Post({ post, isNews }: { post: PostType, isNews: boolean }) {
  this.defaultProps = {
    isNews: false
  };
  const [webViewHeight, setWebViewHeight] = useState(0);

  if (!post.id) {
    return (
      <View>
        <Text>Ooooops</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
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
            setWebViewHeight(Number(e.nativeEvent.data / PixelRatio.get()));
          }}
          allowsFullscreenVideo
        />
      </View>
    </ScrollView>
  );
}

export { Post };
