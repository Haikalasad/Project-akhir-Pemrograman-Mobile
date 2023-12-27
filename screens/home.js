// Home.js
import React, { useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Topsection from '../components/top-section';
import PopularCarousel from '../components/carousel';
import PopularSection from '../components/popular';
import RecomendedSection from '../components/RecomendedComic';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('User state in useEffect:', user);
  
      if (!user.isAuthenticated) {
        console.log('User is not registered. Navigating to Signup.');
        navigation.navigate('Signup');
      }
    }, 100); // Tambahkan waktu tunggu 100 milidetik
    return () => clearTimeout(timer);
  }, [user, alertShown, navigation]);
  

  return (
    <ScrollView>
      <Topsection />
      <PopularCarousel />
      <RecomendedSection/>
      <PopularSection />
    </ScrollView>
  );
};

export default Home;
