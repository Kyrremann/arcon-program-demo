// Globals
CURRENT_DAY = null;
CURRENT_TYPE = null;
// Globals end

function sortByName(a, b, options) {
    return programList.utils.naturalSort(a.navn, b.navn, options);
}

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

function sortFriday(av, bv, options) {
    if (isFriday(av) || isFriday(bv)) {
	if (notNull(av.Pulje1) && notNull(bv.Pulje1)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje1)) {
	    return -1;
	} else if (notNull(bv.Pulje1)) {
	    return 1;
	} else if (notNull(av.Pulje2) && notNull(bv.Pulje2)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje2)) {
	    return -1;
	} else if (notNull(bv.Pulje2)) {
	    return 1;
	}
	return sortByName(av, bv, options);
    }
}

function sortSaturday(av, bv, options) {
    if (isSaturday(av) || isSaturday(bv)) {
	if (notNull(av.Pulje4) && notNull(bv.Pulje4)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje4)) {
	    return -1;
	} else if (notNull(bv.Pulje4)) {
	    return 1;
	} else if (notNull(av.Pulje5) && notNull(bv.Pulje5)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje5)) {
	    return -1;
	} else if (notNull(bv.Pulje5)) {
	    return 1;
	} else if (notNull(av.Pulje6) && notNull(bv.Pulje6)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje6)) {
	    return -1;
	} else if (notNull(bv.Pulje6)) {
	    return 1;
	} else if (notNull(av.Pulje7) && notNull(bv.Pulje7)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje7)) {
	    return -1;
	} else if (notNull(bv.Pulje7)) {
	    return 1;
	} else if (notNull(av.Pulje8) && notNull(bv.Pulje8)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje8)) {
	    return -1;
	} else if (notNull(bv.Pulje8)) {
	    return 1;
	} else if (notNull(av.Pulje9) && notNull(bv.Pulje9)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje9)) {
	    return -1;
	} else if (notNull(bv.Pulje9)) {
	    return 1;
	}
	return sortByName(av, bv, options);
    }
}

function sortSunday(av, bv, options) {
    if (isSunday(av) || isSunday(bv)) {
	if (notNull(av.Pulje10) && notNull(bv.Pulje10)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje10)) {
	    return -1;
	} else if (notNull(bv.Pulje10)) {
	    return 1;
	} else if (notNull(av.Pulje11) && notNull(bv.Pulje11)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje11)) {
	    return -1;
	} else if (notNull(bv.Pulje11)) {
	    return 1;
	} else if (notNull(av.Pulje12) && notNull(bv.Pulje12)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje12)) {
	    return -1;
	} else if (notNull(bv.Pulje12)) {
	    return 1;
	} else if (notNull(av.Pulje13) && notNull(bv.Pulje13)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje13)) {
	    return -1;
	} else if (notNull(bv.Pulje13)) {
	    return 1;
	} else if (notNull(av.Pulje14) && notNull(bv.Pulje14)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje14)) {
	    return -1;
	} else if (notNull(bv.Pulje14)) {
	    return 1;
	} else if (notNull(av.Pulje15) && notNull(bv.Pulje15)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje15)) {
	    return -1;
	} else if (notNull(bv.Pulje15)) {
	    return 1;
	}
	return sortByName(av, bv, options);
    }
}

function sortMonday(av, bv, options) {
    if (isMonday(av) || isMonday(bv)) {
	if (notNull(av.Pulje16) && notNull(bv.Pulje16)) {
	    return sortByName(av, bv, options);
	} else if (notNull(av.Pulje16)) {
	    return -1;
	} else if (notNull(bv.Pulje16)) {
	    return 1;
	}
	return sortByName(av, bv, options);
    }
    return 0;
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
	programList.sort('navn', { sortFunction: function(a, b, options) {
	    options.desc = false;
	    return sortFriday(a.values(), b.values(), options)
	}});
	updateFilterText();
    });

    $('.filter-saturday').on('click', function() {
	CURRENT_DAY = 'Saturday';
	programList.filter(function(item) {
	    var values = item.values();
	    return isSaturday(values) && currentType(values);
	});
	programList.sort('navn', { sortFunction: function(a, b, options) {
	    options.desc = false;
	    return sortSaturday(a.values(), b.values(), options);
	}});
	updateFilterText();
    });

    $('.filter-sunday').on('click', function() {
	CURRENT_DAY = 'Sunday';
	programList.filter(function(item) {
	    var values = item.values();
	    return isSunday(values) && currentType(values);
	});
	programList.sort('navn', { sortFunction: function(a, b, options) {
	    options.desc = false;
	    return sortSunday(a.values(), b.values(), options);
	}});
	updateFilterText();
    });

    $('.filter-monday').on('click', function() {
	CURRENT_DAY = 'Monday';
	programList.filter(function(item) {
	    var values = item.values();
	    return isMonday(values) && currentType(values);
	});
	programList.sort('navn', { sortFunction: function(a, b, options) {
	    options.desc = false;
	    return sortMonday(a.values(), b.values(), options);
	}});
	updateFilterText();
    });

    // JQuery features
    $(".toggleDescription").click(function() {
	$(this).next().first().slideToggle();
    });
});
