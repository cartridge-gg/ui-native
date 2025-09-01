// Cartridge Arcade API service for Dojo games
import { CARTRIDGE_API_URL } from "./const";

// Game model matching Cartridge Arcade structure
export interface DojoGame {
	id: string;
	identifier: string;
	name: string;
	description: string;
	imageUrl: string;
	playerCount: number;
	isActive: boolean;
	category: "action" | "strategy" | "puzzle" | "rpg" | "arcade";
	difficulty: "easy" | "medium" | "hard";
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
		id: "1",
		identifier: "pixel-warriors",
		name: "Pixel Warriors",
		description: "Epic pixel art battle arena with strategic combat",
		imageUrl: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=PW",
		playerCount: 1250,
		isActive: true,
		category: "action",
		difficulty: "medium",
		estimatedPlayTime: 15,
		lastPlayed: "2024-01-15T10:30:00Z",
		contractAddress:
			"0x018108b32cea514a78ef1b0e4a0753e855cdf620bc0565202c02456f618c4dc4",
		gameId: "pixel-warriors-v1",
	},
	{
		id: "2",
		identifier: "crypto-quest",
		name: "Crypto Quest",
		description: "Blockchain-based adventure game with NFT rewards",
		imageUrl: "https://via.placeholder.com/80x80/4ECDC4/FFFFFF?text=CQ",
		playerCount: 890,
		isActive: true,
		category: "rpg",
		difficulty: "hard",
		estimatedPlayTime: 45,
		lastPlayed: "2024-01-14T16:20:00Z",
		contractAddress:
			"0x07ae27a31bb6526e3de9cf02f081f6ce0615ac12a6d7b85ee58b8ad7947a2809",
		gameId: "crypto-quest-v1",
	},
	{
		id: "3",
		identifier: "neon-racer",
		name: "Neon Racer",
		description: "High-speed cyberpunk racing with neon aesthetics",
		imageUrl: "https://via.placeholder.com/80x80/45B7D1/FFFFFF?text=NR",
		playerCount: 2100,
		isActive: true,
		category: "arcade",
		difficulty: "easy",
		estimatedPlayTime: 8,
		lastPlayed: "2024-01-16T09:15:00Z",
		contractAddress:
			"0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1",
		gameId: "neon-racer-v1",
	},
	{
		id: "4",
		identifier: "quantum-chess",
		name: "Quantum Chess",
		description: "Multi-dimensional chess with quantum mechanics",
		imageUrl: "https://via.placeholder.com/80x80/96CEB4/FFFFFF?text=QC",
		playerCount: 567,
		isActive: true,
		category: "strategy",
		difficulty: "hard",
		estimatedPlayTime: 30,
		lastPlayed: "2024-01-13T14:45:00Z",
		contractAddress:
			"0x04f5e296c805126637552cf3930e857f380e7c078e8f00696de4fc8545356b1d",
		gameId: "quantum-chess-v1",
	},
	{
		id: "5",
		identifier: "block-breaker",
		name: "Block Breaker",
		description: "Classic block breaking with modern twists",
		imageUrl: "https://via.placeholder.com/80x80/FFEAA7/000000?text=BB",
		playerCount: 3400,
		isActive: true,
		category: "arcade",
		difficulty: "easy",
		estimatedPlayTime: 12,
		lastPlayed: "2024-01-16T11:30:00Z",
		contractAddress:
			"0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd",
		gameId: "block-breaker-v1",
	},
	{
		id: "6",
		identifier: "crypto-puzzle",
		name: "Crypto Puzzle",
		description: "Brain-teasing puzzles with crypto rewards",
		imageUrl: "https://via.placeholder.com/80x80/DDA0DD/FFFFFF?text=CP",
		playerCount: 723,
		isActive: true,
		category: "puzzle",
		difficulty: "medium",
		estimatedPlayTime: 20,
		lastPlayed: "2024-01-15T13:20:00Z",
		contractAddress:
			"0x02d66679de61a5c6d57afd21e005a8c96118bd60315fd79a4521d68f5e5430d1",
		gameId: "crypto-puzzle-v1",
	},
];

// Mock editions data
export const mockGameEditions: GameEdition[] = [
	{
		id: "1",
		identifier: "pixel-warriors-edition",
		gameId: "pixel-warriors-v1",
		config: {
			project: "pixel-warriors",
			name: "Pixel Warriors",
			description: "Epic pixel art battle arena",
		},
	},
	{
		id: "2",
		identifier: "crypto-quest-edition",
		gameId: "crypto-quest-v1",
		config: {
			project: "crypto-quest",
			name: "Crypto Quest",
			description: "Blockchain adventure game",
		},
	},
	{
		id: "3",
		identifier: "neon-racer-edition",
		gameId: "neon-racer-v1",
		config: {
			project: "neon-racer",
			name: "Neon Racer",
			description: "Cyberpunk racing game",
		},
	},
];

// GraphQL queries for future use with real Cartridge API
// const GAMES_QUERY = `
//   query GetGames {
//     games {
//       id
//       identifier
//       name
//       description
//       imageUrl
//       contractAddress
//       gameId
//     }
//   }
// `;

