import { Redirect } from "expo-router";

export default function GameScreen() {
	return <Redirect href="/game/:game/(tabs)/activity" />;
}
