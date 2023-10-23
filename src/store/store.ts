import { create } from "zustand";

interface Player {
  id: number;
  name: string;
}
interface GameState {
  currentPlayer: Player | null;
  gameId: string | null
  setCurrentPlayer: (player: Player) => void;
  setGameId: (id: string) => void;
}

const storedPlayer = localStorage.getItem("currentPlayer");
const initialPlayer = storedPlayer ? (JSON.parse(storedPlayer) as Player) : null;

const storedGameId = localStorage.getItem("gameId");
const initialGameId = storedGameId ? (JSON.parse(storedGameId) as string) : null;

const useGameStore = create<GameState>()((set) => ({
  currentPlayer: initialPlayer,
  gameId: initialGameId,
  setCurrentPlayer: (player) => {
    localStorage.setItem("currentPlayer", JSON.stringify(player));
    set(() => ({ currentPlayer: player }));
  },
  setGameId: (id) => {
    localStorage.setItem("gameId", JSON.stringify(id));
    set(() => ({ gameId: id}));
  },
}));

export default useGameStore;
