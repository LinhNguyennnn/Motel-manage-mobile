import React, {useState} from 'react';
import {View, Text, TextInput, ScrollView, RefreshControl} from 'react-native';
import {DataTable} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {getRoomBySubname} from '@redux/thunk';
import {appSelector} from '@redux/selector';

const InfoRoom: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>();

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
          Thông tin phòng
        </Text>
      </View>
      <View style={tailwind('w-full my-6 shadow')}>
        <ScrollView horizontal={true} style={tailwind('rounded-md')}>
          <DataTable style={tailwind('bg-white')}>
            <DataTable.Header style={tailwind('bg-gray-50')}>
              {[
                'Tên phòng',
                'Giá thuê phòng',
                'Diện tích phòng',
                'Số người ở tối đa',
                'Số người ở hiện tại',
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
            <DataTable.Row>
              {[
                room_data?.data.name,
                room_data?.data.price?.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                }),
                room_data?.data.area,
                room_data?.data.maxMember,
                room_data?.data.listMember?.length,
              ].map((value, index) => (
                <DataTable.Cell
                  key={index}
                  style={tailwind(
                    'flex-none justify-center items-center w-[150px]',
                  )}
                  textStyle={tailwind('text-sm text-gray-500')}>
                  {value}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </View>
      <View style={tailwind('bg-white rounded-md py-6 px-4 shadow')}>
        <Text
          style={tailwind(
            'text-2xl font-bold leading-7 text-gray-900 uppercase',
          )}>
          Thành viên trong phòng
        </Text>
        <View style={tailwind('mt-5 flex')}>
          <TextInput
            style={tailwind(
              'text-black border border-gray-200 rounded w-[50%] px-3 h-8',
            )}
            onChangeText={setSearchValue}
            placeholder="Tìm kiếm..."
          />
        </View>
      </View>
      <View style={tailwind('w-full my-6 shadow')}>
        <ScrollView horizontal={true} style={tailwind('rounded-md')}>
          <DataTable style={tailwind('bg-white')}>
            <DataTable.Header style={tailwind('bg-gray-50')}>
              {[
                'Tên thành viên',
                'CMND/CCCD',
                'Số điện thoại',
                'Chức vụ trong phòng',
              ].map((title, index) => (
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
            {room_data?.data.listMember
              .filter(
                member =>
                  !searchValue ||
                  member.memberName
                    .toLocaleUpperCase()
                    .includes(searchValue.toLocaleUpperCase()),
              )
              .map((item, index) => (
                <DataTable.Row key={index}>
                  {[
                    item.memberName,
                    item.cardNumber,
                    item.phoneNumber,
                    item.status ? 'Chủ phòng' : 'thành viên',
                  ].map((value, index2) => (
                    <DataTable.Cell
                      key={index2}
                      style={tailwind(
                        'flex-none justify-center items-center w-[180px]',
                      )}
                      textStyle={tailwind('text-sm text-gray-500')}>
                      {value}
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

export default InfoRoom;
