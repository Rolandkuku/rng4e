import { PixelRatio } from "react-native";

export const htmlDocument = content => `
  <html>
    <head>
    <div style="font-size:${15 * PixelRatio.get()};" id="content">
      ${content}
    </div>
  </html>
`;

export const getDocumentHeighJS = `
(function() {
  const $content = document.getElementById("content");
  window.ReactNativeWebView.postMessage($content.clientHeight);
})();
`;

export * from "./parsers";
