import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

const ResultScreen = ({ navigation }) => {
    // Mock results
    const results = [
        { name: 'You', number: 4, status: 'Winner' },
        { name: 'Fawas', number: 4, status: 'Slapped!' },
        { name: 'Ayo', number: 2, status: 'Safe' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>ROUND RESULTS</Text>

                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>TOTAL SCORE</Text>
                    <Text style={styles.totalNumber}>10</Text>
                </View>

                <ScrollView style={styles.list}>
                    {results.map((res, i) => (
                        <View key={i} style={styles.row}>
                            <View>
                                <Text style={styles.playerName}>{res.name}</Text>
                                <Text style={styles.status}>{res.status}</Text>
                            </View>
                            <Text style={styles.pickedNumber}>{res.number}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.nextButtonText}>BACK TO HOME</Text>
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
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#0a0a0a',
        marginTop: 48,
        marginBottom: 32,
    },
    summaryBox: {
        width: '100%',
        backgroundColor: '#0a0a0a',
        padding: 32,
        borderRadius: 24,
        alignItems: 'center',
        marginBottom: 32,
    },
    summaryTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#00ff87',
        letterSpacing: 2,
    },
    totalNumber: {
        fontSize: 80,
        fontWeight: '900',
        color: '#fff',
    },
    list: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    playerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0a0a0a',
    },
    status: {
        fontSize: 12,
        color: '#666',
    },
    pickedNumber: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0a0a0a',
    },
    footer: {
        width: '100%',
        marginTop: 'auto',
        paddingVertical: 16,
    },
    nextButton: {
        backgroundColor: '#0a0a0a',
        height: 64,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        color: '#00ff87',
        fontSize: 18,
        fontWeight: '900',
    }
});

export default ResultScreen;
