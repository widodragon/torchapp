import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {hp} from '../../helpers/responsive';
import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from 'react-native-admob';
import {addClickToGlobal} from '../../redux/actions/rootAction';
import {connect} from 'react-redux';
import {getAdmobData} from '../../services/getAdmob';
import {COLOR4} from '../../helpers/colors';

const FlashScreen = props => {
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
    addClickToGlobal({
      ...props,
      body: 0,
    });
  }, []);

  const openBlankScreen = () => {
    addClickToGlobal({
      ...props,
      body: props.numClick + 1,
    });
    if (admobData) {
      if (admobData.isEnable) {
        if (props.numClick === 1) {
          AdMobInterstitial.setAdUnitID(admobData.interestitial);
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
        } else if (props.numClick % 3 === 0) {
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
    props.navigation.navigate('BlankScreen');
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
      <TouchableOpacity onPress={() => openBlankScreen()}>
        <Image
          source={require('../../assets/images/button.png')}
          style={{marginTop: hp(5), width: hp(22), height: hp(22)}}
          resizeMode="center"
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR4,
  },
});

const mapStateToProps = state => {
  let {rootReducer} = state;
  return {
    ...rootReducer,
  };
};
export default connect(mapStateToProps)(FlashScreen);
