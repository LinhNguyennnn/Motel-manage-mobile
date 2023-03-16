import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';

import {getDetailBillServiceByMonthYear} from '@redux/thunk';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {appSelector} from '@redux/selector';
import Select from '@components/Select';

const today = new Date();

const ListWater: React.FC = () => {
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [year, setYear] = useState<number>(today.getFullYear());

  const {room_data, data_by_month, loading} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!room_data?.data._id) return;

    dispatch(
      getDetailBillServiceByMonthYear({
        room_id: room_data.data._id,
        type: 'nuoc',
        month,
        year,
      }),
    );
  }, [room_data, dispatch, month, year]);

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
          Quản lý số nước hàng tháng
        </Text>
      </View>
      <View style={tailwind('my-2')}>
        <Text style={tailwind('text-gray-700 text-sm font-bold')}>
          Chọn tháng năm
        </Text>
        <View style={tailwind('flex flex-row')}>
          <Select
            data={Array.from(new Array(12), (_, index) => ({
              label: index + 1,
              value: index + 1,
            }))}
            selectStyle={tailwind(
              'border rounded py-2 px-3 text-gray-700 leading-tight w-[70px] mr-2',
            )}
            value={month}
            onChange={value => setMonth(value as number)}
          />
          <Select
            data={Array.from(new Array(10), (_, index) => ({
              label: new Date().getFullYear() - index,
              value: new Date().getFullYear() - index,
            }))}
            selectStyle={tailwind(
              'border rounded py-2 px-3 text-gray-700 leading-tight w-[100px]',
            )}
            value={year}
            onChange={value => setYear(value as number)}
          />
        </View>
      </View>
      <View style={tailwind('w-full my-6 shadow')}>
        <ScrollView horizontal={true} style={tailwind('rounded-md')}>
          <DataTable style={tailwind('bg-white')}>
            <DataTable.Header style={tailwind('bg-gray-50')}>
              {[
                'Tháng',
                'Số nước cũ',
                'Số nước mới',
                'Số nước tiêu thu (M3)',
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
            <DataTable.Row>
              {[
                month,
                data_by_month.water.inputValue,
                data_by_month.water.outputValue,
                data_by_month.water.outputValue -
                  data_by_month.water.inputValue,
              ].map((value, index) => (
                <DataTable.Cell
                  key={index}
                  style={tailwind(
                    'flex-none justify-center items-center w-[180px]',
                  )}
                  textStyle={tailwind(
                    `px-6 py-4 ${
                      index === 0
                        ? 'text-sm text-gray-500'
                        : index === 3
                        ? 'text-yellow-500 font-bold'
                        : ''
                    }`,
                  )}>
                  {value}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ListWater;
