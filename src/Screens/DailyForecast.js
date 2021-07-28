/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList} from 'react-native';

import ForecastCard from '../Components/ForecastCard';

const Detail = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <>
      <FlatList
        data={data.daily}
        style={{backgroundColor: 'teal'}}
        keyExtractor={item => item.dt.toString()}
        renderItem={({item, index}) => (
          <ForecastCard detail={item} key={index} />
        )}
      />
    </>
  );
};

export default Detail;
