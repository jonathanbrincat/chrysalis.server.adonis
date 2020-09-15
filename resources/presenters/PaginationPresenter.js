const url = require('url')
const { BasePresenter } = require('edge.js')

class PaginationPresenter extends BasePresenter {
  isFirst(pagination) {
    return pagination.page == 1
  }

  isCurrent(page, pagination) {
    return pagination.page == page
  }

  isLast(pagination) {
    return pagination.page == pagination.lastPage
  }

  setPage(page, pagination) {
    if(page < 1 || page > pagination.lastPage) return pagination.page;

    return page;
  }

  appendParams(current_url, key, value) {
    const current = url.parse(current_url)
    const params = new URLSearchParams(current.search)

    params.set(key, value)

    return params.toString()
  }
}

module.exports = PaginationPresenter

/*
page ::  1
pagination ::  {total: 7, perPage: 2, page: 1, lastPage: 4, data: Array(2)}
*/
