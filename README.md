oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tablizer
$ tablizer COMMAND
running command...
$ tablizer (--version)
tablizer/0.0.0 linux-x64 node-v16.17.0
$ tablizer --help [COMMAND]
USAGE
  $ tablizer COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tablizer hello PERSON`](#tablizer-hello-person)
* [`tablizer hello world`](#tablizer-hello-world)
* [`tablizer help [COMMAND]`](#tablizer-help-command)
* [`tablizer plugins`](#tablizer-plugins)
* [`tablizer plugins:install PLUGIN...`](#tablizer-pluginsinstall-plugin)
* [`tablizer plugins:inspect PLUGIN...`](#tablizer-pluginsinspect-plugin)
* [`tablizer plugins:install PLUGIN...`](#tablizer-pluginsinstall-plugin-1)
* [`tablizer plugins:link PLUGIN`](#tablizer-pluginslink-plugin)
* [`tablizer plugins:uninstall PLUGIN...`](#tablizer-pluginsuninstall-plugin)
* [`tablizer plugins:uninstall PLUGIN...`](#tablizer-pluginsuninstall-plugin-1)
* [`tablizer plugins:uninstall PLUGIN...`](#tablizer-pluginsuninstall-plugin-2)
* [`tablizer plugins update`](#tablizer-plugins-update)

## `tablizer hello PERSON`

Say hello

```
USAGE
  $ tablizer hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/tenheadedlion/tablizer.git/https://github.com/tenheadedlion/tablizer/blob/v0.0.0/dist/commands/hello/index.ts)_

## `tablizer hello world`

Say hello world

```
USAGE
  $ tablizer hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ tablizer hello world
  hello world! (./src/commands/hello/world.ts)
```

## `tablizer help [COMMAND]`

Display help for tablizer.

```
USAGE
  $ tablizer help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for tablizer.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.19/src/commands/help.ts)_

## `tablizer plugins`

List installed plugins.

```
USAGE
  $ tablizer plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ tablizer plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.7/src/commands/plugins/index.ts)_

## `tablizer plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ tablizer plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ tablizer plugins add

EXAMPLES
  $ tablizer plugins:install myplugin 

  $ tablizer plugins:install https://github.com/someuser/someplugin

  $ tablizer plugins:install someuser/someplugin
```

## `tablizer plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ tablizer plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ tablizer plugins:inspect myplugin
```

## `tablizer plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ tablizer plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ tablizer plugins add

EXAMPLES
  $ tablizer plugins:install myplugin 

  $ tablizer plugins:install https://github.com/someuser/someplugin

  $ tablizer plugins:install someuser/someplugin
```

## `tablizer plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ tablizer plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ tablizer plugins:link myplugin
```

## `tablizer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tablizer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tablizer plugins unlink
  $ tablizer plugins remove
```

## `tablizer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tablizer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tablizer plugins unlink
  $ tablizer plugins remove
```

## `tablizer plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ tablizer plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ tablizer plugins unlink
  $ tablizer plugins remove
```

## `tablizer plugins update`

Update installed plugins.

```
USAGE
  $ tablizer plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
