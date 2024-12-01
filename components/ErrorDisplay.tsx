import React from 'react'

interface ErrorDisplayProps {
  error : string[] | undefined | null
}

const ErrorDisplay = ({error} : ErrorDisplayProps) => {
  return (
    <p className={`text-red-500 text-xs ${error ? "visible" : "invisible"}`}>
      {error?.[0] || "Placeholder"}
    </p>
  )
}

export default ErrorDisplay