// Home.js
import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Topsection from '../components/top-section';
import PopularCarousel from '../components/carousel';
import PopularSection from '../components/popular';
import RecomendedtSection from '../components/RecomendedComic';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Signup");
    }
  }, [user]);
  
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
