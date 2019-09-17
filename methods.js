import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";
import { bold } from "ansi-colors";

export default class Methods extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch("https://wwww.reddit.com/.json", {
      Accept: "application/json"
    })
      .then(res => res.json())
      .then(data => this.setState({ posts: data.data.children }));
  }
  render() {
    return (
      <View>
        <Text style={styles.title}>Some text here</Text>
        <View>
          {this.state.posts.map(post => (
            <Text>{post.data.author}</Text>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold"
  }
});
