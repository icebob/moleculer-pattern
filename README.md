![Moleculer logo](http://moleculer.services/images/banner.png)

[![Build Status](https://travis-ci.org/Icebob/pattern.svg?branch=master)](https://travis-ci.org/Icebob/pattern)
[![Coverage Status](https://coveralls.io/repos/github/Icebob/pattern/badge.svg?branch=master)](https://coveralls.io/github/Icebob/pattern?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/<----hash----->)](https://www.codacy.com/app/<---username---->/pattern?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Icebob/pattern&amp;utm_campaign=Badge_Grade)
[![Code Climate](https://codeclimate.com/github/Icebob/pattern/badges/gpa.svg)](https://codeclimate.com/github/Icebob/pattern)
[![David](https://img.shields.io/david/Icebob/pattern.svg)](https://david-dm.org/Icebob/pattern)
[![Known Vulnerabilities](https://snyk.io/test/github/Icebob/pattern/badge.svg)](https://snyk.io/test/github/Icebob/pattern)
[![Join the chat at https://gitter.im/moleculerjs/moleculer](https://badges.gitter.im/moleculerjs/moleculer.svg)](https://gitter.im/moleculerjs/moleculer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Pattern matching feature  [![NPM version](https://img.shields.io/npm/v/pattern.svg)](https://www.npmjs.com/package/pattern)
It is just a proof-of-concept middleware to monkey-patch Moleculer Broker in order to add pattern-matching routing for action calls.

## Features

## Install
```
```

## Usage
**Install**
```js
const { ServiceBroker } 	= require("moleculer");
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
const res = await broker.act({ a: 0, b: "x"}, { name: "John" });
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