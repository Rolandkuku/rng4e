import React from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  MARGIN_XSMALL,
  RADIUS_BASE,
  COLOR_WHITE,
  TEXT_XSMALL
} from "../styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    padding: MARGIN_XSMALL,
    borderRadius: RADIUS_BASE
  },
  text: {
    fontWeight: "bold",
    color: COLOR_WHITE,
    fontSize: TEXT_XSMALL,
    lineHeight: TEXT_XSMALL
  }
});

function Badge({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

export { Badge };
