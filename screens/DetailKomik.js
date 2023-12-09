// Import statements
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const BASE_API_URL = 'https://komiku-api.fly.dev/api/comic/info/';

const ComicDetail = ({ route }) => {
  const [comicDetail, setComicDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { endpoint } = route.params;

  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}${endpoint}`);
        setComicDetail(response.data);
      } catch (error) {
        console.error('Error fetching comic detail:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchComicDetail();
  }, [endpoint]);

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

  return (
    <View style={styles.container}>
      <Image source={{ uri: comicDetail.image }} style={styles.thumbnail} />
      <Text style={styles.title}>{comicDetail.title}</Text>
      <Text>{comicDetail.description}</Text>
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
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ComicDetail;
