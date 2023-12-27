import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const IsiChapter = ({ route }) => {
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapterList, setChapterList] = useState([]);
  const navigation = useNavigation();

  const { chapterEndpoint } = route.params;  // Remove `initialChapterList`

  useEffect(() => {
    const fetchChapterImages = async () => {
      try {
        const response = await axios.get(`https://komiku-api.fly.dev/api/comic/chapter/${chapterEndpoint}`);

        if (response.data.success && response.data.data) {
          const fetchedChapterList = response.data.data.chapter_list || [];
          setChapterList(fetchedChapterList);
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

  const goToNextChapter = () => {
    const currentChapterIndex = chapterList.findIndex(
      chapter => chapter && chapter.endpoint === chapterEndpoint
    );

    if (currentChapterIndex !== -1 && currentChapterIndex < chapterList.length - 1) {
      const nextChapter = chapterList[currentChapterIndex + 1];
      navigation.navigate('IsiChapter', { chapterEndpoint: nextChapter.endpoint });
    }
  };

  

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

        <TouchableOpacity onPress={goToNextChapter} style={styles.nextButton}>
          <Text style={styles.buttonText}>Next Chapter</Text>
        </TouchableOpacity>
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
  nextButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default IsiChapter;
