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
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (data.length == 0) {
      getTrendingGifs();
    }
    onChangeText('');
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
              console.log(index);
              return (
                <View key={index} style={styles.item}>
                  {
                    <Image
                      onLoadStart={() => console.log('start')}
                      onLoadEnd={() => console.log('end')}
                      resizeMode="stretch"
                      style={styles.image}
                      source={{uri: item?.images?.downsized?.url}}
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