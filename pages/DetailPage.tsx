import { View, Text, Linking, Platform } from "react-native";
import React from "react";
import {
  Card,
  Avatar,
  Title,
  Paragraph,
  Button,
  List,
  Divider
} from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";

interface DetailPageProps {
  navigation: NavigationStackProp<{ value: any }>;
}

export default class DetailPage extends React.Component<DetailPageProps> {

  static navigationOptions = {
    title: 'Details',
  };


  render() {
    const value = this.props.navigation.getParam("value");

    const { name, absolute_magnitude_h,nasa_jpl_url, is_potentially_hazardous_asteroid } = value;
    const { estimated_diameter_min, estimated_diameter_max } = value.estimated_diameter.kilometers

    return (
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Content>
            <Title>{name}</Title>
            <Paragraph>{"Absolute Helligkeit: " + absolute_magnitude_h + " mag"}</Paragraph>
            <List.Section>
            

              {estimated_diameter_min && (
                <List.Item
                  title={"Durchmesser min. [km]: " + estimated_diameter_min}
                />
              )}
              {estimated_diameter_max && (
                <List.Item
                  title={"Durchmesser max. [km]: " + estimated_diameter_max}
                />
              )}

              {is_potentially_hazardous_asteroid && (
                <List.Item
                  title={"Gefährlicher Asteroid: " + is_potentially_hazardous_asteroid            
                }
                />
              )}

              {nasa_jpl_url && (
                <List.Item
                  onPress={() => Linking.openURL(nasa_jpl_url)}
                  title={"Datenblatt: " + nasa_jpl_url}
                  left={() => <List.Icon color="#000" icon="web" />}
                />
              )}
              
              
            </List.Section>
          </Card.Content>
        </Card>
      </View>
    );
  }
}
