
# Billy
🍔 Declarative and intuitive cli apps in seconds.


![npm: version](https://flat.badgen.net/npm/v/@fivethree/billy-core?params)
![npm: license](https://flat.badgen.net/npm/license/@fivethree/billy-core?params)

[![Edit @fivethree/billy-app](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/fivethreebilly-app-7nd15?codemirror=1&fontsize=14&module=%2Fsrc%2Findex.ts)
## Basic Example

```typescript
import { App, Command } from "@fivethree/billy-core";

@App()
export class ExampleApp {

    @Command('The only thing it really does is output Hello World!')
    async hello() {
        console.log('Hello World!')
    }

}
```



---

## Features

* 🎂**Super declarative code** - Creating commands is as easy as annotating a method.
* ⏲ Schedule commands or listen for a webhook.
* 💁 Automatically prompts the user for missing parameters.
* 📋 Help and version command out of the box.
* 🧩 Easy and extensible plugin system using  **Typescript Mixins**.

## Table of contents

  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Project Scaffolding](#project-scaffolding)
    - [Build](#build)
    - [Run the app](#run-the-app)
    - [Use the library without the cli](#use-the-library-without-the-cli)
  - [Documentation](#documentation)
    - [App](#app)
    - [Commands](#commands)
    - [Parameters](#parameters)
    - [Action](#action)
    - [Hooks](#hooks)
    - [Jobs](#jobs)
    - [Webhooks](#webhooks)
    - [Context](#context)
  - [Plugins](#plugins)
  - [Development](#development)

## Getting Started

### Installation
If you want you can use the **cli**.

```bash
npm i -g @fivethree/billy-cli
```
### Project Scaffolding
To scaffold a new project run
```bash
billy create --app my-app
```

You can also run `npx @fivethree/billy-cli create --app my-app`  to scaffold a project.

Alternatively you can clone the [App](https://github.com/fivethree/billy-app) and [Plugin](https://github.com/fivethree/billy-app) starters.

### Build
In your project directory run `billy build` or `npm run build` to build the app.

### Run the app
To execute a command either run `billy run` or `node . <command> [<args>]`.


[Billy-CLI Documentation](https://github.com/fivethree/billy-cli)

### Use the library without the cli
Install the library in your typescript project.
```bash
npm i @fivethree/billy-core
```
Use it in your index.ts file.


## Documentation

### App

```typescript
@App(options?: AppOptions)
```

The `@App` Decorator makes the class handle all kind of commands and methods you specify.

```typescript
import { App } from "@fivethree/billy-core";

@App({
    name: "MyApp",
    description: "Example App",
    allowUnknownOptions: false
})
export class ExampleApp { 
    // specify methods here
}
```

##### AppOptions
| Parameter           | Type    | Description                                                   | Default value               |
| ------------------- | ------- | ------------------------------------------------------------- | --------------------------- |
| name                | string  | Name of the App, used for help.                               | Name of the annotated Class |
| description         | string  | Description for your app                                      | null                        |
| allowUnknownOptions | boolean | Whether to allow unknown Parameters while parsing the command | false                       |
### Commands
```typescript
@Command(options: string | CommandOptions)
```
Annotate a method in your App with the `@Command` Decorator to make it executable via the command line.

```typescript
import { App, Command } from "@fivethree/billy-core";

@App()
export class ExampleApp { 
    @Command({
        alias: "speak",
        descriptions: "Prints hello world to the console."
    })
    async hello(){
        // code to execute when running the hello command
    }
}
```

##### CommandOptions
| Parameter   | Type   | Description                       | Default value |
| ----------- | ------ | --------------------------------- | ------------- |
| alias       | string | Defines an alias for the Command. | null          |
| description | string | Description for your Command.     | null          |

### Parameters
```typescript
@param(options: ParamOptions)
```
Inject a parameter into a `@Command`. 
```typescript
import { App, param, Command, ParamOptions } from "@fivethree/billy-core";

const nameParam: ParamOptions = {
    name: 'name',
    description: 'Enter the name to greet'
}

@App()
export class ExampleApp { 

    @Command('command with parameter')
    async hello(@param(nameParam) name:string){
        console.log(`hello ${name}`);
    }
}
```

The name attribute can now be passed to the command by running `billy hello --name Gary`. Parameters are non-optional by default. If the parameter is undefined, the user will be prompted for input. If you want to specify an optional parameter, you can set the optional option in `ParamOptions` to true.

##### ParamOptions
| Parameter   | Type   | Description                                                                      | Default value |
| ----------- | ------ | -------------------------------------------------------------------------------- | ------------- |
| name        | string | The name of the parameter                                                        | null          |
| description | string | Description of the parameter that will be used when prompting the user for input | null          |
| optional    | string | Specify that the parameter is optional (prompting will be skipped)               | false         |


### Action
```typescript
@Action(description: string)
```
Methods annotated with `@Action` will register an entry to the history upon execution inside a `@Command`.

```typescript
import { App, Action, Command } from "@fivethree/billy-core";

@App()
export class ExampleApp { 

    @Action('my action')
    async action(){
        // your code here
    }

    @Command('Execute the action')
    async execute(){
        await this.action();
    }
}
```
### Hooks
```typescript
@Hook(hook: HookName)
```
Hooks can be used to intercept the running app.


```typescript
import { App, Hook, afterAll, context, Context } from "@fivethree/billy-core";

@App()
export class ExampleApp { 

    @Hook(afterAll)
    async afterAll(){
        console.log('the app finished! 🏁')
    }
}
```
##### HookName
| Hook       | Description                                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| beforeAll  | Called right before the initial `@Command, @Job or @Webhook` is executed                                                                      |
| beforeEach | Called before every `@Command, @Job or @Webhook` in the program                                                                               |
| afterEach  | Called after every `@Command, @Job or @Webhook` in the program                                                                                |
| afterAll   | Called right after the last `@Command, @Job or @Webhook` has been executed                                                                    |
| onError    | Called when an error occures while executing the app. The annotated method receives the `Error` as a paramenter                               |
| onStart    | Use the `onStart` Hook to override the default behaviour of the app when running the app without specifying a command (Lane Selection screen) |
### Jobs
```typescript
@Job(rule: string | any)
```
Schedule the execution of a command by annotating a method with the `@Job` Decorator.
You need to specify a rule to let the job know when to run it. You have multiple options to define the rule. 
We currently use **node-schedule** under the hood, so visit their [node-schedule Docs](https://github.com/node-schedule/node-schedule).

A few basic examples are provided below:

```typescript
import { App, Job, every } from "@fivethree/billy-core";

@App()
export class ExampleApp { 

    // use the billy-core api
    @Job(every(30).mins)
    async recurring(){
        // runs every 30 mins
    }

    // specified using cron format
    @Job('0 30 7 ? * 1-5')
    async wakeMeUp(){
        // runs every weekday at 7:30 am
    }

    // using Date
    @Job(new Date(2020, 1, 1, 0, 0, 0))
    async newYearsEve(){
        // happy new year 2020
    }
}
```
### Webhooks
```typescript
@Webhook(path: string)
```
To make a method executable via a webhook annotate it with the `@Webhook` Decorator. Once the webhook is being called, the specified method will be run with the request body as a parameter.

```typescript
import { App, Webhook } from "@fivethree/billy-core";

@App()
export class ExampleApp { 

    @Webhook('/webhook')
    async myWebhook(body: any){
        // your code here
    }
}
```

### Context
```typescript
@context()
```
The context can be injected into every type of method. The Context object contains the API to control the running app.
Additionally, the Context can be used to manage the scheduler and the webhook server. 
```typescript
import { App, Command, context, Context } from "@fivethree/billy-core";

@App()
export class ExampleApp { 

    @Command('command with context')
    async hello(@context() ctx:Context){
        ctx.api.printHistory();
    }
}
```

##### Context
| Parameter        | Type    | Description                        |
| ---------------- | ------- | ---------------------------------- |
| name             | string  | name of the current command        |
| description      | string  | description of the current command |
| directory        | string  | install directory of the app       |
| workingDirectory | string  | current working directory          |
| api              | CoreApi | CoreApi instance                   |

##### CoreApi

The CoreApi can be used to configure schedulers, webhooks and the history. Also you can start the command selection screen from here.

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| scheduler | Scheduler | Scheduler api instance |
| webhooks  | WebHook   | WebHook api instance   |

| Method                | Parameters     | Returns         | Description                                |
| --------------------- | -------------- | --------------- | ------------------------------------------ |
| promptLaneAndRun      |                | Promise`<void>` | show the command selection screen          |
| getHistory            |                | HistoryEntry[]  | Get the current HistoryEntry list          |
| addToHistory          | HistoryEntry[] |                 | Add one or multiple HistoryEntry instances |
| getLatestHistoryEntry |                | LatestEntry     |                                            |
| printHistory          |                |                 | print the current history to console       |


## Plugins

You can build your own billy plugin and use it in the app.

Basic Example
```typescript
import { App, usesPlugins } from "@fivethree/billy-core";
import { CorePlugin } from "@fivethree/billy-plugin-core";

// we need this line for intellisense
export interface ExampleApp extends CorePlugin { }

@App()
export class ExampleApp {
    @usesPlugins(CorePlugin)

    // Use Plugin Commands, Jobs, Actions,...here
    // multiple plugins: @usesPlugins(Plugin, OtherPlugin)

}
```
The app will inherit all the Commands and Actions, making them available both in your code and via the command line.

```typescript
@Plugin(description: string)
```

The `@Plugin` Decorator is used to annotate a class as a plugin. Every `@App` can be a plugin. Just switch `@App` to `@Plugin` and move the `@ƒivethree/billy-core` dependency to the devDependencies array in the package.json.

```typescript
import { Plugin } from "@fivethree/billy-core";

@Plugin('my example plugin')
export class ExamplePlugin { 
    // specify methods here
}
```

## Development

1. Clone the repository and cd into project.
2. Run `npm install` to install all the dependencies.
3. Execute `npm run build` to build the project.
4. Run `npm run start` to start developing.
