import {StyleSheet, ViewStyle} from 'react-native';

type Styles = {
  wrapperContent: ViewStyle;
  modalOverlay: ViewStyle;
};

export default StyleSheet.create<Styles>({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wrapperContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
