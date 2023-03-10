import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {Table, Row, Cell} from 'react-native-table-component';
import {DatePicker} from '@ant-design/react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

import {getDetailBillServiceByMonthYear} from '@redux/thunk';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {appSelector} from '@redux/selector';

const today = new Date();

const ListElectricity: React.FC = () => {
  const [monthCheck, setMonth] = useState(today.getMonth() + 1);
  const [yearCheck, setYear] = useState(today.getFullYear());
  const [listBillData, setListBillData] = useState<{
    inputValue: number;
    outputValue: number;
  }>({
    inputValue: 0,
    outputValue: 0,
  });

  const {code_room} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const onChange = (date: Date) => {
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  useEffect(() => {
    if (!code_room?._id) return;
    (async () => {
      const resultAction = await dispatch(
        getDetailBillServiceByMonthYear({
          room_id: code_room._id,
          building_name: 'dien',
          month: monthCheck,
          year: yearCheck,
        }),
      );
      if (getDetailBillServiceByMonthYear.fulfilled.match(resultAction)) {
        setListBillData(resultAction.payload.data);
      }
    })();
  }, [code_room, dispatch, monthCheck, yearCheck]);

  return (
    <View style={tailwind('h-screen')}>
      <View style={tailwind('bg-white')}>
        <View style={tailwind('max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8')}>
          <View style={tailwind('lg:flex lg:items-center lg:justify-between')}>
            <View style={tailwind('flex-1 min-w-0')}>
              <Text
                style={tailwind(
                  'text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase',
                )}>
                qu???n l?? s??? ??i???n h??ng th??ng
              </Text>
            </View>
            <View style={tailwind('mt-5 flex lg:mt-0 lg:ml-4')}>
              <View style={tailwind('mt-5 flex lg:mt-0 lg:ml-4')}>
                <TextInput
                  style={tailwind(
                    'text-black border rounded w-full py-2 px-3 leading-tight',
                  )}
                  placeholder="T??m ki???m..."
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View style={tailwind('p-2')}>
          <h3>Ch???n th??ng n??m</h3>
          <DatePicker
            style={{width: 200}}
            onChange={onChange}
            value={dayjs(`${yearCheck}-${monthCheck}`, 'YYYY-MM').toDate()}
            format={date => dayjs(date).format('YYYY-MM')}
            mode="month"
          />
        </View>
        <View style={tailwind('max-w-full mx-auto py-6 sm:px-6 lg:px-8')}>
          <View style={tailwind('flex flex-col')}>
            <View style={tailwind('overflow-x-auto sm:-mx-6 lg:-mx-8')}>
              <View style={tailwind('p-4')} />
              <View
                style={tailwind('py-2 align-middle inline-block min-w-full ')}>
                <View
                  style={tailwind(
                    'overflow-hidden border-b border-gray-200 sm:rounded-lg',
                  )}>
                  <ScrollView horizontal={true}>
                    <Table
                      style={tailwind('min-w-full Viewide-y Viewide-gray-200')}>
                      <Row
                        data={[
                          'Th??ng',
                          'S??? ??i???n c??',
                          'S??? ??i???n c??',
                          'S??? ??i???n ti??u thu (KWH)',
                        ]}
                        widthArr={[100, 100, 100, 100]}
                        style={tailwind('bg-gray-50')}
                        textStyle={tailwind(
                          'px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
                        )}
                      />
                    </Table>
                    <Table
                      style={tailwind('bg-white Viewide-y Viewide-gray-200')}>
                      {[
                        monthCheck,
                        listBillData.inputValue,
                        listBillData.outputValue,
                        listBillData.outputValue - listBillData.inputValue,
                      ].map((rowData, index) => (
                        <Cell
                          key={index}
                          data={rowData}
                          width={100}
                          style={tailwind('text-center')}
                          textStyle={
                            index === 0
                              ? tailwind(
                                  'px-9 py-4 whitespace text-sm text-gray-500',
                                )
                              : index === 3
                              ? tailwind(
                                  'px-6 py-4 whitespace text-yellow-500 font-bold',
                                )
                              : tailwind('px-6 py-4 whitespace')
                          }
                        />
                      ))}
                    </Table>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListElectricity;
