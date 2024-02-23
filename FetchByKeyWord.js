import React, { useEffect, useState } from 'react';
import { FlatList } from "react-native";
import { View, Text } from 'react-native';
import { Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';



const FetchByKeyWord = () => {

    const [articles, setArticles] = useState([]);
    const [keyWord, setKeyWord] = useState("");
    const APIKEY = "8d9e9917997de22ee91a9d76f4fa399c";
    const category = "general";

    const fetchingUrl = `https://gnews.io/api/v4/top-headlines?q=${keyWord}&lang=en&country=us&max=10&apikey=${APIKEY}`;
    const fetchArticles= async ()=>{
        await fetch(fetchingUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setArticles(data.articles);
        })
        .catch(error => {
            console.log("Failed to fetch articles due to error: " + error);
        })
    }

    useEffect(()=>{
        
        fetchArticles();
    },[keyWord])
    

    const fetchedArticles = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <Image style={styles.image} source={{ uri: item.image }} />
        </View>
    );

    return (
        <View>
            <TextInput

                placeholder="Enter  keyword"
                onChangeText={(text) => setKeyWord(text)}
                value={keyWord} />

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
    )
}
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

    image: {
        block_size: 100,
    },

    input: {
        block_size: 40,
        borderColor: 'gray',
        inline_size: 1,
        inset_block_end: 16,
        padding: 8,
    },
});



export default FetchByKeyWord;