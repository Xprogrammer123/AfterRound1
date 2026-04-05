import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function ResultScreen({ navigation, route }) {
  const { players, loser } = route.params || { players: [], loser: '' };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.title}>Round Over!</Text>
        <Text style={styles.subtitle}>The slapping has been delivered</Text>
      </View>

      {/* Players List */}
      <ScrollView style={styles.playersList} showsVerticalScrollIndicator={false}>
        {players.map((player, index) => (
          <View
            key={index}
            style={[
              styles.playerCard,
              player === loser && styles.playerCardLoser
            ]}
          >
            <Text style={styles.playerEmoji}>
              {player === loser ? '💀' : '😎'}
            </Text>
            <View style={styles.playerInfo}>
              <Text style={[
                styles.playerName,
                player === loser && styles.playerNameLoser
              ]}>
                {player}
              </Text>
              <Text style={styles.playerStatus}>
                {player === loser ? 'Got slapped 💥' : 'Survived this round'}
              </Text>
            </View>
            {player === loser && (
              <View style={styles.loserBadge}>
                <Text style={styles.loserBadgeText}>SLAPPED</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{players.length}</Text>
          <Text style={styles.statLabel}>Players</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{players.length * 3}</Text>
          <Text style={styles.statLabel}>Slaps Given</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Victim</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.playAgainButton}
        onPress={() => navigation.navigate('Game', { players })}
      >
        <Text style={styles.playAgainButtonText}>Play Again 🔄</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  trophy: {
    fontSize: 70,
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  playersList: {
    flex: 1,
    marginBottom: 20,
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
  playerCardLoser: {
    backgroundColor: 'rgba(255,50,50,0.1)',
    borderWidth: 1,
    borderColor: '#ff3232',
  },
  playerEmoji: {
    fontSize: 30,
    marginRight: 14,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  playerNameLoser: {
    color: '#ff3232',
  },
  playerStatus: {
    fontSize: 12,
    color: '#666',
  },
  loserBadge: {
    backgroundColor: 'rgba(255,50,50,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  loserBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ff3232',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00ff87',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    letterSpacing: 1,
  },
  playAgainButton: {
    backgroundColor: '#00ff87',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  playAgainButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0a0a0a',
  },
  homeButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#666',
  },
});