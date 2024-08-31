import clsx from "clsx";

type ReactNode = React.ReactNode | React.ReactSVGElement

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode 
}


export function Button({ 
    children, 
    className, 
    ...rest
}: ButtonProps){
    return(
        <button
            {...rest}
            className={clsx(
                'bg-blue-500 border rounded-full flex flex-row items-center justify-center py-3 px-6 text-center text-base text-white font-medium hover:bg-blue-800 disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5',
                className
            )}
        >
            {children}
        </button>
    )
}