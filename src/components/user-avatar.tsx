import { useMemo } from "react";
import { View } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { OlmechIcon } from "#components/icons/state/olmech";

interface UserAvatarProps {
	username: string;
	size?: number;
	className?: string;
	color?: string;
	showFrame?: boolean;
}

// Avatar frame SVG component
function AvatarFrame({ size = 64, color = "#33FF33" }: { size?: number; color?: string }) {
	return (
		<Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M32 57C18.1929 57 7 45.8071 7 32C7 18.1929 18.1929 7 32 7C45.8071 7 57 18.1929 57 32C57 45.8071 45.8071 57 32 57ZM8 32C8 45.2548 18.7452 56 32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32Z"
				fill="#0F1410"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5 32C5 46.9117 17.0883 59 32 59C46.9117 59 59 46.9117 59 32C59 17.0883 46.9117 5 32 5C17.0883 5 5 17.0883 5 32ZM7 32C7 45.8071 18.1929 57 32 57C45.8071 57 57 45.8071 57 32C57 18.1929 45.8071 7 32 7C18.1929 7 7 18.1929 7 32Z"
				fill={color}
			/>
			<Path
				d="M5.92152 39.0128C7.0954 43.3891 9.34053 47.3266 12.36 50.5264L8.59535 49.2374C6.08417 48.3753 4.59089 45.8201 5.0973 43.2442L5.92152 39.0128Z"
				fill={color}
			/>
			<Path
				d="M58.902 43.2442C59.4032 45.8201 57.9151 48.3753 55.4039 49.2374L51.6393 50.5255C54.6585 47.3259 56.9038 43.3897 58.0778 39.0137L58.902 43.2442Z"
				fill={color}
			/>
			<Path
				d="M28.4967 3.16023C30.5067 1.44139 33.4878 1.44138 35.4977 3.16023L38.5963 5.81257C36.4854 5.28255 34.276 5.0001 32.0006 5.00007C29.7219 5.00007 27.5089 5.28302 25.3952 5.81453L28.4967 3.16023Z"
				fill={color}
			/>
			<Defs>
				<LinearGradient id="paint0_linear" x1="31.999" y1="-29.2339" x2="31.999" y2="47.882" gradientUnits="userSpaceOnUse">
					<Stop stopColor="#161A17" stopOpacity="0" />
					<Stop offset="1" stopColor="#161A17" stopOpacity="0.24" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

export function UserAvatar({
	username,
	size = 64,
	className,
	color = "#FBCB4A",
	showFrame = true,
}: UserAvatarProps) {
	const variant = useMemo(() => {
		const hash = username.split("").reduce((acc, char) => {
			return acc + char.charCodeAt(0);
		}, 0);
		const index = hash % 8;
		switch (index) {
			case 1:
				return "two";
			case 2:
				return "three";
			case 3:
				return "four";
			case 4:
				return "eight";
			case 5:
				return "six";
			case 6:
				return "seven";
			case 7:
				return "five";
			default:
				return "one";
		}
	}, [username]);

	// Calculate icon size (roughly 50% of the frame size when frame is shown, full size otherwise)
	const iconSize = showFrame ? Math.round(size * 0.5) : size;

	// Without frame, just show the icon
	if (!showFrame) {
		return (
			<OlmechIcon 
				variant={variant} 
				color={color}
				style={{ width: iconSize, height: iconSize }}
			/>
		);
	}

	return (
		<View style={{ width: size, height: size, position: 'relative' }}>
			{/* Frame */}
			<View style={{ position: 'absolute', top: 0, left: 0 }}>
				<AvatarFrame size={size} color={color} />
			</View>
			{/* Icon centered inside */}
			<View style={{ 
				position: 'absolute', 
				top: 0, 
				left: 0, 
				right: 0, 
				bottom: 0, 
				justifyContent: 'center', 
				alignItems: 'center' 
			}}>
				<OlmechIcon 
					variant={variant} 
					color={'white'}
					style={{ width: iconSize, height: iconSize }}
				/>
			</View>
		</View>
	);
}
