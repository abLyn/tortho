'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { Input } from './ui/input'

const SearchField = () => {
  const [input, setInput] = useState('')
  const router = useRouter()

  const [query] = useDebounce(input, 100)

  useEffect(() => {
    if (query) {
      router.push(`/patients?query=${query}`)
    }
  }, [query, router])

  return (
    <>
      <Input
        type="text"
        placeholder="Recherche..."
        className="w-full pl-12  border-none   focus:outline-none "
        onChange={(e) => setInput(e.target.value)}
      />
    </>
  )
}

export default SearchField
