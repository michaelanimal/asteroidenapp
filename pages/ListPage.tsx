import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import {
  Provider as PaperProvider,
  Card,
  Avatar,
  Title,
  Paragraph,
  Button,
  Searchbar,
  ActivityIndicator,
  IconButton
} from "react-native-paper";
import Constants from "expo-constants";
import { NavigationStackProp } from "react-navigation-stack";

const myData = [];

// const URL =
//   "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY";

interface ListPageProps {
  navigation: NavigationStackProp<{}>;
}

export default class ListPage extends React.Component<ListPageProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Asteroiden",
      headerRight: () => (
        <IconButton
          icon="information-outline"
          color={"blue"}
          size={25}
          onPress={() => navigation.navigate("ImpressumPage")}
        />
      )
    };
  };

  state = {
    inputText: "",
    data: [],
    isLoading: false
  };

  componentDidMount() {
    // fetch(URL)
    //   .then(response => response.json())
    //   .then(data => this.setState({ data: data.features }))
    //   .catch(error => console.log(error));
    this.setState({ isLoading: true });
    fakeHttpRequest()
      .then(response =>
        this.setState({ data: response.day_one, isLoading: false })
      );
  }

  getFilteredItems = () =>
    this.state.data.filter(
      value =>
        value.name.includes(this.state.inputText)
    );

  render() {
    const marginTop = Platform.OS === "android" ? 30 : 0;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider>
          {this.state.isLoading ? (
            <ActivityIndicator
              style={{ paddingTop: 40 }}
              animating={true}
              color={"blue"}
            />
          ) : (
            <ScrollView
              stickyHeaderIndices={[0]}
              contentContainerStyle={{ padding: 16, marginTop: marginTop }}
            >
              <View style={{ zIndex: 10, elevation: 10, paddingTop: 10 }}>
                <Searchbar
                  placeholder="Search"
                  onChangeText={query => this.setState({ inputText: query })}
                  value={this.state.inputText}
                />
              </View>

              <View style={{ height: 16 }} />

              {this.getFilteredItems().map(value => (
                <View
                  key={value.id}
                  style={{ paddingBottom: 16 }}
                >
                  <ApothekenItem
                    helligkeit={value.absolute_magnitude_h}
                    name={value.name}
                    onApothekeClicked={() =>
                      this.props.navigation.navigate("DetailPage", {
                        value: value
                      })
                    }
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </PaperProvider>
      </SafeAreaView>
    );
  }
}

function fakeHttpRequest(): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = require("../data/asteroiden.json");
      resolve(data);
    }, 3000);
  });
}

interface ItemProps {
  name: string;
  helligkeit: string;
  onApothekeClicked(): void;
}

class ApothekenItem extends React.Component<ItemProps> {
  render() {
    return (
      <>
        <Card onPress={this.props.onApothekeClicked}>
          <Card.Title
            title={this.props.name}
            subtitle={"Absolute Helligkeit: " + this.props.helligkeit + " mag"}
            left={props => <Avatar.Icon {...props} icon="rocket" />}
          />

        </Card>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
