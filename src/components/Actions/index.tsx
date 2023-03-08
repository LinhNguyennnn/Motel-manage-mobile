import React from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {debounce} from 'lodash';

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
      {...props}
    >
      {children}
    </RNTouchableOpacity>
  );
};
