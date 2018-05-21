const { ServiceBroker } 	= require("moleculer");
const PatternMiddleware	= require("../../index");

// Create broker
const broker = new ServiceBroker({
	logger: console,
});

broker.use(PatternMiddleware(broker));

broker.createService({
	name: "a",
	actions: {
		first: {
			pattern: {
				a: 0,
				b: "x"
			},
			handler(ctx) {
				return `Hello ${ctx.params.name}`;
			}
		}
	}
});

broker.start().then(async () => {

	const res = await broker.act({ a: 0, b: "x", name: "John" });
	console.log(res); // "Hello John"

	return broker.stop();
});