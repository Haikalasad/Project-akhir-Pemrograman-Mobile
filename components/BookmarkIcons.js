// BookmarkIcon.js
import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const BookmarkIcon = ({ isBookmarked, onPress }) => {
  const [localIsBookmarked, setLocalIsBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setLocalIsBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handlePress = useCallback(() => {
    setLocalIsBookmarked((prev) => !prev);
    onPress(!localIsBookmarked);
  }, [onPress, localIsBookmarked]);

  return (
    <TouchableOpacity style={styles.saveButton} onPress={handlePress}>
      <View style={[styles.starContainer, { backgroundColor: localIsBookmarked ? 'red' : 'white' }]}>
        <FontAwesome5 name="bookmark" size={24} color={localIsBookmarked ? 'white' : 'red'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    padding: 9,
  },
  starContainer: {
    borderRadius: 6,
    borderWidth: 4,  // Changed borderWidth to 1
    borderColor: 'white',
    backgroundColor: 'white',
  },
});

export default BookmarkIcon;
