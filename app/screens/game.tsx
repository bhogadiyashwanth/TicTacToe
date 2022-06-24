import React, {useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Status} from '../models/enums/status.enums';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import Box from './components/box';

const INITIAL_BOARD = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const PLAYER_ONE: number = 1;
const PLAYER_TWO: number = 2;
const MAX_POSSIBLE_MOVES = 9;

const Game = () => {
  const [boardData, setBoardData] = useState([...INITIAL_BOARD]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(PLAYER_ONE);
  const [gameStatus, setGameStatus] = useState<Status>(Status.RUNNING);
  const clickCounter = useRef(0);

  const onSelect = (index: number) => {
    clickCounter.current = clickCounter.current + 1;
    const updatedBoardData = [...boardData];
    updatedBoardData[index] = currentPlayer;
    if (checkIfVictory(index, updatedBoardData))
      setGameStatus(
        currentPlayer === PLAYER_ONE
          ? Status.PLAYER_ONE_WINS
          : Status.PLAYER_TWO_WINS,
      );
    else if (clickCounter.current === MAX_POSSIBLE_MOVES)
      setGameStatus(Status.TIE);
    else
      setCurrentPlayer(currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE);
    setBoardData(updatedBoardData);
  };

  const checkIfVictory = (index: number, board: Array<number>): boolean => {
    const x = Math.floor(index / 3),
      y = index % 3;
    // checks in the same column of the recently clicked box
    if (board[y] === board[3 + y] && board[y] === board[6 + y]) return true;
    // checks in the same row of the recently clicked box
    if (board[3 * x] === board[3 * x + 1] && board[3 * x] === board[3 * x + 2])
      return true;
    if (index % 2 === 0) {
      // checks along both diagonals, If middle box is clicked
      if (index === 4) {
        return (
          (board[0] === board[4] && board[4] === board[8]) ||
          (board[2] === board[4] && board[4] === board[6])
        );
      } else {
        // checks along the diagonal
        return board[4] === board[index] && board[4] === board[8 - index];
      }
    }
    return false;
  };

  const resetGame = () => {
    setBoardData([...INITIAL_BOARD]);
    clickCounter.current = 0;
    setCurrentPlayer(PLAYER_ONE);
    setGameStatus(Status.RUNNING);
  };

  const mapBoxes = () => {
    return boardData.map((eachBox, index) => (
      <Box key={index} flag={eachBox} onPress={() => onSelect(index)} />
    ));
  };

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        globalStyles.flexCenter,
        globalStyles.backgroundWhite,
      ]}>
      <Text style={styles.playerTitle}>Player {currentPlayer}'s turn</Text>
      <View style={styles.matrixWrapper}>{mapBoxes()}</View>
      {gameStatus !== Status.RUNNING && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultFont}>{gameStatus}</Text>
          <Button
            color={colors.primary}
            title={'Play Again'}
            onPress={resetGame}
          />
        </View>
      )}
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  matrixWrapper: {
    width: 300,
    height: 300,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  resultContainer: {
    position: 'absolute',
    ...globalStyles.flexCenter,
    ...globalStyles.fullHW,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-evenly',
  },
  resultFont: {fontSize: 40, color: 'white', fontWeight: 'bold'},
  playerTitle: {fontSize: 20, paddingVertical: 20, color: 'black'},
});
