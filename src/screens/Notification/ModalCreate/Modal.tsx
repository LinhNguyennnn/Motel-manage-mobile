import React, {useCallback, useState} from 'react';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

import {createNotification, getListReport} from '@redux/thunk';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {TouchableOpacity} from '@components/Actions';
import {appSelector} from '@redux/selector';
import styles from './styles';

const ModalCreate: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>();

  const {room_data} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    setModalVisible(false);
    setContent(undefined);
  }, []);

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClose}
        supportedOrientations={['portrait', 'landscape']}>
        <View style={styles.wrapperContent}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={tailwind('pt-2 text-xl')}>Thông báo</Text>
            <View style={tailwind('border p-2')}>
              <View style={tailwind('mb-6 w-full justify-center')}>
                <Text style={tailwind('text-gray-500 font-bold mb-1 pr-4')}>
                  Nội dung
                </Text>
                <TextInput
                  style={tailwind(
                    'bg-gray-200 border-2 border-gray-200 rounded w-full p-1 text-gray-700 min-h-[200px] my-4',
                  )}
                  onChangeText={setContent}
                  value={content}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Xin mời nhập nội dung"
                />

                <TouchableOpacity
                  style={tailwind(
                    'shadow bg-purple-500 py-2 px-4 rounded w-[150px]',
                  )}
                  disabled={!content}
                  onPress={async () => {
                    if (!room_data?.data || !content) return;
                    await dispatch(
                      createNotification({
                        idRoom: room_data.data._id,
                        idHouse: room_data.data.idHouse,
                        roomName: room_data.data.name,
                        content,
                      }),
                    );
                    onClose();
                    dispatch(getListReport({building_id: room_data.data._id}));
                  }}>
                  <Text style={tailwind('text-white font-bold')}>
                    Thêm thông báo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={tailwind('py-3 w-[150px] bg-blue-500 rounded-lg')}
        onPress={() => setModalVisible(true)}>
        <Text style={tailwind('text-white font-bold text-center')}>
          Gửi thông báo
        </Text>
      </Pressable>
    </View>
  );
};

export default ModalCreate;
