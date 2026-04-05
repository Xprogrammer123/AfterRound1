import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.emoji}>🤚</Text>
        <Text style={styles.title}>After Round 1</Text>
        <Text style={styles.subtitle}>THE NIGERIAN CLASSIC</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('Lobby')}
        >
          <Text style={styles.createButtonText}>Create Room</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => navigation.navigate('Lobby')}
        >
          <Text style={styles.joinButtonText}>Join Room</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Gather your people 🇳🇬</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 40,
    gap: 10,
  },
  emoji: {
    fontSize: 90,
    marginBottom: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#888888',
    letterSpacing: 4,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  createButton: {
    backgroundColor: '#00ff87',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0a0a0a',
  },
  joinButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00ff87',
  },
  joinButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00ff87',
  },
  footer: {
    fontSize: 14,
    color: '#444444',
  },
});