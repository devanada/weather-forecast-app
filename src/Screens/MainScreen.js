/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Card} from 'react-native-elements';
import axios from 'axios';

import ForecastCard from '../Components/ForecastCard';
import {CustomLoading} from '../Components/CustomLoading';

const MainScreen = ({navigation}) => {
  const [forecast, setForecast] = useState([]);
  const [geolocation, setGeolocation] = useState({});
  const [current, setCurrent] = useState({});
  const [data, setData] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      Geolocation.getCurrentPosition(
        position => {
          const {longitude, latitude} = position.coords;
          getForecast(longitude, latitude);
          reverseGeocode(longitude, latitude);
        },
        err => console.log(err.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    };
    getLocation();
  }, []);

  const getForecast = async (long, lat) => {
    let url =
      'https://api.openweathermap.org/data/2.5/onecall?lat=' +
      lat +
      '&lon=' +
      long +
      '&units=metric&exclude=minutely,hourly,alerts&appid=89c40fc7b20d5210c39133a667ff15c7';
    axios
      .get(url)
      .then(res => {
        const fetch = res.data;
        setData(fetch);
        setForecast(fetch.daily.slice(0, 3));
        setCurrent(fetch.current);
        setReady(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const reverseGeocode = async (long, lat) => {
    let url =
      'https://api.openweathermap.org/geo/1.0/reverse?lat=' +
      lat +
      '&lon=' +
      long +
      '&limit=1&appid=89c40fc7b20d5210c39133a667ff15c7';
    axios
      .get(url)
      .then(res => {
        const fetch = res.data;
        setGeolocation(fetch[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (ready) {
    return (
      <>
        <ScrollView style={styles.container}>
          <Text style={styles.text1}>{geolocation.name}</Text>
          <View style={{paddingVertical: 100}}>
            <Text style={styles.temp}>
              {Math.round(current.temp * 10) / 10}&#176;
            </Text>
            <View style={styles.subCon1}>
              <Image
                style={{width: 50, height: 50}}
                source={{
                  uri:
                    'https://openweathermap.org/img/w/' +
                    current.weather[0].icon +
                    '.png',
                }}
              />
              <Text style={styles.text1}>{current.weather[0].description}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.subCon2}
            onPress={() =>
              navigation.navigate('DailyForecast', {
                data,
              })
            }>
            <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>
              See More
            </Text>
          </TouchableOpacity>
          {forecast.map((item, index) => {
            return <ForecastCard detail={item} key={index} />;
          })}
          <Card
            containerStyle={styles.card}
            wrapperStyle={{flexDirection: 'row'}}>
            <View style={{flex: 0.5}}>
              <View style={styles.subCon3}>
                <Text style={[styles.text2, {color: '#d9d9d9'}]}>Humidity</Text>
                <Text style={styles.text3}>{current.humidity}%</Text>
              </View>
              <View style={styles.subCon3}>
                <Text style={[styles.text2, {color: '#d9d9d9'}]}>
                  Wind Speed
                </Text>
                <Text style={styles.text3}>{current.wind_speed}m/sec</Text>
              </View>
            </View>
            <View style={{flex: 0.5}}>
              <View style={styles.subCon3}>
                <Text style={[styles.text2, {color: '#d9d9d9'}]}>Pressure</Text>
                <Text style={styles.text3}>{current.pressure}hPa</Text>
              </View>
              <View style={styles.subCon3}>
                <Text style={[styles.text2, {color: '#d9d9d9'}]}>UV Index</Text>
                <Text style={styles.text3}>{current.uvi}</Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </>
    );
  } else {
    return (
      <>
        <CustomLoading visible={true} text={'Loading'} />
      </>
    );
  }
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'teal',
  },
  subCon1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCon2: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  subCon3: {
    marginVertical: 5,
  },
  temp: {
    fontSize: 76,
    color: '#fff',
    textAlign: 'center',
  },
  text1: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  text2: {
    fontSize: 14,
    color: '#fff',
  },
  text3: {
    fontSize: 18,
    color: '#fff',
  },
  card: {
    backgroundColor: '#66b3b3',
    borderWidth: 0,
    borderRadius: 20,
    marginBottom: 20,
  },
});
