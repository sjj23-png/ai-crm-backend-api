# docs/02-System-Architecture.md

# Complete System Architecture

The AI CRM follows a layered enterprise architecture where every layer has a single responsibility.

---

# High-Level Flow

Browser

↓

React Frontend

↓

API Client (Axios)

↓

Express Backend

↓

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Prisma ORM

↓

MySQL Database

---

# Request Flow

User Action

↓

React Component

↓

Feature Hook

↓

Feature Service

↓

API Layer

↓

HTTP Request

↓

Express Router

↓

Controller

↓

Validation

↓

Business Service

↓

Repository

↓

Prisma

↓

Database

↓

Response

↓

Frontend Update

---

# Architecture Layers

Presentation Layer

Responsible for user interface.

Business Layer

Responsible for business rules.

Data Layer

Responsible for database communication.

Infrastructure Layer

Responsible for storage, authentication, notifications, logging, configuration, uploads, and integrations.

---

# Enterprise Principles

* Controllers never contain business logic.
* Services never communicate directly with HTTP.
* Repositories are the only layer accessing the database.
* Components never call Axios directly.
* Validation happens before business logic.
* Business modules remain independent.
* Every module communicates through well-defined interfaces.



Full solder j structure 
Folder PATH listing
Volume serial number is A6EC-3A99
D:.
│   .editorconfig
│   .env
│   .env.example
│   .gitignore
│   a.txt
│   b.txt
│   p.txt
│   package-lock.json
│   package.json
│   prisma.config.ts
│   README.md
│   software.md
│   tsconfig.json
│
├───.github
├───.vscode
│       launch.json
│       settings.json
│
├───apps
│   ├───admin-web
│   ├───api
│   │   │   .env
│   │   │   .gitignore
│   │   │   package.json
│   │   │
│   │   ├───prisma
│   │   │       schema.prisma
│   │   │
│   │   └───src
│   │       │   app.ts
│   │       │   README.md
│   │       │   server.ts
│   │       │
│   │       ├───bootstrap
│   │       │       health.ts
│   │       │
│   │       ├───database
│   │       └───routes
│   │               index.ts
│   │
│   ├───landing-site
│   └───web
│       └───webs
│           │   .env
│           │   .gitignore
│           │   eslint.config.js
│           │   index.html
│           │   package-lock.json
│           │   package.json
│           │   README.md
│           │   tsconfig.app.json
│           │   tsconfig.json
│           │   tsconfig.node.json
│           │   vite.config.ts
│           │
│           ├───public
│           │       favicon.svg
│           │       icons.svg
│           │
│           └───src
│               │   App.css
│               │   App.tsx
│               │   index.css
│               │   main.tsx
│               │
│               ├───accessibility
│               ├───analytics
│               ├───app
│               │   │   App.tsx
│               │   │
│               │   ├───guards
│               │   │       GuestRoute.tsx
│               │   │       ProtectedRoute.tsx
│               │   │
│               │   ├───layouts
│               │   │       AuthLayout.tsx
│               │   │       DashboardLayout.tsx
│               │   │
│               │   ├───providers
│               │   │       AppProviders.tsx
│               │   │       QueryProvider.tsx
│               │   │
│               │   └───router
│               │           AppRouter.tsx
│               │
│               ├───assets
│               │   │   hero.png
│               │   │   react.svg
│               │   │   vite.svg
│               │   │
│               │   ├───fonts
│               │   ├───icons
│               │   ├───illustrations
│               │   └───images
│               ├───components
│               │   ├───auth
│               │   │       index.ts
│               │   │       LoginForm.tsx
│               │   │       LoginHero.tsx
│               │   │
│               │   ├───charts
│               │   ├───dashboard
│               │   │   │   DashboardSection.tsx
│               │   │   │   index.ts
│               │   │   │   KPICard.tsx
│               │   │   │   QuickActionCard.tsx
│               │   │   │   WidgetContainer.tsx
│               │   │   │
│               │   │   ├───kpi-card
│               │   │   │       KPICard.tsx
│               │   │   │       KPICard.types.ts
│               │   │   │
│               │   │   └───widgets
│               │   │           ChartPlaceholderWidget.tsx
│               │   │           EmptyStateWidget.tsx
│               │   │           index.ts
│               │   │           KPIGrid.tsx
│               │   │           RecentActivityWidget.tsx
│               │   │           RecentLeadWidget.tsx
│               │   │
│               │   ├───data-display
│               │   ├───feedback
│               │   │       ErrorBoundary.tsx
│               │   │       ErrorFallback.tsx
│               │   │       index.ts
│               │   │       PageLoader.tsx
│               │   │
│               │   ├───forms
│               │   ├───layout
│               │   ├───navigation
│               │   │   ├───header
│               │   │   │       AppHeader.tsx
│               │   │   │       index.ts
│               │   │   │       SearchBar.tsx
│               │   │   │       ThemeToggle.tsx
│               │   │   │
│               │   │   └───sidebar
│               │   │           index.ts
│               │   │           Sidebar.tsx
│               │   │           SidebarFooter.tsx
│               │   │           SidebarGroup.tsx
│               │   │           SidebarItem.tsx
│               │   │
│               │   └───ui
│               ├───config
│               │       api.config.ts
│               │       app.config.ts
│               │       auth.config.ts
│               │       environment.config.ts
│               │       feature.config.ts
│               │       pagination.config.ts
│               │       security.config.ts
│               │       storage.config.ts
│               │       table.config.ts
│               │       theme.config.ts
│               │
│               ├───constants
│               │       api.ts
│               │       permissions.ts
│               │       regex.ts
│               │       roles.ts
│               │       routes.ts
│               │       status.ts
│               │       storage.ts
│               │
│               ├───contexts
│               ├───design-system
│               │   │   index.ts
│               │   │
│               │   ├───components
│               │   │   ├───base
│               │   │   │   ├───Button
│               │   │   │   │       Button.styles.ts
│               │   │   │   │       Button.tsx
│               │   │   │   │       Button.types.ts
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Checkbox
│               │   │   │   │       Checkbox.styles.ts
│               │   │   │   │       Checkbox.tsx
│               │   │   │   │       Checkbox.types.ts
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───IconButton
│               │   │   │   │       IconButton.styles.ts
│               │   │   │   │       IconButton.tsx
│               │   │   │   │       IconButton.types.ts
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Input
│               │   │   │   │       index.ts
│               │   │   │   │       Input.styles.ts
│               │   │   │   │       Input.tsx
│               │   │   │   │       Input.type.ts
│               │   │   │   │
│               │   │   │   ├───PasswordInput
│               │   │   │   │       index.ts
│               │   │   │   │       PasswordInput.styles.ts
│               │   │   │   │       PasswordInput.tsx
│               │   │   │   │       PasswordInput.types.ts
│               │   │   │   │
│               │   │   │   ├───Radio
│               │   │   │   │       index.ts
│               │   │   │   │       Radio.styles.ts
│               │   │   │   │       Radio.tsx
│               │   │   │   │       Radio.types.ts
│               │   │   │   │
│               │   │   │   ├───Select
│               │   │   │   │       index.ts
│               │   │   │   │       Select.styles.ts
│               │   │   │   │       Select.tsx
│               │   │   │   │       Select.types.ts
│               │   │   │   │
│               │   │   │   ├───Switch
│               │   │   │   │       index.ts
│               │   │   │   │       Switch.styles.ts
│               │   │   │   │       Switch.tsx
│               │   │   │   │       Switch.types.ts
│               │   │   │   │
│               │   │   │   └───Textarea
│               │   │   │           index.ts
│               │   │   │           Textarea.styles.ts
│               │   │   │           Textarea.tsx
│               │   │   │           Textarea.types.ts
│               │   │   │
│               │   │   ├───buttons
│               │   │   │   ├───Button
│               │   │   │   │       Button.tsx
│               │   │   │   │       Button.types.ts
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───ButtonGroup
│               │   │   │   │       ButtonGroup.tsx
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   └───IconButton
│               │   │   │           IconButton.tsx
│               │   │   │           index.ts
│               │   │   │
│               │   │   ├───data-display
│               │   │   │   ├───Card
│               │   │   │   │       Card.tsx
│               │   │   │   │       CardContent.tsx
│               │   │   │   │       CardDescription.tsx
│               │   │   │   │       CardFooter.tsx
│               │   │   │   │       CardHeader.tsx
│               │   │   │   │       CardTitle.tsx
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───EmptyState
│               │   │   │   │       EmptyState.tsx
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   └───Text
│               │   │   │           Text.tsx
│               │   │   │
│               │   │   ├───display
│               │   │   │   ├───Avatar
│               │   │   │   │       Avatar.styles.ts
│               │   │   │   │       Avatar.tsx
│               │   │   │   │       Avatar.types.ts
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Badge
│               │   │   │   │       Badge.styles.ts
│               │   │   │   │       Badge.tsx
│               │   │   │   │       Badge.types.ts
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Divider
│               │   │   │   │       Divider.styles.ts
│               │   │   │   │       Divider.tsx
│               │   │   │   │       Divider.types.ts
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   └───Typography
│               │   │   │           index.ts
│               │   │   │           Typography.styles.ts
│               │   │   │           Typography.tsx
│               │   │   │           Typography.types.ts
│               │   │   │
│               │   │   ├───feedback
│               │   │   │   │   index.ts
│               │   │   │   │
│               │   │   │   ├───Alert
│               │   │   │   │       Alert.styles.ts
│               │   │   │   │       Alert.tsx
│               │   │   │   │       Alert.types.ts
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Avatar
│               │   │   │   │       Avatar.tsx
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Badge
│               │   │   │   │       Badge.tsx
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───PageLoader
│               │   │   │   │       index.ts
│               │   │   │   │       PageLoader.tsx
│               │   │   │   │       PageLoader.types.ts
│               │   │   │   │
│               │   │   │   ├───Progress
│               │   │   │   │       index.ts
│               │   │   │   │       Progress.styles.ts
│               │   │   │   │       Progress.tsx
│               │   │   │   │       Progress.types.ts
│               │   │   │   │
│               │   │   │   ├───Skeleton
│               │   │   │   │       index.ts
│               │   │   │   │       Skeleton.tsx
│               │   │   │   │       Skeleton.types.ts
│               │   │   │   │
│               │   │   │   ├───Spinner
│               │   │   │   │       index.ts
│               │   │   │   │       Spinner.styles.ts
│               │   │   │   │       Spinner.tsx
│               │   │   │   │       Spinner.types.ts
│               │   │   │   │
│               │   │   │   └───Toast
│               │   │   │           index.ts
│               │   │   │           Toast.tsx
│               │   │   │           Toast.types.ts
│               │   │   │
│               │   │   ├───layout
│               │   │   │   ├───Box
│               │   │   │   │       Box.tsx
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Container
│               │   │   │   │       Container.tsx
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Flex
│               │   │   │   │       Flex.tsx
│               │   │   │   │       index.ts
│               │   │   │   │
│               │   │   │   ├───Grid
│               │   │   │   │       Grid.tsx
│               │   │   │   │
│               │   │   │   ├───PageHeader
│               │   │   │   │       index.ts
│               │   │   │   │       PageHeader.tsx
│               │   │   │   │
│               │   │   │   ├───Stack
│               │   │   │   │       index.ts
│               │   │   │   │       Stack.tsx
│               │   │   │   │
│               │   │   │   └───Surface
│               │   │   │           index.ts
│               │   │   │           Surface.tsx
│               │   │   │
│               │   │   ├───navigation
│               │   │   │   └───Breadcrumb
│               │   │   │           Breadcrumb.tsx
│               │   │   │           index.ts
│               │   │   │
│               │   │   └───Typography
│               │   │       ├───Divider
│               │   │       │       Divider.tsx
│               │   │       │       index.ts
│               │   │       │
│               │   │       ├───Heading
│               │   │       │       Heading.tsx
│               │   │       │       index.ts
│               │   │       │
│               │   │       ├───Label
│               │   │       │       index.ts
│               │   │       │       Label.tsx
│               │   │       │
│               │   │       ├───Link
│               │   │       │       index.ts
│               │   │       │       Link.tsx
│               │   │       │
│               │   │       └───Text
│               │   │               index.ts
│               │   │               Text.tsx
│               │   │
│               │   ├───theme
│               │   │       dark.theme.ts
│               │   │       index.ts
│               │   │       light.theme.ts
│               │   │       theme.context.ts
│               │   │       theme.provider.tsx
│               │   │       theme.types.ts
│               │   │       theme.utils.ts
│               │   │       use-theme.ts
│               │   │
│               │   └───tokens
│               │           breakpoints.ts
│               │           colors.ts
│               │           index.ts
│               │           motion.ts
│               │           radius.ts
│               │           shadow.ts
│               │           shadows.ts
│               │           spacing.ts
│               │           typography.ts
│               │           z-index.ts
│               │           zindex.ts
│               │
│               ├───features
│               │   ├───auth
│               │   │   │   index.ts
│               │   │   │
│               │   │   ├───api
│               │   │   │       auth.api.ts
│               │   │   │       index.ts
│               │   │   │
│               │   │   ├───context
│               │   │   │       AuthContext.tsx
│               │   │   │       index.ts
│               │   │   │
│               │   │   ├───hooks
│               │   │   │       index.ts
│               │   │   │       useAuth.ts
│               │   │   │       useCurrentUser.ts
│               │   │   │       useLogin.ts
│               │   │   │
│               │   │   ├───services
│               │   │   │       auth.service.ts
│               │   │   │       index.ts
│               │   │   │
│               │   │   ├───types
│               │   │   │       auth.types.ts
│               │   │   │
│               │   │   └───validations
│               │   │           index.ts
│               │   │           login.schema.ts
│               │   │
│               │   └───dashboard
│               │       │   index.ts
│               │       │
│               │       ├───constants
│               │       │       dashboard.constants.ts
│               │       │
│               │       ├───data
│               │       │       dashboard.mock.tsx
│               │       │
│               │       ├───hooks
│               │       │       useDashboard.ts
│               │       │
│               │       ├───services
│               │       │       dashboard.service.ts
│               │       │
│               │       ├───types
│               │       │       dashboard.types.ts
│               │       │
│               │       └───utils
│               │               dashboard.mapper.ts
│               │
│               ├───helpers
│               ├───hooks
│               │       index.ts
│               │       useTheme.ts
│               │
│               ├───i18n
│               ├───lib
│               │   └───utils
│               │           cn.ts
│               │
│               ├───navigation
│               │       navigation.config.ts
│               │       navigation.icons.ts
│               │       navigation.types.ts
│               │
│               ├───pages
│               │   ├───auth
│               │   │       index.ts
│               │   │       LoginPage.tsx
│               │   │
│               │   └───dashboard
│               │           DashboardHome.tsx
│               │           index.ts
│               │
│               ├───performance
│               ├───permissions
│               ├───routes
│               │       index.tsx
│               │       ProtectedRoute.tsx
│               │       PublicRoute.tsx
│               │
│               ├───security
│               ├───services
│               │   ├───api
│               │   │       client.ts
│               │   │       endpoints.ts
│               │   │       index.ts
│               │   │       interceptor.ts
│               │   │
│               │   └───storage
│               │           index.ts
│               │           storage.service.ts
│               │           storage.types.ts
│               │
│               ├───stores
│               │       auth.store.ts
│               │
│               ├───styles
│               ├───types
│               │       api.ts
│               │       auth.ts
│               │       common.ts
│               │       company.ts
│               │       department.ts
│               │       index.ts
│               │       menu.ts
│               │       pagination.ts
│               │       permission.ts
│               │       role.ts
│               │       theme.ts
│               │       user.ts
│               │
│               ├───utils
│               └───validations
├───config
│   ├───ai
│   ├───app
│   ├───auth
│   ├───database
│   ├───email
│   ├───environment
│   │       env.ts
│   │
│   ├───payment
│   ├───redis
│   └───storage
├───database
│   │   prisma.service.ts
│   │
│   ├───backup
│   ├───factories
│   ├───prisma
│   │   │   schema.prisma
│   │   │   seed.ts
│   │   │
│   │   └───migrations
│   ├───schema
│   └───seeders
├───docker
├───docs
│   ├───api
│   ├───architecture
│   ├───database
│   ├───deployment
│   └───diagrams
├───integrations
│   ├───email
│   ├───google
│   ├───payment
│   ├───sms
│   ├───storage
│   └───webhook
├───jobs
│   ├───cron
│   ├───queues
│   ├───schedulers
│   └───workers
├───logs
├───modules
│   │   modules.zip
│   │
│   ├───ai
│   ├───analytics
│   ├───audit
│   ├───auth
│   │   │   auth.module.ts
│   │   │   auth.routes.ts
│   │   │   index.ts
│   │   │
│   │   ├───controllers
│   │   │       auth.controller.ts
│   │   │
│   │   ├───dto
│   │   │       login.dto.ts
│   │   │       register.dto.ts
│   │   │
│   │   ├───guards
│   │   │       auth.guard.ts
│   │   │
│   │   ├───repositories
│   │   │       auth.repository.ts
│   │   │
│   │   ├───routes
│   │   ├───services
│   │   │       auth.service.ts
│   │   │
│   │   └───utils
│   │           jwt.util.ts
│   │           password.util.ts
│   │
│   ├───billing
│   ├───communication
│   │   │   communication.module.ts
│   │   │   index.ts
│   │   │
│   │   ├───controllers
│   │   │       communication.controller.ts
│   │   │
│   │   ├───dto
│   │   │       create-communication.dto.ts
│   │   │       update-communication.dto.ts
│   │   │
│   │   ├───repositories
│   │   │       communication.repository.ts
│   │   │
│   │   ├───routes
│   │   ├───services
│   │   │       communication.service.ts
│   │   │
│   │   ├───types
│   │   │       communication.types.ts
│   │   │
│   │   └───validators
│   │           communication.validator.ts
│   │
│   ├───crm
│   │   │   crm.module.ts
│   │   │   crm.zip
│   │   │
│   │   ├───activity
│   │   │   │   activity.module.ts
│   │   │   │
│   │   │   ├───controllers
│   │   │   │       activity.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-activity.dto.ts
│   │   │   │       update-activity.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       activity.repository.ts
│   │   │   │
│   │   │   ├───routes
│   │   │   │       activity.routes.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       activity.service.ts
│   │   │   │
│   │   │   └───validators
│   │   │           activity.validator.ts
│   │   │
│   │   ├───company
│   │   │   │   company.module.ts
│   │   │   │   company.routes.ts
│   │   │   │
│   │   │   ├───controller
│   │   │   │       company.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-company.dto.ts
│   │   │   │       update-company.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       company.repository.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       company.service.ts
│   │   │   │
│   │   │   └───validators
│   │   │           company.validator.ts
│   │   │
│   │   ├───contact
│   │   │   │   contact.module.ts
│   │   │   │   contact.routes.ts
│   │   │   │
│   │   │   ├───controllers
│   │   │   │       contact.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-contact.dto.ts
│   │   │   │       update-contact.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       contact.repository.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       contact.service.ts
│   │   │   │
│   │   │   └───validators
│   │   │           create-contact.validator.ts
│   │   │           update-contact.validator.ts
│   │   │
│   │   ├───deal
│   │   │   │   deal.module.ts
│   │   │   │
│   │   │   ├───controllers
│   │   │   │       deal.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-deal.dto.ts
│   │   │   │       update-deal.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       deal.repository.ts
│   │   │   │
│   │   │   ├───routes
│   │   │   │       deal.routes.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       deal.service.ts
│   │   │   │
│   │   │   └───validators
│   │   │           deal.validator.ts
│   │   │
│   │   ├───lead
│   │   │   │   lead.module.ts
│   │   │   │
│   │   │   ├───controllers
│   │   │   │       lead.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-lead.dto.ts
│   │   │   │       update-lead.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       lead.repository.ts
│   │   │   │
│   │   │   ├───routes
│   │   │   │       lead.routes.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       lead.service.ts
│   │   │   │
│   │   │   └───validators
│   │   │           lead.validator.ts
│   │   │           update-lead.validator.ts
│   │   │
│   │   ├───note
│   │   │   │   note.module.ts
│   │   │   │
│   │   │   ├───controllers
│   │   │   │       note.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-note.dto.ts
│   │   │   │       update-note.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       note.repository.ts
│   │   │   │
│   │   │   ├───routes
│   │   │   │       note.routes.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       note.service.ts
│   │   │   │
│   │   │   └───validators
│   │   │           note.validator.ts
│   │   │
│   │   ├───pipeline
│   │   │   │   pipeline.module.ts
│   │   │   │
│   │   │   ├───controllers
│   │   │   │       pipeline.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-pipeline.dto.ts
│   │   │   │       update-pipeline.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       pipeline.repository.ts
│   │   │   │
│   │   │   ├───routes
│   │   │   │       pipeline.routes.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       pipeline.service.ts
│   │   │   │
│   │   │   └───validators
│   │   │           pipeline.validator.ts
│   │   │
│   │   ├───stage
│   │   │   │   stage.module.ts
│   │   │   │
│   │   │   ├───controllers
│   │   │   │       stage.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-stage.dto.ts
│   │   │   │       update-stage.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       stage.repository.ts
│   │   │   │
│   │   │   ├───routes
│   │   │   │       stage.routes.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       stage.service.ts
│   │   │   │
│   │   │   └───validators
│   │   │           stage.validator.ts
│   │   │
│   │   ├───tag
│   │   │   │   tag.module.ts
│   │   │   │
│   │   │   ├───controllers
│   │   │   │       tag.controller.ts
│   │   │   │
│   │   │   ├───dto
│   │   │   │       create-tag.dto.ts
│   │   │   │
│   │   │   ├───repositories
│   │   │   │       tag.repository.ts
│   │   │   │
│   │   │   ├───routes
│   │   │   │       tag.routes.ts
│   │   │   │
│   │   │   ├───services
│   │   │   │       tag.service.ts
│   │   │   │
│   │   │   └───validators
│   │   └───task
│   │       │   task.module.ts
│   │       │
│   │       ├───controllers
│   │       │       task.controller.ts
│   │       │
│   │       ├───dto
│   │       │       create-task.dto.ts
│   │       │       update-task.dto.ts
│   │       │
│   │       ├───repositories
│   │       │       task.repository.ts
│   │       │
│   │       ├───routes
│   │       │       task.routes.ts
│   │       │
│   │       ├───services
│   │       │       task.service.ts
│   │       │
│   │       └───validators
│   │               task.validator.ts
│   │
│   ├───customer
│   ├───dashboard
│   ├───department
│   │   │   department.module.ts
│   │   │   department.routes.ts
│   │   │   index.ts
│   │   │
│   │   ├───controllers
│   │   │       department.controller.ts
│   │   │
│   │   ├───dto
│   │   │       create-department.dto.ts
│   │   │       update-department.dto.ts
│   │   │
│   │   ├───repositories
│   │   │       department.repository.ts
│   │   │
│   │   ├───routes
│   │   ├───services
│   │   │       department.service.ts
│   │   │
│   │   ├───types
│   │   │       department.types.ts
│   │   │
│   │   └───validators
│   │           department.validator.ts
│   │
│   ├───designation
│   │   │   designation.module.ts
│   │   │   designation.routes.ts
│   │   │
│   │   ├───controllers
│   │   │       designation.controller.ts
│   │   │
│   │   ├───dto
│   │   │       create-designation.dto.ts
│   │   │       update-designation.dto.ts
│   │   │
│   │   ├───repositories
│   │   │       designation.repository.ts
│   │   │
│   │   ├───services
│   │   │       designation.service.ts
│   │   │
│   │   └───validators
│   │           designation.validator.ts
│   │           update-designation.validator.ts
│   │
│   ├───file
│   ├───lead
│   ├───notification
│   │   │   index.ts
│   │   │   notification.module.ts
│   │   │
│   │   ├───controllers
│   │   │       notification.controller.ts
│   │   │
│   │   ├───dto
│   │   │       create-notification.dto.ts
│   │   │       update-notification.dto.ts
│   │   │
│   │   ├───repositories
│   │   │       notification.repository.ts
│   │   │
│   │   ├───services
│   │   │       notification.service.ts
│   │   │
│   │   ├───types
│   │   │       notification.types.ts
│   │   │
│   │   └───validators
│   │           notification.validator.ts
│   │
│   ├───organization
│   │   │   organization.module.ts
│   │   │   organization.route.ts
│   │   │
│   │   ├───controllers
│   │   │       department.controller.ts
│   │   │       designation.controller.ts
│   │   │       organization.controller.ts
│   │   │       team.controller.ts
│   │   │
│   │   ├───dto
│   │   │       create-department.dto.ts
│   │   │       create-designation.dto.ts
│   │   │       create-organization.dto.ts
│   │   │       create-team.dto.ts
│   │   │       update-organization.dto.ts
│   │   │       update-user-organization.dto.ts
│   │   │
│   │   ├───repositories
│   │   │       department.repository.ts
│   │   │       designation.repository.ts
│   │   │       organization.repository.ts
│   │   │       team.repository.ts
│   │   │
│   │   ├───services
│   │   │       department.service.ts
│   │   │       designation.service.ts
│   │   │       organization.service.ts
│   │   │       team.service.ts
│   │   │
│   │   └───validators
│   │           create-organization.validator.ts
│   │           update-organization.validator.ts
│   │
│   ├───permission
│   │   │   permission.module.ts
│   │   │   permission.routes.ts
│   │   │
│   │   ├───controller
│   │   │       permission.controller.ts
│   │   │
│   │   ├───dto
│   │   │       create-permission.dto.ts
│   │   │       update-permission.dto.ts
│   │   │
│   │   ├───repositories
│   │   │       permission.repository.ts
│   │   │
│   │   ├───services
│   │   │       permission.service.ts
│   │   │
│   │   └───validator
│   │           permission.validator.ts
│   │
│   ├───pipeline
│   ├───role
│   │   │   role.module.ts
│   │   │   role.routes.ts
│   │   │
│   │   ├───controllers
│   │   │       role-permission.controller.ts
│   │   │       role.controller.ts
│   │   │
│   │   ├───dto
│   │   │       assign-permission.dto.ts
│   │   │       create-role.dto.ts
│   │   │       update-role.dto.ts
│   │   │
│   │   ├───guards
│   │   │       role.guard.ts
│   │   │
│   │   ├───middleware
│   │   ├───repositories
│   │   │       role-permission.repository.ts
│   │   │       role.repository.ts
│   │   │
│   │   ├───services
│   │   │       role-permission.service.ts
│   │   │       role.service.ts
│   │   │
│   │   ├───utils
│   │   └───validators
│   │           role.validator.ts
│   │
│   ├───settings
│   ├───task
│   ├───team
│   │   │   index.ts
│   │   │   team.module.ts
│   │   │   team.routes.ts
│   │   │
│   │   ├───controllers
│   │   │       team.controller.ts
│   │   │
│   │   ├───dto
│   │   │       create-team.dto.ts
│   │   │       update-team.dto.ts
│   │   │
│   │   ├───repositories
│   │   │       team.repository.ts
│   │   │
│   │   ├───services
│   │   │       team.service.ts
│   │   │
│   │   ├───types
│   │   │       team.types.ts
│   │   │
│   │   └───validators
│   │           team.validator.ts
│   │           update-team.validator.ts
│   │
│   ├───tenant
│   │   │   tenant.module.ts
│   │   │   tenant.routes.ts
│   │   │
│   │   ├───controllers
│   │   │       tenant.controller.ts
│   │   │
│   │   ├───dto
│   │   │       create-tenant.dto.ts
│   │   │       update-tenant.dto.ts
│   │   │
│   │   ├───guards
│   │   ├───middleware
│   │   │       tenant.middleware.ts
│   │   │
│   │   ├───repositories
│   │   │       tenant.repository.ts
│   │   │
│   │   ├───services
│   │   │       tenant.service.ts
│   │   │
│   │   ├───utils
│   │   └───validators
│   │           create-tenant.validator.ts
│   │           update-tenant.validator.ts
│   │
│   └───user
│       │   user.module.ts
│       │
│       ├───controllers
│       │       user.controller.ts
│       │
│       ├───dto
│       │       create-user.dto.ts
│       │       update-user.dto.ts
│       │
│       ├───events
│       ├───guards
│       ├───middleware
│       ├───repositories
│       │       user.repository.ts
│       │
│       ├───services
│       │       user.service.ts
│       │
│       └───utils
├───nginx
├───Notes
│       FrontendPLan.txt
│
├───public
├───scripts
├───shared
│   ├───constants
│   │       app.constants.ts
│   │
│   ├───decorators
│   ├───dto
│   ├───enums
│   ├───errors
│   │       async-handler.ts
│   │       global-error.handler.ts
│   │
│   ├───events
│   ├───exceptions
│   ├───guards
│   │       auth.guard.ts
│   │
│   ├───helpers
│   ├───interceptors
│   ├───interfaces
│   ├───logger
│   │       logger.ts
│   │
│   ├───middleware
│   │       validate.middleware.ts
│   │
│   ├───pipes
│   ├───providers
│   ├───security
│   │       password.util.ts
│   │
│   ├───services
│   ├───types
│   │       express.d.ts
│   │
│   ├───utils
│   │       jwt.ts
│   │
│   └───validators
├───tests
│   ├───e2e
│   ├───integration
│   ├───performance
│   └───unit
└───uploads

