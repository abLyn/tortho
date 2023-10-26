import React from 'react'
import { Button } from './ui/button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null

  return (
    <div className="flex  place-items-center gap-2 ">
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <Button variant="ghost" disabled={currentPage === 1}>
        <ChevronsLeftIcon />
      </Button>
      <Button variant="ghost" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button variant="ghost" disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
      <Button variant="ghost" disabled={currentPage === pageCount}>
        <ChevronsRightIcon />
      </Button>
    </div>
  )
}

export default Pagination
