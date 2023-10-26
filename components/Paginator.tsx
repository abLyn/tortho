'use client'

import React from 'react'
import { Button } from './ui/button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push('?' + params.toString())
  }

  return (
    <div className="flex  place-items-center gap-2 ">
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <ChevronsLeftIcon />
      </Button>
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="ghost"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="ghost"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <ChevronsRightIcon />
      </Button>
    </div>
  )
}

export default Pagination
