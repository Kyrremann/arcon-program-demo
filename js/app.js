function getTimeForPule(pulje) {
    return puljer[pulje.toString()];
}

// List.js features
var options = {
    valueNames: [ 'navn', 'regler', 'type', 'arrangor', 'deltagere', 'vinner', 'beskrivelse' ],
    item: '<li class="pulje">\
<strong class="navn"></strong>\
<br />\
<strong>Regler:</strong> <span class="regler"></span>\
<!--img src="http://www.spillfestival.no/images/happy.gif" alt="Ingen regelkunnskaper kreves"-->\
<br />\
<strong>Type:</strong> <span class="type"></span>\
<br />\
<strong>Arrangør:</strong> <span class="arrangor"></span>\
<br />\
<br />\
<button class="button-xsmall pure-button-primary pure-button toggleDescription">Mer info</button>\
<div class="slideDescription">\
<strong>Maks deltagere:</strong> <span class="deltagere"></span>\
<br />\
<strong>Vinnertype:</strong> <span class="vinner"></span>\
<br />\
<strong>Beskrivelse:</strong>\
<div class="beskrivelse"></div>\
</div>\
</li>'
};

var programList = new List('program', options, data["Turneringer"]);
programList.sort('navn', { order: "asc" });

$(document).ready(function(e) {
    $('.filter-clear').on('click', function() {
	programList.filter();
	programList.sort('navn', { order: "asc" });
    });

    $('.filter-kortspill').on('click', function() {
	programList.filter(function(item) {
	    console.log(item);
	    var type = item.values().type;
	    return type === "Kortspill";
	});
    });

    $('.filter-brettspill').on('click', function() {
	programList.filter(function(item) {
	    var type = item.values().type;
	    return type === "Brettspill";
	});
    });

    $('.filter-figurspill').on('click', function() {
	programList.filter(function(item) {
	    var type = item.values().type;
	    return type === "Figurspill";
	});
    });

    $('.filter-annet').on('click', function() {
	programList.filter(function(item) {
	    var type = item.values().type;
	    return type === "Annet";
	});
    });

    $('.filter-rollespill').on('click', function() {
	programList.filter(function(item) {
	    var type = item.values().type;
	    return type === "Rollespill";
	});
    });

    $('.filter-turnering').on('click', function() {
	programList.filter(function(item) {
	    var type = item.values().type;
	    return type === "Turnering";
	});
    });

    // JQuery features
    $(".toggleDescription").click(function() {
	$(this).next().first().slideToggle();
    });
});
