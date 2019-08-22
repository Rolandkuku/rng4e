import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

import { TEXT_REGULAR, TEXT_LARGE, TEXT_XLARGE, TEXT_SMALL } from "../styles";

const styles = StyleSheet.create({
  regular: {
    fontSize: TEXT_REGULAR
  },
  h1: {
    fontSize: TEXT_XLARGE
  },
  h2: {
    fontSize: TEXT_LARGE
  }
});

function Text({ style, children, small, ...props }) {
  this.defaultProps = {
    small: false
  };
  return (
    <RNText
      style={[styles.regular, small ? { fontSize: TEXT_SMALL } : null, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}

function H1({ style, children, ...props }) {
  return (
    <RNText style={[styles.regular, style]} {...props}>
      {children}
    </RNText>
  );
}

function H2({ style, children, ...props }) {
  return (
    <RNText style={[styles.regular, style]} {...props}>
      {children}
    </RNText>
  );
}

export { Text, H1, H2 };
