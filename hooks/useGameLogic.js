import { useState, useEffect, useCallback } from 'react';
import { Vibration } from 'react-native';

const INITIAL_PLAYERS = [
    { id: '1', name: 'You', isBot: false, isReady: false, score: 0, pickedNumber: null },
    { id: '2', name: 'Fawas', isBot: true, isReady: true, score: 0, pickedNumber: null },
    { id: '3', name: 'Ayo', isBot: true, isReady: true, score: 0, pickedNumber: null },
];

export const useGameLogic = () => {
    const [gameState, setGameState] = useState('LOBBY'); // LOBBY, PICKING, SLAPPING, RESULT
    const [players, setPlayers] = useState(INITIAL_PLAYERS);
    const [timer, setTimer] = useState(10);
    const [round, setRound] = useState(1);
    const [slapData, setSlapData] = useState({ slapper: null, slappee: null });

    // Mark current player as ready
    const readyUp = useCallback(() => {
        setPlayers(prev => prev.map(p => p.id === '1' ? { ...p, isReady: true } : p));
    }, []);

    // Pick a number
    const pickNumber = useCallback((num) => {
        setPlayers(prev => prev.map(p => p.id === '1' ? { ...p, pickedNumber: num } : p));
        Vibration.vibrate(50);
    }, []);

    // Start Game
    useEffect(() => {
        if (gameState === 'LOBBY' && players.every(p => p.isReady)) {
            setTimeout(() => {
                setGameState('PICKING');
                setTimer(10);
            }, 1000);
        }
    }, [gameState, players]);

    // Picking Logic (Bots picking numbers)
    useEffect(() => {
        if (gameState === 'PICKING') {
            const interval = setInterval(() => {
                setTimer(t => {
                    if (t <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);

            // Bots pick numbers after random delays
            players.filter(p => p.isBot).forEach(bot => {
                setTimeout(() => {
                    setPlayers(prev => prev.map(p =>
                        p.id === bot.id ? { ...p, pickedNumber: Math.floor(Math.random() * 6) } : p
                    ));
                }, Math.random() * 5000);
            });

            return () => clearInterval(interval);
        }
    }, [gameState]);

    // Round Conclusion Logic
    useEffect(() => {
        if (gameState === 'PICKING' && (timer === 0 || players.every(p => p.pickedNumber !== null))) {
            const totalSum = players.reduce((sum, p) => sum + (p.pickedNumber || 0), 0);

            // Logic: totalSum % numPlayers determines slapper
            const slapperIndex = totalSum % players.length;
            const slapper = players[slapperIndex];

            // The one with the lowest number is the slappee
            const sortedPlayers = [...players].sort((a, b) => (a.pickedNumber || 0) - (b.pickedNumber || 0));
            const slappee = sortedPlayers[0].id === slapper.id ? sortedPlayers[1] : sortedPlayers[0];

            setSlapData({ slapper, slappee });
            setGameState('SLAPPING');
        }
    }, [gameState, timer, players]);

    // Slap Logic
    const performSlap = useCallback(() => {
        if (gameState === 'SLAPPING' && slapData.slapper?.id === '1') {
            Vibration.vibrate([0, 100, 50, 100]);
            setGameState('RESULT');
        }
    }, [gameState, slapData]);

    // Reset Game
    const resetGame = useCallback(() => {
        setPlayers(INITIAL_PLAYERS);
        setGameState('LOBBY');
        setRound(r => r + 1);
    }, []);

    return {
        gameState,
        players,
        timer,
        round,
        slapData,
        readyUp,
        pickNumber,
        performSlap,
        resetGame
    };
};
