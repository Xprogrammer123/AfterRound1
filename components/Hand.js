import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Hand = ({ type = 'slap' }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>{type === 'slap' ? '🤚🏾' : '✋🏾'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.6,
        height: width * 0.6,
        backgroundColor: 'rgba(0, 255, 135, 0.1)',
        borderRadius: width * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#00ff87',
        borderStyle: 'dashed',
    },
    emoji: {
        fontSize: 120,
    },
});

export default Hand;
