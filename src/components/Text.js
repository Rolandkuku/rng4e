import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

import {
  TEXT_REGULAR,
  TEXT_LARGE,
  TEXT_XLARGE,
  TEXT_SMALL,
  TEXT_XSMALL
} from "../styles";

const baseStyles = {
  fontFamily: "Roboto"
};

const styles = StyleSheet.create({
  regular: {
    ...baseStyles,
    fontSize: TEXT_REGULAR
  },
  h1: {
    ...baseStyles,
    fontSize: TEXT_XLARGE
  },
  h2: {
    ...baseStyles,
    fontSize: TEXT_LARGE,
    fontWeight: "bold"
  },
  h3: {
    ...baseStyles,
    fontSize: TEXT_REGULAR,
    fontWeight: "bold"
  }
});

function Text({ style, children, small, xsmall, ...props }) {
  this.defaultProps = {
    small: false,
    xsmall: false
  };
  return (
    <RNText
      style={[
        styles.regular,
        small ? { fontSize: TEXT_SMALL } : null,
        xsmall ? { fontSize: TEXT_XSMALL } : null,
        style
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

function H1({ style, children, ...props }) {
  return (
    <RNText style={[styles.h1, style]} {...props}>
      {children}
    </RNText>
  );
}

function H2({ style, children, ...props }) {
  return (
    <RNText style={[styles.h2, style]} {...props}>
      {children}
    </RNText>
  );
}

function H3({ style, children, ...props }) {
  return (
    <RNText style={[styles.h3, style]} {...props}>
      {children}
    </RNText>
  );
}

export { Text, H1, H2, H3 };
