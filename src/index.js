/*
 * Pattern-matcing middleware
 * Copyright (c) 2018 MoleculerJS (https://github.com/Icebob/pattern)
 * MIT Licensed
 */

"use strict";

const BloomRun = require("bloomrun");
const E = require("moleculer").Errors;

function processActionRegistry(broker) {
	const matcher = BloomRun();

	broker.registry.actions.actions.forEach((list, key) => {
		if (list.endpoints == 0)
			return;

		const action = list.endpoints[0].action;

		if (action && action.pattern) {
			const res = matcher.lookup(action.pattern);
			if (!res)
				matcher.add(action.pattern, list);
		}
	});

	broker.$matcher = matcher;
}

function decorateBroker(broker) {
	broker.localBus.on("$broker.started", () => {
		processActionRegistry(broker);

		broker.localBus.on("$services.changed", () => {
			processActionRegistry(broker);
		});
	});


	broker.act = (pattern, params, opts) => {
		const epList = broker.$matcher.lookup(pattern);
		if (!epList || epList.count == 0)
			return broker.Promise.reject(new E.ServiceNotFoundError(JSON.stringify(pattern)));

		const endpoint = epList.next();

		if (!endpoint)
			return broker.Promise.reject(new E.ServiceNotAvailable(JSON.stringify(pattern)));

		return broker.call(endpoint, params, opts);
	};
}


module.exports = function(broker) {
	if (!broker.act) {
		decorateBroker(broker);
	}
};