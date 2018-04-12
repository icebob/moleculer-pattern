"use strict";

const { ServiceBroker } 	= require("moleculer");
const PatternMiddleware	= require("../../index");
const chalk = require("chalk");

// Create broker
const broker = new ServiceBroker({
	logger: console,
	internalServices: false
});

broker.use(PatternMiddleware(broker));

// A service
broker.createService({
	name: "a",
	actions: {
		first: {
			pattern: {
				a: 0
			},
			handler(ctx) {
				return ctx.action.name;
			}
		},

		second: {
			pattern: {
				b: 0
			},
			handler(ctx) {
				return ctx.action.name;
			}
		},

		third: {
			pattern: {
				c: "a"
			},
			handler(ctx) {
				return ctx.action.name;
			}
		}
	}
});

// Start server
broker.start().then(async () => {

	await checkAct({ a: 0 }, "a.first");
	await checkAct({ a: 0, b: 1 }, "a.first");
	await checkActFail({ b: 1 }, "ServiceNotFoundError");
	await checkAct({ b: 1, c: "a" }, "a.third");
	await checkAct({ b: 0, c: "a" }, "a.second");
	await checkActFail({ b: 5 }, "ServiceNotFoundError");
	await checkAct({ c: "a" }, "a.third");


	return broker.stop();
});

async function checkAct(pattern, expected) {
	try {
		const res = await broker.act(pattern);
		if (res == expected) {
			console.log(chalk.green.bold(`OK: '${res}' == '${expected}'`));
		} else {
			console.log(chalk.red.bold(`FAIL: '${res}' != '${expected}'`));
		}
	} catch(err) {
		console.log(chalk.red.bold(`FAIL: '${err.message}'`));
	}
}

async function checkActFail(pattern, expected) {
	try {
		const res = await broker.act(pattern);
		console.log(chalk.red.bold(`OKFAIL: '${res}'`));
	} catch(err) {
		if (err.name == expected)
			console.log(chalk.green.bold(`OK: '${err.name}'`));
		else
			console.log(chalk.red.bold(`FAIL: '${err.name}' != '${expected}'`));
	}
}
