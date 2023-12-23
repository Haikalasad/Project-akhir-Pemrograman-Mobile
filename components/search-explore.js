import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SearchExplore = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search Comics"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
});

export default SearchExplore;