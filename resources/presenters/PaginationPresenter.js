const { BasePresenter } = require('edge.js')

class PaginationPresenter extends BasePresenter {
  isFirst(pagination) {
    return pagination.page == 1
  }

  isCurrent(pagination, page) {
    return pagination.page == page
  }

  isLast(pagination) {
    return pagination.page == pagination.lastPage
  }

  append(current_url, key, value) {
    const current = url.parse(current_url)
    const params = new URLSearchParams(current.search)

    params.set(key, value)

    return params.toString()
  }
}

module.exports = PaginationPresenter


// implement updated version that limits display of paginated output and orders it
// implement active/current css class
/*
<ul>
  <li>
    <a {{ isFirst(pagination) ? '' : 'href=?page=' + (pagination.page - 1) }}>Previous</a>
  </li>
  @each(page in range(1, pagination.lastPage))
    <li>
      <a {{ isCurrent(pagination, page) ? '' : 'href=?page' + page }}>{{ page }}</a>
    </li>
  @endeach
  <li>
    <a {{ isLast(pagination) ? '' : 'href=?page=' + (pagination.page + 1) }}>Next</a>
  </li>
</ul>

<ul>
  <li>
    <a {{ isFirst(pagination) ? '' : 'href=?' + append(request.originalUrl(), 'page', pagination.page - 1) }}>Previous</a>
  </li>
  @each(page in range(1, pagination.lastPage))
    <li>
      <a {{ !isCurrent(pagination, page) ? 'href=?' + append(request.originalUrl(), 'page', page) : '' }}>
          {{ page }}
      </a>
    </li>
  @endeach
  <li>
    <a {{ isLast(pagination) ? '' : 'href=?' + append(request.originalUrl(), 'page', pagination.page + 1) }}>Next</a>
  </li>
</ul>
*/
