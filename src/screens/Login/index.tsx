import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, Text, TextInput} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {TouchableOpacity} from '@components/Actions';
import {navigate} from '@libs/utils/navigation';
import {getRoomBySubname} from '@redux/thunk';
import {appSelector} from '@redux/selector';
import {PATH} from '@configs/path';

const Login: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [subname, setSubname] = useState<string>();

  const {loading} = useSelector(appSelector);

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
            style={tailwind('text-black border rounded w-full px-3')}
            onChangeText={setSubname}
            placeholder="Xin mời nhập mã"
          />
          {!subname && isError && (
            <Text style={tailwind('text-rose-600')}>Không được bỏ trống</Text>
          )}
        </View>
        <TouchableOpacity
          style={tailwind('flex items-center')}
          onPress={async () => {
            if (!subname) {
              setIsError(true);
              return;
            }
            setIsError(false);
            const resultAction = await dispatch(getRoomBySubname({subname}));
            if (getRoomBySubname.fulfilled.match(resultAction)) {
              navigate(PATH.MAIN_TAB);
            }
          }}>
          <Button
            mode="contained"
            style={tailwind('bg-blue-500 rounded')}
            loading={loading}>
            <Text style={tailwind('text-white font-bold')}>Đăng nhập</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
