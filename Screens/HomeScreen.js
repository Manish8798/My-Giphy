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
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import {getGifs} from '../api/ApiManager';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';
import ColorSchema from '../utils/ColorSchema';

const HomeScreen = props => {
  const [text, onChangeText] = React.useState('');
  const [data, setData] = React.useState([]);
  const [limit, setLimit] = React.useState(25);
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(1);
  const [duringMomentum, setDuringMomentum] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
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
          setData(res?.data);
          setCount(res?.pagination?.count);
          setLoading(false);
          setFailed(false);
        } else {
          setLoading(false);
          setFailed(false);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setFailed(true);
        Toast.showWithGravity(
          'Something went wrong',
          Toast.SHORT,
          Toast.BOTTOM,
        );
      });
  };

  const loadMoreData = () => {
    setLimit(limit + 10);
    console.log('load more => ' + limit);
    getGifs(limit + 10)
      .then(res => {
        if (res.meta.status == 200 && count != res?.pagination?.count) {
          setData([...res?.data]);
          setCount(res?.pagination?.count);
        } else {
          // console.log(JSON.stringify(res));
        }
      })
      .catch(err => {
        console.log(err);
        Toast.showWithGravity(
          'Something went wrong',
          Toast.SHORT,
          Toast.BOTTOM,
        );
      });
  };

  const onRetry = () => {
    setLoading(true);
    getTrendingGifs();
  };

  const onFocus = () => {
    props.navigation.navigate('Search Screen');
  };

  const loader = () => {
    return (
      <View style={[styles.loader, styles.horizontal]}>
        <ActivityIndicator color={'red'} size={'large'} />
      </View>
    );
  };

  if (failed) {
    return (
      <View style={[styles.failedText, styles.horizontal]}>
        <TouchableOpacity onPress={() => onRetry()}>
          <Text style={styles.headText}>Tap to retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headText}>VoloPay Task</Text> */}
        <TextInput
          onFocus={onFocus}
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Search here..."
          placeholderTextColor={ColorSchema.Black1}
          onChange={() => props.navigation.navigate('Search Screen')}
        />
      </View>
      {loading ? (
        loader()
      ) : (
        <View style={styles.subContainer}>
          <FlatList
            data={data}
            style={styles.list}
            initialNumToRender={5}
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              if (!duringMomentum) {
                loadMoreData();
                setDuringMomentum(true);
              }
            }}
            // onEndReached={() => loadMoreData()}
            onMomentumScrollBegin={() => setDuringMomentum(false)}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => {
              return <View style={styles.line}></View>;
            }}
            ListHeaderComponent={() => (
              <Text
                style={[
                  styles.headText,
                  {marginVertical: 10},
                ]}>{`Trending Gifs`}</Text>
            )}
            renderItem={({item, index}) => {
              // console.log(index);
              return (
                <View key={index} style={styles.item}>
                  {
                    <FastImage
                      resizeMode={FastImage.resizeMode.stretch}
                      style={styles.image}
                      source={
                        item?.images?.fixed_height_downsampled?.url
                          ? {
                              uri: item?.images?.fixed_height_downsampled?.url,
                              priority: FastImage.priority.normal,
                              cache: FastImage.cacheControl.immutable,
                            }
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
