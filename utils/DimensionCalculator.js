import { Dimensions } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

// MOCKUP_DEVICE_WIDTH
export const MOCKUP_DEVICE_WIDTH = 414;

// MOCKUP_DEVICE_HEIGHT
export const MOCKUP_DEVICE_HEIGHT = 896;
export const W = (pixel) => {
  return (pixel * WINDOW_WIDTH) / MOCKUP_DEVICE_WIDTH;
};

export const H = (pixel) => {
  return (pixel * WINDOW_HEIGHT) / MOCKUP_DEVICE_HEIGHT;
};