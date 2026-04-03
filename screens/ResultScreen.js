import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';

const ResultScreen = ({ navigation, route }) => {
    const { flipped } = route.params || {};
    const { players, resetGame, slapData } = useGameLogic();

    const totalSum = players.reduce((sum, p) => sum + (p.pickedNumber || 0), 0);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, flipped && styles.flippedContainer]}>

                {/* Summary Section */}
                <View style={styles.leftPane}>
                    <Text style={styles.title}>RESULTS</Text>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>TOTAL SUM</Text>
                        <Text style={styles.totalNumber}>{totalSum}</Text>
                    </View>

                    <Text style={styles.verdict}>
                        {slapData.slapper?.name} slapped {slapData.slappee?.name}!
                    </Text>

                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => {
                            resetGame();
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.nextButtonText}>PLAY AGAIN</Text>
                    </TouchableOpacity>
                </View>

                {/* Breakdown Section */}
                <View style={styles.rightPane}>
                    <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                        {players.map((res, i) => (
                            <View key={i} style={styles.row}>
                                <View>
                                    <Text style={styles.playerName}>{res.name}</Text>
                                    <Text style={styles.status}>
                                        {slapData.slapper?.id === res.id ? "Slapper 🖐️" :
                                            slapData.slappee?.id === res.id ? "Slapped 🤕" : "Safe 😌"}
                                    </Text>
                                </View>
                                <Text style={styles.pickedNumber}>{res.pickedNumber}</Text>
                            </View>
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
    flippedContainer: {
        transform: [{ rotate: '180deg' }],
    },
    leftPane: {
        flex: 0.4,
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#eee',
    },
    rightPane: {
        flex: 0.6,
        padding: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0a0a0a',
        marginBottom: 24,
    },
    summaryBox: {
        width: '100%',
        backgroundColor: '#0a0a0a',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 16,
    },
    summaryTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#00ff87',
        letterSpacing: 2,
    },
    totalNumber: {
        fontSize: 48,
        fontWeight: '900',
        color: '#fff',
    },
    verdict: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        fontWeight: '900',
    },
    list: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    playerName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0a0a0a',
    },
    status: {
        fontSize: 10,
        color: '#666',
    },
    pickedNumber: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0a0a0a',
    },
    nextButton: {
        backgroundColor: '#00ff87',
        width: '100%',
        height: 54,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        color: '#0a0a0a',
        fontSize: 16,
        fontWeight: '900',
    }
});

export default ResultScreen;
