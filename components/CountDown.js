import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountDown = ({ count }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#00ff87',
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontSize: 80,
        fontWeight: '900',
        color: '#0a0a0a',
    },
});

export default CountDown;
