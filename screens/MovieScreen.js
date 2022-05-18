/* screen/MovieScreen.js */
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
import Constants from 'expo-constants';
import BackButton from '../components/GoBackButton';
import Details from '../components/Details';
const screen = Dimensions.get('window');
import { fetchCredits } from "../services/services.js";

export default function MovieScreen({ navigation, route }) {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [director, setDirector] = useState('');
  const { movie } = route.params;

  useEffect(() => {
    setLoading(true);
    fetchCredits(movie.id).then((data) => {
      setCredits(data.credits);
      setDirector(data.director);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <BackButton navigation={navigation} />
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w780${movie?.poster_path}`,
          }}
          style={styles.banner}
        />
        <Details movie={movie} director={director} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { width: window.width, height: 500 },
  container: {
    flex:1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#212121',
  }
});
