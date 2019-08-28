// @flow
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  TouchableNativeFeedback,
  View,
  StyleSheet,
  Linking
} from "react-native";
import Share from "react-native-share";

import { MARGIN_BASE, COLOR_WHITE } from "../styles";

const styles = StyleSheet.create({
  container: {
    padding: MARGIN_BASE,
    marginRight: MARGIN_BASE
  }
});

function IconLink({ url, type }: { url: string, type: "link" | "share" }) {
  const share = async () => {
    try {
      await Share.open({ url });
    } catch (error) {
      //
    }
  };
  const isLink = type === "link";
  return (
    <TouchableNativeFeedback
      onPress={() => {
        isLink ? Linking.openURL(url) : share();
      }}
    >
      <View style={styles.container}>
        <Icon
          name={isLink ? "question-circle" : "share-alt"}
          size={20}
          color={COLOR_WHITE}
        />
      </View>
    </TouchableNativeFeedback>
  );
}

IconLink.defaultProps = {
  type: "link"
};

export { IconLink };
