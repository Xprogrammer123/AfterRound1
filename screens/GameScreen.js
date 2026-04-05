import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';

export default function GameScreen({ navigation, route }) {
  const { players } = route.params;
  const [numbers, setNumbers] = useState({});
  const [phase, setPhase] = useState('pick'); // pick | reveal
  const [targetNumber, setTargetNumber] = useState(null);

  const pickNumber = (player, num) => {
    setNumbers(prev => ({ ...prev, [player]: num }));
  };

  const revealNumbers = () => {
    const aggregate = Object.values(numbers).reduce((a, b) => a + b, 0);
    const lastDigit = aggregate % 10;
    setTargetNumber(lastDigit);
    setPhase('reveal');
  };

  const getLoser = () => {
    return players.find(p => numbers[p] === targetNumber);
  };

  const allPicked = players.every(p => numbers[p] !== undefined);

  return (
    <SafeAreaView className="flex-1 bg-[#0a0a0a] px-6 py-10">

      {phase === 'pick' && (
        <>
          <Text className="text-white font-black text-2xl mb-2">Pick Your Number</Text>
          <Text className="text-gray-500 mb-8">Each player picks a number 0-9</Text>

          <ScrollView>
            {players.map((player, index) => (
              <View key={index} className="mb-6">
                <Text className="text-[#00ff87] font-bold mb-3">{player}</Text>
                <View className="flex-row flex-wrap gap-3">
                  {[0,1,2,3,4,5,6,7,8,9].map(num => (
                    <TouchableOpacity
                      key={num}
                      className={`w-14 h-14 rounded-2xl items-center justify-center ${
                        numbers[player] === num ? 'bg-[#00ff87]' : 'bg-[#1a1a1a]'
                      }`}
                      onPress={() => pickNumber(player, num)}
                    >
                      <Text className={`font-black text-lg ${
                        numbers[player] === num ? 'text-[#0a0a0a]' : 'text-white'
                      }`}>
                        {num}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {allPicked && (
            <TouchableOpacity
              className="bg-[#00ff87] py-5 rounded-2xl items-center mt-4"
              onPress={revealNumbers}
            >
              <Text className="text-[#0a0a0a] font-black text-lg">Reveal! 🔥</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {phase === 'reveal' && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-sm uppercase tracking-widest mb-4">Aggregate Last Digit</Text>
          <Text className="text-[#00ff87] font-black text-9xl mb-8">{targetNumber}</Text>

          {getLoser() ? (
            <>
              <Text className="text-white text-xl font-bold mb-2">😬 {getLoser()} matched!</Text>
              <Text className="text-gray-500 mb-10">Time for the slap...</Text>
              <TouchableOpacity
                className="bg-red-500 py-5 px-10 rounded-2xl items-center"
                onPress={() => navigation.navigate('Slap', { loser: getLoser(), players })}
              >
                <Text className="text-white font-black text-lg">Go to Slap 🤚</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text className="text-white text-xl font-bold mb-2">No match!</Text>
              <Text className="text-gray-500 mb-10">Play another round</Text>
              <TouchableOpacity
                className="bg-[#00ff87] py-5 px-10 rounded-2xl items-center"
                onPress={() => navigation.navigate('Game', { players })}
              >
                <Text className="text-[#0a0a0a] font-black text-lg">Next Round 🔄</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

    </SafeAreaView>
  );
}