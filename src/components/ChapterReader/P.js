import React from 'react';
import { Text } from 'react-native';

export default function P({ children }) {
  return (
    <Text style={{ color: 'blue' }}>{children}</Text>
  );
}
