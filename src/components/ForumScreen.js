import React from "react";
import { WebView } from "react-native-webview";

function ForumScreen({}) {
  return <WebView source={{ uri: "https://forum.girondins4ever.com" }} />;
}

export { ForumScreen };
