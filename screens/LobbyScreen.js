import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';

export default function LobbyScreen({ navigation }) {
  const [roomCode] = useState('NG' + Math.floor(1000 + Math.random() * 9000));
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState(['You']);

  const addPlayer = () => {
    if (playerName.trim()) {
      setPlayers([...players, playerName.trim()]);
      setPlayerName('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a] px-6 py-10">
      
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-gray-500 text-sm uppercase tracking-widest mb-1">Room Code</Text>
        <Text className="text-4xl font-black text-[#00ff87] tracking-widest">{roomCode}</Text>
        <Text className="text-gray-600 text-xs mt-1">Share this with your people</Text>
      </View>

      {/* Players */}
      <Text className="text-white font-bold text-lg mb-3">Players ({players.length})</Text>
      <ScrollView className="mb-6">
        {players.map((player, index) => (
          <View key={index} className="flex-row items-center bg-[#1a1a1a] rounded-2xl px-4 py-4 mb-3">
            <View className="w-10 h-10 rounded-full bg-[#00ff87] items-center justify-center mr-3">
              <Text className="text-[#0a0a0a] font-black text-lg">
                {player.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-white font-semibold text-base">{player}</Text>
            {index === 0 && (
              <View className="ml-auto bg-[#00ff87]/20 px-3 py-1 rounded-full">
                <Text className="text-[#00ff87] text-xs font-bold">HOST</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Add Player */}
      <View className="flex-row gap-3 mb-6">
        <TextInput
          className="flex-1 bg-[#1a1a1a] text-white px-4 py-4 rounded-2xl"
          placeholder="Add player name..."
          placeholderTextColor="#444"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <TouchableOpacity
          className="bg-[#1a1a1a] px-5 rounded-2xl items-center justify-center"
          onPress={addPlayer}
        >
          <Text className="text-[#00ff87] text-2xl font-black">+</Text>
        </TouchableOpacity>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        className="bg-[#00ff87] py-5 rounded-2xl items-center"
        onPress={() => navigation.navigate('Game', { players })}
      >
        <Text className="text-[#0a0a0a] font-black text-lg">Start Game 🎮</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}