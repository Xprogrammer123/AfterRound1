import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NumberPad = () => {
    return (
        <View style={styles.container}>
            <Text>NumberPad Component</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NumberPad;
