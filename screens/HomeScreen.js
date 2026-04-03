import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea} className="flex-1 bg-[#fdfafa]">
            <StatusBar barStyle="dark-content" />

            <View style={styles.container} className="flex-1 px-8 items-center justify-between py-12">

                {/* Header / Brand */}
                <View className="items-center mt-12">
                    <View className="mb-6">
                        <Text style={styles.emoji} className="text-8xl">🤚🏾</Text>
                    </View>
                    <Text style={styles.title} className="text-[#0a0a0a] text-5xl font-black tracking-tighter" >
                        AFTER<Text style={styles.highlight} className="text-[#00ff87]">ROUND</Text>1
                    </Text>
                    <View style={styles.badge} className="mt-2 px-3 py-1 rounded-full border border-gray-200">
                        <Text style={styles.badgeText} className="text-gray-400 text-xs font-bold tracking-[4px] uppercase">
                            The Nigerian Classic
                        </Text>
                    </View>
                </View>

                {/* Action Section */}
                <View style={styles.buttonContainer} className="w-full space-y-4 mb-10">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-[#00ff87] h-18 rounded-2xl items-center justify-center shadow-lg shadow-[#00ff87]/20"
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Lobby')}
                    >
                        <Text style={styles.primaryButtonText} className="text-[#0a0a0a] text-xl font-black uppercase tracking-tight">
                            Create Game
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="bg-transparent h-18 rounded-2xl items-center justify-center border-2 border-[#00ff87]/30"
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('Lobby')}
                    >
                        <Text style={styles.secondaryButtonText} className="text-[#00ff87] text-lg font-bold">
                            Join with Code
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="items-center pb-4">
                    <Text style={styles.footerText} className="text-gray-400 text-xs font-medium">
                        HANDS READY? 🇳🇬
                    </Text>
                    <View style={styles.dot} className="mt-2 h-1 w-1 rounded-full bg-[#00ff87]" />
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fdfafa',
    },
    container: {
        paddingHorizontal: 32,
        paddingVertical: 48,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emoji: {
        fontSize: 80,
        marginBottom: 24,
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        color: '#0a0a0a',
        letterSpacing: -1,
    },
    highlight: {
        color: '#00ff87',
    },
    badge: {
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#eee',
    },
    badgeText: {
        color: '#aaa',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 4,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 40,
    },
    primaryButton: {
        height: 72,
        backgroundColor: '#00ff87',
        borderRadius: 20,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00ff87',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    primaryButtonText: {
        color: '#0a0a0a',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    secondaryButton: {
        height: 72,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(0, 255, 135, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#00ff87',
        fontSize: 18,
        fontWeight: '700',
    },
    footerText: {
        color: '#aaa',
        fontSize: 12,
        fontWeight: '500',
    },
    dot: {
        marginTop: 8,
        height: 4,
        width: 4,
        borderRadius: 2,
        backgroundColor: '#00ff87',
    }
});
