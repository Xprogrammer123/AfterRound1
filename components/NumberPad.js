import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function NumberPad({ selectedNumber, onSelect, disabled }) {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <TouchableOpacity
            key={num}
            style={[
              styles.button,
              selectedNumber === num && styles.buttonSelected,
              disabled && styles.buttonDisabled,
            ]}
            onPress={() => !disabled && onSelect(num)}
            activeOpacity={disabled ? 1 : 0.7}
          >
            <Text style={[
              styles.buttonText,
              selectedNumber === num && styles.buttonTextSelected,
              disabled && styles.buttonTextDisabled,
            ]}>
              {num}
            </Text>

            {selectedNumber === num && (
              <View style={styles.selectedDot} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedNumber !== undefined && selectedNumber !== null && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>YOUR NUMBER</Text>
          <Text style={styles.selectedNumber}>{selectedNumber}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonSelected: {
    backgroundColor: '#00ff87',
    borderColor: '#00ff87',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  buttonTextSelected: {
    color: '#0a0a0a',
  },
  buttonTextDisabled: {
    color: '#666',
  },
  selectedDot: {
    position: 'absolute',
    bottom: 6,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0a0a0a',
  },
  selectedInfo: {
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  selectedLabel: {
    fontSize: 10,
    color: '#888',
    letterSpacing: 3,
    marginBottom: 4,
  },
  selectedNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00ff87',
  },
});