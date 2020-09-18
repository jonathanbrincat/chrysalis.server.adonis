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

  paginate(curr, total, delta = 5) {
    const noop = (v, indice) => (total === 1 || indice%total === 1) ? [] : (v === 1) ? [v, '...'] : ['...', v];

    if(delta > total) delta = total;

    let indice;
    indice = curr - Math.floor(delta / 2);
    indice = Math.max(indice, 1);
    indice = Math.min(indice, 1 + (total - delta));

    return [...noop(1, indice), ...Array.from({length: delta}, () => indice++), ...noop(total, indice)];
  }
}

module.exports = PaginationPresenter
