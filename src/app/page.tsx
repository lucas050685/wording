import { GameProvider } from "@/components/GameContext";
import { GameScreen } from "@/components/GameScreen";
import { InitialScreen } from "@/components/InitialScreen";

export default function Home() {
  return (
    <GameProvider>
      <InitialScreen />
      <GameScreen />
    </GameProvider>
  );
}
