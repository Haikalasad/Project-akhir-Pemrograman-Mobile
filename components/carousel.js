import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

const BASE_API_URL = 'https://komiku-api.fly.dev/api/comic/popular/page/1';

const PopularCarousel = () => {
    const [popularComics, setPopularComics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularComics = async () => {
            try {
                const response = await axios.get(BASE_API_URL);
                setPopularComics(response.data.data);
            } catch (error) {
                console.error('Error fetching popular comics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularComics();
    }, []);

    const { width } = Dimensions.get('window');

    const renderCarouselItem = ({ item }) => (
        <TouchableOpacity style={styles.carouselItem}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
            <Text style={styles.carouselTitle}>{item.title}</Text>

        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const visibleItems = 10;
    const limitedPopularComics = popularComics.slice(0, visibleItems);

    return (
        <Carousel
            data={limitedPopularComics}
            renderItem={renderCarouselItem}
            sliderWidth={width}
            itemWidth={width - 15}
            containerCustomStyle={styles.carouselContainer} 
        />
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselContainer: {
        marginTop: 10,
    },
    carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '100%',
        height: 230,
        borderRadius: 15,
    },
    carouselTitle: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PopularCarousel;
