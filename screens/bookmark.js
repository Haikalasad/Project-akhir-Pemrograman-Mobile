// BookmarkScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectBookmarks } from '../redux/bookmarkSlice';

const BookmarkScreen = () => {
  const navigation = useNavigation();
  const bookmarks = useSelector(selectBookmarks);

  const navigateToDetail = (endpoint) => {
    navigation.navigate('DetailKomik', { endpoint });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmarks</Text>
      {bookmarks.length === 0 ? (
        <Text style={styles.emptyText}>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => (item.id ? item.id.toString() : item.title)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToDetail(item.endpoint)}>
              <View style={styles.bookmarkItem}>
                <Image source={{ uri: item.image }} style={styles.comicImage} />
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
  bookmarkItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  comicImage: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 5, // Adjust the border radius as needed
    marginRight: 10, // Adjust the margin as needed
  },
});

export default BookmarkScreen;
