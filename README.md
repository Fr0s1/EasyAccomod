# EasyAccomod

## Contributor
Tran Viet Anh
Dinh Trong Hieu
Pham Xuan Hanh

## Description
Web development final project

## Project structure

```bash
.
├── AngularClient
│   ├── angular.json
│   ├── browserslist
│   ├── e2e
│   │   ├── protractor.conf.js
│   │   ├── src
│   │   │   ├── app.e2e-spec.ts
│   │   │   └── app.po.ts
│   │   └── tsconfig.json
│   ├── karma.conf.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── app
│   │   │   ├── admin
│   │   │   │   ├── admin.component.css
│   │   │   │   ├── admin.component.html
│   │   │   │   ├── admin.component.spec.ts
│   │   │   │   ├── admin.component.ts
│   │   │   │   ├── extend-duration
│   │   │   │   │   ├── extend-duration.component.css
│   │   │   │   │   ├── extend-duration.component.html
│   │   │   │   │   ├── extend-duration.component.spec.ts
│   │   │   │   │   └── extend-duration.component.ts
│   │   │   │   ├── home
│   │   │   │   │   ├── home.component.css
│   │   │   │   │   ├── home.component.html
│   │   │   │   │   ├── home.component.spec.ts
│   │   │   │   │   └── home.component.ts
│   │   │   │   ├── navbar
│   │   │   │   │   ├── navbar.component.css
│   │   │   │   │   ├── navbar.component.html
│   │   │   │   │   ├── navbar.component.spec.ts
│   │   │   │   │   └── navbar.component.ts
│   │   │   │   ├── payment
│   │   │   │   │   ├── payment.component.css
│   │   │   │   │   ├── payment.component.html
│   │   │   │   │   ├── payment.component.spec.ts
│   │   │   │   │   └── payment.component.ts
│   │   │   │   └── verify
│   │   │   │       ├── accounts
│   │   │   │       │   ├── accounts.component.css
│   │   │   │       │   ├── accounts.component.html
│   │   │   │       │   ├── accounts.component.spec.ts
│   │   │   │       │   └── accounts.component.ts
│   │   │   │       ├── comments
│   │   │   │       │   ├── verify-comments.component.css
│   │   │   │       │   ├── verify-comments.component.html
│   │   │   │       │   ├── verify-comments.component.spec.ts
│   │   │   │       │   └── verify-comments.component.ts
│   │   │   │       ├── posts
│   │   │   │       │   ├── posts.component.css
│   │   │   │       │   ├── posts.component.html
│   │   │   │       │   ├── posts.component.spec.ts
│   │   │   │       │   └── posts.component.ts
│   │   │   │       └── reports
│   │   │   │           ├── verify-report.component.css
│   │   │   │           ├── verify-report.component.html
│   │   │   │           ├── verify-report.component.spec.ts
│   │   │   │           └── verify-report.component.ts
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app-routing.module.ts
│   │   │   ├── chat
│   │   │   │   ├── chat.component.css
│   │   │   │   ├── chat.component.html
│   │   │   │   ├── chat.component.spec.ts
│   │   │   │   └── chat.component.ts
│   │   │   ├── comments
│   │   │   │   ├── comments.component.css
│   │   │   │   ├── comments.component.html
│   │   │   │   ├── comments.component.spec.ts
│   │   │   │   └── comments.component.ts
│   │   │   ├── create-post
│   │   │   │   ├── create-post.component.css
│   │   │   │   ├── create-post.component.html
│   │   │   │   ├── create-post.component.spec.ts
│   │   │   │   └── create-post.component.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.css
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.spec.ts
│   │   │   │   └── footer.component.ts
│   │   │   ├── _helpers
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── jwt.interceptor.ts
│   │   │   ├── homepage
│   │   │   │   ├── homepage.component.css
│   │   │   │   ├── homepage.component.html
│   │   │   │   ├── homepage.component.spec.ts
│   │   │   │   └── homepage.component.ts
│   │   │   ├── log-in
│   │   │   │   ├── log-in.component.css
│   │   │   │   ├── log-in.component.html
│   │   │   │   ├── log-in.component.spec.ts
│   │   │   │   └── log-in.component.ts
│   │   │   ├── main-nav
│   │   │   │   ├── main-nav.component.css
│   │   │   │   ├── main-nav.component.html
│   │   │   │   ├── main-nav.component.spec.ts
│   │   │   │   └── main-nav.component.ts
│   │   │   ├── _model
│   │   │   │   ├── account.ts
│   │   │   │   └── role.ts
│   │   │   ├── not-found
│   │   │   │   ├── not-found.component.css
│   │   │   │   ├── not-found.component.html
│   │   │   │   ├── not-found.component.spec.ts
│   │   │   │   └── not-found.component.ts
│   │   │   ├── post-details
│   │   │   │   ├── post-details.component.css
│   │   │   │   ├── post-details.component.html
│   │   │   │   ├── post-details.component.spec.ts
│   │   │   │   └── post-details.component.ts
│   │   │   ├── posts
│   │   │   │   ├── posts.component.css
│   │   │   │   ├── posts.component.html
│   │   │   │   ├── posts.component.spec.ts
│   │   │   │   └── posts.component.ts
│   │   │   ├── profile
│   │   │   │   ├── profile.component.css
│   │   │   │   ├── profile.component.html
│   │   │   │   ├── profile.component.spec.ts
│   │   │   │   └── profile.component.ts
│   │   │   ├── register
│   │   │   │   ├── register.component.css
│   │   │   │   ├── register.component.html
│   │   │   │   ├── register.component.spec.ts
│   │   │   │   └── register.component.ts
│   │   │   └── services
│   │   │       ├── account.service.ts
│   │   │       ├── auth.service.ts
│   │   │       ├── comment.service.ts
│   │   │       ├── favorite.service.spec.ts
│   │   │       ├── favorite.service.ts
│   │   │       ├── image.service.ts
│   │   │       ├── messages.service.ts
│   │   │       ├── post.service.ts
│   │   │       └── report.service.ts
│   │   ├── assets
│   │   │   ├── avatar2.png
│   │   │   ├── avatar.png
│   │   │   ├── background3.jpg
│   │   │   ├── background3-small.jpg
│   │   │   ├── EA-Emblem.png
│   │   │   ├── example.json
│   │   │   ├── no_result.gif
│   │   │   ├── room-logo.jpg
│   │   │   └── uet.png
│   │   ├── environments
│   │   │   ├── environment.prod.ts
│   │   │   └── environment.ts
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   ├── styles.css
│   │   └── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.spec.json
│   └── tslint.json
├── ChatServer
│   ├── config
│   │   └── db.config.js
│   ├── controllers
│   │   └── message.controller.js
│   ├── models
│   │   ├── contactList.model.js
│   │   ├── index.js
│   │   └── messages.model.js
│   ├── package.json
│   ├── package-lock.json
│   ├── routes
│   │   └── message.routes.js
│   └── server.js
├── NodeJsServer
│   ├── app
│   │   ├── config
│   │   │   ├── auth.config.js
│   │   │   └── db.config.js
│   │   ├── controllers
│   │   │   ├── account.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── comment.controller.js
│   │   │   ├── notification.controller.js
│   │   │   ├── post.controller.js
│   │   │   ├── report-posts.controller.js
│   │   │   ├── room.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── userFavorite.controller.js
│   │   ├── middleware
│   │   │   └── authJwt.js
│   │   ├── models
│   │   │   ├── account.model.js
│   │   │   ├── comments.model.js
│   │   │   ├── index.js
│   │   │   ├── notification.model.js
│   │   │   ├── postCost.model.js
│   │   │   ├── posts.model.js
│   │   │   ├── reported-posts.model.js
│   │   │   ├── rooms.model.js
│   │   │   ├── userFavorite.model.js
│   │   │   └── user.model.js
│   │   └── routes
│   │       ├── account.routes.js
│   │       ├── comment.routes.js
│   │       ├── notification.routes.js
│   │       ├── post.routes.js
│   │       ├── report.routes.js
│   │       ├── room.routes.js
│   │       ├── userFavorite.routes.js
│   │       └── user.routes.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── roomImages
│   │   ├── 1
│   │   │   ├── 3_2.jpg
│   │   │   ├── 4_1.jpg
│   │   │   └── 5_1.jpg
│   │   ├── 2
│   │   │   ├── image2.png
│   │   │   └── image.png
│   │   └── 3
│   │       ├── 130816959_1836893276450003_637760412475408692_o.jpg
│   │       ├── 1899348.jpg
│   │       └── background.jpg
│   └── server.js
└── README.md

48 directories, 186 files
```