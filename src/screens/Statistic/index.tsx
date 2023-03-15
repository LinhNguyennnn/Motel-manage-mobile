import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {getBillServiceByYear} from '@redux/thunk';
import {GetListServiceResponse} from '@types';
import {appSelector} from '@redux/selector';
import BarChart from '@components/BarChart';
import Select from '@components/Select';

const Ternant: React.FC = () => {
  const [checkYear, setCheckYear] = useState<number>(new Date().getFullYear());
  const [totalElictic, setTotalElictric] = useState<GetListServiceResponse>();
  const [totalWater, setTotalWater] = useState<GetListServiceResponse>();

  const {code_room} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (checkYear && code_room?._id) {
        const resultActions = await Promise.all([
          dispatch(
            getBillServiceByYear({
              building_id: code_room?._id,
              type: 'nuoc',
              year: checkYear,
            }),
          ),
          dispatch(
            getBillServiceByYear({
              building_id: code_room?._id,
              type: 'dien',
              year: checkYear,
            }),
          ),
        ]);

        if (getBillServiceByYear.fulfilled.match(resultActions[0])) {
          setTotalWater(resultActions[0].payload);
        }
        if (getBillServiceByYear.fulfilled.match(resultActions[1])) {
          setTotalElictric(resultActions[1].payload);
        }
      }
    })();
  }, [code_room, checkYear, dispatch]);

  return (
    <ScrollView contentContainerStyle={tailwind('w-full flex flex-col p-4')}>
      <View style={tailwind('bg-white rounded-md shadow')}>
        <View style={tailwind('max-w-full py-6 px-4 sm:px-6 lg:px-8')}>
          <Text
            style={tailwind(
              'text-2xl font-bold leading-7 text-gray-900 sm:text-2xl uppercase',
            )}>
            Bảng thống kê
          </Text>
        </View>
      </View>
      <View style={tailwind('mt-4')}>
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
      <View
        style={tailwind(
          'w-full flex lg:flex-nowrap xl:flex-nowrap flex-wrap mt-4',
        )}>
        <View
          style={tailwind(
            'w-[100%] lg:w-[50%] xl:w-[50%] bg-white rounded-md p-2',
          )}>
          <BarChart
            labels={Array.from(
              new Array(12),
              (_, index) => `Tháng ${index + 1}`,
            )}
            data={totalElictic?.data.result || []}
            color="rgb(255, 152, 152)"
          />
        </View>
      </View>
      <View
        style={tailwind(
          'w-full flex lg:flex-nowrap xl:flex-nowrap flex-wrap mt-4',
        )}>
        <View
          style={tailwind(
            'w-[100%] lg:w-[50%] xl:w-[50%] bg-white rounded-md p-2',
          )}>
          <BarChart
            labels={Array.from(
              new Array(12),
              (_, index) => `Tháng ${index + 1}`,
            )}
            data={totalWater?.data.result || []}
            color="rgb(153,255,255)"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Ternant;
