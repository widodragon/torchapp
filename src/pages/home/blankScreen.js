import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

const BlankScreen = () => {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        translucent={false}
        hidden={true}
      />
      <View style={styles.container}></View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default BlankScreen;
