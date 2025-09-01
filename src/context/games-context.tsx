import React, { createContext, useContext, useEffect, useState } from 'react';
import { dojoGamesApi, type DojoGame } from '#utils/api';

interface GamesContextType {
  games: DojoGame[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState<DojoGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const gamesData = await dojoGamesApi.getGames();
      setGames(gamesData);
    } catch (err) {
      console.error('Failed to fetch games:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch games');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const value: GamesContextType = {
    games,
    loading,
    error,
    refetch: fetchGames,
  };

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
}
