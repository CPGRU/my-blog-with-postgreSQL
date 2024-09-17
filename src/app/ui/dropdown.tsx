import { useState, useEffect, useRef } from "react";
import { Option } from "../lib/definitions";
import Panel from "./panel";


interface DropdownProps {
    options: Option[];
    value: Option | null
    onChange: (option: Option)=>void
}

export default function Dropdown ({options, value, onChange}: DropdownProps){
    const [ isOpen, setIsOpen ] = useState(false)
    
    const divElem = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const handler = (event: MouseEvent ) =>{
            if(!divElem.current){
                return;
            }
            if(!divElem.current.contains(event.target as Node)){
                setIsOpen(false)
            };

            document.addEventListener('click', handler, true);

            return ()=>{
                document.removeEventListener('click', handler)
            }
        }
    }, []);
    
    const handleOptionClick = (option: Option) =>{
        setIsOpen(false);
        onChange(option)
    }

    const renderedOptions = options.map((option)=>{
        return (
            <div className="hover:bg-gray-400 rounded cursor-pointer p-1"
                key={option.value} onClick={()=>handleOptionClick(option)}
            >
                {option.label}
            </div>
        )
    })

    const handleClick = () =>{
        setIsOpen(currentIsOpen =>! currentIsOpen)
    }

    return (
        <div ref={divElem} className="w-48 relative">
            <Panel 
                className="flex justify-between items-center cursor-pointer"
                onClick={handleClick}
            >
                {value?.label || 'Select theme...'}
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

                
            </Panel>
            {isOpen && 
                <Panel className="absolute top-full">
                    {renderedOptions}
                </Panel>
            }
        </div>
    )
}