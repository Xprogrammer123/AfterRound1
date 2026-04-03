import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import PlayerCard from '../components/PlayerCard';

const LobbyScreen = ({ navigation }) => {
    // Mock players data
    const players = [
        { id: 1, name: 'You', isReady: true, isCurrentUser: true },
        { id: 2, name: 'Fawas', isReady: true },
        { id: 3, name: 'Ayo', isReady: false },
        { id: 4, name: null }, // Vacant slot
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.roomInfo}>
                        <Text style={styles.roomLabel}>ROOM CODE</Text>
                        <Text style={styles.roomCode}>AFR-2026</Text>
                    </View>
                    <View style={{ width: 24 }} />
                </View>

                {/* Content */}
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>WAITING ROOM</Text>
                    <Text style={styles.subtitle}>Waiting for everyone to be ready...</Text>

                    <View style={styles.playerGrid}>
                        {players.map((player, index) => (
                            <PlayerCard
                                key={index}
                                name={player.name}
                                isReady={player.isReady}
                                isCurrentUser={player.isCurrentUser}
                            />
                        ))}
                    </View>
                </ScrollView>

                {/* Footer Actions */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.readyButton}
                        onPress={() => navigation.navigate('Game')}
                    >
                        <Text style={styles.readyButtonText}>I'M READY</Text>
                    </TouchableOpacity>
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
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    backButton: {
        fontSize: 24,
        color: '#0a0a0a',
    },
    roomInfo: {
        alignItems: 'center',
    },
    roomLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#aaa',
        letterSpacing: 2,
    },
    roomCode: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0a0a0a',
        letterSpacing: 1,
    },
    scrollContent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0a0a0a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 32,
    },
    playerGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    footer: {
        marginTop: 'auto',
        paddingVertical: 16,
    },
    readyButton: {
        backgroundColor: '#00ff87',
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00ff87',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    readyButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#0a0a0a',
        letterSpacing: 1,
    },
});

export default LobbyScreen;
