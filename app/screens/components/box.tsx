import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';

type Props = {
  flag: number;
  onPress: () => void;
};

const X_SIGN = 'X';
const O_SIGN = 'O';

const Box = ({flag, onPress}: Props) => {
  return (
    <TouchableOpacity disabled={flag !== 0} onPress={onPress}>
      <View style={[styles.container, globalStyles.flexCenter]}>
        {!!flag && (
          <Text style={styles.sign}>{flag === 1 ? O_SIGN : X_SIGN}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {height: 100, width: 100, borderColor: 'black', borderWidth: 2},
  sign: {fontSize: 40, color: 'black'},
});
