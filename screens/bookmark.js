import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ListComic from '../components/ListComic';
import PopularSection from '../components/popular';
import RecomendedSection from '../components/RecomendedComic';
import { fetchBookmark, storeBookmark, deleteBookmark } from '../redux/bookmarkSlice';

const Bookmark = () => { 
    const dispatch = useDispatch(); 
    const [isLoading, setIsLoading] = useState(true); 
    const bookmarkList = useSelector((state) => state.bookmark.data);

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchBookmark({ username: ' ', isComplete: "0" }))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, [dispatch]);
    
    const handleBookmark = async (id, title, cover, author, genre, rating, isComplete) => {
        setIsLoading(true);
        const payload = {
            id,
            title,
            cover,
            author,
            genre,
            rating,
            isComplete: isComplete ? "0" : "1"
        };
        await dispatch(storeBookmark(payload));
        setIsLoading(false);
    };
    
    const handleDeleteBookmark = async (id) => {
        setIsLoading(true);
        await dispatch(deleteBookmark({ id, username: ' ', completed: true }));
        setIsLoading(false);
    };
    
    return (
        <View>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    {bookmarkList.map((bookmark) => (
                        <View key={bookmark.id}>
                            <Text>{bookmark.title}</Text>
                            <Text>{bookmark.author}</Text>
                            <Text>{bookmark.genre}</Text>
                            <Text>{bookmark.rating}</Text>
                            {/* <Button onClick={() => handleBookmark(bookmark.id, bookmark.title, bookmark.cover, bookmark.author, bookmark.genre, bookmark.rating, bookmark.isComplete)}>
                                <Text>{bookmark.isComplete ? 'Unmark as Favorite' : 'Mark as Favorite'}</Text>
                            </Button>
                            <Button onClick={() => handleDeleteBookmark(bookmark.id)}>Delete</Button> */}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default Bookmark;