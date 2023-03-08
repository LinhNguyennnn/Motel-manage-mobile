import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {useTailwind} from 'tailwind-rn/dist';
import {useSelector} from 'react-redux';

import {useAppDispatch} from '@hooks/useAppDispatch';
import {GetRoomDataResponse} from '@types';
import {appSelector} from '@redux/selector';
import {getRoomData} from '@redux/thunk';

const InfoRoom: React.FC = () => {
  const [roomData, setRoomData] = useState<GetRoomDataResponse>();

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
        setRoomData(resultAction.payload);
      }
    })();
  }, [code_room?._id, dispatch]);

  return (
    <View style={tailwind('h-auto')}>
      <View style={tailwind('bg-white')}>
        <View style={tailwind('max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8')}>
          <View style={tailwind('lg:flex lg:items-center lg:justify-between')}>
            <View style={tailwind('flex-1 min-w-0')}>
              <Text
                style={tailwind(
                  'text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase',
                )}>
                Thông tin phòng
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tailwind('max-w-full mx-auto py-6 sm:px-6 lg:px-8')}>
        <View style={tailwind('flex flex-col')}>
          <View style={tailwind('overflow-x-auto sm:-mx-6 lg:-mx-8')}>
            <View
              style={tailwind('py-2 align-middle inline-block min-w-full ')}>
              <View
                style={tailwind(
                  'overflow-hidden border-b border-gray-200 sm:rounded-lg',
                )}>
                <ScrollView horizontal={true}>
                  <Table
                    style={tailwind(
                      'min-w-full divide-y divide-gray-200 bg-white',
                    )}>
                    <Row
                      data={[
                        'Tên phòng',
                        'Giá thuê phòng',
                        'Diện tích phòng',
                        'Số người ở tối đa',
                        'Số người ở hiện tại',
                      ]}
                      style={tailwind('bg-gray-50')}
                      widthArr={[100, 100, 100, 100, 100]}
                      textStyle={tailwind(
                        'px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
                      )}
                    />
                  </Table>
                  <Table style={tailwind('bg-white divide-y divide-gray-200')}>
                    <Row
                      data={[
                        roomData?.name,
                        roomData?.price?.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        }),
                        roomData?.area,
                        roomData?.maxMember,
                        roomData?.listMember?.length,
                      ]}
                      style={tailwind('bg-gray-50')}
                      widthArr={[100, 100, 100, 100, 100]}
                      textStyle={tailwind(
                        'px-9 py-4 whitespace text-sm text-gray-500',
                      )}
                    />
                  </Table>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={tailwind('bg-white')}>
        <View style={tailwind('max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8')}>
          <View style={tailwind('lg:flex lg:items-center lg:justify-between')}>
            <View style={tailwind('flex-1 min-w-0')}>
              <Text
                style={tailwind(
                  'text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate uppercase',
                )}>
                Thành viên trong phòng
              </Text>
            </View>
            <View style={tailwind('mt-5 flex lg:mt-0 lg:ml-4')}>
              <View style={tailwind('mr-[20px]')}>
                <TextInput
                  style={tailwind(
                    'text-black border rounded w-full py-2 px-3 leading-tight',
                  )}
                  placeholder="Tìm kiếm..."
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={tailwind('max-w-full mx-auto py-6 sm:px-6 lg:px-8')}>
        <View style={tailwind('flex flex-col')}>
          <View style={tailwind('overflow-x-auto sm:-mx-6 lg:-mx-8')}>
            <View
              style={tailwind('py-2 align-middle inline-block min-w-full ')}>
              <View
                style={tailwind(
                  'overflow-hidden border-b border-gray-200 sm:rounded-lg',
                )}>
                <Table
                  style={tailwind(
                    'min-w-full divide-y divide-gray-200 bg-white',
                  )}>
                  <Row
                    data={[
                      'Tên thành viên',
                      'CMND/CCCD',
                      'Số điện thoại',
                      'Chức vụ trong phòng',
                    ]}
                    widthArr={[100, 100, 100, 100]}
                    style={tailwind('bg-gray-50')}
                    textStyle={tailwind(
                      'px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
                    )}
                  />
                </Table>
                <Table style={tailwind('bg-white divide-y divide-gray-200')}>
                  {roomData?.listMember?.map((item, index) => (
                    <Row
                      key={index}
                      data={[
                        item.memberName,
                        item.cardNumber,
                        item.phoneNumber,
                        item.status ? 'Chủ phòng' : 'thành viên',
                      ]}
                      widthArr={[100, 100, 100, 100]}
                      style={tailwind(
                        '9 py-4 whitespace text-sm text-gray-500',
                      )}
                      textStyle={tailwind('text-center')}
                    />
                  ))}
                </Table>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InfoRoom;
