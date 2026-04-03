import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea} className="flex-1 bg-[#0a0a0a] items-center justify-between py-16">
            <View style={styles.container} className="items-center justify-between flex-1 w-full">
                {/* Title Section */}
                <View className="items-center gap-3 mt-10">
                    <Text className="text-8xl">🤚</Text>
                    <Text className="text-4xl font-black text-white tracking-wide">
                        After Round 1
                    </Text>
                    <Text className="text-sm text-gray-500 tracking-widest uppercase">
                        The Nigerian Classic
                    </Text>
                </View>

                {/* Buttons */}
                <View className="w-full px-8 gap-4">
                    <TouchableOpacity
                        className="bg-[#00ff87] py-5 rounded-2xl items-center"
                        style={styles.button}
                        onPress={() => navigation.navigate('Lobby')}
                    >
                        <Text className="text-lg font-black text-[#0a0a0a]">
                            Create Room
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-transparent py-5 rounded-2xl items-center border-2 border-[#00ff87]"
                        style={styles.outlineButton}
                        onPress={() => navigation.navigate('Lobby')}
                    >
                        <Text className="text-lg font-black text-[#00ff87]">
                            Join Room
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <Text className="text-sm text-gray-700">
                    Gather your people 🇳🇬
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    container: {
        paddingVertical: 64,
    },
    button: {
        backgroundColor: '#00ff87',
        paddingVertical: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    outlineButton: {
        paddingVertical: 20,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#00ff87',
    }
});