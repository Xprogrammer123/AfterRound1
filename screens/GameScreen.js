import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import NumberPad from '../components/NumberPad';

const GameScreen = ({ navigation }) => {
    const [selectedNumber, setSelectedNumber] = useState(null);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Left Side: Controls & Info */}
                <View style={styles.leftPane}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.roundLabel}>ROUND</Text>
                            <Text style={styles.roundNumber}>01</Text>
                        </View>
                        <View style={styles.timer}>
                            <Text style={styles.timerText}>10s</Text>
                        </View>
                    </View>

                    <View style={styles.selectionZone}>
                        <Text style={styles.prompt}>YOUR PICK</Text>
                        <View style={styles.selectionDisplay}>
                            <Text style={styles.selectionText}>{selectedNumber !== null ? selectedNumber : '?'}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.confirmButton, selectedNumber === null && styles.disabledButton]}
                        disabled={selectedNumber === null}
                        onPress={() => navigation.navigate('Slap')}
                    >
                        <Text style={styles.confirmButtonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>

                {/* Right Side: Number Pad */}
                <View style={styles.rightPane}>
                    <NumberPad onNumberPress={setSelectedNumber} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fdfafa',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftPane: {
        flex: 0.4,
        padding: 24,
        borderRightWidth: 1,
        borderRightColor: '#eee',
        justifyContent: 'space-between',
    },
    rightPane: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roundLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#aaa',
    },
    roundNumber: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0a0a0a',
    },
    timer: {
        backgroundColor: '#0a0a0a',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    timerText: {
        color: '#00ff87',
        fontSize: 14,
        fontWeight: '900',
    },
    selectionZone: {
        alignItems: 'center',
    },
    prompt: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#aaa',
        letterSpacing: 1,
        marginBottom: 8,
    },
    selectionDisplay: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#00ff87',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectionText: {
        fontSize: 40,
        fontWeight: '900',
        color: '#00ff87',
    },
    confirmButton: {
        backgroundColor: '#0a0a0a',
        width: '100%',
        height: 54,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        opacity: 0.3,
    },
    confirmButtonText: {
        color: '#00ff87',
        fontSize: 16,
        fontWeight: '900',
    },
});

export default GameScreen;
