const {hooks} = require('@adonisjs/ignitor')

// DEVNOTE: lodash available globally for Edge template consumption
// https://forum.adonisjs.com/t/make-lodash-global-to-edge-templates/923
// https://adonisjs.com/docs/4.1/views#_globals_2
// https://adonisjs.com/docs/4.1/ignitor
hooks.after.providersBooted(() => {
  const View = use('View')
  const _ = use('lodash')

  View.global('_', function (method, args) {
    return _[method](args)
  })

  View.global('range', (start, size) => {
    return [...Array(size).keys()].map(i => i + start)
  })
})
