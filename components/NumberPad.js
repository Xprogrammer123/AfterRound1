import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NumberPad = ({ onNumberPress }) => {
    const numbers = [1, 2, 3, 4, 5, 0];

    return (
        <View style={styles.container}>
            {numbers.map((num) => (
                <TouchableOpacity
                    key={num}
                    style={styles.key}
                    onPress={() => onNumberPress(num)}
                >
                    <Text style={styles.keyText}>{num}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        padding: 16,
    },
    key: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    keyText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0a0a0a',
    },
});

export default NumberPad;
