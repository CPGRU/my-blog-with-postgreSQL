import clsx from "clsx";

type ReactNode = React.ReactNode | React.ReactSVGElement;

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode 
};

export default function Panel ({
    children,
    className,
    ...rest
}: PanelProps){

    return (
        <div {...rest}
            className={clsx(
                'border rounded-md p-3 shadow bg-gray-200 w-full',
                className
        )}>
            {children}
        </div>
    )
}