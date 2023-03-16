import React, {useCallback} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {getListService} from '@redux/thunk';
import {appSelector} from '@redux/selector';

const InfoService: React.FC = () => {
  const {room_data, service, loading} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!room_data?.data.idHouse) return;
    dispatch(getListService({building_id: room_data.data.idHouse}));
  }, [room_data, dispatch]);

  useFocusEffect(fetchData);

  return (
    <ScrollView
      contentContainerStyle={tailwind('w-full flex flex-col p-4')}
      refreshControl={
        <RefreshControl
          colors={['#9Bd35A', '#689F38']}
          refreshing={loading}
          onRefresh={fetchData}
        />
      }>
      <View style={tailwind('bg-white py-6 px-4 rounded-md shadow')}>
        <Text
          style={tailwind(
            'text-2xl font-bold leading-7 text-gray-900 uppercase',
          )}>
          Quản lý dịch vụ
        </Text>
      </View>
      <View style={tailwind('w-full my-6 bg-white rounded shadow')}>
        <View style={tailwind('py-6 px-4')}>
          <Text
            style={tailwind(
              'text-2xl font-bold leading-7 text-gray-900 uppercase',
            )}>
            Dịch vụ chung
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <DataTable>
            <DataTable.Header style={tailwind('bg-gray-50')}>
              {['Tên dịch vụ', 'Giá dịch vụ'].map((title, index) => (
                <DataTable.Title
                  key={index}
                  style={tailwind(
                    'flex-none justify-center items-center w-[180px]',
                  )}
                  textStyle={tailwind(
                    'text-xs font-medium text-gray-500 uppercase',
                  )}>
                  {title}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            {service?.data.map((s, index) =>
              s.doNotDelete ? (
                <DataTable.Row key={index}>
                  {[
                    s.label,
                    s.price.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    }),
                  ].map((value, index2) => (
                    <DataTable.Cell
                      key={index2}
                      style={tailwind(
                        'flex-none justify-center items-center w-[180px]',
                      )}
                      textStyle={tailwind(
                        `text-sm${index2 === 0 ? ' text-gray-500' : ''}`,
                      )}>
                      {value}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ) : null,
            )}
          </DataTable>
        </ScrollView>
      </View>
      <View style={tailwind('w-full my-6 bg-white rounded shadow')}>
        <View style={tailwind('py-6 px-4')}>
          <Text
            style={tailwind(
              'text-2xl font-bold leading-7 text-gray-900 uppercase',
            )}>
            Dịch vụ riêng
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <DataTable>
            <DataTable.Header style={tailwind('bg-gray-50')}>
              {['Tên dịch vụ', 'Giá dịch vụ'].map((title, index) => (
                <DataTable.Title
                  key={index}
                  style={tailwind(
                    'flex-none justify-center items-center w-[180px]',
                  )}
                  textStyle={tailwind(
                    'text-xs font-medium text-gray-500 uppercase',
                  )}>
                  {title}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            {room_data?.data.service.map((s, index) =>
              s.status ? (
                <DataTable.Row key={index}>
                  {[
                    s.label,
                    s.price.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    }),
                  ].map((value, index2) => (
                    <DataTable.Cell
                      key={index2}
                      style={tailwind(
                        'flex-none justify-center items-center w-[180px]',
                      )}
                      textStyle={tailwind(
                        `text-sm${index2 === 0 ? ' text-gray-500' : ''}`,
                      )}>
                      {value}
                    </DataTable.Cell>
                  ))}
                </DataTable.Row>
              ) : null,
            )}
          </DataTable>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default InfoService;
