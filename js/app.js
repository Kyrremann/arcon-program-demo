var data = [
	{
	    "navn": "Bohnanza",
	    "beskrivelse": "Bohnanza er eit kortspel der ein skal dyrka og selja bønner av ulike slag og verdi. Målet er å vera den rikaste bønnebonden på slutten av spelet.",
	    "pulje_start": 5,
	    "pulje_slutt": 5,
	    "kategori": "kortspill"
	},
	{
	    "navn": "Magic - Commander 4personer",
	    "beskrivelse": "Vi kjører fortløpende 4personers commander gjennom hele Arcon med premiering basert på et poengsystem. 50 kr deltakeravgift.",
	    "pulje_start": 1,
	    "pulje_slutt": 2,
	    "kategori": "kortspill"
	},
	{
	    "navn": "Magic - Commander 4personer",
	    "beskrivelse": "Vi kjører fortløpende 4personers commander gjennom hele Arcon med premiering basert på et poengsystem. 50 kr deltakeravgift.",
	    "pulje_start": 4,
	    "pulje_slutt": 8,
	    "kategori": "kortspill"
	},
	{
	    "navn": "Magic - Commander 4personer",
	    "beskrivelse": "Vi kjører fortløpende 4personers commander gjennom hele Arcon med premiering basert på et poengsystem. 50 kr deltakeravgift.",
	    "pulje_start": 10,
	    "pulje_slutt": 14,
	    "kategori": "kortspill"
	},
	{
	    "navn": "Magic - Commander 4personer",
	    "beskrivelse": "Vi kjører fortløpende 4personers commander gjennom hele Arcon med premiering basert på et poengsystem. 50 kr deltakeravgift.",
	    "pulje_start": 16,
	    "pulje_slutt": 17,
	    "kategori": "kortspill"
	},
	{
	    "navn": "Blood Rage",
	    "beskrivelse": "Ragnarok er her og det er siste sjanse til å samle ære før verden går under! Det er nyttig å kunne reglene, men spillet er enkelt nok til at man ikke må kunne dem fra før. Ragnarok-turneringsreglene blir brukt, tre til fire runder a 80 minutter.",
	    "pulje_start": 8,
	    "pulje_slutt": 9,
	    "kategori": "brettspill"
	},
	{
	    "navn": "Arcadia Quest",
	    "beskrivelse": "Et Adventure spill hvor du styrer ditt eget Guild med tre helter og konkurrerer mot de andre spillerne om å fullføre tre oppdrag først. Sloss mot monstre, samle skatter, finn våpen og gjør livet vanskelig for de andre Guildene.",
	    "pulje_start": 4,
	    "pulje_slutt": 5,
	    "kategori": "brettspill"
	},
	{
	    "navn": "Carcassonne-NM",
	    "beskrivelse": "Tradisjonen tro avholdes NM i Carcassonne under Arcon. Vi spiller grunnspillet uten elv. Seks innledende runder med to spillere pr bord og 15 min. tenketid hver. Sluttspill mellom de fire beste umiddelbart etterpå.",
	    "pulje_start": 4,
	    "pulje_slutt": 5,
	    "kategori": "brettspill"
	},
	{
	    "navn": "B-Sieged",
	    "beskrivelse": "B-Sieged Sons of the Abyss Brettspill er et \"castle defense\" samarbeidsspill som kombinerer spennende kamper med klassisk ressurshåndtering. I kampene skal 1-6 spillere kontrollere de mektige Heroes of Modhelm, som må stå imot beleiringen fra de invaderende fiendene og holde ut lenge nok til at budbringeren returnerer med en mektig magisk gjenstand som vil bekjempe fiendenes styrker.",
	    "pulje_start": 9,
	    "pulje_slutt": 9,
	    "kategori": "brettspill"
	}
    ]

var options = {
    valueNames: [ 'navn', 'pulje_start' ],
    item: '<li><h3 class="navn"></h3><p class="pulje_start"></p></li>'
};

var programList = new List('program', options, data);
programList.sort('pulje_start', { order: "asc" });

$('.filter-clear').on('click', function() {
    programList.filter();
    programList.sort('pulje_start', { order: "asc" });
});

$('.filter-kortspill').on('click', function() {
    programList.filter(function(item) {
	var kategori = item.values().kategori;
	return kategori === "kortspill";
    });
});

$('.filter-brettspill').on('click', function() {
    programList.filter(function(item) {
	var kategori = item.values().kategori;
	return kategori === "brettspill";
    });
});
