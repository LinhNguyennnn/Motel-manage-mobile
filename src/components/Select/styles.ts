import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type Styles = {
  select: ViewStyle;
  item: ViewStyle;
  label: TextStyle;
  textStyle: TextStyle;
  textPlaceholderStyle: TextStyle;
  icon: ViewStyle;
  value: TextStyle;
  modalContent: ViewStyle;
  wrapperContent: ViewStyle;
  modalOverlay: ViewStyle;
};

export default StyleSheet.create<Styles>({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  label: {
    color: '#333333',
    fontSize: 12,
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: '#CCCCCC',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    elevation: 2,
  },
  textStyle: {
    fontSize: 16,
    paddingVertical: 5,
  },
  textPlaceholderStyle: {
    color: '#666666',
    fontSize: 16,
    paddingVertical: 11,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  value: {
    width: '100%',
  },
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
