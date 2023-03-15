import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {
  View,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  StyleProp,
} from 'react-native';

import {TouchableOpacity} from '../Actions';
import styles from './styles';

type Props = {
  value: string | number;
  labelStyle?: StyleProp<TextStyle>;
  selectStyle?: StyleProp<ViewStyle>;
  placeHolder?: string;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  data: {label: string | number; value: string | number}[];
};

const Select: React.FC<Props> = ({
  labelStyle,
  selectStyle,
  value,
  data,
  placeHolder,
  onChange,
  disabled,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSelect = (select: string | number) => {
    onChange(select);
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        supportedOrientations={['portrait', 'landscape']}>
        <View style={styles.wrapperContent}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  activeOpacity={1}
                  onPress={() => handleSelect(item.value)}>
                  <Text style={styles.value}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(_, index) => JSON.stringify(index)}
            />
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.select, selectStyle]}
        disabled={disabled}
        onPress={() => setModalVisible(true)}>
        <Text
          style={[
            value ? styles.textStyle : styles.textPlaceholderStyle,
            labelStyle,
          ]}>
          {value || placeHolder}
        </Text>
        <View style={styles.icon}>
          <FontAwesomeIcon icon={faCaretDown} size={20} />
        </View>
      </Pressable>
    </View>
  );
};

export default Select;
