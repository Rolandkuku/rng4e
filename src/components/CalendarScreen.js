import React from "react";
import { WebView } from "react-native-webview";

function CalendarScreen() {
  return <WebView source={{ uri: "https://m.lfp.fr/ligue1/classement" }} />;
}

export { CalendarScreen };
