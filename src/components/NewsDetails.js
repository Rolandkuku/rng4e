import React, { useState } from "react";
import { ScrollView, Text, View, PixelRatio } from "react-native";
import { WebView } from "react-native-webview";
import FastImage from "react-native-fast-image";
import type { Post } from "../types";

const document = content => `
  <html>
    <head>
    <div style="font-size:40px;" id="height-calculator">
      ${content}
    </div>
    <script>
      (function() {
        const calculator = document.getElementById("height-calculator");
        window.ReactNativeWebView.postMessage(calculator.clientHeight);
      })();
    </script>
  </html>
`;

function NewsDetails({ navigation }) {
  const [webViewHeight, setWebViewHeight] = useState(0);
  const details: Post = navigation.getParam("details", {});
  if (!details.id) {
    return (
      <View>
        <Text>Ooooops</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <FastImage
        source={{ uri: details.thumbnail_images.full.url }}
        resizeMode="contain"
        style={{ minHeight: 200, width: "100%" }}
      />
      <View style={{ flex: 1 }}>
        <WebView
          style={{ margin: 20, fontSize: 40, height: webViewHeight }}
          source={{ html: document(details.content) }}
          scrollEnabled={false}
          onMessage={e => {
            e.persist();
            setWebViewHeight(Number(e.nativeEvent.data / PixelRatio.get()));
          }}
        />
      </View>
    </ScrollView>
  );
}

export { NewsDetails };
