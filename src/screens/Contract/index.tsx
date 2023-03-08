import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTailwind} from 'tailwind-rn/dist';
import {appSelector} from '@redux/selector';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {getRoomData} from '@redux/thunk';

const ContractTernant: React.FC = () => {
  const [roomData, setRoomData] = useState<any>();

  const {code_room} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!code_room?._id) return;
    (async () => {
      const resultAction = await dispatch(
        getRoomData({
          room_id: code_room._id,
        }),
      );
      if (getRoomData.fulfilled.match(resultAction)) {
        setRoomData(resultAction.payload.contract?.imageContract);
      }
    })();
  }, [dispatch, code_room]);

  return (
    <View>
      <View style={tailwind('bg-white')}>
        <View style={tailwind('max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8')}>
          <View style={tailwind('lg:flex lg:items-center lg:justify-between')}>
            <View style={tailwind('flex-1 min-w-0')}>
              <Text
                style={tailwind(
                  'text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase',
                )}>
                Hình ảnh hợp đồng
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tailwind('text-center mt-10')}>
        {roomData?.length ? (
          <FlatList
            style={tailwind('flex gap-4 flex-wrap justify-center')}
            keyExtractor={(_, index) => JSON.stringify(index)}
            data={roomData}
            renderItem={({item, index}) => (
              <FastImage
                key={index}
                source={{
                  uri: item,
                }}
                resizeMode="stretch"
                style={{width: 400}}
              />
            )}
          />
        ) : (
          <Text style={tailwind('uppercase text-2xl')}>
            Không có ảnh hợp đồng
          </Text>
        )}
      </View>
    </View>
  );
};

export default ContractTernant;
