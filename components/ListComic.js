import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BASE_API_URL = 'https://komiku-api.fly.dev/api/comic/list';

const ListComic = () => {
  const [comicList, setComicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchComicList = async () => {
      try {
        const response = await axios.get(BASE_API_URL);
        setComicList(response.data.data);
      } catch (error) {
        console.error('Error fetching comic list:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchComicList();
  }, []);

  const renderComicItem = ({ item }) => (
    <TouchableOpacity style={styles.comicItem} onPress={() => showComicDetail(item.endpoint)}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const showComicDetail = (endpoint) => {
    // Navigasi ke layar detail komik dengan parameter endpoint
    navigation.navigate('DetailKomik', { endpoint });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (comicList.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No comics available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comicList}
        keyExtractor={(item) => item.title}
        renderItem={renderComicItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  comicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
});

export default ListComic;
