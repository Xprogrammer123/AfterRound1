import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LobbyScreen = () => {
    return (
        <View style={styles.container}>
            <Text>LobbyScreen</Text>
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

export default LobbyScreen;
