# Pattern matching feature  [![NPM version](https://img.shields.io/npm/v/moleculer-pattern.svg)](https://www.npmjs.com/package/moleculer-pattern)
It is just a proof-of-concept middleware to monkey-patch Moleculer Broker in order to add pattern-matching routing for action calls.

## Features

## Install
```
npm install icebob/moleculer-pattern
```

## Usage

**Install middleware**
```js
const { ServiceBroker } = require("moleculer");
const PatternMiddleware	= require("../../index");

// Create broker
const broker = new ServiceBroker({
    logger: console,
});

broker.use(PatternMiddleware(broker));
```

**Create service with patterns**
```js
broker.createService({
    name: "a",
    actions: {
        first: {
            pattern: {
                a: 0,
                b: "x"
            },
            handler(ctx) {
                return "Hello ${ctx.params.name}";
            }
        }
    }
});
```

**Call a service**
```js
const res = await broker.act({ a: 0, b: "x", name: "John" });
console.log(res); // "Hello John"
```


# Test
```
$ npm test
```

In development with watching

```
$ npm run ci
```

# Contribution
Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing, because these things are important.

# License
The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).

# Contact
Copyright (c) 2018 MoleculerJS

[![@icebob](https://img.shields.io/badge/github-moleculerjs-green.svg)](https://github.com/moleculerjs) [![@icebob](https://img.shields.io/badge/twitter-Icebobcsi-blue.svg)](https://twitter.com/Icebobcsi)