var event = require("../controllers/event");

var appRouter = function(app) {

	// Event Router
	app.get('/events', event.listEvents);
	app.post('/event', event.createEvent);
	app.get("/event/:id", event.getEvent);
	app.put("/event/:id", event.updateEvent);

}

module.exports = appRouter;