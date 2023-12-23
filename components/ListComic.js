// ListComic.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SearchExplore from '../components/search-explore';
import CategoryExplore from '../components/category-explore';

const BASE_API_URL = 'https://komiku-api.fly.dev/api/comic/list';
const BASE_API_SEARCH = 'https://komiku-api.fly.dev/api/comic'

const ListComic = () => {
  const [comicList, setComicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchComicList = async () => {
      try {
        let apiUrl = BASE_API_URL;

        // Include category filter if selected
        if (selectedCategory) {
          apiUrl += `?filter=${selectedCategory.toLowerCase()}`;
        }

        const response = await axios.get(apiUrl);
        setComicList(response.data.data);
      } catch (error) {
        console.error('Error fetching comic list:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchComicList();
  }, [selectedCategory]); // Trigger the fetch when the selected category changes

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`${BASE_API_SEARCH}/search/${encodeURIComponent(query)}`);
      setComicList(response.data.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const renderComicItem = ({ item }) => (
    <TouchableOpacity style={styles.comicItem} onPress={() => showComicDetail(item.endpoint)}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const showComicDetail = (endpoint) => {
    navigation.navigate('DetailKomik', { endpoint });
  };

  const handleSearchChange = (query) => {
    setSearchText(query);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
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
    <View style={styles.container}>
      <SearchExplore onSearch={handleSearch} onChange={handleSearchChange} />
      <CategoryExplore
        categories={['Manga', 'Manhwa', 'Manhua']}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      {comicList.length === 0 && <Text>No matching comics found</Text>}
      {comicList.length > 0 && (
        <FlatList data={comicList} keyExtractor={(item) => item.title} renderItem={renderComicItem} />
      )}
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
