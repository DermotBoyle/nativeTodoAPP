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

import Icon from "react-native-vector-icons/FontAwesome";
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import { bold } from "ansi-colors";

const { width, height } = Dimensions.get("window");

export default class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: ""
    };
  }

  componentDidMount = () => {
    fetch("http://10.0.3.2:3000/todos")
      .then(response => response.json())
      .then(todos =>
        this.setState({
          todos
        })
      );
  };

  handleChange = Text => {
    this.setState({ newTodo: Text });
  };

  handleAddTodo = () => {
    fetch("http://10.0.3.2:3000/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo: this.state.newTodo
      })
    })
      .then(res => res.json())
      .then(todo => {
        const todos = [...this.state.todos, todo];
        this.setState({ todos, newTodo: "" });
      });
  };

  handleDelete = id => {
    fetch("http://10.0.3.2:3000/todos/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    console.log(this.state.todos);
    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Todo App</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.inputBox}
              value={this.state.newTodo}
              onChangeText={this.handleChange}
            ></TextInput>
            <TouchableHighlight
              style={styles.button}
              onPress={this.handleAddTodo}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableHighlight>
          </View>
          <ScrollView style={styles.todos}>
            {this.state.todos.map(
              (todo, id) => (
                console.log(todo.id),
                (
                  <Text style={styles.listText} key={id}>
                    {todo.todo}

                    <Icon
                      name={"trash"}
                      size={20}
                      color="#900"
                      style={styles.trash}
                      onPress={() => this.handleDelete(todo.id)}
                    />
                  </Text>
                )
              )
            )}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "skyblue",
    marginBottom: 90
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },

  todos: {
    alignContent: "space-between",
    marginTop: 60
  },

  listText: {
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
    fontSize: 20,
    color: "black"
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
