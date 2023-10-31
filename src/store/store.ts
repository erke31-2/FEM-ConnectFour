import { create } from "zustand";

export interface GamePlayer {
  id: number;
  name: string;
}
export interface Game {
  gameId: string;
  player: GamePlayer;
}

interface GameStoreState {
  games: Game[];
  getCurrentPlayerFromGame: (gameId: string) => GamePlayer | undefined;
  addNewGame: (game: Game) => void;
  clearAllGames: () => void
}

const initialStoredGames = localStorage.getItem("games");
const initialGames = initialStoredGames ? JSON.parse(initialStoredGames) as Game[] : [];

const useGameStore = create<GameStoreState>()((set, get) => ({
  games: initialGames,
  getCurrentPlayerFromGame: (gameId: string) => {
    const games = get().games;
    const game = games.find((g) => g.gameId === gameId);
    return game ? game.player : undefined;
  },
  addNewGame: (game) => {
    const updatedGamesList = [game, ...get().games].slice(0, 5);
    localStorage.setItem("games", JSON.stringify(updatedGamesList))
    set((state) => ({
      ...state,
      games: updatedGamesList
    }));
  },
  clearAllGames: () => {
    localStorage.removeItem("games");
    set((state) => ({
      ...state,
      games: []
    }))
  }
}));

export default useGameStore;
