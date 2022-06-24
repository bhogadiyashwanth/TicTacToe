import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {MainStackParamList} from '../route/types';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

type Props = NativeStackScreenProps<MainStackParamList, 'Home Page'>;

const HomePage = ({navigation}: Props) => {
  const startGame = () => {
    navigation.navigate('Game');
  };
  return (
    <View
      style={[
        globalStyles.fullHW,
        globalStyles.flexCenter,
        globalStyles.backgroundWhite,
      ]}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Tic Tac Toe</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button color={colors.primary} onPress={startGame} title="Play" />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  titleWrapper: {flex: 7, ...globalStyles.flexCenter},
  buttonWrapper: {flex: 3, ...globalStyles.flexCenter},
  title: {fontSize: 30, fontWeight: '600', color: 'black'},
});
