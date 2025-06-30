import { TextClassContext } from "#components";
import { cn } from "#utils";
import * as TablePrimitive from "./table";

export function Table({ className, ...props }: TablePrimitive.RootProps) {
	return (
		<TablePrimitive.Root
			className={cn("w-full caption-bottom text-sm", className)}
			{...props}
		/>
	);
}

export function TableHeader({
	className,
	...props
}: TablePrimitive.HeaderProps) {
	return (
		<TablePrimitive.Header
			className={cn("border-foreground-300 [&_tr]:border-b", className)}
			{...props}
		/>
	);
}

export function TableBody({
	className,
	style,
	...props
}: TablePrimitive.BodyProps) {
	return (
		<TablePrimitive.Body
			className={cn(
				"flex-1 border-foreground-300 [&_tr:last-child]:border-0",
				className,
			)}
			style={[{ minHeight: 2 }, style]}
			{...props}
		/>
	);
}

export function TableFooter({
	className,
	...props
}: TablePrimitive.FooterProps) {
	return (
		<TablePrimitive.Footer
			className={cn(
				"bg-background-200 font-medium [&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
}

export function TableRow({ className, ...props }: TablePrimitive.RowProps) {
	return (
		<TablePrimitive.Row
			className={cn(
				"flex-row border-foreground-300 border-b min-h-[48px] web:transition-colors web:hover:bg-background-200 web:data-[state=selected]:bg-background-300",
				className,
			)}
			{...props}
		/>
	);
}

export function TableHead({ className, ...props }: TablePrimitive.HeadProps) {
	return (
		<TextClassContext.Provider value="text-foreground-400">
			<TablePrimitive.Head
				className={cn(
					"h-12 px-4 text-left justify-center font-medium flex-1 [&:has([role=checkbox])]:pr-0",
					className,
				)}
				{...props}
			/>
		</TextClassContext.Provider>
	);
}

export function TableCell({ className, ...props }: TablePrimitive.CellProps) {
	return (
		<TablePrimitive.Cell
			className={cn(
				"px-4 py-4 align-middle flex-1 [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		/>
	);
}
