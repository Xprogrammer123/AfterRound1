import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PlayerCard({ player, index, isHost, isLoser, onRemove }) {
  return (
    <View style={[
      styles.card,
      isLoser && styles.cardLoser,
    ]}>
      {/* Avatar */}
      <View style={[styles.avatar, isLoser && styles.avatarLoser]}>
        <Text style={styles.avatarText}>
          {player.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.name, isLoser && styles.nameLoser]}>
          {player}
        </Text>
        <Text style={styles.status}>
          {isLoser ? '💀 Got slapped' : isHost ? '👑 Host' : '✅ Ready'}
        </Text>
      </View>

      {/* Badge */}
      {isHost && !isLoser && (
        <View style={styles.hostBadge}>
          <Text style={styles.hostBadgeText}>HOST</Text>
        </View>
      )}

      {isLoser && (
        <View style={styles.loserBadge}>
          <Text style={styles.loserBadgeText}>SLAPPED</Text>
        </View>
      )}

      {/* Remove Button */}
      {onRemove && !isHost && (
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  cardLoser: {
    backgroundColor: 'rgba(255,50,50,0.1)',
    borderWidth: 1,
    borderColor: '#ff3232',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00ff87',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarLoser: {
    backgroundColor: '#ff3232',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0a0a0a',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  nameLoser: {
    color: '#ff3232',
  },
  status: {
    fontSize: 12,
    color: '#666',
  },
  hostBadge: {
    backgroundColor: 'rgba(0,255,135,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  hostBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00ff87',
    letterSpacing: 1,
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
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '700',
  },
});