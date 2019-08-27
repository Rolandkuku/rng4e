import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableNativeFeedback, Linking } from "react-native";

import { TOS_URL } from "../utils";
import { MARGIN_BASE, COLOR_WHITE } from "../styles";

function TOSLink() {
  return (
    <TouchableNativeFeedback
      style={{ padding: MARGIN_BASE }}
      onPress={() => Linking.openURL(TOS_URL)}
    >
      <Icon
        name="question-circle"
        style={{ marginRight: MARGIN_BASE }}
        size={15}
        color={COLOR_WHITE}
      />
    </TouchableNativeFeedback>
  );
}

export { TOSLink };
