import { useContext } from "react";
import { ArcadeContext } from "#clone/arcade";

export function useArcade() {
	return useContext(ArcadeContext);
}
