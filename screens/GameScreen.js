import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';

const { width, height } = Dimensions.get('window');
const TABLE_SIZE = width * 0.78;
const HAND_SIZE = 64;

// Finger gesture emojis for each number
const FINGER_GESTURES = {
  hidden: '✊',
  1: '☝️',
  2: '✌️',
  3: '🤟',
  4: '🖖',
  5: '🖐️',
};

// Position hands around the table like a clock
function getHandPosition(index, total, radius) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
    angle: (angle * 180) / Math.PI + 90,
  };
}

function PlayerHand({ player, index, total, selectedNumber, revealed, isSafe, isLoser }) {
  const radius = TABLE_SIZE / 2 + 36;
  const pos = getHandPosition(index, total, radius);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const revealAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedNumber !== null && !revealed) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    }
    if (revealed) {
      pulseAnim.stopAnimation();
      Animated.spring(revealAnim, { toValue: 1, useNativeDriver: true, tension: 100 }).start();
    }
  }, [selectedNumber, revealed]);

  const gesture = revealed
    ? FINGER_GESTURES[selectedNumber] || '✊'
    : selectedNumber !== null
    ? '✊'
    : '🫥';

  return (
    <View
      style={[
        styles.handWrapper,
        {
          transform: [
            { translateX: pos.x - HAND_SIZE / 2 },
            { translateY: pos.y - HAND_SIZE / 2 },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.handBubble,
          isSafe && styles.handBubbleSafe,
          isLoser && styles.handBubbleLoser,
          {
            transform: [
              { scale: revealed ? revealAnim : pulseAnim },
            ],
          },
        ]}
      >
        <Text style={styles.handEmoji}>{gesture}</Text>
      </Animated.View>
      <Text style={styles.handPlayerName} numberOfLines={1}>
        {player}
      </Text>
    </View>
  );
}

function NumberPickerModal({ visible, onSelect, selected }) {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Your Number</Text>
          <Text style={styles.modalSub}>Pick 1 to 5 fingers</Text>
          <View style={styles.modalGrid}>
            {[1, 2, 3, 4, 5].map(num => (
              <TouchableOpacity
                key={num}
                style={[styles.modalButton, selected === num && styles.modalButtonSelected]}
                onPress={() => onSelect(num)}
              >
                <Text style={styles.modalButtonEmoji}>{FINGER_GESTURES[num]}</Text>
                <Text style={[styles.modalButtonNum, selected === num && styles.modalButtonNumSelected]}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function GameScreen({ navigation, route }) {
  const { players } = route.params;
  const [numbers, setNumbers] = useState({});
  const [phase, setPhase] = useState('pick'); // pick | reveal | result
  const [safePlayer, setSafePlayer] = useState(null);
  const [loser, setLoser] = useState(null);
  const [remainingPlayers, setRemainingPlayers] = useState(players);
  const [showPicker, setShowPicker] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null);
  const [tempNumber, setTempNumber] = useState(null);
  const [countDown, setCountDown] = useState(null);

  const tableRotate = useRef(new Animated.Value(0)).current;
  const tableScale = useRef(new Animated.Value(0.85)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Table entrance animation
    Animated.parallel([
      Animated.spring(tableScale, { toValue: 1, useNativeDriver: true, tension: 60 }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
        ])
      ),
    ]).start();
  }, []);

  useEffect(() => {
    // When all players picked — start countdown then reveal
    const allPicked = remainingPlayers.every(p => numbers[p] !== undefined);
    if (allPicked && remainingPlayers.length > 0 && phase === 'pick') {
      setCountDown(3);
    }
  }, [numbers]);

  useEffect(() => {
    if (countDown === null) return;
    if (countDown === 0) {
      revealNumbers();
      setCountDown(null);
      return;
    }
    const t = setTimeout(() => setCountDown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countDown]);

  const revealNumbers = () => {
    setPhase('reveal');
    const total = Object.values(numbers).reduce((a, b) => a + b, 0);
    const lastDigit = total % 10;

    setTimeout(() => {
      const safe = remainingPlayers.find(p => numbers[p] === lastDigit);
      setSafePlayer(safe || null);
      setPhase('result');

      if (remainingPlayers.length === 2) {
        const loserPlayer = remainingPlayers.find(p => numbers[p] !== lastDigit);
        setLoser(loserPlayer);
      }
    }, 2000);
  };

  const nextRound = () => {
    const newPlayers = safePlayer
      ? remainingPlayers.filter(p => p !== safePlayer)
      : remainingPlayers;

    if (newPlayers.length <= 1) {
      navigation.navigate('Slap', { loser, players });
      return;
    }

    setRemainingPlayers(newPlayers);
    setNumbers({});
    setSafePlayer(null);
    setPhase('pick');
  };

  const openPicker = (player) => {
    if (phase !== 'pick') return;
    setActivePlayer(player);
    setTempNumber(numbers[player] || null);
    setShowPicker(true);
  };

  const confirmNumber = (num) => {
    setNumbers(prev => ({ ...prev, [activePlayer]: num }));
    setShowPicker(false);
    setActivePlayer(null);
    setTempNumber(null);
  };

  const allPicked = remainingPlayers.every(p => numbers[p] !== undefined);
  const pickedCount = Object.keys(numbers).filter(p => remainingPlayers.includes(p)).length;

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.8] });

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.roundLabel}>ROUND</Text>
        <Text style={styles.roundNumber}>
          {players.length - remainingPlayers.length + 1}
        </Text>
        <Text style={styles.playersLeft}>{remainingPlayers.length} players left</Text>
      </View>

      {/* Countdown Overlay */}
      {countDown !== null && (
        <View style={styles.countdownOverlay}>
          <Text style={styles.countdownText}>{countDown}</Text>
          <Text style={styles.countdownSub}>Get ready...</Text>
        </View>
      )}

      {/* Table Area */}
      <View style={styles.tableArea}>
        <Animated.View style={[styles.tableContainer, { transform: [{ scale: tableScale }] }]}>

          {/* Glow effect */}
          <Animated.View style={[styles.tableGlow, { opacity: glowOpacity }]} />

          {/* The Round Table */}
          <View style={styles.table}>

            {/* Table Surface rings */}
            <View style={styles.tableRing1} />
            <View style={styles.tableRing2} />

            {/* Center content */}
            <View style={styles.tableCenter}>
              {phase === 'pick' && (
                <>
                  <Text style={styles.tableCenterEmoji}>✊</Text>
                  <Text style={styles.tableCenterText}>{pickedCount}/{remainingPlayers.length}</Text>
                  <Text style={styles.tableCenterSub}>picked</Text>
                </>
              )}
              {phase === 'reveal' && (
                <>
                  <Text style={styles.tableCenterEmoji}>🔥</Text>
                  <Text style={styles.tableCenterSub}>Revealing...</Text>
                </>
              )}
              {phase === 'result' && safePlayer && (
                <>
                  <Text style={styles.tableCenterEmoji}>✅</Text>
                  <Text style={styles.tableCenterText}>{safePlayer}</Text>
                  <Text style={styles.tableCenterSub}>is safe!</Text>
                </>
              )}
              {phase === 'result' && !safePlayer && (
                <>
                  <Text style={styles.tableCenterEmoji}>😬</Text>
                  <Text style={styles.tableCenterSub}>No match!</Text>
                </>
              )}
            </View>

            {/* Player Hands around table */}
            {remainingPlayers.map((player, index) => (
              <TouchableOpacity
                key={player}
                style={StyleSheet.absoluteFill}
                onPress={() => openPicker(player)}
                activeOpacity={1}
              >
                <PlayerHand
                  player={player}
                  index={index}
                  total={remainingPlayers.length}
                  selectedNumber={numbers[player] ?? null}
                  revealed={phase === 'reveal' || phase === 'result'}
                  isSafe={phase === 'result' && safePlayer === player}
                  isLoser={loser === player}
                />
              </TouchableOpacity>
            ))}

          </View>
        </Animated.View>
      </View>

      {/* Bottom Action */}
      <View style={styles.bottomArea}>
        {phase === 'pick' && (
          <View style={styles.instructionRow}>
            <Text style={styles.instructionText}>
              {allPicked ? '⏳ Calculating...' : 'Tap your hand to pick your number'}
            </Text>
          </View>
        )}

        {phase === 'result' && (
          <TouchableOpacity style={styles.nextButton} onPress={nextRound}>
            <Text style={styles.nextButtonText}>
              {remainingPlayers.length === 2 && loser
                ? `Slap ${loser} 🤚`
                : safePlayer
                ? `${safePlayer} is safe — Next Round 🔄`
                : 'No match — Next Round 🔄'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Number Picker Modal */}
      <NumberPickerModal
        visible={showPicker}
        onSelect={confirmNumber}
        selected={tempNumber}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080810',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 10,
  },
  roundLabel: {
    fontSize: 10,
    color: '#555',
    letterSpacing: 6,
  },
  roundNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 52,
  },
  playersLeft: {
    fontSize: 13,
    color: '#00ff87',
    fontWeight: '600',
  },
  countdownOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 99,
  },
  countdownText: {
    fontSize: 120,
    fontWeight: '900',
    color: '#00ff87',
  },
  countdownSub: {
    fontSize: 18,
    color: '#888',
    marginTop: 8,
  },
  tableArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableContainer: {
    width: TABLE_SIZE + 120,
    height: TABLE_SIZE + 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableGlow: {
    position: 'absolute',
    width: TABLE_SIZE + 60,
    height: TABLE_SIZE + 60,
    borderRadius: (TABLE_SIZE + 60) / 2,
    backgroundColor: '#00ff87',
    shadowColor: '#00ff87',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 20,
  },
  table: {
    width: TABLE_SIZE,
    height: TABLE_SIZE,
    borderRadius: TABLE_SIZE / 2,
    backgroundColor: '#1a1200',
    borderWidth: 6,
    borderColor: '#3a2800',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 30,
    overflow: 'visible',
  },
  tableRing1: {
    position: 'absolute',
    width: TABLE_SIZE - 30,
    height: TABLE_SIZE - 30,
    borderRadius: (TABLE_SIZE - 30) / 2,
    borderWidth: 2,
    borderColor: 'rgba(255,200,50,0.15)',
  },
  tableRing2: {
    position: 'absolute',
    width: TABLE_SIZE - 60,
    height: TABLE_SIZE - 60,
    borderRadius: (TABLE_SIZE - 60) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255,200,50,0.08)',
  },
  tableCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,200,50,0.2)',
  },
  tableCenterEmoji: {
    fontSize: 32,
  },
  tableCenterText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  tableCenterSub: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 1,
  },
  handWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: HAND_SIZE + 20,
  },
  handBubble: {
    width: HAND_SIZE,
    height: HAND_SIZE,
    borderRadius: HAND_SIZE / 2,
    backgroundColor: '#1e1e2e',
    borderWidth: 2,
    borderColor: '#333355',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  handBubbleSafe: {
    borderColor: '#00ff87',
    backgroundColor: 'rgba(0,255,135,0.2)',
    shadowColor: '#00ff87',
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  handBubbleLoser: {
    borderColor: '#ff3232',
    backgroundColor: 'rgba(255,50,50,0.2)',
  },
  handEmoji: {
    fontSize: 30,
  },
  handPlayerName: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
    maxWidth: HAND_SIZE + 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  bottomArea: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  instructionRow: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#00ff87',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0a0a0a',
    textAlign: 'center',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#111118',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
    borderTopWidth: 1,
    borderColor: '#222233',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 28,
  },
  modalGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#1a1a2a',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modalButtonSelected: {
    borderColor: '#00ff87',
    backgroundColor: 'rgba(0,255,135,0.1)',
  },
  modalButtonEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  modalButtonNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#888',
  },
  modalButtonNumSelected: {
    color: '#00ff87',
  },
});