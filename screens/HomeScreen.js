/* screen/HomeScreen.js */

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import {fetchMovies} from "../services/services";

const screen = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchNow, setSearchNow] = useState(false);


  useEffect(() => {
    fetchMovies(searchTerm, movies).then((data) => {
      setMovies(data);
    });
  }, [searchNow]);


  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder={'search movies'}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onChange={()=>setSearchNow(!searchNow)}
          />
          <EvilIcons
              name={'search'}
              size={20}
              color="black"
              style={{ alignSelf: 'center', marginHorizontal: 20 }}
            />
        </View>

        <View style={styles.movieListCard}>
          <FlatList
            data={movies}
            numColumns={1}
            renderItem={({ item}) => {
              return (
                <View >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Movie', { movie: item });
                    }}>
                    <View style={styles.movieCard}>
                      <Image style={styles.MovieImage}
                        source={{
                          uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`,
                        }}
                      />
                      <View style={{flex:3,height:125}}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontWeight:'bold',color: 'white', width: screen.width * 0.5,paddingLeft: 10,paddingVertical:5}}>{item.title}</Text>
                          <Text style={{fontWeight:'bold',color: 'green',marginVertical:5}}>{item.vote_average}</Text>
                        </View> 
                        <Text style={{fontWeight:'bold',color: 'white', width: screen.width * 0.5,paddingLeft: 10,paddingTop:25,paddingBottom:5}}>{item.release_date}</Text>
                        
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
   
  },
  MovieImage: {  
    flex:1 ,
    width:window.width ,
    borderRadius:10,
    height: window.height,
  },
  inputCard: {
    position: 'absolute',
    margin: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 100,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  movieCard: {
    backgroundColor: '#212121',
    borderColor: '#212121',
    flex:1,
    margin: 5,
    borderRadius:10,
    flexDirection: 'row',
    borderWidth: 5,
  },
  movieListCard: {
    top: screen.height * 0.10,
  },
});