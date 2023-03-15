import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, Text, TextInput} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {TouchableOpacity} from '@components/Actions';
import {navigate} from '@libs/utils/navigation';
import {getRoomByID} from '@redux/thunk';
import {PATH} from '@configs/path';

const Login: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [roomID, setRoomID] = useState<string>();

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={tailwind(
        'flex w-full h-full items-center justify-center shadow',
      )}>
      <View style={tailwind('w-5/6 px-4 py-2 bg-cyan-500 mt-4')}>
        <Text style={tailwind('pt-2 text-xl text-white')}>
          Mời bạn nhập mã đăng nhập
        </Text>
      </View>
      <View style={tailwind('w-5/6 bg-white rounded px-8 pt-6 pb-8 mb-4')}>
        <View style={tailwind('mb-4')}>
          <Text style={tailwind('text-gray-700 text-sm font-bold mb-2')}>
            Nhập mã
          </Text>
          <TextInput
            style={tailwind('text-black border rounded w-full px-3 h-8')}
            onChangeText={setRoomID}
            placeholder="Xin mời nhập mã"
          />
          {!roomID && isError && (
            <Text style={tailwind('text-rose-600')}>Không được bỏ trống</Text>
          )}
        </View>
        <TouchableOpacity
          style={tailwind('flex items-center')}
          onPress={async () => {
            if (!roomID) {
              setIsError(true);
              return;
            }
            setIsError(false);
            const resultAction = await dispatch(getRoomByID({room_id: roomID}));
            if (getRoomByID.fulfilled.match(resultAction)) {
              navigate(PATH.MAIN_TAB);
            }
          }}>
          <View style={tailwind('bg-blue-500 py-2 px-4 rounded')}>
            <Text style={tailwind('text-white font-bold')}>Đăng nhập</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
