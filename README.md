# Skunkworks

Rapid prototype for side project. Gone all full stack. Chasing that unicorn. Full coverage. Design, ux, front-end, back-end, devops and sysops. Interim conventional build based in Adonis.js removes complications whilst in the conceptual phase. There is a LOT to work through and flesh out... learning Adonis/Laravel, dealing with relational DBs and advanced queries, search, filter and taxonomy mechanics, implementing authentication and authorisation flows with oAuth, instant messaging system with websockets/long polling, CMS facilities for user authoring, installing a comphrensive reputation/feedback system and not to mention designing and architecture on the fly. Once there is enough form, substance and definition to proudly proclaim a MVP. Endpoints will be exposed and Vue(probably Nuxt) incorporated. The ultimate desire is an isomorphic implementation in Vue 3(I declare my sass in a hierarchical system that closely mimics the principles of atomic granularity so relevant partials can easily be repurposed for components)

Knowing the overarching objectives the complete absence of any client-side javascript is a deliberate ploy. So not to distract from the more pressing tasks at hand. It's not completely avoidable as I will have to mock things up to facilitate progession however the presence of any client-side logic at this stage would be completely disposable. I am likely to gradually phase in the shift to Vue concurrently with the Adonis build to avoid duplication or wasted effort.

Of course once things gets close to the MVP that's in my head and starts to resembles something of value this source code will get moved to a private repo. However as a mule for my own self-development and a proof of concept I am happy for this repo to remain publically visible in the interim. Similarly if anything of value emerges that is worth sharing I will separate into a package and push it to NPM.

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
