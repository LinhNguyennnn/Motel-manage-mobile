import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, ScrollView, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {
  faBox,
  faFileContract,
  faHospital,
  faRightFromBracket,
  faBell,
} from '@fortawesome/free-solid-svg-icons';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {TouchableOpacity} from '@components/Actions';
import {push, reset} from '@libs/utils/navigation';
import {logout} from '@redux/slice';
import {PATH} from '@configs/path';

const Other: React.FC = () => {
  const dispatch = useAppDispatch();

  const tailwind = useTailwind();

  const {left} = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={tailwind('pb-4')}>
      <View style={tailwind('w-full flex flex-col mt-2 bg-white')}>
        <TouchableOpacity
          style={{
            ...tailwind('flex items-center flex-row py-4 border-b'),
            borderColor: 'rgba(0, 0, 0, 0.05)',
            paddingHorizontal: left || 16,
          }}
          onPress={() => push(PATH.OTHER, {screen: PATH.ROOM})}>
          <FontAwesomeIcon size={16} icon={faHospital} />
          <Text style={tailwind('ml-2 text-base')}>Phòng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind('flex items-center flex-row py-4 border-b'),
            borderColor: 'rgba(0, 0, 0, 0.05)',
            paddingHorizontal: left || 16,
          }}
          onPress={() => push(PATH.OTHER, {screen: PATH.SERVICE})}>
          <FontAwesomeIcon size={16} icon={faBox} />
          <Text style={tailwind('ml-2 text-base')}>Dịch vụ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind('flex items-center flex-row py-4 border-b'),
            borderColor: 'rgba(0, 0, 0, 0.05)',
            paddingHorizontal: left || 16,
          }}
          onPress={() => push(PATH.OTHER, {screen: PATH.CONTRACT})}>
          <FontAwesomeIcon size={16} icon={faFileContract} />
          <Text style={tailwind('ml-2 text-base')}>Hợp đồng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind('flex items-center flex-row py-4 border-b'),
            borderColor: 'rgba(0, 0, 0, 0.05)',
            paddingHorizontal: left || 16,
          }}
          onPress={() => push(PATH.OTHER, {screen: PATH.NOTIFICATION})}>
          <FontAwesomeIcon size={16} icon={faBell} />
          <Text style={tailwind('ml-2 text-base')}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...tailwind('flex items-center flex-row py-4'),
            paddingHorizontal: left || 16,
          }}
          onPress={() => {
            dispatch(logout());
            reset(PATH.LOGIN);
          }}>
          <FontAwesomeIcon size={20} icon={faRightFromBracket} />
          <Text style={tailwind('ml-2 text-base')}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Other;
