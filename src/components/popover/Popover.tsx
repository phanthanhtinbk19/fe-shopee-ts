import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useInteractions,
	useHover,
	FloatingPortal,
	arrow,
	FloatingArrow,
	safePolygon,
	type Placement,
} from "@floating-ui/react";
import {useId, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

interface Props {
	children?: React.ReactNode;
	className?: string;
	renderPopover?: React.ReactNode;
	as?: React.ElementType;
	placement?: Placement;
}
const Popover = ({
	children,
	className,
	renderPopover,
	as: Element = "div",
	placement = "bottom-end",
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef(null);
	const {x, y, refs, strategy, floatingStyles, context} = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(10),
			flip(),
			shift(),
			arrow({
				element: arrowRef,
			}),
		],
		placement: placement,
		whileElementsMounted: autoUpdate,
	});
	const hover = useHover(context, {
		handleClose: safePolygon(),
	});

	const {getReferenceProps, getFloatingProps} = useInteractions([hover]);
	const id = useId();
	return (
		<Element
			className={className}
			ref={refs.setReference}
			{...getReferenceProps()}
		>
			{children}
			<FloatingPortal id={id}>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{opacity: 0, scale: 0}}
							animate={{opacity: 1, scale: 1}}
							exit={{opacity: 0, scale: 0}}
							transition={{duration: 0.2, ease: "easeInOut"}}
							ref={refs.setFloating}
							style={floatingStyles}
							{...getFloatingProps({
								style: {
									position: strategy,
									top: y ?? 0,
									left: x ?? 0,
								},
							})}
						>
							<div>
								<FloatingArrow ref={arrowRef} context={context} fill="white" />
								{renderPopover}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</FloatingPortal>
		</Element>
	);
};

export default Popover;
