import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {hp, wp} from '../../helpers/responsive';
import Torch from 'react-native-torch';
import BackgroundTimer from 'react-native-background-timer';
import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from 'react-native-admob';
import {addClickToGlobal} from '../../redux/actions/rootAction';
import {connect} from 'react-redux';
import {getAdmobData} from '../../services/getAdmob';
import {COLOR2, COLOR4} from '../../helpers/colors';

const tenSecond = 10000;
const twentySecond = 20000;
const Home = props => {
  const [normalValue, setNormalValue] = React.useState(false);
  const [tenDuration, setTenDuration] = React.useState(tenSecond);
  const [timerOnTen, setTimerOnTen] = React.useState(false);
  const [twentyDuration, setTwentyDuration] = React.useState(twentySecond);
  const [timerOnTwenty, setTimerOnTwenty] = React.useState(false);
  const [admobData, setAdmobData] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      let res = await getAdmobData();
      setAdmobData(res);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props]);

  React.useEffect(() => {
    if (admobData) {
      if (admobData.isEnable) {
        if (props.numClick === 1) {
          AdMobInterstitial.setAdUnitID(admobData.interestitial);
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
        } else if (
          props.numClick % 2 === 0 &&
          props.numClick !== 0 &&
          props.numClick !== 2
        ) {
          let randomAds = Math.floor(Math.random() * 2);
          if (randomAds % 2 === 0) {
            AdMobInterstitial.setAdUnitID(admobData.interestitial);
            AdMobInterstitial.requestAd().then(() =>
              AdMobInterstitial.showAd(),
            );
          } else {
            AdMobRewarded.setAdUnitID(admobData.reward);
            AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
          }
        }
      }
    }
  }, [props.numClick, admobData]);

  React.useEffect(() => {
    if (tenDuration === 0) {
      setTimerOnTen(false);
      Torch.switchState(false);
      setTenDuration(tenSecond);
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [tenDuration]);

  React.useEffect(() => {
    if (twentyDuration === 0) {
      setTimerOnTwenty(false);
      Torch.switchState(false);
      setTwentyDuration(twentySecond);
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [twentyDuration]);

  const openNormalLight = normalValue => {
    setTimerOnTwenty(false);
    setTimerOnTen(false);
    setNormalValue(normalValue);
    Torch.switchState(normalValue);
    addClickToGlobal({
      ...props,
      body: props.numClick + 1,
    });
  };

  const setTenDurationProcess = value => {
    setTimerOnTwenty(false);
    setNormalValue(false);
    setTimerOnTen(value);
    Torch.switchState(value);
    if (value) {
      BackgroundTimer.runBackgroundTimer(() => {
        setTenDuration(secs => {
          if (secs > 0) return secs - 1;
          else return 0;
        });
      }, tenDuration);
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    addClickToGlobal({
      ...props,
      body: props.numClick + 1,
    });
  };

  const setTwentyDurationProcess = value => {
    setTimerOnTen(false);
    setNormalValue(false);
    setTimerOnTwenty(value);
    Torch.switchState(value);
    if (value) {
      BackgroundTimer.runBackgroundTimer(() => {
        setTwentyDuration(secs => {
          if (secs > 0) return secs - 1;
          else return 0;
        });
      }, twentyDuration);
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    addClickToGlobal({
      ...props,
      body: props.numClick + 1,
    });
  };

  return (
    <View style={styles.container}>
      {admobData && admobData.isEnable ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 'auto',
            zIndex: 1000,
          }}>
          <AdMobBanner
            adSize="smartBannerLandscape"
            adUnitID={admobData.banner}
            onAdFailedToLoad={error => console.error(error)}
          />
        </View>
      ) : null}
      <View style={styles.top}>
        {normalValue || timerOnTen || timerOnTwenty ? (
          <Image
            source={require('../../assets/images/bulp_on.png')}
            style={{marginTop: hp(5), width: hp(25), height: hp(25)}}
            resizeMode="center"
          />
        ) : (
          <Image
            source={require('../../assets/images/bulp_off.png')}
            style={{marginTop: hp(5), width: hp(25), height: hp(25)}}
            resizeMode="center"
          />
        )}
      </View>
      <View style={styles.middle}>
        <TouchableOpacity
          onPress={() => setTenDurationProcess(!timerOnTen)}
          style={styles.normalFlash}>
          <Image
            source={require('../../assets/images/ten_duration.png')}
            style={{marginTop: hp(5), width: hp(25), height: hp(25)}}
            resizeMode="center"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTwentyDurationProcess(!timerOnTwenty)}
          style={styles.normalFlash}>
          <Image
            source={require('../../assets/images/twenty_duration.png')}
            style={{marginTop: hp(5), width: hp(25), height: hp(25)}}
            resizeMode="center"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => openNormalLight(!normalValue)}
          style={styles.normalFlash}>
          <Image
            source={require('../../assets/images/normal_button.png')}
            style={{marginTop: hp(5), width: hp(22), height: hp(22)}}
            resizeMode="center"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    margin: 2,
  },
  top: {
    flex: 0.3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR2,
    marginTop: hp(5),
  },
  middle: {
    flex: 0.3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: COLOR4,
  },
  bottom: {
    flex: 0.4,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR4,
  },
  normalFlash: {
    width: wp(30),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  let {rootReducer} = state;
  return {
    ...rootReducer,
  };
};
export default connect(mapStateToProps)(Home);
