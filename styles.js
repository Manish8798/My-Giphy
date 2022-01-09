import {StyleSheet} from 'react-native';
import {H, W} from './utils/DimensionCalculator';
import ColorSchema from './utils/ColorSchema';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorSchema.Black2,
  },
  text: {
    top: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: ColorSchema.Black1,
  },
  header: {
    height: H(60),
    backgroundColor: ColorSchema.Black3,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: ColorSchema.White1,
    marginBottom: H(20),
    marginStart: W(2),
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    // paddingVertical: H(1),
  },
  input: {
    height: H(50),
    minHeight: H(50),
    marginVertical: H(10),
    marginHorizontal: W(8),
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    color: ColorSchema.White1,
    backgroundColor: ColorSchema.Black4,
    alignSelf: 'stretch',
    borderColor: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    // borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: H(1),
    // marginHorizontal: W(1),
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  title: {
    paddingTop: H(10),
    paddingHorizontal: W(10),
    color: ColorSchema.White1,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  item: {
    borderColor: 'gray',
    marginBottom: H(15),
    // marginHorizontal: W(1),
  },
  searchContainer: {
    marginTop: H(10),
    paddingTop: H(5),
    flex: 1,
  },
  list: {
    // marginHorizontal: H(1),
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
    backgroundColor: ColorSchema.Black2,
  },
  line: {
    height: H(2),
    backgroundColor: ColorSchema.GRAY1,
    marginBottom: H(20),
  },
});
export default styles;
