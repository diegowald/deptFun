const { Client } = require('node-rest-client');

var Clint = require('node-rest-client').Client;

var client = new Client();

function processData(launches, rockets) {
    if (launches.length == 0) {
        console.log("Missing launches");
        return;
    }

    if (rockets.length == 0) {
        console.log("missing rockets");
        return;
    }

    console.log("processing data");

    var rocketsResult = {};
    for (var idx = 0; idx < rockets.length; idx++) {
        r = rockets[idx];
        rocket = {};
        rocket.rocket_id = r.rocket_id;
		rocket.rocket_name = r.rocket_name;
		rocket.active = r.active;
		rocket.cost_per_launch = r.cost_per_launch;
		rocket.company = "SpaceX";
        rocketsResult[rocket.rocket_id] = rocket;
    }

    var result = [];

    for (var idx = 0; idx < launches.length; idx ++) {
        launch = launches[idx];
        launchResult = {};
        launchResult.flight_number = launch.flight_number;
        launchResult.mission_name = launch.mission_name;
        launchResult.mission_patch = launch.links.mission_patch;
        launchResult.details = launch.details;
        launchResult.rocket = rocketsResult[launch.rocket.rocket_id];
        result.push(launchResult);
    }

    console.log(result[0]);
}

var launches = [];
var rockets = [];


client.get("https://api.spacexdata.com/v3/launches", function (data, response) {
	// parsed response body as js object
	launches = data;
	// raw response
	//console.log(response);
    processData(launches, rockets);
});

client.get("https://api.spacexdata.com/v3/rockets", function (data, response) {
    rockets = data;
    //console.log(response);
    processData(launches, rockets);
});

