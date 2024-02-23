import React, { useEffect, useState } from 'react';
import { FlatList } from "react-native";
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const FetchByAuthorOrTitle = () => {
  const [articles, setArticles] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const APIKEY = "8d9e9917997de22ee91a9d76f4fa399c";
  const category = "general";

  const fetchingUrl = `https://gnews.io/api/v4/top-headlines?${searchType}=${searchTerm}&lang=en&country=us&max=10&apikey=${APIKEY}`;

  const fetchArticles = async () => {
    await fetch(fetchingUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticles(data.articles);
      })
      .catch(error => {
        console.log("Failed to fetch articles due to error: " + error);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, [searchTerm, searchType]);

  const fetchedArticles = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Title or Author"
        onChangeText={text => setSearchTerm(text)}
      />
      <Button
        title="Search"
        onClick={fetchArticles}
      />

      <FlatList
        data={articles}
        keyExtractor={(article) => article.url}
        renderItem={fetchedArticles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    inset_block_end: 8,
  },

  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

  content: {
    color: 'black',
    fontSize: 8,
  },

  textInput: {
    inline_size: 1000,
    color: 'black',
  },
});

export default FetchByAuthorOrTitle;
