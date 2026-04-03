import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountDown = () => {
    return (
        <View style={styles.container}>
            <Text>CountDown Component</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CountDown;
