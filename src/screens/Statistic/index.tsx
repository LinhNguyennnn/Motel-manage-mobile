import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {getBillServiceByYear} from '@redux/thunk';
import {appSelector} from '@redux/selector';
import BarChart from '@components/BarChart';
import Select from '@components/Select';

const Ternant: React.FC = () => {
  const [checkYear, setCheckYear] = useState<number>(new Date().getFullYear());

  const {room_data, data_by_year, loading} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!checkYear || !room_data?.data._id) return;
    Promise.all([
      dispatch(
        getBillServiceByYear({
          building_id: room_data?.data._id,
          type: 'nuoc',
          year: checkYear,
        }),
      ),
      dispatch(
        getBillServiceByYear({
          building_id: room_data?.data._id,
          type: 'dien',
          year: checkYear,
        }),
      ),
    ]);
  }, [checkYear, dispatch, room_data?.data._id]);

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
          Bảng thống kê
        </Text>
      </View>
      <View style={tailwind('mt-4 shadow')}>
        <Text style={tailwind('text-gray-700 text-sm font-bold')}>
          Chọn năm thống kê
        </Text>
        <Select
          data={Array.from(new Array(10), (_, index) => ({
            label: new Date().getFullYear() - index,
            value: new Date().getFullYear() - index,
          }))}
          selectStyle={tailwind(
            'border rounded py-2 px-3 text-gray-700 leading-tight',
          )}
          value={checkYear}
          onChange={value => setCheckYear(value as number)}
        />
      </View>
      <View style={tailwind('w-full flex bg-white rounded-md p-2 mt-4 shadow')}>
        <BarChart
          labels={Array.from(new Array(12), (_, index) => `Tháng ${index + 1}`)}
          data={data_by_year.electric.result || []}
          color="rgb(255, 152, 152)"
        />
      </View>
      <View style={tailwind('w-full flex bg-white rounded-md p-2 mt-4 shadow')}>
        <BarChart
          labels={Array.from(new Array(12), (_, index) => `Tháng ${index + 1}`)}
          data={data_by_year.water.result || []}
          color="rgb(153,255,255)"
        />
      </View>
    </ScrollView>
  );
};

export default Ternant;
