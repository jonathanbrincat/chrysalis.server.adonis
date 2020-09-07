'use strict'

const JobModel = use('App/Models/Job')

class JobController {
  async index({ view }) {
    const jobs = await JobModel.all();

    return view.render('jobs.index', {
      jobs: jobs.toJSON()
    });
  }

  async edit({ request, response, session, params, view }) {
    const job = await JobModel.find(params.id)

    return view.render('jobs.edit', {job: job})
  }

  // DEVNOTE: fetch particular user's jobs
  async userIndex({ request, response, view, auth }) {
    const jobs = await auth.user.jobs().fetch();

    return view.render('jobs.create', {
      jobs: jobs.toJSON()
    })
  }

  async create({ request, response, session, auth }) {
    const job = request.all();

    const posted = await auth.user.jobs().create({
      title: job.title,
      link: job.link,
      description: job.description,
    })

    session.flash({ message: 'Your job has been posted'})

    return response.redirect('back')
  }

  async delete({ request, response, session, params }) {
    const job = await JobModel.find(params.id)

    await job.delete()

    session.flash({ message: 'Your job has been deleted'})

    return response.redirect('back')
  }

  async createSave({ request, response, session, params }) {
    const job = await JobModel.find(params.id)

    job.title = request.all().title;
    job.link = request.all().link;
    job.description = request.all().description;

    await job.save()

    session.flash({ message: 'Your job has been updated'})

    return response.redirect('/jobs/create')
  }
}

module.exports = JobController
