// Home.js
import React from 'react';
import { ScrollView } from 'react-native';
import Topsection from '../components/top-section';
import PopularCarousel from '../components/carousel';
import PopularSection from '../components/popular';

const Home = () => {
  return (
    <ScrollView>
      <Topsection />
      <PopularCarousel />
      <PopularSection/>
    </ScrollView>
  );
};

export default Home;
