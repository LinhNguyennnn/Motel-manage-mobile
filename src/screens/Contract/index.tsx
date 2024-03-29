import React, {useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';

import {TouchableOpacity} from '@components/Actions';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {getRoomBySubname} from '@redux/thunk';
import {appSelector} from '@redux/selector';
import Preview from './Preview';

const ContractTernant: React.FC = () => {
  const [preview, setPreview] = useState<string>();

  const {room_data, loading} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const {left} = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        ...tailwind('w-full flex flex-col py-4'),
        paddingHorizontal: left || 16,
      }}
      refreshControl={
        <RefreshControl
          colors={['#9Bd35A', '#689F38']}
          refreshing={loading}
          onRefresh={() =>
            room_data?.data.subName &&
            dispatch(getRoomBySubname({subname: room_data.data.subName}))
          }
        />
      }>
      <View style={tailwind('bg-white py-6 px-4 rounded-md shadow')}>
        <Text
          style={tailwind(
            'text-2xl font-bold leading-7 text-gray-900 uppercase',
          )}>
          Hình ảnh hợp đồng
        </Text>
      </View>
      <View style={tailwind('text-center my-2')}>
        {room_data?.data?.contract.imageContract.length ? (
          room_data?.data?.contract.imageContract.map((uri, index) => (
            <TouchableOpacity
              key={index}
              style={tailwind('mb-[5px]')}
              onPress={() => setPreview(uri)}>
              <FastImage
                source={{
                  uri,
                }}
                resizeMode="contain"
                style={tailwind('w-full min-h-[200px]')}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={tailwind('uppercase text-2xl')}>
            Không có ảnh hợp đồng
          </Text>
        )}
      </View>
      <Preview preview={preview} setPreview={setPreview} left={left} />
    </ScrollView>
  );
};

export default ContractTernant;
