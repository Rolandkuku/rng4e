// @flow
import React, { useState } from "react";
import { ScrollView, Text, View, PixelRatio } from "react-native";
import { WebView } from "react-native-webview";
import FastImage from "react-native-fast-image";

import { htmlDocument } from "../utils";
import type { Post as PostType } from "../types";

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
    <ScrollView>
      <FastImage
        source={{ uri: post.thumbnail_images.full.url }}
        resizeMode="contain"
        style={{ minHeight: 200, width: "100%" }}
      />
      <View style={{ flex: 1 }}>
        <WebView
          style={{ margin: 20, fontSize: 40, height: webViewHeight }}
          source={{ html: htmlDocument(post.content) }}
          scrollEnabled={false}
          onMessage={e => {
            setWebViewHeight(Number(e.nativeEvent.data / PixelRatio.get()));
          }}
        />
      </View>
    </ScrollView>
  );
}

export { Post };
