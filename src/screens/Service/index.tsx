import React, {useEffect, useState} from 'react';
import {Table, Row} from 'react-native-table-component';
import {useTailwind} from 'tailwind-rn/dist';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import {GetListServiceResponse, GetRoomDataResponse} from '@types';
import {getListService, getRoomData} from '@redux/thunk';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {appSelector} from '@redux/selector';

const InfoService: React.FC = () => {
  const [listServices, setListServices] = useState<GetListServiceResponse>();
  const [roomData, setRoomData] = useState<GetRoomDataResponse>();

  const {code_room} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (code_room?._id) {
        const resultAction = await dispatch(
          getRoomData({
            room_id: code_room._id,
          }),
        );
        if (getRoomData.fulfilled.match(resultAction)) {
          setRoomData(resultAction.payload);
        }
      }
      if (code_room?.building_id) {
        const resultAction = await dispatch(
          getListService({building_id: code_room.building_id}),
        );
        if (getListService.fulfilled.match(resultAction)) {
          setListServices(resultAction.payload);
        }
      }
    })();
  }, [code_room, dispatch]);

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
                quản lý dịch vụ
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
                <View style={tailwind('bg-white')}>
                  <View
                    style={tailwind(
                      'max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8',
                    )}>
                    <View
                      style={tailwind(
                        'lg:flex lg:items-center lg:justify-between',
                      )}>
                      <View style={tailwind('flex-1 min-w-0')}>
                        <Text
                          style={tailwind(
                            'text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate uppercase',
                          )}>
                          dịch vụ chung
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <Table style={tailwind('min-w-full divide-y divide-gray-200')}>
                  <Row
                    data={['Tên dịch vụ', 'Giá dịch vụ']}
                    widthArr={[100, 100]}
                    style={tailwind('bg-gray-50')}
                    textStyle={tailwind(
                      'px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
                    )}
                  />
                  {listServices?.data.doNotDelete && (
                    <Row
                      data={[
                        listServices?.data.label,
                        listServices?.data.price.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        }),
                      ]}
                      widthArr={[100, 100]}
                      style={tailwind('bg-white divide-y divide-gray-200')}
                      textStyle={tailwind(
                        'px-9 py-4 whitespace text-sm text-gray-500',
                      )}
                    />
                  )}
                </Table>
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
                <View style={tailwind('bg-white')}>
                  <View
                    style={tailwind(
                      'max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8',
                    )}>
                    <View
                      style={tailwind(
                        'lg:flex lg:items-center lg:justify-between',
                      )}>
                      <View style={tailwind('flex-1 min-w-0')}>
                        <Text
                          style={tailwind(
                            'text-lg font-bold leading-7 text-gray-900 sm:text-lg sm:truncate uppercase',
                          )}>
                          dịch vụ riêng
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Table style={tailwind('min-w-full divide-y divide-gray-200')}>
                  <Row
                    data={['Tên dịch vụ', 'Giá dịch vụ']}
                    widthArr={[100, 100]}
                    style={tailwind('bg-gray-50')}
                    textStyle={tailwind(
                      'px-9 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider',
                    )}
                  />
                  {roomData?.service.map((service, index) => (
                    <Row
                      key={index}
                      data={[
                        service.name,
                        service.price.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        }),
                      ]}
                      widthArr={[100, 100]}
                      style={tailwind('bg-white divide-y divide-gray-200')}
                      textStyle={tailwind(
                        'px-9 py-4 whitespace text-sm text-gray-500',
                      )}
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

export default InfoService;
