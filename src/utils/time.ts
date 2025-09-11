/**
 * Converts a timestamp to a human-readable relative time string
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted time string (e.g., "2s", "5m", "3h", "1d")
 */
export function formatAge(timestamp: number): string {
	const now = Date.now() / 1000;
	const diff = now - timestamp;

	if (diff < 60) return `${Math.floor(diff)}s`;
	if (diff < 3600) return `${Math.floor(diff / 60)}m`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
	return `${Math.floor(diff / 86400)}d`;
}

/**
 * Formats a timestamp to a date string
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
	const itemDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	);

	if (itemDate.getTime() === today.getTime()) {
		return "Today";
	} else if (itemDate.getTime() === yesterday.getTime()) {
		return "Yesterday";
	} else {
		return date.toLocaleDateString();
	}
};
