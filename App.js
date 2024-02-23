import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FetchAllArticles from './FetchAllArticles';
import FetchByAuthorOrTitle from './FetchByAuthorOrTitle';
import FetchByKeyWord from './FetchByKeyWord';

export default function App() {
  const [activeComponent, setActiveComponent] = useState('allArticles');

  const displayPressedComponent = () => {
    switch (activeComponent) {
      case 'allArticles':
        return <FetchAllArticles />;
      case 'byAuthorOrTitle':
        return <FetchByAuthorOrTitle />;
      case 'byKeyWord':
        return <FetchByKeyWord />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onClick={() => setActiveComponent('allArticles')}>
        <Text>All Articles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onClick={() => setActiveComponent('byAuthorOrTitle')}>
        <Text>By Author or Title</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onClick={() => setActiveComponent('byKeyWord')}>
        <Text>By KeyWord</Text>
      </TouchableOpacity>

      {displayPressedComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: '#DDDDDD',
  },
});
