import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import NumberPad from '../components/NumberPad';

const GameScreen = ({ navigation }) => {
    const [selectedNumber, setSelectedNumber] = useState(null);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Status Bar Section */}
                <View style={styles.header}>
                    <View style={styles.roundInfo}>
                        <Text style={styles.roundLabel}>ROUND</Text>
                        <Text style={styles.roundNumber}>01</Text>
                    </View>
                    <View style={styles.timer}>
                        <Text style={styles.timerText}>10s</Text>
                    </View>
                </View>

                {/* Main Action Area */}
                <View style={styles.mainArea}>
                    <Text style={styles.prompt}>PICK YOUR NUMBER</Text>
                    <View style={styles.selectionDisplay}>
                        <Text style={styles.selectionText}>{selectedNumber !== null ? selectedNumber : '?'}</Text>
                    </View>
                    <Text style={styles.instruction}>You and others are picking...</Text>
                </View>

                {/* Number Pad */}
                <NumberPad onNumberPress={setSelectedNumber} />

                {/* Action Button */}
                <TouchableOpacity
                    style={[styles.confirmButton, selectedNumber === null && styles.disabledButton]}
                    disabled={selectedNumber === null}
                    onPress={() => navigation.navigate('Slap')}
                >
                    <Text style={styles.confirmButtonText}>SUBMIT</Text>
                </TouchableOpacity>
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
        padding: 24,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 48,
    },
    roundLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#aaa',
    },
    roundNumber: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0a0a0a',
    },
    timer: {
        backgroundColor: '#0a0a0a',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 99,
    },
    timerText: {
        color: '#00ff87',
        fontSize: 16,
        fontWeight: '900',
    },
    mainArea: {
        alignItems: 'center',
        marginBottom: 32,
    },
    prompt: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#aaa',
        letterSpacing: 2,
        marginBottom: 16,
    },
    selectionDisplay: {
        width: 120,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#00ff87',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#00ff87',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    selectionText: {
        fontSize: 64,
        fontWeight: '900',
        color: '#00ff87',
    },
    instruction: {
        fontSize: 12,
        color: '#666',
    },
    confirmButton: {
        backgroundColor: '#0a0a0a',
        width: '100%',
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
    },
    disabledButton: {
        opacity: 0.3,
    },
    confirmButtonText: {
        color: '#00ff87',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
    },
});

export default GameScreen;
