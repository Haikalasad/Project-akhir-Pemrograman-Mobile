import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const BASE_API_URL = 'https://komiku-api.fly.dev/api/comic/info';

const ComicDetail = ({ route }) => {
  const [comicDetail, setComicDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const navigation = useNavigation();

  const { endpoint } = route.params;

  useEffect(() => {
    const fetchComicDetail = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}${endpoint}`);
        
        if (response.data.success && response.data.data) {
          setComicDetail(response.data.data);

        } else {
          setError('Comic data not found');
        }
      } catch (error) {
        console.error('Error fetching comic detail:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchComicDetail();
  }, [endpoint]);
  const navigateToChapterContent = (chapterEndpoint, chapterList) => {
    navigation.navigate('IsiChapter', { chapterEndpoint, chapterList });
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

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={{ uri: comicDetail.thumbnail }} style={styles.thumbnail} />
        <Text style={styles.title}>{comicDetail.title}</Text>
        <Text style={styles.infoText}>Type: {comicDetail.type}</Text>
        <Text style={styles.infoText}>Author: {comicDetail.author}</Text>
        <Text style={styles.infoText}>Status: {comicDetail.status}</Text>
        <Text style={styles.infoText}>Rating: {comicDetail.rating}</Text>
        <Text style={styles.infoText}>Genres: {comicDetail.genre?.join(', ') || 'N/A'}</Text>
      </View>

      <View style={styles.chapterContainer}>
        <Text style={styles.chapterHeading}>Chapter List:</Text>
        
        <ScrollView
          style={styles.chapterBox}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true} 
        >
          
          {comicDetail.chapter_list && comicDetail.chapter_list.length > 0 && (
            comicDetail.chapter_list.map((chapter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigateToChapterContent(chapter.endpoint)}
              >
                <View key={index} style={styles.chapterItem}>
                  <Text style={styles.chapterText}>{chapter.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  thumbnail: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  chapterContainer: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
  },
  chapterHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chapterBox: {
    height: 250,
    borderRadius: 15,
    overflow: 'hidden', 
  },
  chapterItem: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  chapterText: {
    fontSize: 16,
  },
});

export default ComicDetail;