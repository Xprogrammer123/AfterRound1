import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Hand = () => {
    return (
        <View style={styles.container}>
            <Text>Animated Hand Component</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Hand;
