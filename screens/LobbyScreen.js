import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import PlayerCard from '../components/PlayerCard';

const LobbyScreen = ({ navigation }) => {
    const players = [
        { id: 1, name: 'You', isReady: true, isCurrentUser: true },
        { id: 2, name: 'Fawas', isReady: true },
        { id: 3, name: 'Ayo', isReady: false },
        { id: 4, name: null },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Lateral Header */}
                <View style={styles.sidebar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.roomInfo}>
                        <Text style={styles.roomLabel}>ROOM CODE</Text>
                        <Text style={styles.roomCode}>AFR-26</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.readyButton}
                        onPress={() => navigation.navigate('Game')}
                    >
                        <Text style={styles.readyButtonText}>READY</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Content (Horizontal Scroll) */}
                <View style={styles.mainContent}>
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>LOBBY</Text>
                        <Text style={styles.subtitle}>Waiting for players...</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.playerScroll}>
                        {players.map((player, index) => (
                            <PlayerCard
                                key={index}
                                name={player.name}
                                isReady={player.isReady}
                                isCurrentUser={player.isCurrentUser}
                            />
                        ))}
                    </ScrollView>
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
    sidebar: {
        width: 140,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#eee',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        fontSize: 24,
        color: '#0a0a0a',
    },
    roomInfo: {
        alignItems: 'center',
    },
    roomLabel: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#aaa',
        letterSpacing: 1,
    },
    roomCode: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0a0a0a',
    },
    mainContent: {
        flex: 1,
        padding: 24,
    },
    titleSection: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0a0a0a',
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
    },
    playerScroll: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    readyButton: {
        backgroundColor: '#00ff87',
        width: '100%',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    readyButtonText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#0a0a0a',
    },
});

export default LobbyScreen;
