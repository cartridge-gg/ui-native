// Cartridge Arcade API service for Dojo games
export const CARTRIDGE_API_URL = "https://api.cartridge.gg/query";

// Game model matching Cartridge Arcade structure
export interface DojoGame {
  id: string;
  identifier: string;
  name: string;
  description: string;
  imageUrl: string;
  playerCount: number;
  isActive: boolean;
  category: 'action' | 'strategy' | 'puzzle' | 'rpg' | 'arcade';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedPlayTime: number; // in minutes
  lastPlayed?: string; // ISO date string
  contractAddress?: string;
  gameId?: string;
}

// Edition model for game editions
export interface GameEdition {
  id: string;
  identifier: string;
  gameId: string;
  config: {
    project: string;
    name: string;
    description?: string;
  };
}

// Mock data for Dojo games based on Cartridge Arcade structure
export const mockDojoGames: DojoGame[] = [
  {
    id: '1',
    identifier: 'pixel-warriors',
    name: 'Pixel Warriors',
    description: 'Epic pixel art battle arena with strategic combat',
    imageUrl: 'https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=PW',
    playerCount: 1250,
    isActive: true,
    category: 'action',
    difficulty: 'medium',
    estimatedPlayTime: 15,
    lastPlayed: '2024-01-15T10:30:00Z',
    contractAddress: '0x018108b32cea514a78ef1b0e4a0753e855cdf620bc0565202c02456f618c4dc4',
    gameId: 'pixel-warriors-v1'
  },
  {
    id: '2',
    identifier: 'crypto-quest',
    name: 'Crypto Quest',
    description: 'Blockchain-based adventure game with NFT rewards',
    imageUrl: 'https://via.placeholder.com/80x80/4ECDC4/FFFFFF?text=CQ',
    playerCount: 890,
    isActive: true,
    category: 'rpg',
    difficulty: 'hard',
    estimatedPlayTime: 45,
    lastPlayed: '2024-01-14T16:20:00Z',
    contractAddress: '0x07ae27a31bb6526e3de9cf02f081f6ce0615ac12a6d7b85ee58b8ad7947a2809',
    gameId: 'crypto-quest-v1'
  },
  {
    id: '3',
    identifier: 'neon-racer',
    name: 'Neon Racer',
    description: 'High-speed cyberpunk racing with neon aesthetics',
    imageUrl: 'https://via.placeholder.com/80x80/45B7D1/FFFFFF?text=NR',
    playerCount: 2100,
    isActive: true,
    category: 'arcade',
    difficulty: 'easy',
    estimatedPlayTime: 8,
    lastPlayed: '2024-01-16T09:15:00Z',
    contractAddress: '0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1',
    gameId: 'neon-racer-v1'
  },
  {
    id: '4',
    identifier: 'quantum-chess',
    name: 'Quantum Chess',
    description: 'Multi-dimensional chess with quantum mechanics',
    imageUrl: 'https://via.placeholder.com/80x80/96CEB4/FFFFFF?text=QC',
    playerCount: 567,
    isActive: true,
    category: 'strategy',
    difficulty: 'hard',
    estimatedPlayTime: 30,
    lastPlayed: '2024-01-13T14:45:00Z',
    contractAddress: '0x04f5e296c805126637552cf3930e857f380e7c078e8f00696de4fc8545356b1d',
    gameId: 'quantum-chess-v1'
  },
  {
    id: '5',
    identifier: 'block-breaker',
    name: 'Block Breaker',
    description: 'Classic block breaking with modern twists',
    imageUrl: 'https://via.placeholder.com/80x80/FFEAA7/000000?text=BB',
    playerCount: 3400,
    isActive: true,
    category: 'arcade',
    difficulty: 'easy',
    estimatedPlayTime: 12,
    lastPlayed: '2024-01-16T11:30:00Z',
    contractAddress: '0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd',
    gameId: 'block-breaker-v1'
  },
  {
    id: '6',
    identifier: 'crypto-puzzle',
    name: 'Crypto Puzzle',
    description: 'Brain-teasing puzzles with crypto rewards',
    imageUrl: 'https://via.placeholder.com/80x80/DDA0DD/FFFFFF?text=CP',
    playerCount: 723,
    isActive: true,
    category: 'puzzle',
    difficulty: 'medium',
    estimatedPlayTime: 20,
    lastPlayed: '2024-01-15T13:20:00Z',
    contractAddress: '0x02d66679de61a5c6d57afd21e005a8c96118bd60315fd79a4521d68f5e5430d1',
    gameId: 'crypto-puzzle-v1'
  }
];

// Mock editions data
export const mockGameEditions: GameEdition[] = [
  {
    id: '1',
    identifier: 'pixel-warriors-edition',
    gameId: 'pixel-warriors-v1',
    config: {
      project: 'pixel-warriors',
      name: 'Pixel Warriors',
      description: 'Epic pixel art battle arena'
    }
  },
  {
    id: '2',
    identifier: 'crypto-quest-edition',
    gameId: 'crypto-quest-v1',
    config: {
      project: 'crypto-quest',
      name: 'Crypto Quest',
      description: 'Blockchain adventure game'
    }
  },
  {
    id: '3',
    identifier: 'neon-racer-edition',
    gameId: 'neon-racer-v1',
    config: {
      project: 'neon-racer',
      name: 'Neon Racer',
      description: 'Cyberpunk racing game'
    }
  }
];

// GraphQL query for games (based on Cartridge Arcade structure)
const GAMES_QUERY = `
  query GetGames {
    games {
      id
      identifier
      name
      description
      imageUrl
      contractAddress
      gameId
    }
  }
`;

const EDITIONS_QUERY = `
  query GetEditions {
    editions {
      id
      identifier
      gameId
      config {
        project
        name
        description
      }
    }
  }
`;

// Cartridge Arcade API service
export const dojoGamesApi = {
  // Get all Dojo games from Cartridge API
  getGames: async (): Promise<DojoGame[]> => {
    try {
      // For now, return mock data to simulate API call
      // In production, this would make a GraphQL request to CARTRIDGE_API_URL
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDojoGames;
    } catch (error) {
      console.error('Failed to fetch games from Cartridge API:', error);
      // Fallback to mock data
      return mockDojoGames;
    }
  },

  // Get game by ID
  getGameById: async (id: string): Promise<DojoGame | null> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDojoGames.find(game => game.id === id) || null;
    } catch (error) {
      console.error('Failed to fetch game by ID:', error);
      return null;
    }
  },

  // Get games by category
  getGamesByCategory: async (category: DojoGame['category']): Promise<DojoGame[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockDojoGames.filter(game => game.category === category);
    } catch (error) {
      console.error('Failed to fetch games by category:', error);
      return [];
    }
  },

  // Get active games
  getActiveGames: async (): Promise<DojoGame[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockDojoGames.filter(game => game.isActive);
    } catch (error) {
      console.error('Failed to fetch active games:', error);
      return [];
    }
  },

  // Get game editions
  getEditions: async (): Promise<GameEdition[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockGameEditions;
    } catch (error) {
      console.error('Failed to fetch game editions:', error);
      return [];
    }
  },

  // Get games by project (edition)
  getGamesByProject: async (project: string): Promise<DojoGame[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const editions = mockGameEditions.filter(edition => edition.config.project === project);
      const gameIds = editions.map(edition => edition.gameId);
      return mockDojoGames.filter(game => game.gameId && gameIds.includes(game.gameId));
    } catch (error) {
      console.error('Failed to fetch games by project:', error);
      return [];
    }
  }
};
