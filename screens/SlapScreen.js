import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Easing } from 'react-native';
import Hand from '../components/Hand';
import { useGameLogic } from '../hooks/useGameLogic';

const SlapScreen = ({ navigation }) => {
    const { slapData, performSlap, gameState } = useGameLogic();
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const isSlapper = slapData.slapper?.id === '1';

    useEffect(() => {
        if (gameState === 'RESULT') {
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
                useNativeDriver: true,
            }).start(() => {
                navigation.navigate('Result', { flipped: true });
            });
        }
    }, [gameState]);

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.View style={[styles.container, { transform: [{ rotate: rotation }] }]}>
                {/* Lateral Header */}
                <View style={styles.targetPane}>
                    <Text style={styles.targetLabel}>
                        {slapData.slappee?.name || "???"} PICKED {slapData.slappee?.pickedNumber || "?"}
                    </Text>
                    <View style={styles.targetAvatar}>
                        <Text style={styles.avatarEmoji}>{isSlapper ? '😨' : '😈'}</Text>
                    </View>
                    <Text style={styles.actionPrompt}>
                        {isSlapper ? "SLAP THEM!" : "YOU ARE THE TARGET!"}
                    </Text>
                </View>

                {/* Action Section */}
                <View style={styles.actionPane}>
                    <Text style={styles.actionLabel}>
                        {isSlapper ? "VINDICATION!" : `${slapData.slapper?.name} is coming...`}
                    </Text>

                    {isSlapper ? (
                        <TouchableOpacity
                            style={styles.slapButton}
                            activeOpacity={0.7}
                            onPress={performSlap}
                        >
                            <Text style={styles.slapButtonText}>SLAP!</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.waitingRing}>
                            <Text style={styles.waitingText}>???</Text>
                        </View>
                    )}

                    <Text style={styles.instruction}>
                        {isSlapper ? "Tap Fast!" : "Hope they miss!"}
                    </Text>
                </View>

                {/* Hand Overlay */}
                <View style={styles.handContainer}>
                    <Hand type={isSlapper ? 'slap' : 'target'} />
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    targetPane: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
    },
    actionPane: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    targetLabel: {
        color: '#666',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    actionPrompt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 16,
    },
    targetAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEmoji: {
        fontSize: 40,
    },
    actionLabel: {
        color: '#00ff87',
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 20,
    },
    slapButton: {
        width: 120,
        height: 120,
        backgroundColor: '#00ff87',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#00ff87',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
    },
    waitingRing: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    waitingText: {
        color: '#333',
        fontSize: 24,
        fontWeight: '900',
    },
    slapButtonText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0a0a0a',
    },
    instruction: {
        color: '#444',
        fontSize: 9,
        marginTop: 12,
        fontWeight: 'bold',
    },
    handContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -60 }, { translateY: -60 }],
        opacity: 0.6,
        pointerEvents: 'none',
    }
});

export default SlapScreen;
