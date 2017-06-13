import React from 'react';
import { Text } from 'react-native';

export default function B({ children }) {
  return (
    <Text style={{ fontWeight: 'bold' }}>{children}</Text>
  );
}
