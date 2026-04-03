import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlayerCard = ({ name, isReady, isCurrentUser }) => {
    return (
        <View style={[styles.card, isCurrentUser && styles.currentCard]}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{name ? name[0].toUpperCase() : '?'}</Text>
            </View>
            <Text style={styles.name} numberOfLines={1}>{name || "Waiting..."}</Text>
            {name && (
                <View style={[styles.statusBadge, isReady ? styles.readyBadge : styles.waitingBadge]}>
                    <Text style={styles.statusText}>{isReady ? "Ready" : "Not Ready"}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 100,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        margin: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    currentCard: {
        borderColor: '#00ff87',
        borderWidth: 2,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0a0a0a',
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0a0a0a',
        marginBottom: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 99,
    },
    readyBadge: {
        backgroundColor: '#00ff87',
    },
    waitingBadge: {
        backgroundColor: '#f5f5f5',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#0a0a0a',
        textTransform: 'uppercase',
    },
});

export default PlayerCard;
