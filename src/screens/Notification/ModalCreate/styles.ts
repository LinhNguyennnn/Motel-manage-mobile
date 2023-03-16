import {StyleSheet, ViewStyle} from 'react-native';

type Styles = {
  modalContent: ViewStyle;
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
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    minHeight: '20%',
    maxHeight: '50%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
