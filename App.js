/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Dimensions
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

const { width, height } = Dimensions.get("window");

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [1, 2, 3],
      newTodo: ""
    };
  }

  handleChange = Text => {
    this.setState({ newTodo: Text });
  };

  handleOnPress() {
    const todos = [...this.state.todos, this.state.newTodo];
    this.setState({ todos, newTodo: "" });
  }

  handleDelete(e) {
    const value = e.target.value;
    const todos = this.state.todos.pop();
    this.setState({ todos, newTodo: "" });
  }

  render() {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.form}>
          <TextInput
            style={styles.inputBox}
            value={this.state.newTodo}
            onChangeText={this.handleChange.bind(this)}
          ></TextInput>
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleOnPress.bind(this)}
          >
            <Text style={styles.buttonText}>Tap Me</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.todos}>
          {this.state.todos.map((todo, i) => (
            <Text
              style={styles.listText}
              onPress={this.handleDelete.bind(this)}
              key={i}
            >
              {todo}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },

  todos: {
    marginTop: 60
  },

  listText: {
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  },

  form: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  inputBox: {
    flexDirection: "row",
    flex: 0.7,
    borderRadius: 10,
    borderBottomWidth: 1,
    marginRight: 10
  },

  buttonText: {
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    height: 40,
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 15,
    flex: 0.25,
    marginLeft: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  sectionContainer: {
    flex: 1,
    padding: 20
  }
});

export default App;
