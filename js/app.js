// Globals
CURRENT_DAY = null;
CURRENT_TYPE = null;
// Globals end

function getTimeForPule(pulje) {
    return puljer[pulje.toString()];
}

function notNull(value) {
    return value != null;
}

function isFriday(values) {
    return (notNull(values['Pulje0']) ||
	    notNull(values['Pulje1']) ||
	    notNull(values['Pulje2']) ||
	    notNull(values['Pulje3']));
}

function isSaturday(values) {
    return (notNull(values['Pulje4']) ||
	    notNull(values['Pulje5']) ||
	    notNull(values['Pulje6']) ||
	    notNull(values['Pulje7']) ||
	    notNull(values['Pulje8']) ||
	    notNull(values['Pulje9']));
}

function isSunday(values) {
    return (notNull(values['Pulje10']) ||
	    notNull(values['Pulje11']) ||
	    notNull(values['Pulje12']) ||
	    notNull(values['Pulje13']) ||
	    notNull(values['Pulje14']) ||
	    notNull(values['Pulje15']));
}

function isMonday(values) {
    return (notNull(values['Pulje16']) ||
	    notNull(values['Pulje17']));
}

function currentDay(values) {
    if (CURRENT_DAY === 'Friday') {
	return isFriday(values);
    } else if (CURRENT_DAY === 'Saturday') {
	return isSaturday(values);
    } else if (CURRENT_DAY === 'Sunday') {
	return isSunday(values);
    } else if (CURRENT_DAY === 'Monday') {
	return isMonday(values);
    } else {
	return true;
    }
}

function currentType(values) {
    if (CURRENT_TYPE === 'Brettspill') {
	return values.type === 'Brettspill';
    } else if (CURRENT_TYPE === 'Kortspill') {
	return values.type === 'Kortspill';
    } else if (CURRENT_TYPE === 'Figurspill') {
	return values.type === 'Figurspill';
    } else if (CURRENT_TYPE === 'Rollespill') {
	return values.type === 'Rollespill';
    } else if (CURRENT_TYPE === 'Turnering') {
	return values.type === 'Turnering';
    } else if (CURRENT_TYPE === 'Annet') {
	return values.type === 'Annet';
    } else {
	return true;
    }
}

function updateFilterText() {
    var element = $('#filter')[0];
    if (CURRENT_DAY != null && CURRENT_TYPE != null) {
	element.innerHTML = CURRENT_DAY + ' - ' + CURRENT_TYPE;
    } else if (CURRENT_DAY != null) {
	element.innerHTML = CURRENT_DAY;
    } else if (CURRENT_TYPE != null) {
	element.innerHTML = CURRENT_TYPE;
    } else {
	element.innerHTML = 'None';
    }
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
	CURRENT_DAY = null;
	CURRENT_TYPE = null;
	programList.filter();
	programList.sort('navn', { order: "asc" });
	$('#filter')[0].innerHTML = 'None';
    });

    $('.filter-kortspill').on('click', function() {
	CURRENT_TYPE = 'Kortspill';
	programList.filter(function(item) {
	    var values = item.values();
	    var type = values.type;
	    return type === "Kortspill" && currentDay(values);
	});
	updateFilterText();
    });

    $('.filter-brettspill').on('click', function() {
	CURRENT_TYPE = 'Brettspill';
	programList.filter(function(item) {
	    var values = item.values();
	    var type = item.values().type;
	    return type === "Brettspill" && currentDay(values);
	});
	updateFilterText();
    });

    $('.filter-figurspill').on('click', function() {
	CURRENT_TYPE = 'Figurspill';
	programList.filter(function(item) {
	    var values = item.values();
	    var type = item.values().type;
	    return type === "Figurspill" && currentDay(values);
	});
	updateFilterText();
    });

    $('.filter-annet').on('click', function() {
	CURRENT_TYPE = 'Annet';
	programList.filter(function(item) {
	    var values = item.values();
	    var type = item.values().type;
	    return type === "Annet" && currentDay(values);
	});
	updateFilterText();
    });

    $('.filter-rollespill').on('click', function() {
	CURRENT_TYPE = 'Rollespill';
	programList.filter(function(item) {
	    var values = item.values();
	    var type = item.values().type;
	    return type === "Rollespill" && currentDay(values);
	});
	updateFilterText();
    });

    $('.filter-turnering').on('click', function() {
	CURRENT_TYPE = 'Turnering';
	programList.filter(function(item) {
	    var values = item.values();
	    var type = item.values().type;
	    return type === "Turnering" && currentDay(values);
	});
	updateFilterText();
    });

    $('.filter-friday').on('click', function() {
	CURRENT_DAY = 'Friday';
	programList.filter(function(item) {
	    var values = item.values();
	    return isFriday(values) && currentType(values);
	});
	updateFilterText();
    });

    $('.filter-saturday').on('click', function() {
	CURRENT_DAY = 'Saturday';
	programList.filter(function(item) {
	    var values = item.values();
	    return isSaturday(values) && currentType(values);
	});
	updateFilterText();
    });

    $('.filter-sunday').on('click', function() {
	CURRENT_DAY = 'Sunday';
	programList.filter(function(item) {
	    var values = item.values();
	    return isSunday(values) && currentType(values);
	});
	updateFilterText();
    });

    $('.filter-monday').on('click', function() {
	CURRENT_DAY = 'Monday';
	programList.filter(function(item) {
	    var values = item.values();
	    return isMonday(values) && currentType(values);
	});
	updateFilterText();
    });

    // JQuery features
    $(".toggleDescription").click(function() {
	$(this).next().first().slideToggle();
    });
});
