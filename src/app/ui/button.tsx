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
                'bg-gradient-to-r from-slate-700 to-sky-700 border rounded-xl flex flex-row items-center justify-center py-3 px-6 text-center text-base text-white font-medium hover:from-slate-950 hover:to-sky-950 ',
                className
            )}
        >
            {children}
        </button>
    )
}