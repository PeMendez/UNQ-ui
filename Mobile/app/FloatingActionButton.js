import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FloatingActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Feather name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 10,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgb(80, 183, 245)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default FloatingActionButton;
