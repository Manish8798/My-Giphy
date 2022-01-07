import {StyleSheet} from 'react-native';
import {H, W} from './utils/DimensionCalculator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    top: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'gray',
  },
  header: {
    height: H(60),
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'gray',
    marginBottom: H(10),
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: H(1),
  },
  input: {
    height: H(50),
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'black',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderColor: 'gray',
  },
  image: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    marginVertical: H(1),
    marginHorizontal: W(1),
    alignSelf: 'center',
  },
  title: {
    paddingHorizontal: W(10),
    paddingVertical: H(2),
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'arial',
  },
  item: {
    borderRadius: 2,
    borderWidth: 0.8,
    borderColor: 'grey',
    marginBottom: H(10),
    marginHorizontal: W(2),
  },
  searchContainer: {
    marginVertical: H(10),
    paddingVertical: H(1),
    flex: 1
  },
  list: {
    marginHorizontal: H(10),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  failedText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default styles;
