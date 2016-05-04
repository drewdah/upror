var events = [
	{
		"id": 0,
		"name": "pubcrawl",
		"location": "Gaslamp Quarter",
		"startTime": "7PM PDT"
	}
];

var eventController = {

	listEvents: function(req, res) {
		res.send(events);
	},

	getEvent: function(req, res) {

		console.log("getEvent", req.params.id);

		var found = false;
		
		if(req.params.id){

			for(var i = 0; i < events.length; i++){
				if(req.params.id == i){
					res.send(events[i]);
					found = true;
				}
			}

			if(!found){
				res.send({"status" : "error", "message": "event not found"});
			}

		} else {
			res.send({"status" : "error", "message": "event not found"});
		}
	},

	createEvent: function(req, res) {

		console.log("createEvent");

		if(req.body.name && req.body.location && req.body.startTime){
			var eventId = events.length;

			events.push({
				"id": eventId,
				"name": req.body.name,
				"location": req.body.location,
				"startTime": req.body.startTime
			});

			res.redirect(302, '/event/' + eventId);

		} else {
			res.send({"status" : "error", "message": "event missing data"});
		}
	},

	updateEvent: function(req, res) {

		console.log("updateEvent", req.params.id);
		
		if(req.params.id){

			var eventIndex;

			for(var i = 0; i < events.length; i++) {
				if(req.params.id == events[i].id) {
					eventIndex = i;
					break;
				}
			}

			var selectedEvent = events[eventIndex];

			if(!selectedEvent){
				
				console.log(eventIndex, selectedEvent, events, req.body);

				res.send({"status" : "error", "message": "event not found"});
			} else {

				if(req.body.name || req.body.location || req.body.startTime){

					events[eventIndex] = {
						"id": selectedEvent.id,
						"name": req.body.name || selectedEvent.name,
						"location": req.body.location || selectedEvent.location,
						"startTime": req.body.startTime || selectedEvent.startTime
					}

					res.send(events[eventIndex]);

				} else {
					res.send({"status" : "error", "message": "event missing data"});
				}
			}				

		} else {
			res.send({"status" : "error", "message": "event not found"});
		}

	}

}

module.exports = eventController;