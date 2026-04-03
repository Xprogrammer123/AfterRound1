import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView className="flex-1 bg-[#fdfafa]">
            <StatusBar barStyle="light-content" />

            <View className="flex-1 px-8 items-center justify-between py-12">

                {/* Header / Brand */}
                <View className="items-center mt-12">
                    <View className="mb-6">
                        <Text className="text-8xl">🤚🏾</Text>
                    </View>
                    <Text className="text-[#0a0a0a] text-5xl font-black tracking-tighter" >
                        AFTER<Text className="text-[#00ff87]">ROUND</Text>1
                    </Text>
                    <View className="mt-2 px-3 py-1 rounded-full border border-gray-200">
                        <Text className="text-gray-400 text-xs font-bold tracking-[4px] uppercase">
                            The Nigerian Classic
                        </Text>
                    </View>
                </View>

                {/* Action Section */}
                <View className="w-full space-y-4 mb-10">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-[#00ff87] h-18 rounded-2xl items-center justify-center shadow-lg shadow-[#00ff87]/20"

                        onPress={() => navigation.navigate('Lobby')}
                    >
                        <Text className="text-[#0a0a0a] text-xl font-black uppercase tracking-tight">
                            Create Game
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="bg-transparent h-18 rounded-2xl items-center justify-center border-2 border-[#00ff87]/30"

                        onPress={() => navigation.navigate('Lobby')}
                    >
                        <Text className="text-[#00ff87] text-lg font-bold">
                            Join with Code
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="items-center pb-4">
                    <Text className="text-gray-400 text-xs font-medium">
                        HANDS READY? 🇳🇬
                    </Text>
                    <View className="mt-2 h-1 w-1 rounded-full bg-[#00ff87]" />
                </View>

            </View>
        </SafeAreaView>
    );
}
