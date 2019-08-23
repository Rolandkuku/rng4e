import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableNativeFeedback, Linking } from "react-native";

import { TOS_URL } from "../utils";
import { BASE_MARGIN, COLOR_WHITE } from "../styles";

function TOSLink() {
  return (
    <TouchableNativeFeedback
      style={{ padding: BASE_MARGIN }}
      onPress={() => Linking.openURL(TOS_URL)}
    >
      <Icon
        name="question-circle"
        style={{ marginRight: BASE_MARGIN }}
        size={15}
        color={COLOR_WHITE}
      />
    </TouchableNativeFeedback>
  );
}

export { TOSLink };
