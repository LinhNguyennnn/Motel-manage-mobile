import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableWithoutFeedback, View} from 'react-native';

import {tabBarOptions} from '@navigators/Layout/option';
import Electricity from '@screens/Electricity';
import Statistic from '@screens/Statistic';
import Contract from '@screens/Contract';
import Receipt from '@screens/Receipt';
import Service from '@screens/Service';
import {RouterPathValue} from '@types';
import Report from '@screens/Report';
import {PATH} from '@configs/path';
import Water from '@screens/Water';
import Login from '@screens/Login';
import Room from '@screens/Room';
import {
  CommunityTabBarIcon,
  LetterTabBarIcon,
  SearchTabBarIcon,
  ChatTabBarIcon,
} from './Layout/TabBarIcons';

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
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <Tab.Navigator screenOptions={tabBarOptions}>
        <Tab.Screen
          name={PATH.STATISTIC}
          component={Statistic}
          options={{
            tabBarLabel: 'Community',
            tabBarIcon: ({color, focused}) => (
              <TouchableWithoutFeedback>
                <CommunityTabBarIcon color={color} focused={focused} />
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name={PATH.ROOM}
          component={Room}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color, focused}) => (
              <TouchableWithoutFeedback>
                <SearchTabBarIcon color={color} focused={focused} />
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name={PATH.SERVICE}
          component={Service}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({color, focused}) => (
              <TouchableWithoutFeedback>
                <ChatTabBarIcon color={color} focused={focused} />
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name={PATH.ELECTRICITY}
          component={Electricity}
          options={{
            tabBarLabel: 'Letter',
            tabBarIcon: ({color, focused}) => (
              <TouchableWithoutFeedback>
                <LetterTabBarIcon color={color} focused={focused} />
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name={PATH.WATER}
          component={Water}
          options={{
            tabBarLabel: 'Letter',
            tabBarIcon: ({color, focused}) => (
              <TouchableWithoutFeedback>
                <LetterTabBarIcon color={color} focused={focused} />
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name={PATH.REPORT}
          component={Report}
          options={{
            tabBarLabel: 'Letter',
            tabBarIcon: ({color, focused}) => (
              <TouchableWithoutFeedback>
                <LetterTabBarIcon color={color} focused={focused} />
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name={PATH.CONTRACT}
          component={Contract}
          options={{
            tabBarLabel: 'Letter',
            tabBarIcon: ({color, focused}) => (
              <TouchableWithoutFeedback>
                <LetterTabBarIcon color={color} focused={focused} />
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name={PATH.RECEIPT}
          component={Receipt}
          options={{
            tabBarLabel: 'Letter',
            tabBarIcon: ({color, focused}) => (
              <TouchableWithoutFeedback>
                <LetterTabBarIcon color={color} focused={focused} />
              </TouchableWithoutFeedback>
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
        cardStyle: {backgroundColor: 'transparent'},
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
