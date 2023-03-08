import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  color: string;
  focused: boolean;
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const CommunityTabBarIcon: React.FC<Props> = ({color, focused}) => {
  return (
    <View style={styles.containerView}>
      <Text>1</Text>
    </View>
  );
};

export const SearchTabBarIcon: React.FC<Props> = ({color, focused}) => {
  return (
    <View style={styles.containerView}>
      <Text>2</Text>
    </View>
  );
};

export const ChatTabBarIcon: React.FC<Props> = ({color, focused}) => {
  return (
    <View style={styles.containerView}>
      <Text>3</Text>
    </View>
  );
};

export const LetterTabBarIcon: React.FC<Props> = ({color, focused}) => {
  return (
    <View style={styles.containerView}>
      <Text>4</Text>
    </View>
  );
};
