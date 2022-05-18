import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get('window');

const Details = ({ movie, director }) => {
    return (
      <View style={styles.infoCard}>
        <View style={styles.textInfo}>
          <Text style={styles.title}>{movie.original_title}</Text>
          <Text style={styles.description}>DESCRIPTION :</Text>
          <Text style={{ color: 'white', fontSize: 15 }}>
            {movie.overview}
          </Text>
        </View> 
      </View>
    );
};
export default Details;

const styles = StyleSheet.create({
  infoCard: {
    left:-10,
    top: 10,
    paddingHorizontal:15,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textInfo: {
    left: 10,
    right: 10,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  description:{
    marginTop:5,
    color:'white',
    fontWeight:'bold',
    fontSize:20
  },
  rating:{
    marginTop:5,
    fontSize:20,
    color: 'white',
    fontWeight: 'bold'
  }
});