import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const BASE_API_URL = 'https://komiku-api.fly.dev/api/comic/popular/page/1';

const PopularSection = () => {
  const [popularComics, setPopularComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPopularComics = async () => {
      try {
        const response = await axios.get(BASE_API_URL);
        setPopularComics(response.data.data);
      } catch (error) {
        console.error('Error fetching popular comics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularComics();
  }, []);

  const navigateToDetail = (endpoint) => {
    // Gunakan fungsi navigate untuk berpindah ke halaman DetailKomik dengan mengirim parameter endpoint
    navigation.navigate('DetailKomik', { endpoint });
  };

  const saveComic = (endpoint) => {
    // Simpan Komik
    navigation.navigate('SaveKomik', { endpoint });
 };

  const renderComicItem = (comic) => (
    <TouchableOpacity key={comic.title} style={styles.comicItem} onPress={() => navigateToDetail(comic.endpoint)}>
      <Image source={{ uri: comic.image }} style={styles.comicImage} />
      <View style={styles.comicInfo}>
        <Text style={styles.comicTitle}>{comic.title}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={() => saveComic(comic.endpoint)}>
          <Icon name='star' type='font-awesome' color='gray' />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Populer Komik</Text>
      <View style={styles.comicsContainer}>
        {popularComics.slice(-3).map((comic) => renderComicItem(comic))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color : "red",
    marginLeft : 10
  },
  comicsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comicItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 20,
  },
  comicImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    gap : 10
  },
  comicTitle: {
    marginTop: 8,
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#333', 
    textAlign: 'left', 
  },
  saveButton: {
    padding: 8,
    marginTop: 6,
 },
});

export default PopularSection;
