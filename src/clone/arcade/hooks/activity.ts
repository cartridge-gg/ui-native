import { useContext, useMemo } from "react";
import { ActivityContext } from "#clone/arcade";

export function useActivities() {
	const context = useContext(ActivityContext);

	const { erc20s, erc721s, actions, trophies, status } = context;

	const all = useMemo(() => {
		return [
			...Object.values(erc20s).flat(),
			...Object.values(erc721s).flat(),
			...Object.values(actions).flat(),
			...Object.values(trophies).flat(),
		];
	}, [erc20s, erc721s, actions, trophies]);

	const activities = useMemo(() => {
		return all.sort((a, b) => b.timestamp - a.timestamp);
	}, [all]);

	return {
		activities,
		status,
	};
}
