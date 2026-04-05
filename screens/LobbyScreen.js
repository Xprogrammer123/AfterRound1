import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
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
    <SafeAreaView style={styles.container}>

      {/* Room Code */}
      <View style={styles.roomCodeContainer}>
        <Text style={styles.roomCodeLabel}>ROOM CODE</Text>
        <Text style={styles.roomCode}>{roomCode}</Text>
        <Text style={styles.roomCodeSub}>Share this with your people</Text>
      </View>

      {/* Players List */}
      <Text style={styles.sectionTitle}>Players ({players.length})</Text>
      <ScrollView style={styles.playersList} showsVerticalScrollIndicator={false}>
        {players.map((player, index) => (
          <View key={index} style={styles.playerCard}>
            <View style={styles.playerAvatar}>
              <Text style={styles.playerAvatarText}>
                {player.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.playerName}>{player}</Text>
            {index === 0 && (
              <View style={styles.hostBadge}>
                <Text style={styles.hostBadgeText}>HOST</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Add Player */}
      <View style={styles.addPlayerRow}>
        <TextInput
          style={styles.input}
          placeholder="Add player name..."
          placeholderTextColor="#444"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Game', { players })}
      >
        <Text style={styles.startButtonText}>Start Game 🎮</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  roomCodeContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  roomCodeLabel: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 4,
    marginBottom: 6,
  },
  roomCode: {
    fontSize: 42,
    fontWeight: '900',
    color: '#00ff87',
    letterSpacing: 8,
  },
  roomCodeSub: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  playersList: {
    flex: 1,
    marginBottom: 16,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  playerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#00ff87',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  playerAvatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0a0a0a',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  hostBadge: {
    backgroundColor: 'rgba(0,255,135,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  hostBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#00ff87',
    letterSpacing: 1,
  },
  addPlayerRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00ff87',
  },
  startButton: {
    backgroundColor: '#00ff87',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0a0a0a',
  },
});