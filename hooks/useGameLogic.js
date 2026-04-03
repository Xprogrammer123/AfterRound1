import { useState, useCallback } from 'react';

const useGameLogic = () => {
    const [gameState, setGameState] = useState('idle');

    const updateGameState = useCallback((newState) => {
        setGameState(newState);
    }, []);

    return {
        gameState,
        updateGameState,
    };
};

export default useGameLogic;
