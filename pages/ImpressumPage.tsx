import React from "react";
import { View, Text } from "react-native";

export default class ImpressumPage extends React.Component {
  static navigationOptions = {
    title: "Impressum"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Impressum:</Text>
        <Text>Diese App wird entwickelt von Michael Thier.</Text>
        <Text>Daten werden bezogen von https://api.nasa.gov/</Text>
      </View>
    );
  }
}