// const EDITIONS_QUERY = `
//   query GetEditions {
//     editions {
//       id
//       identifier
//       gameId
//       config {
//         project
//         name
//         description
//       }
//     }
//   }
// `;

// GraphQL query for fetching projects (games) from Cartridge API
const PROJECTS_QUERY = `
  query {
    projects {
      id
      name
      description
      logo
      cover
      website
      discord
      twitter
      github
      telegram
      isActive
    }
  }
`;

// Cartridge Arcade API service
export const dojoGamesApi = {
	// Get all Dojo games from Cartridge API
	getGames: async (): Promise<DojoGame[]> => {
		try {
			console.log('Fetching games from:', CARTRIDGE_API_URL);
			
			// First, let's test if the endpoint is reachable
			const testResponse = await fetch(CARTRIDGE_API_URL, {
				method: 'GET',
			});
			console.log('Test response status:', testResponse.status);
			
			const response = await fetch(CARTRIDGE_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: PROJECTS_QUERY,
				}),
			});

			console.log('Response status:', response.status);
			console.log('Response headers:', response.headers);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log('API Response:', JSON.stringify(result, null, 2));
			
			if (result.errors) {
				console.error('GraphQL errors:', result.errors);
				throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
			}

			const projects = result.data?.projects;
			console.log('Fetched projects:', projects);
			
			if (!projects || projects.length === 0) {
				console.log('No projects returned from API, using mock data');
				return mockDojoGames;
			}

			// Convert projects to DojoGame format
			const games = projects.map((project: any) => ({
				id: project.id,
				identifier: project.name.toLowerCase().replace(/\s+/g, '-'),
				name: project.name,
				description: project.description || '',
				imageUrl: project.logo || project.cover || '',
				playerCount: 0, // Not available in projects API
				isActive: project.isActive || true,
				category: 'arcade', // Default category
				difficulty: 'medium', // Default difficulty
				estimatedPlayTime: 15, // Default play time
				lastPlayed: undefined,
				contractAddress: undefined,
				gameId: project.id,
			}));

			return games;
		} catch (error) {
			console.error("Failed to fetch games from Cartridge API:", error);
			console.log('Falling back to mock data due to error');
			return mockDojoGames;
		}
	},

	// Get game by ID
	getGameById: async (id: string): Promise<DojoGame | null> => {
		try {
			const response = await fetch(CARTRIDGE_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
						query GetGameById($id: ID!) {
							game(id: $id) {
								id
								identifier
								name
								description
								imageUrl
								playerCount
								isActive
								category
								difficulty
								estimatedPlayTime
								lastPlayed
								contractAddress
								gameId
							}
						}
					`,
					variables: { id },
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			
			if (result.errors) {
				console.error('GraphQL errors:', result.errors);
				return null;
			}

			return result.data?.game || null;
		} catch (error) {
			console.error("Failed to fetch game by ID:", error);
			return null;
		}
	},

	// Get games by category
	getGamesByCategory: async (
		category: DojoGame["category"],
	): Promise<DojoGame[]> => {
		try {
			const response = await fetch(CARTRIDGE_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
						query GetGamesByCategory($category: String!) {
							games(category: $category) {
								id
								identifier
								name
								description
								imageUrl
								playerCount
								isActive
								category
								difficulty
								estimatedPlayTime
								lastPlayed
								contractAddress
								gameId
							}
						}
					`,
					variables: { category },
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			
			if (result.errors) {
				console.error('GraphQL errors:', result.errors);
				return [];
			}

			return result.data?.games || [];
		} catch (error) {
			console.error("Failed to fetch games by category:", error);
			return [];
		}
	},

	// Get active games
	getActiveGames: async (): Promise<DojoGame[]> => {
		try {
			const response = await fetch(CARTRIDGE_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
						query GetActiveGames {
							games(isActive: true) {
								id
								identifier
								name
								description
								imageUrl
								playerCount
								isActive
								category
								difficulty
								estimatedPlayTime
								lastPlayed
								contractAddress
								gameId
							}
						}
					`,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			
			if (result.errors) {
				console.error('GraphQL errors:', result.errors);
				return [];
			}

			return result.data?.games || [];
		} catch (error) {
			console.error("Failed to fetch active games:", error);
			return [];
		}
	},

	// Get game editions
	getEditions: async (): Promise<GameEdition[]> => {
		try {
			const response = await fetch(CARTRIDGE_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
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
					`,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			
			if (result.errors) {
				console.error('GraphQL errors:', result.errors);
				return [];
			}

			return result.data?.editions || [];
		} catch (error) {
			console.error("Failed to fetch game editions:", error);
			return [];
		}
	},

	// Get games by project (edition)
	getGamesByProject: async (project: string): Promise<DojoGame[]> => {
		try {
			const response = await fetch(CARTRIDGE_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
						query GetGamesByProject($project: String!) {
							games(project: $project) {
								id
								identifier
								name
								description
								imageUrl
								playerCount
								isActive
								category
								difficulty
								estimatedPlayTime
								lastPlayed
								contractAddress
								gameId
							}
						}
					`,
					variables: { project },
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			
			if (result.errors) {
				console.error('GraphQL errors:', result.errors);
				return [];
			}

			return result.data?.games || [];
		} catch (error) {
			console.error("Failed to fetch games by project:", error);
			return [];
		}
	},
};
