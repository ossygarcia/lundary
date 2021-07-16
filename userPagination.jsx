import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import _ from 'lodash'

const UserPagination = ({ currentPage, pageNumber, handlePage, fetch }) => {
  console.log(currentPage)
  const pageCount = Math.ceil(fetch / pageNumber)
  if (pageCount === 1) return null
  const pages = _.range(1, pageCount + 1)
  return (
    <Pagination className='ml-auto'>
      {pages.map(page => (
        <PaginationItem
          key={page}
          className={page === currentPage ? 'page-item active' : 'page-item'}
        >
          <PaginationLink onClick={() => handlePage(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  )
}
export default UserPagination
