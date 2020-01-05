// @flow
import React, {useState, useRef} from "react";
import {ScrollView, View, StyleSheet, Dimensions, Linking} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import {WebView} from "react-native-webview";
import FastImage from "react-native-fast-image";
import {decode} from "he";

import {
  htmlDocument,
  getDocumentHeighJS,
  getPixelRatioWithMaximum
} from "../utils";
import {H1, H3, Text} from "../components";
import {MARGIN_BASE, MARGIN_XLARGE, MARGIN_LARGE} from "../styles";
import type {Post as PostType} from "../types";

const fallbackPic = require("../assets/img/fallback_pic.jpg");

const styles = StyleSheet.create({
  container: {padding: MARGIN_BASE},
  titleContainer: {
    marginHorizontal: MARGIN_BASE,
    marginBottom: MARGIN_XLARGE,
    marginTop: MARGIN_LARGE
  },
  title: {fontWeight: "bold"},
  imageContainer: {flex: 1},
  image: {minHeight: 200},
  webViewContainer: {
    flex: 1,
    paddingHorizontal: MARGIN_BASE,
    marginVertical: MARGIN_LARGE
  },
  webView: {
    padding: MARGIN_BASE
  }
});

function Post({post, isNews}: {post: PostType, isNews: boolean}) {
  this.defaultProps = {
    isNews: false
  };
  const [webviewWidth, setWebViewWidth] = useState(
    Dimensions.get("window").width - MARGIN_BASE * 2
  );

  console.log(post.content);

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
        {post.thumbnail_images &&
        post.thumbnail_images.full &&
        post.thumbnail_images.full.url ? (
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={{uri: post.thumbnail_images.full.url}}
          />
        ) : (
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={fallbackPic}
          />
        )}
      </View>
      <View
        style={styles.webViewContainer}
        onLayout={event => {
          setWebViewWidth(event.nativeEvent.layout.width);
        }}>
        <AutoHeightWebView
          source={{html: htmlDocument(post.content)}}
          style={[styles.webView, {width: webviewWidth - MARGIN_BASE * 2}]}
          customStyle={`
          * {
            font-family: arial;
          }
          p {
            font-size: 16px;
          }
          blockquote {
            margin: 8px;
          }
          `}
          onShouldStartLoadWithRequest={request => {
            const shouldOpenInBrowser = request.url !== "about:blank";
            if (shouldOpenInBrowser) {
              Linking.openURL(request.url);
            }
            return !shouldOpenInBrowser;
          }}
          allowsFullscreenVideo
        />
      </View>
    </ScrollView>
  );
}

export {Post};
