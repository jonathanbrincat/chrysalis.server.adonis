'use strict'

class ChatController {
  index({ request, response, view }) {
    return view.render('chat.index')
  }
}

module.exports = ChatController
