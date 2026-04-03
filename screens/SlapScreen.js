import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Hand from '../components/Hand';

const SlapScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.alertText}>GET READY TO SLAP!</Text>
                </View>

                {/* Animation Area */}
                <View style={styles.animationArea}>
                    <Hand />
                    <Text style={styles.playerName}>Ayo is about to slap...</Text>
                </View>

                {/* Action Area */}
                <View style={styles.actionArea}>
                    <TouchableOpacity
                        style={styles.slapButton}
                        onPress={() => navigation.navigate('Result')}
                    >
                        <Text style={styles.slapButtonText}>SLAP NOW!</Text>
                    </TouchableOpacity>
                </View>

                {/* Instructions */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Wait for the perfect moment...</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0a0a0a', // Dark theme for high tension
    },
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 48,
    },
    alertText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#00ff87',
        letterSpacing: 2,
    },
    animationArea: {
        alignItems: 'center',
        width: '100%',
    },
    playerName: {
        marginTop: 24,
        fontSize: 18,
        color: '#fff',
        fontWeight: ' bold',
    },
    actionArea: {
        width: '100%',
        alignItems: 'center',
    },
    slapButton: {
        width: 200,
        height: 200,
        backgroundColor: '#00ff87',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00ff87',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 20,
    },
    slapButtonText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0a0a0a',
        textAlign: 'center',
    },
    footer: {
        marginBottom: 24,
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        letterSpacing: 1,
    },
});

export default SlapScreen;
