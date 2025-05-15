import React, { createContext, useContext } from 'react'
import { cn } from "../../lib/utils"

interface RadioGroupContextType {
  value: string | undefined
  onValueChange: (value: string) => void
  disabled?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined)

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export const CustomRadioGroup: React.FC<RadioGroupProps> = ({
  className,
  value,
  onValueChange,
  disabled,
  children,
  ...props
}) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, disabled }}>
      <div className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export const CustomRadioGroupItem: React.FC<RadioGroupItemProps> = ({
  className,
  id,
  value,
  ...props
}) => {
  const context = useContext(RadioGroupContext)
  
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup')
  }
  
  const { value: groupValue, onValueChange, disabled } = context
  
  return (
    <input
      type="radio"
      id={id}
      className={cn(
        "h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      checked={groupValue === value}
      onChange={() => onValueChange(value)}
      disabled={disabled}
      value={value}
      {...props}
    />
  )
}
