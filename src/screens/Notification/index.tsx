import React, {useCallback} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

import {getListReport, removeNotification} from '@redux/thunk';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {TouchableOpacity} from '@components/Actions';
import {appSelector} from '@redux/selector';
import ModalCreate from './ModalCreate';

const Notification: React.FC = () => {
  const {room_data, notifications, loading} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const {left} = useSafeAreaInsets();

  const fetchData = useCallback(() => {
    if (!room_data?.data.idHouse) return;
    dispatch(getListReport({building_id: room_data.data._id}));
  }, [room_data, dispatch]);

  useFocusEffect(fetchData);

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
          onRefresh={fetchData}
        />
      }>
      <ModalCreate />
      <View style={tailwind('w-full my-6 shadow')}>
        <ScrollView horizontal={true} style={tailwind('rounded-md')}>
          <DataTable style={tailwind('bg-white')}>
            <DataTable.Header style={tailwind('bg-gray-50')}>
              {[
                'STT',
                'Phòng',
                'Nội dung',
                'Ngày thông báo',
                'Trạng thái',
                '',
              ].map((title, index) => (
                <DataTable.Title
                  key={index}
                  style={tailwind(
                    'flex-none justify-center items-center w-[150px]',
                  )}
                  textStyle={tailwind(
                    'text-xs font-medium text-gray-500 uppercase',
                  )}>
                  {title}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            {notifications?.data?.map((notif, index) => (
              <DataTable.Row key={index}>
                {[
                  index + 1,
                  notif.roomName,
                  notif.content,
                  dayjs(notif.createdAt).format('DD/MM/YYYY'),
                  notif.status ? 'Đã xử lý' : 'Chưa xử lý',
                  notif._id,
                ].map((value, index2) => (
                  <DataTable.Cell
                    key={index2}
                    style={tailwind(
                      'flex-none justify-center items-center w-[150px]',
                    )}
                    textStyle={tailwind(
                      `mx-6 my-4 text-sm ${
                        index2 === 4
                          ? value === 'Đã xử lý'
                            ? 'p-3 text-red-700 bg-red-100 font-bold'
                            : 'p-3 text-green-700 bg-green-100 font-bold'
                          : ''
                      }`,
                    )}>
                    {index2 === 5 ? (
                      <TouchableOpacity
                        style={tailwind(
                          'flex items-center bg-red-700 rounded-lg px-6 py-2',
                        )}
                        onPress={async () => {
                          await dispatch(
                            removeNotification({id: value as string}),
                          );
                          fetchData();
                        }}>
                        <Text style={tailwind('text-white font-bold')}>
                          Xoá
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      value
                    )}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Notification;
