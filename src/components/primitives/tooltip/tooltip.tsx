import {
	type LayoutPosition,
	useAugmentedRef,
	useRelativePosition,
} from "@rn-primitives/hooks";
import { Portal as RNPPortal } from "@rn-primitives/portal";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import {
	BackHandler,
	type GestureResponderEvent,
	type LayoutChangeEvent,
	type LayoutRectangle,
	Pressable,
	View,
} from "react-native";
import type {
	ContentProps,
	OverlayProps,
	PortalProps,
	RootProps,
	TriggerProps,
	TriggerRef,
} from "./types";

interface IRootContext {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	triggerPosition: LayoutPosition | null;
	setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
	contentLayout: LayoutRectangle | null;
	setContentLayout: (contentLayout: LayoutRectangle | null) => void;
	nativeID: string;
}

const RootContext = React.createContext<IRootContext | null>(null);

export function Root({
	asChild,
	delayDuration: _delayDuration,
	skipDelayDuration: _skipDelayDuration,
	disableHoverableContent: _disableHoverableContent,
	onOpenChange: onOpenChangeProp,
	...viewProps
}: RootProps) {
	const nativeID = React.useId();
	const [triggerPosition, setTriggerPosition] =
		React.useState<LayoutPosition | null>(null);
	const [contentLayout, setContentLayout] =
		React.useState<LayoutRectangle | null>(null);
	const [open, setOpen] = React.useState(false);

	function onOpenChange(value: boolean) {
		setOpen(value);
		onOpenChangeProp?.(value);
	}

	const Component = asChild ? Slot.View : View;
	return (
		<RootContext.Provider
			value={{
				open,
				onOpenChange,
				contentLayout,
				nativeID,
				setContentLayout,
				setTriggerPosition,
				triggerPosition,
			}}
		>
			<Component {...viewProps} />
		</RootContext.Provider>
	);
}

function useTooltipContext() {
	const context = React.useContext(RootContext);
	if (!context) {
		throw new Error(
			"Tooltip compound components cannot be rendered outside the Tooltip component",
		);
	}
	return context;
}

export function Trigger({
	asChild,
	onPress: onPressProp,
	disabled = false,
	...props
}: TriggerProps) {
	const { open, onOpenChange, setTriggerPosition } = useTooltipContext();
	const ref = React.useRef<TriggerRef>(null);

	const augmentedRef = useAugmentedRef({
		ref,
		methods: {
			open: () => {
				onOpenChange(true);
				augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
					setTriggerPosition({ width, pageX, pageY: pageY, height });
				});
			},
			close: () => {
				setTriggerPosition(null);
				onOpenChange(false);
			},
		},
	});

	function onPress(ev: GestureResponderEvent) {
		if (disabled) return;
		augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
			setTriggerPosition({ width, pageX, pageY: pageY, height });
		});
		const newValue = !open;
		onOpenChange(newValue);
		onPressProp?.(ev);
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return (
		<Component
			ref={augmentedRef as React.Ref<View>}
			aria-disabled={disabled ?? undefined}
			role="button"
			onPress={onPress}
			disabled={disabled ?? undefined}
			{...props}
		/>
	);
}

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
export function Portal({ forceMount, hostName, children }: PortalProps) {
	const value = useTooltipContext();

	if (!value.triggerPosition) {
		return null;
	}

	if (!forceMount) {
		if (!value.open) {
			return null;
		}
	}

	return (
		<RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
			<RootContext.Provider value={value}>{children}</RootContext.Provider>
		</RNPPortal>
	);
}

export function Overlay({
	asChild,
	forceMount,
	onPress: OnPressProp,
	closeOnPress = true,
	...props
}: OverlayProps) {
	const { open, onOpenChange, setContentLayout, setTriggerPosition } =
		useTooltipContext();

	function onPress(ev: GestureResponderEvent) {
		if (closeOnPress) {
			setTriggerPosition(null);
			setContentLayout(null);
			onOpenChange(false);
		}
		OnPressProp?.(ev);
	}

	if (!forceMount) {
		if (!open) {
			return null;
		}
	}

	const Component = asChild ? Slot.Pressable : Pressable;
	return <Component onPress={onPress} {...props} />;
}

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior on native by setting `disablePositioningStyle` to `true`.
 */
export function Content({
	asChild = false,
	forceMount,
	align = "center",
	side = "bottom",
	sideOffset = 0,
	alignOffset = 0,
	avoidCollisions = true,
	onLayout: onLayoutProp,
	insets,
	style,
	disablePositioningStyle,
	...props
}: ContentProps) {
	const {
		open,
		onOpenChange,
		nativeID,
		contentLayout,
		setContentLayout,
		setTriggerPosition,
		triggerPosition,
	} = useTooltipContext();

	React.useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				setTriggerPosition(null);
				setContentLayout(null);
				onOpenChange(false);
				return true;
			},
		);

		return () => {
			setContentLayout(null);
			backHandler.remove();
		};
	}, [setTriggerPosition, setContentLayout, onOpenChange]);

	const positionStyle = useRelativePosition({
		align,
		avoidCollisions,
		triggerPosition,
		contentLayout,
		alignOffset,
		insets,
		sideOffset,
		side: getNativeSide(side),
		disablePositioningStyle,
	});

	function onLayout(event: LayoutChangeEvent) {
		setContentLayout(event.nativeEvent.layout);
		onLayoutProp?.(event);
	}

	if (!forceMount) {
		if (!open) {
			return null;
		}
	}

	const Component = asChild ? Slot.View : View;
	return (
		<Component
			role="tooltip"
			nativeID={nativeID}
			aria-modal={true}
			style={[positionStyle, style]}
			onLayout={onLayout}
			onStartShouldSetResponder={onStartShouldSetResponder}
			{...props}
		/>
	);
}

function onStartShouldSetResponder() {
	return true;
}

function getNativeSide(side: "left" | "right" | "top" | "bottom") {
	if (side === "left" || side === "right") {
		return "top";
	}
	return side;
}
