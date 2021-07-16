import _ from 'lodash'

export const Paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize
  return _(items).slice(startIndex).take(pageSize).value()
}
export const PaginateSupply = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value()
}
export const PaginateUsers = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value()
}

