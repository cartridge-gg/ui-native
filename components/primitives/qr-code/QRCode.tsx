import type React from "react";
import { useMemo } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

// Simple QR Code generation algorithm
interface QRCodeProps {
	value: string;
	size?: number;
	backgroundColor?: string;
	foregroundColor?: string;
	style?: ViewStyle;
	errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

// QR Code matrix generation (simplified implementation)
const generateQRMatrix = (value: string, size = 21): boolean[][] => {
	// This is a simplified QR code pattern generator
	// In a real implementation, you'd use a proper QR code library
	const matrix: boolean[][] = Array(size)
		.fill(null)
		.map(() => Array(size).fill(false));

	// Add finder patterns (corners)
	const addFinderPattern = (x: number, y: number) => {
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < 7; j++) {
				if (x + i < size && y + j < size) {
					const isEdge = i === 0 || i === 6 || j === 0 || j === 6;
					const isInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
					matrix[x + i][y + j] = isEdge || isInner;
				}
			}
		}
	};

	// Add finder patterns
	addFinderPattern(0, 0); // Top-left
	addFinderPattern(0, size - 7); // Top-right
	addFinderPattern(size - 7, 0); // Bottom-left

	// Add timing patterns
	for (let i = 8; i < size - 8; i++) {
		matrix[6][i] = i % 2 === 0;
		matrix[i][6] = i % 2 === 0;
	}

	// Add data pattern (simplified - based on string hash)
	let hash = 0;
	for (let i = 0; i < value.length; i++) {
		hash = ((hash << 5) - hash + value.charCodeAt(i)) & 0xffffffff;
	}

	for (let i = 8; i < size - 8; i++) {
		for (let j = 8; j < size - 8; j++) {
			if (i !== 6 && j !== 6) {
				matrix[i][j] = ((hash >> ((i * size + j) % 32)) & 1) === 1;
			}
		}
	}

	return matrix;
};

export const QRCode: React.FC<QRCodeProps> = ({
	value,
	size = 200,
	backgroundColor,
	foregroundColor,
	style,
	errorCorrectionLevel = "M",
}) => {
	const { colors } = useTheme();

	const defaultBackgroundColor = backgroundColor || colors.background[100];
	const defaultForegroundColor = foregroundColor || colors.foreground[100];

	const matrix = useMemo(() => {
		const matrixSize = Math.max(21, Math.ceil(value.length / 4) + 17);
		return generateQRMatrix(value, matrixSize);
	}, [value]);

	const moduleSize = size / matrix.length;

	const styles = StyleSheet.create({
		container: {
			width: size,
			height: size,
			backgroundColor: defaultBackgroundColor,
			padding: moduleSize,
		},
		row: {
			flexDirection: "row",
			height: moduleSize,
		},
		module: {
			width: moduleSize,
			height: moduleSize,
		},
	});

	return (
		<View style={[styles.container, style]}>
			{matrix.map((row, rowIndex) => (
				<View key={rowIndex} style={styles.row}>
					{row.map((module, colIndex) => (
						<View
							key={colIndex}
							style={[
								styles.module,
								{
									backgroundColor: module
										? defaultForegroundColor
										: defaultBackgroundColor,
								},
							]}
						/>
					))}
				</View>
			))}
		</View>
	);
};

// QR Code with logo/icon in center
export interface QRCodeWithLogoProps extends QRCodeProps {
	logo?: React.ReactNode;
	logoSize?: number;
	logoBackgroundColor?: string;
}

export const QRCodeWithLogo: React.FC<QRCodeWithLogoProps> = ({
	logo,
	logoSize = 40,
	logoBackgroundColor,
	...qrProps
}) => {
	const { colors } = useTheme();
	const defaultLogoBackgroundColor =
		logoBackgroundColor || colors.background[100];

	const styles = StyleSheet.create({
		container: {
			position: "relative",
		},
		logoContainer: {
			position: "absolute",
			top: "50%",
			left: "50%",
			width: logoSize,
			height: logoSize,
			backgroundColor: defaultLogoBackgroundColor,
			borderRadius: 8,
			justifyContent: "center",
			alignItems: "center",
			transform: [{ translateX: -logoSize / 2 }, { translateY: -logoSize / 2 }],
			borderWidth: 2,
			borderColor: colors.background[100],
		},
	});

	return (
		<View style={styles.container}>
			<QRCode {...qrProps} />
			{logo && <View style={styles.logoContainer}>{logo}</View>}
		</View>
	);
};

// QR Code Scanner Frame (visual component)
export interface QRCodeScannerFrameProps {
	size?: number;
	cornerLength?: number;
	cornerWidth?: number;
	borderColor?: string;
	style?: ViewStyle;
}

export const QRCodeScannerFrame: React.FC<QRCodeScannerFrameProps> = ({
	size = 250,
	cornerLength = 30,
	cornerWidth = 4,
	borderColor,
	style,
}) => {
	const { colors } = useTheme();
	const defaultBorderColor = borderColor || colors.primary[100];

	const styles = StyleSheet.create({
		container: {
			width: size,
			height: size,
			position: "relative",
		},
		corner: {
			position: "absolute",
			width: cornerLength,
			height: cornerLength,
		},
		topLeft: {
			top: 0,
			left: 0,
			borderTopWidth: cornerWidth,
			borderLeftWidth: cornerWidth,
			borderTopColor: defaultBorderColor,
			borderLeftColor: defaultBorderColor,
		},
		topRight: {
			top: 0,
			right: 0,
			borderTopWidth: cornerWidth,
			borderRightWidth: cornerWidth,
			borderTopColor: defaultBorderColor,
			borderRightColor: defaultBorderColor,
		},
		bottomLeft: {
			bottom: 0,
			left: 0,
			borderBottomWidth: cornerWidth,
			borderLeftWidth: cornerWidth,
			borderBottomColor: defaultBorderColor,
			borderLeftColor: defaultBorderColor,
		},
		bottomRight: {
			bottom: 0,
			right: 0,
			borderBottomWidth: cornerWidth,
			borderRightWidth: cornerWidth,
			borderBottomColor: defaultBorderColor,
			borderRightColor: defaultBorderColor,
		},
	});

	return (
		<View style={[styles.container, style]}>
			<View style={[styles.corner, styles.topLeft]} />
			<View style={[styles.corner, styles.topRight]} />
			<View style={[styles.corner, styles.bottomLeft]} />
			<View style={[styles.corner, styles.bottomRight]} />
		</View>
	);
};
