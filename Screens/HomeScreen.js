import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles';
import {getGifs} from '../api/ApiManager';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = props => {
  const [text, onChangeText] = React.useState('');
  const [data, setData] = React.useState([]);
  const [limit, setLimit] = React.useState(50);
  const [loading, setLoading] = React.useState(true);
  const [isDefault, setIsDefault] = React.useState(true);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    let isMounted = true;
    if (data.length == 0 && isMounted) {
      getTrendingGifs();
    } else {
      console.log('aborted setState on unmounted component');
    }
    onChangeText('');
    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  const getTrendingGifs = () => {
    getGifs(limit)
      .then(res => {
        if (res.meta.status == 200) {
          //   console.log(res.data[0].images.original.url);
          setData(res?.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const onFocus = () => {
    props.navigation.navigate('Search Screen');
  };

  const loader = () => {
    return (
      <View style={[styles.loader, styles.horizontal]}>
        <ActivityIndicator color={'black'} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headText}>VoloPay Task</Text> */}
        <TextInput
          onFocus={onFocus}
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search"
          placeholderTextColor={'gray'}
          onChange={() => props.navigation.navigate('Search Screen')}
        />
      </View>
      {loading ? (
        loader()
      ) : (
        <View style={styles.subContainer}>
          <FlatList
            initialNumToRender={5}
            data={data}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              // console.log(index);
              return (
                <View key={index} style={styles.item}>
                  {
                    <Image
                      resizeMode="stretch"
                      style={styles.image}
                      source={
                        item?.images?.downsized?.url
                          ? {uri: item?.images?.downsized?.url}
                          : require('../utils/broken.png')
                      }
                    />
                  }
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.title}>
                    {item?.title ? item.title : 'No Title'}
                  </Text>
                </View>
              );
            }}
          />
          {/* <ScrollView>
          {data.map((val, i) => {
            console.log(val.images.original.url+" "+i);
            return <Text key={i}>Manish</Text>;
          })}
        </ScrollView> */}
        </View>
      )}
    </SafeAreaView>
  );
};
export default HomeScreen;
