import {PixelRatio} from "react-native";

export const htmlDocument = content => `
  <html>
    <body>
      ${content}
    </body>
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
  return ratio <= 3.5 ? ratio : 3.5;
}

export * from "./parsers";
export * from "./constants";
