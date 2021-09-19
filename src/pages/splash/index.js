import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {hp} from '../../helpers/responsive';
import * as Animatable from 'react-native-animatable';
import {COLOR1} from '../../helpers/colors';
import {CommonActions} from '@react-navigation/native';

const Splash = props => {
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setTimeout(() => {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        });
        props.navigation.dispatch(resetAction);
      }, 2000);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props]);

  return (
    <View style={style.container}>
      <Animatable.View animation="jello" iterationCount={2}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: hp(50), height: hp(50)}}
          resizeMode="center"
        />
      </Animatable.View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
