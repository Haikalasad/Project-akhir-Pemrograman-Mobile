import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark, selectBookmarks } from '../redux/bookmarkSlice';

const BASE_API_URL = 'https://komiku-api.fly.dev/api/comic/popular/page/1';

const PopularSection = () => {
  const [popularComics, setPopularComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bookmarks = useSelector(selectBookmarks);

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
    navigation.navigate('DetailKomik', { endpoint });
  };

  const saveComic = (comic) => {
    const isBookmarked = bookmarks.some((bookmark) => bookmark.title === comic.title);

    if (isBookmarked) {
      dispatch(removeBookmark({ title: comic.title }));
    } else {
      dispatch(addBookmark(comic));
    }
  };

  const renderComicItem = (comic) => {
    const isBookmarked = bookmarks.some((bookmark) => bookmark.title === comic.title);

    return (
      <TouchableOpacity key={comic.title} style={styles.comicItem} onPress={() => navigateToDetail(comic.endpoint)}>
        <Image source={{ uri: comic.image }} style={styles.comicImage} />
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.saveButton} onPress={() => saveComic(comic)}>
            <View style={[styles.starContainer, { backgroundColor: isBookmarked ? 'red' : 'white' }]}>
              <FontAwesome5 name="bookmark" size={24} color={isBookmarked ? 'white' : 'red'} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.comicInfo}>
          <Text style={styles.comicTitle}>{comic.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        {popularComics.slice(5,8).map((comic) => renderComicItem(comic))}
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    marginTop: -10,
    marginRight: -9,
  },
  saveButton: {
    padding: 9,
  },
  starContainer: {

    borderRadius: 6, 
    borderWidth:8, 
    borderColor: 'white',
    backgroundColor : 'white'
  },
});

export default PopularSection;
