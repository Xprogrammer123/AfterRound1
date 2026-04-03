import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SlapScreen = () => {
    return (
        <View style={styles.container}>
            <Text>SlapScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SlapScreen;
