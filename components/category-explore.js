import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryExplore = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.categoryContainer}>
      <Text>Categories:</Text>
      <View style={styles.categoryList}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryItem, category === selectedCategory && styles.selectedCategory]}
            onPress={() => onSelectCategory(category)}
          >
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 16,
  },
  categoryList: {
    flexDirection: 'row',
    marginTop: 8,
  },
  categoryItem: {
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: '#e0e0e0',
  },
});

export default CategoryExplore;