import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { useState, useRef } from 'react';
import { PanResponder } from 'react-native';

export default function SlapScreen({ navigation, route }) {
  const { loser, players } = route.params;
  const totalSlaps = players.length * 3;
  const [slapCount, setSlapCount] = useState(0);
  const [phase, setPhase] = useState('slapping'); // slapping | done
  const [isSlapping, setIsSlapping] = useState(false);

  const handPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const handScale = useRef(new Animated.Value(1)).current;
  const screenShake = useRef(new Animated.Value(0)).current;

  const triggerSlap = () => {
    if (isSlapping || slapCount >= totalSlaps) return;
    setIsSlapping(true);

    // Hand flies forward
    Animated.sequence([
      Animated.timing(handPosition, {
        toValue: { x: 160, y: -10 },
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(handScale, {
        toValue: 1.4,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    // Screen shake
    Animated.sequence([
      Animated.timing(screenShake, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(screenShake, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(screenShake, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(screenShake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();

    // Return hand
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(handPosition, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }),
        Animated.spring(handScale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      setSlapCount(prev => {
        const newCount = prev + 1;
        if (newCount >= totalSlaps) {
          setTimeout(() => setPhase('done'), 600);
        }
        return newCount;
      });
      setIsSlapping(false);
    }, 250);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0 && !isSlapping) {
          handPosition.setValue({ x: Math.max(gesture.dx, -80), y: 0 });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50) {
          triggerSlap();
        } else {
          Animated.spring(handPosition, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>

      {phase === 'slapping' && (
        <>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.loserLabel}>SLAPPING</Text>
            <Text style={styles.loserName}>{loser}</Text>
            <Text style={styles.slapsRemaining}>
              {totalSlaps - slapCount} slaps remaining
            </Text>
          </View>

          {/* Slap Counter */}
          <Animated.View style={[styles.counterContainer, { transform: [{ translateX: screenShake }] }]}>
            <Text style={styles.slapCount}>{slapCount}</Text>
            <Text style={styles.slapCountLabel}>slaps landed 💥</Text>

            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(slapCount / totalSlaps) * 100}%` }]} />
            </View>
          </Animated.View>

          {/* Hand Area */}
          <View style={styles.handArea}>
            <Text style={styles.instruction}>← Pull back and release to slap</Text>

            <View style={styles.handContainer} {...panResponder.panHandlers}>
              <Animated.Text
                style={[
                  styles.hand,
                  {
                    transform: [
                      { translateX: handPosition.x },
                      { translateY: handPosition.y },
                      { scale: handScale },
                    ],
                  },
                ]}
              >
                🤚
              </Animated.Text>
            </View>
          </View>
        </>
      )}

      {phase === 'done' && (
        <View style={styles.doneContainer}>
          <Text style={styles.doneEmoji}>😭</Text>
          <Text style={styles.doneTitle}>{loser} got slapped!</Text>
          <Text style={styles.doneSub}>{totalSlaps} times by everyone 💀</Text>

          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Total Slaps Delivered</Text>
            <Text style={styles.statsNumber}>{totalSlaps}</Text>
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('Game', { players })}
          >
            <Text style={styles.nextButtonText}>Next Round 🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}

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
  loserLabel: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 4,
    marginBottom: 6,
  },
  loserName: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ff3232',
    marginBottom: 6,
  },
  slapsRemaining: {
    fontSize: 14,
    color: '#666',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  slapCount: {
    fontSize: 110,
    fontWeight: '900',
    color: '#00ff87',
    lineHeight: 120,
  },
  slapCountLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#1a1a1a',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff87',
    borderRadius: 3,
  },
  handArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    fontSize: 13,
    color: '#444',
    marginBottom: 30,
    letterSpacing: 1,
  },
  handContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hand: {
    fontSize: 100,
  },
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  doneTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  doneSub: {
    fontSize: 15,
    color: '#888',
    marginBottom: 32,
  },
  statsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 40,
  },
  statsLabel: {
    fontSize: 12,
    color: '#888',
    letterSpacing: 2,
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 60,
    fontWeight: '900',
    color: '#ff3232',
  },
  nextButton: {
    backgroundColor: '#00ff87',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 14,
    width: '100%',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0a0a0a',
  },
  homeButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    width: '100%',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#666',
  },
});