import React, {useCallback, useState} from 'react';
import {faLocationDot, faGlobe} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

import {createPayment, getBillRoomID} from '@redux/thunk';
import {TouchableOpacity} from '@components/Actions';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {navigate} from '@libs/utils/navigation';
import {appSelector} from '@redux/selector';
import Select from '@components/Select';

const today = new Date();

const Invoice: React.FC = () => {
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [year, setYear] = useState<number>(today.getFullYear());

  const {room_data, bill_data, loading} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    if (!room_data?.data._id) return;
    dispatch(
      getBillRoomID({
        room_id: room_data.data._id,
        year: year,
        month: month,
      }),
    );
  }, [room_data, year, month, dispatch]);

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
      <View style={tailwind('bg-white p-4')}>
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
        {bill_data?.data ? (
          bill_data.data.map((bill, index) => {
            const totalPrice =
              bill.invoiceService.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.amount,
                0,
              ) + bill.debt;
            return (
              <View key={index}>
                <View style={tailwind('w-full')}>
                  <View style={tailwind('flex-[100%] bg-gray-100')}>
                    <View style={tailwind('bg-white')}>
                      <View
                        style={tailwind(
                          'flex justify-between p-4 items-center',
                        )}>
                        <View>
                          <Text
                            style={tailwind(
                              'text-3xl italic font-extrabold tracking-widest text-indigo-500',
                            )}>
                            Quản lý phòng trọ 24/7
                          </Text>
                          <Text style={tailwind('text-base')}>
                            Vui lòng thanh toán trong vòng 7 ngày tính từ thời
                            gian nhận được hóa đơn.
                          </Text>
                          <Text style={tailwind('text-base')}>
                            Mọi thắc mắc xin gửi phản hồi về cho website để được
                            xử lý.
                          </Text>
                        </View>
                        <View style={tailwind('flex p-2')}>
                          <View
                            style={tailwind(
                              'flex flex-col items-center p-2 border-l-2 border-indigo-200',
                            )}>
                            <FontAwesomeIcon
                              icon={faGlobe}
                              color="rgb(37,99,235)"
                            />
                            <Text style={tailwind('text-sm')}>
                              www.quanlyphongtro247.com
                            </Text>
                          </View>
                          <View
                            style={tailwind(
                              'flex flex-col p-2 border-l-2 border-indigo-200 items-center',
                            )}>
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              color="rgb(37,99,235)"
                            />
                            <Text style={tailwind('text-sm')}>
                              {bill?.address}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={tailwind('w-full bg-indigo-500 h-6')} />
                      <View style={tailwind('flex justify-between p-4')}>
                        <View>
                          <Text style={tailwind('font-bold')}>
                            Ngày gửi hóa đơn:{' '}
                            <Text style={tailwind('text-sm font-medium')}>
                              {dayjs(bill?.createdAt).format('DD/MM/YYYY')}
                            </Text>
                          </Text>
                        </View>
                        <View>
                          <Text style={tailwind('text-sm')}>
                            <Text style={tailwind('font-bold')}>
                              Thanh toán cho:{' '}
                            </Text>
                            <Text style={tailwind('text-sm font-medium')}>
                              {bill.memberName}
                            </Text>
                          </Text>
                        </View>
                        <View />
                      </View>
                      <ScrollView
                        horizontal={true}
                        style={tailwind('rounded-md')}>
                        <DataTable style={tailwind('bg-white')}>
                          <DataTable.Header style={tailwind('bg-gray-50')}>
                            {['Loại hóa đơn', 'Thành tiền'].map(
                              (title, index2) => (
                                <DataTable.Title
                                  key={index2}
                                  style={tailwind(
                                    'flex-none justify-center items-center w-[160px]',
                                  )}
                                  textStyle={tailwind(
                                    'text-base text-gray-500',
                                  )}>
                                  {title}
                                </DataTable.Title>
                              ),
                            )}
                          </DataTable.Header>
                          {bill.invoiceService?.map((totalBill, index1) => (
                            <DataTable.Row key={index1}>
                              {[
                                totalBill?.serviceName,
                                totalBill?.amount.toLocaleString('it-IT', {
                                  style: 'currency',
                                  currency: 'VND',
                                }),
                              ].map((value, index3) => (
                                <DataTable.Cell
                                  key={index3}
                                  style={tailwind(
                                    `flex-none items-center ${
                                      index3 === 0
                                        ? 'justify-center'
                                        : 'justify-end'
                                    } w-[160px]`,
                                  )}
                                  textStyle={tailwind('px-6 py-4')}>
                                  {value}
                                </DataTable.Cell>
                              ))}
                            </DataTable.Row>
                          ))}
                          {bill.debt ? (
                            <DataTable.Row>
                              <DataTable.Cell
                                style={tailwind(
                                  'flex-none justify-center items-center w-[160px]',
                                )}
                                textStyle={tailwind(
                                  'px-6 py-4 text-sm text-gray-900',
                                )}>
                                Tiền nợ tháng trước
                              </DataTable.Cell>
                              <DataTable.Cell
                                style={tailwind(
                                  'flex-none justify-end items-center w-[160px]',
                                )}
                                textStyle={tailwind('px-6 py-4')}>
                                {bill.debt.toLocaleString('it-IT', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </DataTable.Cell>
                            </DataTable.Row>
                          ) : null}
                          <DataTable.Row style={tailwind('bg-gray-800')}>
                            <DataTable.Cell
                              style={tailwind(
                                'flex-none justify-center items-center w-[160px]',
                              )}
                              textStyle={tailwind(
                                'px-6 py-4 text-sm text-white font-bold',
                              )}>
                              Tổng tiền
                            </DataTable.Cell>
                            <DataTable.Cell
                              style={tailwind(
                                'flex-none justify-end items-center w-[160px]',
                              )}
                              textStyle={tailwind(
                                'px-6 py-4 text-white font-bold',
                              )}>
                              {totalPrice.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row style={tailwind('bg-gray-800')}>
                            <DataTable.Cell
                              style={tailwind(
                                'flex-none justify-center items-center w-[160px]',
                              )}
                              textStyle={tailwind(
                                'px-6 py-4 text-sm text-green-400 font-bold',
                              )}>
                              Số tiền đã đóng
                            </DataTable.Cell>
                            <DataTable.Cell
                              style={tailwind(
                                'flex-none justify-end items-center w-[160px]',
                              )}
                              textStyle={tailwind(
                                'px-6 py-4 font-bold text-green-400',
                              )}>
                              {bill.paidAmount.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </DataTable.Cell>
                          </DataTable.Row>
                          <DataTable.Row style={tailwind('bg-gray-800')}>
                            <DataTable.Cell
                              style={tailwind(
                                'flex-none justify-center items-center w-[160px]',
                              )}
                              textStyle={tailwind(
                                'px-6 py-4 text-sm text-yellow-400 font-bold',
                              )}>
                              Số tiền còn nợ
                            </DataTable.Cell>
                            <DataTable.Cell
                              style={tailwind(
                                'flex-none justify-end items-center w-[160px]',
                              )}
                              textStyle={tailwind(
                                'px-6 py-4 text-yellow-400 font-bold',
                              )}>
                              {(totalPrice - bill.paidAmount).toLocaleString(
                                'it-IT',
                                {
                                  style: 'currency',
                                  currency: 'VND',
                                },
                              )}
                            </DataTable.Cell>
                          </DataTable.Row>
                        </DataTable>
                      </ScrollView>
                      <View style={tailwind('px-4')}>
                        {!(totalPrice - bill.paidAmount) ? (
                          <View
                            style={tailwind(
                              'w-full px-6 py-4 my-4 bg-green-600 rounded-lg border border-transparent',
                            )}>
                            <Text
                              style={tailwind(
                                'text-sm font-bold text-white text-center',
                              )}>
                              Đã thanh toán
                            </Text>
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={tailwind(
                              'w-full px-6 py-4 my-4 bg-blue-600 rounded-lg border border-transparent',
                            )}
                            onPress={async () => {
                              if (!room_data?.data.idHouse) return;
                              const data = {
                                amount: totalPrice - bill.paidAmount,
                                orderDescription: `${month},${year},${
                                  totalPrice - bill.paidAmount
                                },${room_data?.data._id || ''},${
                                  room_data?.data.idHouse || ''
                                },${room_data?.data.name || ''},${
                                  bill_data.data[0]?._id || ''
                                }`,
                                orderType: 'billpayment',
                                language: 'vn',
                                bankCode: '',
                                month: month,
                                year: year,
                              };
                              const resultAction = await dispatch(
                                createPayment({
                                  building_id: room_data.data.idHouse,
                                  data,
                                }),
                              );
                              if (createPayment.fulfilled.match(resultAction)) {
                                navigate(resultAction.payload.redirect);
                              }
                            }}>
                            <Text
                              style={tailwind(
                                'text-white text-sm text-center font-bold',
                              )}>
                              Thanh toán hóa đơn
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={tailwind('w-full h-0.5 bg-indigo-500')} />
                      <View style={tailwind('p-4')}>
                        <Text
                          style={tailwind(
                            'flex items-center justify-center font-extrabold text-indigo-500',
                          )}>
                          Cảm ơn bạn rất nhiều vì đã sử dụng dịch vụ của chúng
                          tôi.
                        </Text>
                        <View style={tailwind('flex items-end justify-end')} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={tailwind('text-center text-2xl text-gray-800 my-6')}>
            Tháng này chưa có hóa đơn
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Invoice;
