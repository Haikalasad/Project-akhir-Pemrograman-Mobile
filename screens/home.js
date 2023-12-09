// Home.js
import React from 'react';
import { ScrollView } from 'react-native';
import Topsection from '../components/top-section';
import PopularCarousel from '../components/carousel';
import PopularSection from '../components/popular';
import RecomendedtSection from '../components/RecomendedComic';

const Home = () => {
  return (
    <ScrollView>
      <Topsection />
      <PopularCarousel />
      <RecomendedtSection/>
      <PopularSection/>
    </ScrollView>
  );
};

export default Home;
