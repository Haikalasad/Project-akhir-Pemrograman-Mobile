import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const Topsection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/564x/76/e4/40/76e440d8d0019f94affe011efe26d76c.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 16, marginRight: 14,color: "gray"}}>Selamat datang</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 14 }}>
            Mira Suxi
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.menu} onPress={() => console.log('Hamburger pressed')}>
        <Ionicons name="menu-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
    marginTop : 35
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10, 
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  menu: {
    marginLeft: 10, 
  },
});

export default Topsection;
