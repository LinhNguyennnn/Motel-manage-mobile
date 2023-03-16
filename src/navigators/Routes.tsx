import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {
  faBox,
  faCoins,
  faHospital,
  faPalette,
  faPlug,
  faShower,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';

import {TouchableOpacity} from '@components/Actions';
import {useAppDispatch} from '@hooks/useAppDispatch';
import Notification from '@screens/Notification';
import Electricity from '@screens/Electricity';
import {reset} from '@libs/utils/navigation';
import Statistic from '@screens/Statistic';
import Contract from '@screens/Contract';
import Invoice from '@screens/Invoice';
import Service from '@screens/Service';
import {RouterPathValue} from '@types';
import {logout} from '@redux/slice';
import {PATH} from '@configs/path';
import Water from '@screens/Water';
import Login from '@screens/Login';
import Room from '@screens/Room';

type RouteProps = {
  initialRoute: {
    stackName: RouterPathValue;
    routeName: RouterPathValue;
    params?: object;
  };
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Tabs: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2352eb',
          tabBarInactiveTintColor: '#36363b',
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => {
                dispatch(logout());
                reset(PATH.LOGIN);
              }}>
              <FontAwesomeIcon size={20} icon={faPowerOff} />
            </TouchableOpacity>
          ),
        }}>
        <Tab.Screen
          name={PATH.STATISTIC}
          component={Statistic}
          options={{
            title: 'Thống kê',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faPalette} />
            ),
          }}
        />
        <Tab.Screen
          name={PATH.ROOM}
          component={Room}
          options={{
            title: 'Phòng',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faHospital} />
            ),
          }}
        />
        <Tab.Screen
          name={PATH.SERVICE}
          component={Service}
          options={{
            title: 'Dịch vụ',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faBox} />
            ),
          }}
        />
        <Tab.Screen
          name={PATH.ELECTRICITY}
          component={Electricity}
          options={{
            title: 'Điện',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faPlug} />
            ),
          }}
        />
        <Tab.Screen
          name={PATH.WATER}
          component={Water}
          options={{
            title: 'Nước',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faShower} />
            ),
          }}
        />
        <Tab.Screen
          name={PATH.INVOICE}
          component={Invoice}
          options={{
            title: 'Hoá đơn',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faCoins} />
            ),
          }}
        />
        <Tab.Screen
          name={PATH.CONTRACT}
          component={Contract}
          options={{
            title: 'Hợp đồng',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faCoins} />
            ),
          }}
        />
        <Tab.Screen
          name={PATH.NOTIFICATION}
          component={Notification}
          options={{
            title: 'Thông báo',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faCoins} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export const Routes: React.FC<RouteProps> = ({initialRoute}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute.stackName}>
      <Stack.Screen
        name={PATH.LOGIN}
        component={Login}
        initialParams={{
          path: initialRoute.routeName,
          params: initialRoute.params,
        }}
      />
      <Stack.Screen name={PATH.MAIN_TAB} component={Tabs} />
    </Stack.Navigator>
  );
};
