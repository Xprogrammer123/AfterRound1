import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Hand from '../components/Hand';

const SlapScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Split Screen for "Flip" Feeling */}
                <View style={styles.targetPane}>
                    <Text style={styles.targetLabel}>THEY PICKED 4</Text>
                    <View style={styles.targetAvatar}>
                        <Text style={styles.avatarEmoji}>😨</Text>
                    </View>
                </View>

                <View style={styles.actionPane}>
                    <Text style={styles.actionLabel}>YOUR TURN TO SLAP!</Text>
                    <TouchableOpacity
                        style={styles.slapButton}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('Result')}
                    >
                        <Text style={styles.slapButtonText}>FLIP & SLAP!</Text>
                    </TouchableOpacity>
                    <Text style={styles.instruction}>Swing your phone! (Tap to test)</Text>
                </View>

                {/* Hand Animation Overlay */}
                <View style={styles.handContainer}>
                    <Hand />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    targetPane: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
    },
    actionPane: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    targetLabel: {
        color: '#666',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    targetAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEmoji: {
        fontSize: 50,
    },
    actionLabel: {
        color: '#00ff87',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 24,
    },
    slapButton: {
        width: 140,
        height: 140,
        backgroundColor: '#00ff87',
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00ff87',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
    },
    slapButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0a0a0a',
        textAlign: 'center',
    },
    instruction: {
        color: '#444',
        fontSize: 10,
        marginTop: 16,
    },
    handContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -60 }, { translateY: -60 }],
        opacity: 0.8,
    }
});

export default SlapScreen;
