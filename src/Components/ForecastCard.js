/* eslint-disable prettier/prettier */
/* eslint-disable  react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-elements';
import moment from 'moment';

export default class ForecastCard extends Component {
  render() {
    var date = new Date(this.props.detail.dt * 1e3);
    return (
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 50, height: 50}}
              source={{
                uri:
                  'https://openweathermap.org/img/w/' +
                  this.props.detail.weather[0].icon +
                  '.png',
              }}
            />
            <Text style={styles.time}>{moment(date).format('ddd')} </Text>
            <Text style={styles.notes}>
              &#8901; {this.props.detail.weather[0].description}
            </Text>
          </View>
          <Text style={styles.notes}>
            {Math.round(this.props.detail.temp.max * 10) / 10}&#176; /{' '}
            {Math.round(this.props.detail.temp.min * 10)}&#176;
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 5,
  },
  time: {
    fontSize: 18,
    color: '#fff',
  },
  notes: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
  },
});
