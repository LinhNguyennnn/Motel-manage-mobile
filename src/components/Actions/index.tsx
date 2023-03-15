import React from 'react';
import {debounce} from 'lodash';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({
  children,
  onPress,
  ...props
}) => {
  return (
    <RNTouchableOpacity
      onPress={
        onPress
          ? debounce(onPress, 300, {leading: true, trailing: false})
          : undefined
      }
      {...props}>
      {children}
    </RNTouchableOpacity>
  );
};
