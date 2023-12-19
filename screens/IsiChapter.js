import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView,Text } from 'react-native';
import axios from 'axios';

const IsiChapter = ({ route }) => {
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { chapterEndpoint } = route.params;

  useEffect(() => {
    const fetchChapterImages = async () => {
      try {
        const response = await axios.get(`https://komiku-api.fly.dev/api/comic/chapter/${chapterEndpoint}`);
        
        if (response.data.success && response.data.data) {
          setChapterImages(response.data.data.image);
        } else {
          setError('Chapter content not found');
        }
      } catch (error) {
        console.error('Error fetching chapter content:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchChapterImages();
  }, [chapterEndpoint]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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
        {chapterImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.chapterImage} />
        ))}
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
  chapterImage: {
    width: '100%',
    height: 300, 
    marginBottom: 10,
  },
});

export default IsiChapter;
