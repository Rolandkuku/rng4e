import {PixelRatio} from "react-native";

export const htmlDocument = content => `
  <html>
    <head>
    <div style="font-size:${45};" id="content">
      ${content}
    </div>
  </html>
`;

export const getDocumentHeighJS = `
(function() {
  const $content = document.getElementById("content");
  window.ReactNativeWebView.postMessage($content.scrollHeight);
})();
`;

export function getPixelRatioWithMaximum() {
  const ratio = PixelRatio.get();
  return ratio <= 3 ? ratio : 3;
}

export * from "./parsers";
export * from "./constants";
