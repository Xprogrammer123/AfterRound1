import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function CountDown({ onComplete, duration = 5 }) {
  const [count, setCount] = useState(duration);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (count <= 0) {
      if (onComplete) onComplete();
      return;
    }

    // Pulse animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.4,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => setCount(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>STARTING IN</Text>
      <Animated.Text
        style={[
          styles.count,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            color: count <= 2 ? '#ff3232' : '#00ff87',
          },
        ]}
      >
        {count}
      </Animated.Text>
      <View style={styles.dotsRow}>
        {Array.from({ length: duration }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i >= count && styles.dotFilled,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  label: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 4,
  },
  count: {
    fontSize: 100,
    fontWeight: '900',
    lineHeight: 110,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  dotFilled: {
    backgroundColor: '#00ff87',
    borderColor: '#00ff87',
  },
});