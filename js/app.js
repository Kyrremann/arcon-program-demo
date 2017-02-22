// Globals
var CURRENT_DAY = null;
var CURRENT_TYPE = null;
var programList = null;
var puljetider = null;
var program = null;
// Globals end

$.getJSON('http://www.spillfestival.no/api/v1/puljetider', function( data ) {
    puljetider = data['Puljetider'];
});

$.getJSON('http://www.spillfestival.no/api/v1/program', function( data ) {
    program = data['Turneringer'];
    programList = new List('program', options, program);
    programList.sort('navn', { order: "asc" });
});

RULES_INFO = {
    "Ny turnering": {
	"html": "<img src=\"images/new.gif\" alt=\"Ny turnering\">",
	"text": "Ny turneringen som ikke kom med i brosjyren"
    },
    "Ingen regelkunnskaper kreves": {
	"html": "<img src=\"images/happy.gif\" alt=\"Ingen regelkunnskaper kreves\">",
	"text": "Ingen regelkunnskaper kreves"
    },
    "Regelkunnskaper anbefales": {
	"html": "<img src=\"images/worried.gif\" alt=\"Regelkunnskaper anbefales\">",
	"text": "Regelkunnskaper anbefales"
    },
    "Regelkunnskaper nødvendig": {
	"html": "<img src=\"images/mad.gif\" alt=\"Regelkunnskaper nødvendig\">",
	"text": "Regelkunnskaper nødvendig"
    },
    "Påmelding kreves": {
	"html": "<img src=\"images/envelope.gif\" alt=\"Påmelding kreves\">",
	"text": "Forhåndspåmelding kreves for å delta."
    },
    "Regelinnføring vil bli gitt": {
	"html": "<img src=\"images/nice.gif\" alt=\"Regelinnføring vil bli gitt\">",
	"text": "Regelinnføring vil bli gitt før start spesielt med tanke på nye spillere"
    },
    "Ta med egne spill": {
	"html": "<img src=\"images/hand.gif\" alt=\"Ta med egne spill\">",
	"text": "Ta med egne spill. Spillerene må selv skaffe til veie spillkort, miniatyrer for å delta"
    },
    "Lagturnering": {
	"html": "<img src=\"images/lag.gif\" alt=\"Lagturnering\">",
	"text": "Lagturnering hvor to eller flere spillere deltar på lag sammen mot andre"
    },
    "Modul innlevert": {
	"html": "<img src=\"images/modulok.gif\" alt=\"Modul innlevert\">",
	"text": "Angir at rollespillmodulen (eventyret) for turneringen er innlevert"
    }
}

function getData(type) {
    if (type == 'puljer') {
	return puljetider;
    } else if (type == 'Turneringer') {
	return program;
    }
}

function generateRulesImages(id, index) {
    var event = programList.get('id', id)[0].values();
    var html = '<br />';
    if (event['tamed'] == 'J') {
	html += RULES_INFO['Ta med egne spill']['html'] + ' ';
    }
    if (event['lag'] == 'J') {
	html += RULES_INFO['Lagturnering']['html'] + ' ';
    }
    if (event['modul'] == 'J') {
	html += RULES_INFO['Modul innlevert']['html'] + ' ';
    }
    if (event['pamelding'] == 'J') {
	html += RULES_INFO['Påmelding kreves']['html'] + ' ';
    }
    if (event['innforing'] == 'J') {
	html += RULES_INFO['Regelinnføring vil bli gitt']['html'] + ' ';
    }
    html += RULES_INFO[event['regler']]['html'];
    return html;
}

function sortByName(a, b, options) {
    return programList.utils.naturalSort(a.navn, b.navn, options);
}

function getStartPuljeFor(id, index) {
    var event = programList.get('id', id)[0].values();
    for (var i = 0; i < 18; i++) {
	if (notNull(event['Pulje' + i])) {
	    return i + ' (' + getData("puljer")[i] + ')';
	}
    }

    return 'Unknown';
}

function theWholeFestival(event) {
    for (var i = 1; i < 18; i++) {
	if (event['Pulje' + i] == null) {
	    return false;
	}
    }

    return true;
}

function nearlyTheWholeFestival(event) {
    for (var i = 1; i < 18; i++) {
	if (i == 3 || i == 9 || i == 15) {
	    continue;
	} else if (event['Pulje' + i] == null) {
	    return false;
	}
    }

    return true;
}

function getPuljerFor(id, index) {
    var event = programList.get('id', id)[0].values();
    if (theWholeFestival(event)) {
	return 'Hele tiden';
    } else if (nearlyTheWholeFestival(event)) {
	return 'Nesten hele tiden';
    } else if (event['cancelled'] == 'J') {
	return 'Avlyst';
    }

    var puljer = "";
    for (var i = 0; i < 18; i++) {
	if (notNull(event['Pulje' + i])) {
	    puljer += 'Pulje ' + i + ' (' + getData("puljer")[i] + ')<br />';
	}
    }

    return puljer;
}

