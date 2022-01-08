import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {getSearchResults} from '../api/ApiManager';
import styles from '../styles';
import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';

const SearchScreen = props => {
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState([]);
  const [limit, setLimit] = React.useState(25);
  const [count, setCount] = React.useState(1);
  const [duringMomentum, setDuringMomentum] = React.useState(true);
  const onSearch = keyword => {
    console.log('onSearch => ' + keyword);
    setText(keyword);
    getSearchResults(keyword, limit)
      .then(res => {
        if (res.meta.status == 200) {
          setData(res?.data);
          setCount(res?.pagination?.count);
        } else {
          setData([]);
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

  const loadMoreData = () => {
    setLimit(limit + 10);
    console.log('load more => ' + limit);
    getSearchResults(text, limit + 10)
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="Enter Keyword"
          placeholderTextColor={'gray'}
          onChangeText={t => onSearch(t)}
          value={text}
        />
        {data.length == 0 ? (
          <Text style={styles.text}>Enter Keyword to Search</Text>
        ) : (
          <FlatList
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
            ListHeaderComponent={() => (
              <Text
                style={styles.headText}>{`Search Results For "${text}"`}</Text>
            )}
            style={styles.list}
            data={data}
            // extraData={data}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={styles.item}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.image}
                    source={{
                      uri: item?.images?.fixed_height_downsampled?.url,
                      priority: FastImage.priority.normal,
                    }}
                  />
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
        )}
      </View>
    </SafeAreaView>
  );
};
export default SearchScreen;
