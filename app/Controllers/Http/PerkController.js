'use strict'

const PerkModel = use('App/Models/Perk')

const { validate } =  use('Validator')

class PerkController {
  async index({ view, auth }) {
    const perks = await PerkModel.all()
    const user = await auth.getUser()

    console.log('wtf ', user.toJSON());

    return view.render('perks.index', {
      title: 'Rider\'s Benefits & Promotions',
      perks: perks.toJSON(),
      user: user.toJSON(),
    });
  }

  async details({ params, view }) {
    const perk = await PerkModel.find(params.uid)

    return view.render('perks.details', {
      perk: perk.toJSON()
    });
  }

  async createSave({ request, response, session }) {
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3',
    })

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const perk = new PerkModel()

    perk.title = request.input('title')
    perk.body = request.input('body')

    await perk.save()

    session.flash({ notification: 'Perk successfully added! '})

    return response.redirect('/perks')
  }

  async create({ view }) {
    return view.render('perks.create')
  }

  async edit({ view, params }) {
    const perk = await PerkModel.find(params.uid)

    return view.render('perks.edit', {
      perk
    })
  }

  async editSave({ request, response, session, params }) {
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3',
    })

    if(validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const perk = await PerkModel.find(params.uid)

    perk.title = request.input('title')
    perk.body = request.input('body')

    await perk.save()

    session.flash({ notification: 'Prrk successfully updated! '})

    return response.redirect('/perks')
  }

  async delete({ request, response, session, params }) {
    const perk = await PerkModel.find(params.uid)

    await perk.delete();

    session.flash({ notification: 'Perk successfully deleted! '})

    return response.redirect('/perks')
  }
}

module.exports = PerkController