function getUmodifisertPuljerFor(id, index) {
    var event = programList.get('id', id)[0].values();
    if (event['cancelled'] == 'J') {
	return 'Avlyst';
    }

    var puljer = "";
    for (var i = 0; i < 18; i++) {
	if (notNull(event['Pulje' + i])) {
	    puljer += 'Pulje ' + i + ' (' + getData("puljer")[i] + ')<br />';
	}
    }

    return puljer;
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
    var day = $('#filter_text_day')[0];
    var type = $('#filter_text_type')[0];

    if (CURRENT_DAY != null) {
	day.innerHTML = CURRENT_DAY;
	day.classList.remove('hidden');
    } else {
	day.classList.add('hidden');
    }

    if (CURRENT_TYPE != null) {
	type.innerHTML = CURRENT_TYPE;
	type.classList.remove('hidden');
    } else {
	type.classList.add('hidden');
    }

    if (CURRENT_DAY == null && CURRENT_TYPE == null) {
	day.innerHTML = 'None';
	day.classList.remove('hidden');
	type.classList.add('hidden');
    }
}

function updateFilterSize() {
    var element = $('#filter_size')[0];
    element.innerHTML = programList.matchingItems.length + '/' + programList.size();
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

function sortCurrentDay() {
    programList.sort('navn', { sortFunction: function(a, b, options) {
	options.desc = false;
	if (CURRENT_DAY === 'Friday') {
	    return sortFriday(a.values(), b.values(), options);
	} else if (CURRENT_DAY === 'Saturday') {
	    return sortSaturday(a.values(), b.values(), options);
	} else if (CURRENT_DAY === 'Sunday') {
	    return sortSunday(a.values(), b.values(), options);
	} else if (CURRENT_DAY === 'Monday') {
	    return sortMonday(a.values(), b.values(), options);
	} else {
	    return sortByName(a.values(), b.values(), options);
	}
    }});
}

function filterCurrentType(current_type) {
    programList.filter(function(item) {
	var values = item.values();
	var type = item.values().type;
	return type === current_type && currentDay(values);
    });
}

function filterCurrentDay(current_day) {
    programList.filter(function(item) {
	var values = item.values();
	if (CURRENT_DAY === 'Friday') {
	    return isFriday(values) && currentType(values);
	} else if (CURRENT_DAY === 'Saturday') {
	    return isSaturday(values) && currentType(values);
	} else if (CURRENT_DAY === 'Sunday') {
	    return isSunday(values) && currentType(values);
	} else if (CURRENT_DAY === 'Monday') {
	    return isMonday(values) && currentType(values);
	} else {
	    return true;
	}
    });
}

function defaultTypeFilterBehaviour(type) {
    CURRENT_TYPE = type;
    filterCurrentType(CURRENT_TYPE);
    sortCurrentDay();
    updateFilterText();
    updateFilterSize();
}

function defaultDayFilterBehaviour(day) {
    CURRENT_DAY = day;
    filterCurrentDay(CURRENT_DAY);
    sortCurrentDay();
    updateFilterText();
    updateFilterSize();
}

// List.js features
var options = {
    valueNames: [ 'id', 'navn', 'regler', 'type', 'arrangor', 'deltagere', 'vinner', 'beskrivelse' ],
    item: '<li class="pulje">\
<span class="label label-info pull-right">\
  <span class="id hidden"></span>\
  <span class="span_puljer"></span>\
</span>\
<strong class="navn"></strong>\
<br />\
<strong>Regler:</strong> <span id="span_rules" class="regler"></span>\
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
  <strong>Puljer:</strong>\
  <div class="div_puljer"></div>\
</div>\
</li>'
};

$(document).ready(function(e) {
    $('.filter-clear').on('click', function() {
	CURRENT_DAY = null;
	CURRENT_TYPE = null;
	programList.filter();
	programList.sort('navn', { order: "asc" });
	updateFilterText();
	updateFilterSize();
    });

    // Event type filters
    $('.filter-kortspill').on('click', function() {
	defaultTypeFilterBehaviour('Kortspill');
    });

    $('.filter-brettspill').on('click', function() {
	defaultTypeFilterBehaviour('Brettspill');
    });

    $('.filter-figurspill').on('click', function() {
	defaultTypeFilterBehaviour('Figurspill');
    });

    $('.filter-annet').on('click', function() {
	defaultTypeFilterBehaviour('Annet');
    });

    $('.filter-rollespill').on('click', function() {
	defaultTypeFilterBehaviour('Rollespill');
    });

    $('.filter-turnering').on('click', function() {
	defaultTypeFilterBehaviour('Turnering');
    });

    // Day filters
    $('.filter-friday').on('click', function() {
	defaultDayFilterBehaviour('Friday');
    });

    $('.filter-saturday').on('click', function() {
	defaultDayFilterBehaviour('Saturday');
    });

    $('.filter-sunday').on('click', function() {
	defaultDayFilterBehaviour('Sunday');
    });

    $('.filter-monday').on('click', function() {
	defaultDayFilterBehaviour('Monday');
    });

    // JQuery features
    $(".toggleDescription").click(function() {
	$(this).next().first().slideToggle();
	if (this.innerHTML == 'Kollaps') {
	    this.innerHTML = 'Mer info';
	} else {
	    this.innerHTML = 'Kollaps';
	}
    });

    // Insert puljer
    $('.id').each(function( index ) {
	$(this).nextAll(".span_puljer").html(getPuljerFor($(this).text(), index));
	$(this).parent().parent().find(".div_puljer").html(getUmodifisertPuljerFor($(this).text(), index));
	$(this).parent().parent().find("#span_rules").after(generateRulesImages($(this).text(), index));
    });

    // Info about filters
    updateFilterText();
    updateFilterSize();
});
