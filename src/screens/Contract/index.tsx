import React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {getRoomBySubname} from '@redux/thunk';
import {appSelector} from '@redux/selector';

const ContractTernant: React.FC = () => {
  const {room_data, loading} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  return (
    <ScrollView
      contentContainerStyle={tailwind('w-full flex flex-col p-4')}
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
            <FastImage
              key={index}
              source={{
                uri,
              }}
              resizeMode="stretch"
              style={tailwind('w-full h-full')}
            />
          ))
        ) : (
          <Text style={tailwind('uppercase text-2xl')}>
            Không có ảnh hợp đồng
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ContractTernant;
