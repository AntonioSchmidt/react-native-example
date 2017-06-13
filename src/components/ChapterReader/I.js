import React from 'react';
import { Text } from 'react-native';

export default function I({ children }) {
  return (
    <Text style={{ fontStyle: 'italic' }}>{children}</Text>
  );
}
