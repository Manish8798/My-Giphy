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

const SearchScreen = props => {
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState([]);
  const [limit, setLimit] = React.useState(25);

  const onSearch = keyword => {
    setText(keyword);
    getSearchResults(keyword, limit)
      .then(res => {
        if (res.meta.status == 200) {
          setData(res?.data);
        } else {
          setData([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="Enter Keyword"
          placeholderTextColor={'gray'}
          value={text}
          onChangeText={t => onSearch(t)}
        />
        {data.length == 0 ? (
          <Text style={styles.text}>Enter Keyword to Search</Text>
        ) : (
          <FlatList
            initialNumToRender={5}
            ListHeaderComponent={() => (
              <Text
                style={styles.headText}>{`Search Results For "${text}"`}</Text>
            )}
            style={styles.list}
            data={data}
            renderItem={({item, index}) => (
              <View key={index} style={styles.item}>
                <Image
                  resizeMode="stretch"
                  style={styles.image}
                  source={{uri: item?.images?.downsized?.url}}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.title}>
                  {item?.title ? item.title : 'No Title'}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default SearchScreen;
