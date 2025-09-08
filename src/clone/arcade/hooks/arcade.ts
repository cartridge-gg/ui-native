import { useContext } from "react";
import { ArcadeContext } from "#clone/arcade/context/arcade";

export function useArcade() {
	return useContext(ArcadeContext);
}
