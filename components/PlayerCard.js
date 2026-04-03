import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlayerCard = () => {
    return (
        <View style={styles.container}>
            <Text>PlayerCard Component</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PlayerCard;
