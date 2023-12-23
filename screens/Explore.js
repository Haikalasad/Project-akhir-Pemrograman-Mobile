// ComicScreen.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ListComic from '../components/ListComic';

const Explore = () => {
  return (
    <ScrollView>
        <ListComic />
    </ScrollView>
  );
};

export default Explore;
