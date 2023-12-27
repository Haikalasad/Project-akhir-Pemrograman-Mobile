import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const IsiChapter = ({ route }) => {
  const [chapterImages, setChapterImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapterList, setChapterList] = useState([]);
  const [chapterTitle, setChapterTitle] = useState(''); // Tambahkan state untuk menyimpan judul chapter
  const navigation = useNavigation();

  const { chapterEndpoint, chapterList: initialChapterList } = route.params;

  useEffect(() => {
    const fetchChapterImages = async () => {
      try {
        const response = await axios.get(`https://komiku-api.fly.dev/api/comic/chapter/${chapterEndpoint}`);

        if (response.data.success && response.data.data) {
          const fetchedChapterList = response.data.data.chapter_list || [];
          setChapterList(fetchedChapterList);
          setChapterImages(response.data.data.image);
          setChapterTitle(response.data.data.title || ''); // Simpan judul chapter
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
    const currentChapterIndex = initialChapterList.findIndex(
      (chapter) => chapter && chapter.endpoint === chapterEndpoint
    );

    if (currentChapterIndex !== -1 && currentChapterIndex < initialChapterList.length - 1) {
      const nextChapter = initialChapterList[currentChapterIndex - 1];
      navigation.navigate('IsiChapter', { chapterEndpoint: nextChapter.endpoint, chapterList: initialChapterList });
    }
  };

  const goToPrevChapter = () => {
    const currentChapterIndex = initialChapterList.findIndex(
      (chapter) => chapter && chapter.endpoint === chapterEndpoint
    );

    if (currentChapterIndex !== -1 && currentChapterIndex < initialChapterList.length + 1) {
      const nextChapter = initialChapterList[currentChapterIndex + 1];
      navigation.navigate('IsiChapter', { chapterEndpoint: nextChapter.endpoint, chapterList: initialChapterList });
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
        {chapterTitle.length > 0 && (
          <Text style={styles.title}>{chapterTitle}</Text>
        )}
        {chapterImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.chapterImage} />
        ))}
    
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goToPrevChapter} style={styles.button}>
            <Text style={styles.buttonText}>Prev Chapter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextChapter} style={styles.button}>
            <Text style={styles.buttonText}>Next Chapter</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '48%', // Gunakan lebar kurang dari 50% agar ada ruang di antara tombol
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default IsiChapter;
