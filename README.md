# Skunkworks

Rapid prototype for side project. Gone all full stack. Chasing that unicorn. Full coverage. Design, ux, front-end, back-end, devops and sysops. Interim conventional build based in Adonis.js removes complications whilst in the conceptual phase. There is a LOT to work through and flesh out... learning Adonis/Laravel, dealing with relational DBs and advanced queries, search, filter and taxonomy mechanics, implementing authentication and authorisation flows with oAuth, instant messaging system with websockets/long polling, CMS facilities for user authoring, installing a comphrensive reputation/feedback system and not to mention designing and architecture on the fly. Once there is enough form, substance and definition to proudly proclaim a MVP. Endpoints will be exposed and Vue(probably Nuxt) incorporated. The ultimate desire is an isomorphic implementation in Vue 3. That's the dream!

Knowing the overarching objectives the complete absence of any client-side javascript is a deliberate ploy. So not to distract from the more pressing tasks. It's not completely avoidable as I will have to mock things up to facilitate progession however the presence of any client-side logic at this stage would be completely disposable. I am likely to gradually phase in the shift to Vue concurrently with the Adonis build to avoid duplication or wasted effort.

Of course once things gets close to the MVP that's in my head and starts to resembles something of value this source code will get moved to a private repo. However as a mule for my own self-development and a proof of concept I am happy for this repo to remain publically visible in the interim. Similarly if anything of value emerges that is worth sharing I will separate into a package and publish it to NPM.

## Tasklist/Roadmap

1. Incorporate an icon library; either font-awesome or bootstrap-icons will do - preference for implementation is a SVG sprite using the technique I evolved on MyTR - Maintain the integrity of the npm dependency so this is consumed as a library and not copy and pasted as a static resource(iirc I again cracked this on MyTR so need to reference the old source). This will remove a design bottleneck because it's difficult to visualise and craft something coherent in their absence.
2. Complete removal of Bootstrap. Just a Normalize please. Retain a responsive grid system as backup and for quick mockup however I don't like the Bootstrap 4 treatment. Downgrading to bootstrap 3 seems preverse. So flexbox might be an option. Could consider Bulma I suppose, don't really like the css class system. Probably best to play it safe and use flexbox-grid or something similar.
3. Housekeeping on scss. remove any dead rules or skeletons, enforce my bem conventions and instil some order on anything that has been declared from designing this thing on the fly. Just keep on top of things.
4. Take a break from Design and UX. Back on to Adonis. Want to address the taxonomy. This is the next critical piece. I think to prepare for this task it would be wise to review the existing migrations and seeders. purge and replace with more concrete database routines so I have representative data to query. Also just wipe the slate clean and reset the Adonis migration cache so there can be no artifacts lurking in their to annoy me. Think carefully about the task at hand. Classification, cataloging, search and filter. The rudimentary tagging will be retained and incorporated too. In addition think about the business purpose of this feature. For example promoted listings, latest listings, saved listings, recently visted listings. These are criteria that will need to be elegantly serviced by the taxonomy and it's architecture. As an aside and distraction for when things start to grate, build a breadcrumb component(adonis) alongside. Keep search and filter functionality strictly server-side for the timebeing i.e. javascript free - so can just build out a separate 'search results' view for this or better, try to repurpose the existing 'listing' view so it fits both scenarios.
5. I think now would be the opportune moment to expose some endpoints and get Vue in on the act. Purely to render out listings to validate progress thus far and to get me thinking about this side of things. You can use conditional logic in an Adonis controller to either render to a view or to output JSON depending on the request header. So should be able to run both conventional and headless happily without upsetting anything.

## Backlog and Epics
Authenticated routes and controllers. make sure this is water tight.
Messaging system
Feedback and reputation system
User profile - forgotten password, password reset, delete account, contact info, location, feedback, status(active/suspended/banned), enhanced account
Post architecture - multiples, reservation, revision system
Post authoring - file upload, rich text editor, direct html injection
Moderation/reporting system
Project needs a brand, name and a logo


## Retained for reference
This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds
