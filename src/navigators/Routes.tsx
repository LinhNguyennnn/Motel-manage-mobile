import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import {
  faCoins,
  faBars,
  faPalette,
  faPlug,
  faShower,
} from '@fortawesome/free-solid-svg-icons';

import Notification from '@screens/Notification';
import Electricity from '@screens/Electricity';
import Statistic from '@screens/Statistic';
import Contract from '@screens/Contract';
import Invoice from '@screens/Invoice';
import Service from '@screens/Service';
import {RouterPathValue} from '@types';
import {PATH} from '@configs/path';
import Other from '@screens/Other';
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

const Tabs: React.FC = () => {
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
          name={PATH.OTHER}
          component={Other}
          options={{
            title: 'Mở rộng',
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon color={color} size={16} icon={faBars} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const OtherNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={PATH.OTHER}
      screenOptions={{
        headerBackTitle: 'Trở về',
      }}>
      <Stack.Screen
        name={PATH.ROOM}
        component={Room}
        options={{
          title: 'Phòng',
        }}
      />
      <Stack.Screen
        name={PATH.SERVICE}
        component={Service}
        options={{title: 'Dịch vụ'}}
      />
      <Stack.Screen
        name={PATH.CONTRACT}
        component={Contract}
        options={{title: 'Hợp đồng'}}
      />
      <Stack.Screen
        name={PATH.NOTIFICATION}
        component={Notification}
        options={{title: 'Thông báo'}}
      />
    </Stack.Navigator>
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
      <Tab.Screen name={PATH.OTHER} component={OtherNavigator} />
    </Stack.Navigator>
  );
};
