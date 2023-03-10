import React, {useEffect, useState} from 'react';
import {DatePicker} from '@ant-design/react-native';
import {Table, Row} from 'react-native-table-component';
import {useTailwind} from 'tailwind-rn/dist';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

import {createPayment, getBillRoomID} from '@redux/thunk';
import {TouchableOpacity} from '@components/Actions';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {navigate} from '@libs/utils/navigation';
import {appSelector} from '@redux/selector';

const today = new Date();

const InfoReceipt: React.FC = () => {
  const [monthCheck, setMonth] = useState(today.getMonth() + 1);
  const [yearCheck, setYear] = useState(today.getFullYear());
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [debtTotal, setDebtTotal] = useState<number>(0);
  const [bills, setBills] = useState<
    Array<{
      _id: string;
      invoiceService: Array<{
        amount: number;
      }>;
      debt: number;
      paidAmount: number;
    }>
  >([]);

  const {code_room} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const onChange = (date: Date) => {
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };

  useEffect(() => {
    if (code_room?._id) {
      (async () => {
        const resultAction = await dispatch(
          getBillRoomID({
            room_id: code_room?._id,
            year: yearCheck,
            month: monthCheck,
          }),
        );
        if (getBillRoomID.fulfilled.match(resultAction)) {
          const data = resultAction.payload.data;
          for (let i = 0; i < data.length; i++) {
            const total =
              Number(
                data[i]?.invoiceService.reduce(
                  (previousValue: number, currentValue: any) =>
                    previousValue + Number(currentValue.amount || 0),
                  0,
                ),
              ) + Number(data[i]?.debt || 0);
            setTotalPrice(total);
            const debt = total - data[i]?.paidAmount;
            setDebtTotal(debt);
          }
          setBills(data);
        }
      })();
    }
  }, [code_room?._id, yearCheck, monthCheck, dispatch]);

  return (
    <View style={tailwind('h-screen')}>
      <View style={tailwind('bg-white')}>
        <View style={tailwind('max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8')}>
          <View style={tailwind('lg:flex lg:items-center lg:justify-between')}>
            <View>
              <DatePicker
                style={{width: 200}}
                onChange={onChange}
                value={dayjs(`${yearCheck}-${monthCheck}`, 'YYYY-MM').toDate()}
                format={date => dayjs(date).format('YYYY-MM')}
                mode="month"
              />
            </View>
          </View>
        </View>
      </View>
      {bills ? (
        bills?.map((bill: any, index: number) => (
          <View key={index}>
            <View style={tailwind('w-full')}>
              <View style={tailwind('flex-[100%] bg-gray-100')}>
                <View style={tailwind('bg-white')}>
                  <View
                    style={tailwind(
                      'md:flex justify-between p-4 items-center',
                    )}>
                    <View>
                      <Text
                        style={tailwind(
                          'text-3xl italic font-extrabold tracking-widest text-indigo-500',
                        )}>
                        Qu???n l?? ph??ng tr??? 24/7
                      </Text>
                      <Text style={tailwind('text-base')}>
                        Vui l??ng thanh to??n trong v??ng 7 ng??y t??nh t??? th???i gian
                        nh???n ???????c h??a ????n.
                      </Text>
                      <Text style={tailwind('text-base')}>
                        M???i th???c m???c xin g???i ph???n h???i v??? cho website ????? ???????c x???
                        l??.
                      </Text>
                    </View>
                    <View style={tailwind('p-2')}>
                      <View style={tailwind('md:flex')}>
                        <View
                          style={tailwind(
                            'flex flex-col items-center p-2 border-l-2 border-indigo-200',
                          )}>
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={tailwind('w-6 h-6 text-blue-600')}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg> */}
                          <Text style={tailwind('text-sm')}>
                            www.quanlyphongtro247.com
                          </Text>
                        </View>
                        <View
                          style={tailwind(
                            'flex flex-col p-2 border-l-2 border-indigo-200 items-center',
                          )}>
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={tailwind('w-6 h-6 text-blue-600')}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg> */}
                          <Text style={tailwind('text-sm')}>
                            {bill?.address}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={tailwind('w-full bg-indigo-500 h-6')} />
                  <View style={tailwind('flex justify-between p-4')}>
                    <View>
                      <Text style={tailwind('font-bold')}>
                        Ng??y g???i h??a ????n:{' '}
                        <Text style={tailwind('text-sm font-medium')}>
                          {dayjs(bill?.createdAt as Date).format('DD/MM/YYYY')}
                        </Text>
                      </Text>
                    </View>
                    <View>
                      <Text style={tailwind('text-sm')}>
                        <Text style={tailwind('font-bold')}>
                          Thanh to??n cho:{' '}
                        </Text>
                        {bill.memberName}
                      </Text>
                    </View>
                    <View />
                  </View>
                  <View style={tailwind('flex max-w-[100%] justify-center')}>
                    <View
                      style={tailwind(
                        'border-b border-gray-200 justify-between w-full',
                      )}>
                      <Table
                        style={tailwind(
                          '2xs:overflow-x-auto 2xs:overflow-y-auto w-full text-left',
                        )}>
                        <Row
                          data={['Lo???i h??a ????n', 'Th??nh ti???n']}
                          textStyle={tailwind(
                            'px-4 py-2 text-base text-gray-500',
                          )}
                        />
                        <Table style={tailwind('bg-white')}>
                          {bill.invoiceService?.map(
                            (totalBill: any, index1: number) => {
                              // const priceRoom = bill.invoiceService.find(
                              //   (bill2: any) =>
                              //     bill2.serviceName === 'Ti???n nh??',
                              // );
                              return (
                                <Row
                                  key={index1}
                                  data={[
                                    totalBill?.serviceName,
                                    totalBill?.amount.toLocaleString('it-IT', {
                                      style: 'currency',
                                      currency: 'VND',
                                    }),
                                  ]}
                                  style={tailwind('whitespace-nowrap')}
                                  textStyle={tailwind('px-6 py-4')}
                                />
                              );
                            },
                          )}
                          {bill?.debt !== 0 && (
                            <Row
                              data={[
                                'Ti???n n??? th??ng tr?????c',
                                bill?.debt?.toLocaleString('it-IT', {
                                  style: 'currency',
                                  currency: 'VND',
                                }),
                              ]}
                              style={tailwind('text-white bg-gray-800')}
                              textStyle={tailwind(
                                'text-sm font-bold text-green-400 px-6 py-4',
                              )}
                            />
                          )}
                          <Row
                            data={[
                              'T???ng ti???n',
                              totalPrice?.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                              }),
                            ]}
                            style={tailwind('text-white bg-gray-800')}
                            textStyle={tailwind(
                              'text-sm font-bold text-green-400 px-6 py-4',
                            )}
                          />
                          <Row
                            data={[
                              'S??? ti???n ???? ????ng',
                              bill?.paidAmount?.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                              }),
                            ]}
                            style={tailwind('text-white bg-gray-800')}
                            textStyle={tailwind(
                              'text-sm font-bold text-green-400 px-6 py-4',
                            )}
                          />
                          <Row
                            data={[
                              'S??? ti???n c??n n???',
                              debtTotal?.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                              }),
                            ]}
                            style={tailwind('text-white bg-gray-800')}
                            textStyle={tailwind(
                              'text-sm font-bold text-yellow-400 px-6 py-4',
                            )}
                          />
                        </Table>
                      </Table>
                    </View>
                  </View>
                  <View style={tailwind('px-4')}>
                    {debtTotal === 0 && (
                      <View
                        style={tailwind(
                          'border border-transparent text-sm font-medium rounded-lg text-white text-center bg-green-400 w-full px-6 py-4 my-4 ',
                        )}>
                        ???? thanh to??n
                      </View>
                    )}
                    {debtTotal !== 0 && (
                      <TouchableOpacity
                        style={tailwind(
                          'cursor-pointer w-full px-6 py-4 my-4 text-white bg-blue-600 rounded-lg border border-transparent text-sm font-medium text-center',
                        )}
                        onPress={async () => {
                          if (!code_room?.building_id) return;
                          const data = {
                            amount: debtTotal,
                            orderDescription: `${monthCheck},${yearCheck},${debtTotal},${
                              code_room?._id || ''
                            },${code_room?.building_id || ''},${
                              code_room?.name || ''
                            },${bills[0]?._id || ''}`,
                            orderType: 'billpayment',
                            language: 'vn',
                            bankCode: '',
                            month: monthCheck,
                            year: yearCheck,
                          };
                          const resultAction = await dispatch(
                            createPayment({
                              building_id: code_room.building_id,
                              data,
                            }),
                          );
                          if (createPayment.fulfilled.match(resultAction)) {
                            navigate(resultAction.payload.redirect);
                          }
                        }}>
                        <Text>Thanh to??n h??a ????n</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={tailwind('w-full h-0.5 bg-indigo-500')} />
                  <View style={tailwind('p-4')}>
                    <View
                      style={tailwind(
                        'flex items-center justify-center font-extrabold text-indigo-500',
                      )}>
                      C???m ??n b???n r???t nhi???u v?? ???? s??? d???ng d???ch v??? c???a ch??ng t??i.
                    </View>
                    <View
                      style={tailwind('flex items-end justify-end space-x-3')}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={tailwind('bg-white relative overflow-hidden h-screen')}>
          <View
            style={tailwind(
              'container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32',
            )}>
            <View
              style={tailwind(
                'container mx-auto px-6 flex flex-col justify-between items-center relative',
              )}>
              <View
                style={tailwind(
                  'flex w-full items-center justify-center space-x-12 flex-col md:flex-row mb-16 md:mb-8',
                )}>
                <Text
                  style={tailwind(
                    'font-thin text-center text-6xl text-gray-800',
                  )}>
                  Th??ng n??y ch??a c?? h??a ????n
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default InfoReceipt;
