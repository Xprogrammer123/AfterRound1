import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea} className="flex-1 bg-[#fdfafa]">
            <StatusBar barStyle="dark-content" />

            <View style={styles.container} className="flex-1 px-12 flex-row items-center justify-between">

                {/* Left Side: Brand */}
                <View style={styles.leftSection} className="flex-1 items-start">
                    <View className="mb-4">
                        <Text style={styles.emoji} className="text-7xl">🤚🏾</Text>
                    </View>
                    <Text style={styles.title} className="text-[#0a0a0a] text-5xl font-black tracking-tighter" >
                        AFTER<Text style={styles.highlight} className="text-[#00ff87]">ROUND</Text>1
                    </Text>
                    <View style={styles.badge} className="mt-2 px-3 py-1 rounded-full border border-gray-200">
                        <Text style={styles.badgeText} className="text-gray-400 text-[8px] font-bold tracking-[3px] uppercase">
                            The Nigerian Classic
                        </Text>
                    </View>
                </View>

                {/* Right Side: Actions */}
                <View style={styles.rightSection} className="flex-1 w-full space-y-4 max-w-sm">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-[#00ff87] h-16 rounded-2xl items-center justify-center shadow-lg shadow-[#00ff87]/20"
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Lobby')}
                    >
                        <Text style={styles.primaryButtonText} className="text-[#0a0a0a] text-lg font-black uppercase tracking-tight">
                            Create Game
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="bg-transparent h-16 rounded-2xl items-center justify-center border-2 border-[#00ff87]/30"
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('Lobby')}
                    >
                        <Text style={styles.secondaryButtonText} className="text-[#00ff87] text-base font-bold">
                            Join with Code
                        </Text>
                    </TouchableOpacity>

                    <View className="items-center mt-4">
                        <Text style={styles.footerText} className="text-gray-400 text-[10px] font-medium">
                            HANDS READY? 🇳🇬
                        </Text>
                    </View>
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
        paddingHorizontal: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftSection: {
        flex: 1,
        justifyContent: 'center',
    },
    rightSection: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 24,
    },
    emoji: {
        fontSize: 64,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        color: '#0a0a0a',
        letterSpacing: -1,
    },
    highlight: {
        color: '#00ff87',
    },
    badge: {
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#eee',
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#aaa',
        fontSize: 8,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    primaryButton: {
        height: 64,
        backgroundColor: '#00ff87',
        borderRadius: 16,
        marginBottom: 12,
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
        fontSize: 18,
        fontWeight: '900',
    },
    secondaryButton: {
        height: 64,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'rgba(0, 255, 135, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#00ff87',
        fontSize: 16,
        fontWeight: '700',
    },
    footerText: {
        color: '#aaa',
        fontSize: 10,
    }
});
