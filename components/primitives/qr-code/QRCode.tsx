import type React from "react";
import { useMemo } from "react";
import { View } from "react-native";
import { cn } from "../../utils/cn";

// Simple QR Code generation algorithm
interface QRCodeProps {
	value: string;
	size?: number;
	backgroundColor?: string;
	foregroundColor?: string;
	className?: string;
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
	backgroundColor = "white",
	foregroundColor = "black",
	className,
	errorCorrectionLevel = "M",
}) => {
	const matrix = useMemo(() => {
		const matrixSize = Math.max(21, Math.ceil(value.length / 4) + 17);
		return generateQRMatrix(value, matrixSize);
	}, [value]);

	const moduleSize = size / matrix.length;

	return (
		<View
			className={cn("bg-white", className)}
			style={{
				width: size,
				height: size,
				backgroundColor,
				padding: moduleSize,
			}}
		>
			{matrix.map((row, rowIndex) => (
				<View
					key={rowIndex}
					className="flex-row"
					style={{ height: moduleSize }}
				>
					{row.map((module, colIndex) => (
						<View
							key={colIndex}
							style={{
								width: moduleSize,
								height: moduleSize,
								backgroundColor: module ? foregroundColor : backgroundColor,
							}}
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
	logoBackgroundColor = "white",
	...qrProps
}) => {
	return (
		<View className="relative">
			<QRCode {...qrProps} />
			{logo && (
				<View
					className="absolute justify-center items-center rounded-lg border-2 border-white"
					style={{
						top: "50%",
						left: "50%",
						width: logoSize,
						height: logoSize,
						backgroundColor: logoBackgroundColor,
						transform: [
							{ translateX: -logoSize / 2 },
							{ translateY: -logoSize / 2 },
						],
					}}
				>
					{logo}
				</View>
			)}
		</View>
	);
};

// QR Code Scanner Frame (visual component)
export interface QRCodeScannerFrameProps {
	size?: number;
	cornerLength?: number;
	cornerWidth?: number;
	borderColor?: string;
	className?: string;
}

export const QRCodeScannerFrame: React.FC<QRCodeScannerFrameProps> = ({
	size = 250,
	cornerLength = 30,
	cornerWidth = 4,
	borderColor = "rgb(59, 130, 246)", // blue-500
	className,
}) => {
	return (
		<View
			className={cn("relative", className)}
			style={{ width: size, height: size }}
		>
			{/* Top Left Corner */}
			<View
				className="absolute"
				style={{
					top: 0,
					left: 0,
					width: cornerLength,
					height: cornerLength,
					borderTopWidth: cornerWidth,
					borderLeftWidth: cornerWidth,
					borderTopColor: borderColor,
					borderLeftColor: borderColor,
				}}
			/>
			{/* Top Right Corner */}
			<View
				className="absolute"
				style={{
					top: 0,
					right: 0,
					width: cornerLength,
					height: cornerLength,
					borderTopWidth: cornerWidth,
					borderRightWidth: cornerWidth,
					borderTopColor: borderColor,
					borderRightColor: borderColor,
				}}
			/>
			{/* Bottom Left Corner */}
			<View
				className="absolute"
				style={{
					bottom: 0,
					left: 0,
					width: cornerLength,
					height: cornerLength,
					borderBottomWidth: cornerWidth,
					borderLeftWidth: cornerWidth,
					borderBottomColor: borderColor,
					borderLeftColor: borderColor,
				}}
			/>
			{/* Bottom Right Corner */}
			<View
				className="absolute"
				style={{
					bottom: 0,
					right: 0,
					width: cornerLength,
					height: cornerLength,
					borderBottomWidth: cornerWidth,
					borderRightWidth: cornerWidth,
					borderBottomColor: borderColor,
					borderRightColor: borderColor,
				}}
			/>
		</View>
	);
};
