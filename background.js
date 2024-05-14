const browserApi = typeof browser !== "undefined" ? browser : chrome;
importScripts('libs/crypto-js.min.js');
const Species = {
    BULBASAUR: 1,
    IVYSAUR: 2,
    VENUSAUR: 3,
    CHARMANDER: 4,
    CHARMELEON: 5,
    CHARIZARD: 6,
    SQUIRTLE: 7,
    WARTORTLE: 8,
    BLASTOISE: 9,
    CATERPIE: 10,
    METAPOD: 11,
    BUTTERFREE: 12,
    WEEDLE: 13,
    KAKUNA: 14,
    BEEDRILL: 15,
    PIDGEY: 16,
    PIDGEOTTO: 17,
    PIDGEOT: 18,
    RATTATA: 19,
    RATICATE: 20,
    SPEAROW: 21,
    FEAROW: 22,
    EKANS: 23,
    ARBOK: 24,
    PIKACHU: 25,
    RAICHU: 26,
    SANDSHREW: 27,
    SANDSLASH: 28,
    NIDORAN_F: 29,
    NIDORINA: 30,
    NIDOQUEEN: 31,
    NIDORAN_M: 32,
    NIDORINO: 33,
    NIDOKING: 34,
    CLEFAIRY: 35,
    CLEFABLE: 36,
    VULPIX: 37,
    NINETALES: 38,
    JIGGLYPUFF: 39,
    WIGGLYTUFF: 40,
    ZUBAT: 41,
    GOLBAT: 42,
    ODDISH: 43,
    GLOOM: 44,
    VILEPLUME: 45,
    PARAS: 46,
    PARASECT: 47,
    VENONAT: 48,
    VENOMOTH: 49,
    DIGLETT: 50,
    DUGTRIO: 51,
    MEOWTH: 52,
    PERSIAN: 53,
    PSYDUCK: 54,
    GOLDUCK: 55,
    MANKEY: 56,
    PRIMEAPE: 57,
    GROWLITHE: 58,
    ARCANINE: 59,
    POLIWAG: 60,
    POLIWHIRL: 61,
    POLIWRATH: 62,
    ABRA: 63,
    KADABRA: 64,
    ALAKAZAM: 65,
    MACHOP: 66,
    MACHOKE: 67,
    MACHAMP: 68,
    BELLSPROUT: 69,
    WEEPINBELL: 70,
    VICTREEBEL: 71,
    TENTACOOL: 72,
    TENTACRUEL: 73,
    GEODUDE: 74,
    GRAVELER: 75,
    GOLEM: 76,
    PONYTA: 77,
    RAPIDASH: 78,
    SLOWPOKE: 79,
    SLOWBRO: 80,
    MAGNEMITE: 81,
    MAGNETON: 82,
    FARFETCHD: 83,
    DODUO: 84,
    DODRIO: 85,
    SEEL: 86,
    DEWGONG: 87,
    GRIMER: 88,
    MUK: 89,
    SHELLDER: 90,
    CLOYSTER: 91,
    GASTLY: 92,
    HAUNTER: 93,
    GENGAR: 94,
    ONIX: 95,
    DROWZEE: 96,
    HYPNO: 97,
    KRABBY: 98,
    KINGLER: 99,
    VOLTORB: 100,
    ELECTRODE: 101,
    EXEGGCUTE: 102,
    EXEGGUTOR: 103,
    CUBONE: 104,
    MAROWAK: 105,
    HITMONLEE: 106,
    HITMONCHAN: 107,
    LICKITUNG: 108,
    KOFFING: 109,
    WEEZING: 110,
    RHYHORN: 111,
    RHYDON: 112,
    CHANSEY: 113,
    TANGELA: 114,
    KANGASKHAN: 115,
    HORSEA: 116,
    SEADRA: 117,
    GOLDEEN: 118,
    SEAKING: 119,
    STARYU: 120,
    STARMIE: 121,
    MR_MIME: 122,
    SCYTHER: 123,
    JYNX: 124,
    ELECTABUZZ: 125,
    MAGMAR: 126,
    PINSIR: 127,
    TAUROS: 128,
    MAGIKARP: 129,
    GYARADOS: 130,
    LAPRAS: 131,
    DITTO: 132,
    EEVEE: 133,
    VAPOREON: 134,
    JOLTEON: 135,
    FLAREON: 136,
    PORYGON: 137,
    OMANYTE: 138,
    OMASTAR: 139,
    KABUTO: 140,
    KABUTOPS: 141,
    AERODACTYL: 142,
    SNORLAX: 143,
    ARTICUNO: 144,
    ZAPDOS: 145,
    MOLTRES: 146,
    DRATINI: 147,
    DRAGONAIR: 148,
    DRAGONITE: 149,
    MEWTWO: 150,
    MEW: 151,
    CHIKORITA: 152,
    BAYLEEF: 153,
    MEGANIUM: 154,
    CYNDAQUIL: 155,
    QUILAVA: 156,
    TYPHLOSION: 157,
    TOTODILE: 158,
    CROCONAW: 159,
    FERALIGATR: 160,
    SENTRET: 161,
    FURRET: 162,
    HOOTHOOT: 163,
    NOCTOWL: 164,
    LEDYBA: 165,
    LEDIAN: 166,
    SPINARAK: 167,
    ARIADOS: 168,
    CROBAT: 169,
    CHINCHOU: 170,
    LANTURN: 171,
    PICHU: 172,
    CLEFFA: 173,
    IGGLYBUFF: 174,
    TOGEPI: 175,
    TOGETIC: 176,
    NATU: 177,
    XATU: 178,
    MAREEP: 179,
    FLAAFFY: 180,
    AMPHAROS: 181,
    BELLOSSOM: 182,
    MARILL: 183,
    AZUMARILL: 184,
    SUDOWOODO: 185,
    POLITOED: 186,
    HOPPIP: 187,
    SKIPLOOM: 188,
    JUMPLUFF: 189,
    AIPOM: 190,
    SUNKERN: 191,
    SUNFLORA: 192,
    YANMA: 193,
    WOOPER: 194,
    QUAGSIRE: 195,
    ESPEON: 196,
    UMBREON: 197,
    MURKROW: 198,
    SLOWKING: 199,
    MISDREAVUS: 200,
    UNOWN: 201,
    WOBBUFFET: 202,
    GIRAFARIG: 203,
    PINECO: 204,
    FORRETRESS: 205,
    DUNSPARCE: 206,
    GLIGAR: 207,
    STEELIX: 208,
    SNUBBULL: 209,
    GRANBULL: 210,
    QWILFISH: 211,
    SCIZOR: 212,
    SHUCKLE: 213,
    HERACROSS: 214,
    SNEASEL: 215,
    TEDDIURSA: 216,
    URSARING: 217,
    SLUGMA: 218,
    MAGCARGO: 219,
    SWINUB: 220,
    PILOSWINE: 221,
    CORSOLA: 222,
    REMORAID: 223,
    OCTILLERY: 224,
    DELIBIRD: 225,
    MANTINE: 226,
    SKARMORY: 227,
    HOUNDOUR: 228,
    HOUNDOOM: 229,
    KINGDRA: 230,
    PHANPY: 231,
    DONPHAN: 232,
    PORYGON2: 233,
    STANTLER: 234,
    SMEARGLE: 235,
    TYROGUE: 236,
    HITMONTOP: 237,
    SMOOCHUM: 238,
    ELEKID: 239,
    MAGBY: 240,
    MILTANK: 241,
    BLISSEY: 242,
    RAIKOU: 243,
    ENTEI: 244,
    SUICUNE: 245,
    LARVITAR: 246,
    PUPITAR: 247,
    TYRANITAR: 248,
    LUGIA: 249,
    HO_OH: 250,
    CELEBI: 251,
    TREECKO: 252,
    GROVYLE: 253,
    SCEPTILE: 254,
    TORCHIC: 255,
    COMBUSKEN: 256,
    BLAZIKEN: 257,
    MUDKIP: 258,
    MARSHTOMP: 259,
    SWAMPERT: 260,
    POOCHYENA: 261,
    MIGHTYENA: 262,
    ZIGZAGOON: 263,
    LINOONE: 264,
    WURMPLE: 265,
    SILCOON: 266,
    BEAUTIFLY: 267,
    CASCOON: 268,
    DUSTOX: 269,
    LOTAD: 270,
    LOMBRE: 271,
    LUDICOLO: 272,
    SEEDOT: 273,
    NUZLEAF: 274,
    SHIFTRY: 275,
    TAILLOW: 276,
    SWELLOW: 277,
    WINGULL: 278,
    PELIPPER: 279,
    RALTS: 280,
    KIRLIA: 281,
    GARDEVOIR: 282,
    SURSKIT: 283,
    MASQUERAIN: 284,
    SHROOMISH: 285,
    BRELOOM: 286,
    SLAKOTH: 287,
    VIGOROTH: 288,
    SLAKING: 289,
    NINCADA: 290,
    NINJASK: 291,
    SHEDINJA: 292,
    WHISMUR: 293,
    LOUDRED: 294,
    EXPLOUD: 295,
    MAKUHITA: 296,
    HARIYAMA: 297,
    AZURILL: 298,
    NOSEPASS: 299,
    SKITTY: 300,
    DELCATTY: 301,
    SABLEYE: 302,
    MAWILE: 303,
    ARON: 304,
    LAIRON: 305,
    AGGRON: 306,
    MEDITITE: 307,
    MEDICHAM: 308,
    ELECTRIKE: 309,
    MANECTRIC: 310,
    PLUSLE: 311,
    MINUN: 312,
    VOLBEAT: 313,
    ILLUMISE: 314,
    ROSELIA: 315,
    GULPIN: 316,
    SWALOT: 317,
    CARVANHA: 318,
    SHARPEDO: 319,
    WAILMER: 320,
    WAILORD: 321,
    NUMEL: 322,
    CAMERUPT: 323,
    TORKOAL: 324,
    SPOINK: 325,
    GRUMPIG: 326,
    SPINDA: 327,
    TRAPINCH: 328,
    VIBRAVA: 329,
    FLYGON: 330,
    CACNEA: 331,
    CACTURNE: 332,
    SWABLU: 333,
    ALTARIA: 334,
    ZANGOOSE: 335,
    SEVIPER: 336,
    LUNATONE: 337,
    SOLROCK: 338,
    BARBOACH: 339,
    WHISCASH: 340,
    CORPHISH: 341,
    CRAWDAUNT: 342,
    BALTOY: 343,
    CLAYDOL: 344,
    LILEEP: 345,
    CRADILY: 346,
    ANORITH: 347,
    ARMALDO: 348,
    FEEBAS: 349,
    MILOTIC: 350,
    CASTFORM: 351,
    KECLEON: 352,
    SHUPPET: 353,
    BANETTE: 354,
    DUSKULL: 355,
    DUSCLOPS: 356,
    TROPIUS: 357,
    CHIMECHO: 358,
    ABSOL: 359,
    WYNAUT: 360,
    SNORUNT: 361,
    GLALIE: 362,
    SPHEAL: 363,
    SEALEO: 364,
    WALREIN: 365,
    CLAMPERL: 366,
    HUNTAIL: 367,
    GOREBYSS: 368,
    RELICANTH: 369,
    LUVDISC: 370,
    BAGON: 371,
    SHELGON: 372,
    SALAMENCE: 373,
    BELDUM: 374,
    METANG: 375,
    METAGROSS: 376,
    REGIROCK: 377,
    REGICE: 378,
    REGISTEEL: 379,
    LATIAS: 380,
    LATIOS: 381,
    KYOGRE: 382,
    GROUDON: 383,
    RAYQUAZA: 384,
    JIRACHI: 385,
    DEOXYS: 386,
    TURTWIG: 387,
    GROTLE: 388,
    TORTERRA: 389,
    CHIMCHAR: 390,
    MONFERNO: 391,
    INFERNAPE: 392,
    PIPLUP: 393,
    PRINPLUP: 394,
    EMPOLEON: 395,
    STARLY: 396,
    STARAVIA: 397,
    STARAPTOR: 398,
    BIDOOF: 399,
    BIBAREL: 400,
    KRICKETOT: 401,
    KRICKETUNE: 402,
    SHINX: 403,
    LUXIO: 404,
    LUXRAY: 405,
    BUDEW: 406,
    ROSERADE: 407,
    CRANIDOS: 408,
    RAMPARDOS: 409,
    SHIELDON: 410,
    BASTIODON: 411,
    BURMY: 412,
    WORMADAM: 413,
    MOTHIM: 414,
    COMBEE: 415,
    VESPIQUEN: 416,
    PACHIRISU: 417,
    BUIZEL: 418,
    FLOATZEL: 419,
    CHERUBI: 420,
    CHERRIM: 421,
    SHELLOS: 422,
    GASTRODON: 423,
    AMBIPOM: 424,
    DRIFLOON: 425,
    DRIFBLIM: 426,
    BUNEARY: 427,
    LOPUNNY: 428,
    MISMAGIUS: 429,
    HONCHKROW: 430,
    GLAMEOW: 431,
    PURUGLY: 432,
    CHINGLING: 433,
    STUNKY: 434,
    SKUNTANK: 435,
    BRONZOR: 436,
    BRONZONG: 437,
    BONSLY: 438,
    MIME_JR: 439,
    HAPPINY: 440,
    CHATOT: 441,
    SPIRITOMB: 442,
    GIBLE: 443,
    GABITE: 444,
    GARCHOMP: 445,
    MUNCHLAX: 446,
    RIOLU: 447,
    LUCARIO: 448,
    HIPPOPOTAS: 449,
    HIPPOWDON: 450,
    SKORUPI: 451,
    DRAPION: 452,
    CROAGUNK: 453,
    TOXICROAK: 454,
    CARNIVINE: 455,
    FINNEON: 456,
    LUMINEON: 457,
    MANTYKE: 458,
    SNOVER: 459,
    ABOMASNOW: 460,
    WEAVILE: 461,
    MAGNEZONE: 462,
    LICKILICKY: 463,
    RHYPERIOR: 464,
    TANGROWTH: 465,
    ELECTIVIRE: 466,
    MAGMORTAR: 467,
    TOGEKISS: 468,
    YANMEGA: 469,
    LEAFEON: 470,
    GLACEON: 471,
    GLISCOR: 472,
    MAMOSWINE: 473,
    PORYGON_Z: 474,
    GALLADE: 475,
    PROBOPASS: 476,
    DUSKNOIR: 477,
    FROSLASS: 478,
    ROTOM: 479,
    UXIE: 480,
    MESPRIT: 481,
    AZELF: 482,
    DIALGA: 483,
    PALKIA: 484,
    HEATRAN: 485,
    REGIGIGAS: 486,
    GIRATINA: 487,
    CRESSELIA: 488,
    PHIONE: 489,
    MANAPHY: 490,
    DARKRAI: 491,
    SHAYMIN: 492,
    ARCEUS: 493,
    VICTINI: 494,
    SNIVY: 495,
    SERVINE: 496,
    SERPERIOR: 497,
    TEPIG: 498,
    PIGNITE: 499,
    EMBOAR: 500,
    OSHAWOTT: 501,
    DEWOTT: 502,
    SAMUROTT: 503,
    PATRAT: 504,
    WATCHOG: 505,
    LILLIPUP: 506,
    HERDIER: 507,
    STOUTLAND: 508,
    PURRLOIN: 509,
    LIEPARD: 510,
    PANSAGE: 511,
    SIMISAGE: 512,
    PANSEAR: 513,
    SIMISEAR: 514,
    PANPOUR: 515,
    SIMIPOUR: 516,
    MUNNA: 517,
    MUSHARNA: 518,
    PIDOVE: 519,
    TRANQUILL: 520,
    UNFEZANT: 521,
    BLITZLE: 522,
    ZEBSTRIKA: 523,
    ROGGENROLA: 524,
    BOLDORE: 525,
    GIGALITH: 526,
    WOOBAT: 527,
    SWOOBAT: 528,
    DRILBUR: 529,
    EXCADRILL: 530,
    AUDINO: 531,
    TIMBURR: 532,
    GURDURR: 533,
    CONKELDURR: 534,
    TYMPOLE: 535,
    PALPITOAD: 536,
    SEISMITOAD: 537,
    THROH: 538,
    SAWK: 539,
    SEWADDLE: 540,
    SWADLOON: 541,
    LEAVANNY: 542,
    VENIPEDE: 543,
    WHIRLIPEDE: 544,
    SCOLIPEDE: 545,
    COTTONEE: 546,
    WHIMSICOTT: 547,
    PETILIL: 548,
    LILLIGANT: 549,
    BASCULIN: 550,
    SANDILE: 551,
    KROKOROK: 552,
    KROOKODILE: 553,
    DARUMAKA: 554,
    DARMANITAN: 555,
    MARACTUS: 556,
    DWEBBLE: 557,
    CRUSTLE: 558,
    SCRAGGY: 559,
    SCRAFTY: 560,
    SIGILYPH: 561,
    YAMASK: 562,
    COFAGRIGUS: 563,
    TIRTOUGA: 564,
    CARRACOSTA: 565,
    ARCHEN: 566,
    ARCHEOPS: 567,
    TRUBBISH: 568,
    GARBODOR: 569,
    ZORUA: 570,
    ZOROARK: 571,
    MINCCINO: 572,
    CINCCINO: 573,
    GOTHITA: 574,
    GOTHORITA: 575,
    GOTHITELLE: 576,
    SOLOSIS: 577,
    DUOSION: 578,
    REUNICLUS: 579,
    DUCKLETT: 580,
    SWANNA: 581,
    VANILLITE: 582,
    VANILLISH: 583,
    VANILLUXE: 584,
    DEERLING: 585,
    SAWSBUCK: 586,
    EMOLGA: 587,
    KARRABLAST: 588,
    ESCAVALIER: 589,
    FOONGUS: 590,
    AMOONGUSS: 591,
    FRILLISH: 592,
    JELLICENT: 593,
    ALOMOMOLA: 594,
    JOLTIK: 595,
    GALVANTULA: 596,
    FERROSEED: 597,
    FERROTHORN: 598,
    KLINK: 599,
    KLANG: 600,
    KLINKLANG: 601,
    TYNAMO: 602,
    EELEKTRIK: 603,
    EELEKTROSS: 604,
    ELGYEM: 605,
    BEHEEYEM: 606,
    LITWICK: 607,
    LAMPENT: 608,
    CHANDELURE: 609,
    AXEW: 610,
    FRAXURE: 611,
    HAXORUS: 612,
    CUBCHOO: 613,
    BEARTIC: 614,
    CRYOGONAL: 615,
    SHELMET: 616,
    ACCELGOR: 617,
    STUNFISK: 618,
    MIENFOO: 619,
    MIENSHAO: 620,
    DRUDDIGON: 621,
    GOLETT: 622,
    GOLURK: 623,
    PAWNIARD: 624,
    BISHARP: 625,
    BOUFFALANT: 626,
    RUFFLET: 627,
    BRAVIARY: 628,
    VULLABY: 629,
    MANDIBUZZ: 630,
    HEATMOR: 631,
    DURANT: 632,
    DEINO: 633,
    ZWEILOUS: 634,
    HYDREIGON: 635,
    LARVESTA: 636,
    VOLCARONA: 637,
    COBALION: 638,
    TERRAKION: 639,
    VIRIZION: 640,
    TORNADUS: 641,
    THUNDURUS: 642,
    RESHIRAM: 643,
    ZEKROM: 644,
    LANDORUS: 645,
    KYUREM: 646,
    KELDEO: 647,
    MELOETTA: 648,
    GENESECT: 649,
    CHESPIN: 650,
    QUILLADIN: 651,
    CHESNAUGHT: 652,
    FENNEKIN: 653,
    BRAIXEN: 654,
    DELPHOX: 655,
    FROAKIE: 656,
    FROGADIER: 657,
    GRENINJA: 658,
    BUNNELBY: 659,
    DIGGERSBY: 660,
    FLETCHLING: 661,
    FLETCHINDER: 662,
    TALONFLAME: 663,
    SCATTERBUG: 664,
    SPEWPA: 665,
    VIVILLON: 666,
    LITLEO: 667,
    PYROAR: 668,
    FLABEBE: 669,
    FLOETTE: 670,
    FLORGES: 671,
    SKIDDO: 672,
    GOGOAT: 673,
    PANCHAM: 674,
    PANGORO: 675,
    FURFROU: 676,
    ESPURR: 677,
    MEOWSTIC: 678,
    HONEDGE: 679,
    DOUBLADE: 680,
    AEGISLASH: 681,
    SPRITZEE: 682,
    AROMATISSE: 683,
    SWIRLIX: 684,
    SLURPUFF: 685,
    INKAY: 686,
    MALAMAR: 687,
    BINACLE: 688,
    BARBARACLE: 689,
    SKRELP: 690,
    DRAGALGE: 691,
    CLAUNCHER: 692,
    CLAWITZER: 693,
    HELIOPTILE: 694,
    HELIOLISK: 695,
    TYRUNT: 696,
    TYRANTRUM: 697,
    AMAURA: 698,
    AURORUS: 699,
    SYLVEON: 700,
    HAWLUCHA: 701,
    DEDENNE: 702,
    CARBINK: 703,
    GOOMY: 704,
    SLIGGOO: 705,
    GOODRA: 706,
    KLEFKI: 707,
    PHANTUMP: 708,
    TREVENANT: 709,
    PUMPKABOO: 710,
    GOURGEIST: 711,
    BERGMITE: 712,
    AVALUGG: 713,
    NOIBAT: 714,
    NOIVERN: 715,
    XERNEAS: 716,
    YVELTAL: 717,
    ZYGARDE: 718,
    DIANCIE: 719,
    HOOPA: 720,
    VOLCANION: 721,
    ROWLET: 722,
    DARTRIX: 723,
    DECIDUEYE: 724,
    LITTEN: 725,
    TORRACAT: 726,
    INCINEROAR: 727,
    POPPLIO: 728,
    BRIONNE: 729,
    PRIMARINA: 730,
    PIKIPEK: 731,
    TRUMBEAK: 732,
    TOUCANNON: 733,
    YUNGOOS: 734,
    GUMSHOOS: 735,
    GRUBBIN: 736,
    CHARJABUG: 737,
    VIKAVOLT: 738,
    CRABRAWLER: 739,
    CRABOMINABLE: 740,
    ORICORIO: 741,
    CUTIEFLY: 742,
    RIBOMBEE: 743,
    ROCKRUFF: 744,
    LYCANROC: 745,
    WISHIWASHI: 746,
    MAREANIE: 747,
    TOXAPEX: 748,
    MUDBRAY: 749,
    MUDSDALE: 750,
    DEWPIDER: 751,
    ARAQUANID: 752,
    FOMANTIS: 753,
    LURANTIS: 754,
    MORELULL: 755,
    SHIINOTIC: 756,
    SALANDIT: 757,
    SALAZZLE: 758,
    STUFFUL: 759,
    BEWEAR: 760,
    BOUNSWEET: 761,
    STEENEE: 762,
    TSAREENA: 763,
    COMFEY: 764,
    ORANGURU: 765,
    PASSIMIAN: 766,
    WIMPOD: 767,
    GOLISOPOD: 768,
    SANDYGAST: 769,
    PALOSSAND: 770,
    PYUKUMUKU: 771,
    TYPE_NULL: 772,
    SILVALLY: 773,
    MINIOR: 774,
    KOMALA: 775,
    TURTONATOR: 776,
    TOGEDEMARU: 777,
    MIMIKYU: 778,
    BRUXISH: 779,
    DRAMPA: 780,
    DHELMISE: 781,
    JANGMO_O: 782,
    HAKAMO_O: 783,
    KOMMO_O: 784,
    TAPU_KOKO: 785,
    TAPU_LELE: 786,
    TAPU_BULU: 787,
    TAPU_FINI: 788,
    COSMOG: 789,
    COSMOEM: 790,
    SOLGALEO: 791,
    LUNALA: 792,
    NIHILEGO: 793,
    BUZZWOLE: 794,
    PHEROMOSA: 795,
    XURKITREE: 796,
    CELESTEELA: 797,
    KARTANA: 798,
    GUZZLORD: 799,
    NECROZMA: 800,
    MAGEARNA: 801,
    MARSHADOW: 802,
    POIPOLE: 803,
    NAGANADEL: 804,
    STAKATAKA: 805,
    BLACEPHALON: 806,
    ZERAORA: 807,
    MELTAN: 808,
    MELMETAL: 809,
    GROOKEY: 810,
    THWACKEY: 811,
    RILLABOOM: 812,
    SCORBUNNY: 813,
    RABOOT: 814,
    CINDERACE: 815,
    SOBBLE: 816,
    DRIZZILE: 817,
    INTELEON: 818,
    SKWOVET: 819,
    GREEDENT: 820,
    ROOKIDEE: 821,
    CORVISQUIRE: 822,
    CORVIKNIGHT: 823,
    BLIPBUG: 824,
    DOTTLER: 825,
    ORBEETLE: 826,
    NICKIT: 827,
    THIEVUL: 828,
    GOSSIFLEUR: 829,
    ELDEGOSS: 830,
    WOOLOO: 831,
    DUBWOOL: 832,
    CHEWTLE: 833,
    DREDNAW: 834,
    YAMPER: 835,
    BOLTUND: 836,
    ROLYCOLY: 837,
    CARKOL: 838,
    COALOSSAL: 839,
    APPLIN: 840,
    FLAPPLE: 841,
    APPLETUN: 842,
    SILICOBRA: 843,
    SANDACONDA: 844,
    CRAMORANT: 845,
    ARROKUDA: 846,
    BARRASKEWDA: 847,
    TOXEL: 848,
    TOXTRICITY: 849,
    SIZZLIPEDE: 850,
    CENTISKORCH: 851,
    CLOBBOPUS: 852,
    GRAPPLOCT: 853,
    SINISTEA: 854,
    POLTEAGEIST: 855,
    HATENNA: 856,
    HATTREM: 857,
    HATTERENE: 858,
    IMPIDIMP: 859,
    MORGREM: 860,
    GRIMMSNARL: 861,
    OBSTAGOON: 862,
    PERRSERKER: 863,
    CURSOLA: 864,
    SIRFETCHD: 865,
    MR_RIME: 866,
    RUNERIGUS: 867,
    MILCERY: 868,
    ALCREMIE: 869,
    FALINKS: 870,
    PINCURCHIN: 871,
    SNOM: 872,
    FROSMOTH: 873,
    STONJOURNER: 874,
    EISCUE: 875,
    INDEEDEE: 876,
    MORPEKO: 877,
    CUFANT: 878,
    COPPERAJAH: 879,
    DRACOZOLT: 880,
    ARCTOZOLT: 881,
    DRACOVISH: 882,
    ARCTOVISH: 883,
    DURALUDON: 884,
    DREEPY: 885,
    DRAKLOAK: 886,
    DRAGAPULT: 887,
    ZACIAN: 888,
    ZAMAZENTA: 889,
    ETERNATUS: 890,
    KUBFU: 891,
    URSHIFU: 892,
    ZARUDE: 893,
    REGIELEKI: 894,
    REGIDRAGO: 895,
    GLASTRIER: 896,
    SPECTRIER: 897,
    CALYREX: 898,
    WYRDEER: 899,
    KLEAVOR: 900,
    URSALUNA: 901,
    BASCULEGION: 902,
    SNEASLER: 903,
    OVERQWIL: 904,
    ENAMORUS: 905,
    SPRIGATITO: 906,
    FLORAGATO: 907,
    MEOWSCARADA: 908,
    FUECOCO: 909,
    CROCALOR: 910,
    SKELEDIRGE: 911,
    QUAXLY: 912,
    QUAXWELL: 913,
    QUAQUAVAL: 914,
    LECHONK: 915,
    OINKOLOGNE: 916,
    TAROUNTULA: 917,
    SPIDOPS: 918,
    NYMBLE: 919,
    LOKIX: 920,
    PAWMI: 921,
    PAWMO: 922,
    PAWMOT: 923,
    TANDEMAUS: 924,
    MAUSHOLD: 925,
    FIDOUGH: 926,
    DACHSBUN: 927,
    SMOLIV: 928,
    DOLLIV: 929,
    ARBOLIVA: 930,
    SQUAWKABILLY: 931,
    NACLI: 932,
    NACLSTACK: 933,
    GARGANACL: 934,
    CHARCADET: 935,
    ARMAROUGE: 936,
    CERULEDGE: 937,
    TADBULB: 938,
    BELLIBOLT: 939,
    WATTREL: 940,
    KILOWATTREL: 941,
    MASCHIFF: 942,
    MABOSSTIFF: 943,
    SHROODLE: 944,
    GRAFAIAI: 945,
    BRAMBLIN: 946,
    BRAMBLEGHAST: 947,
    TOEDSCOOL: 948,
    TOEDSCRUEL: 949,
    KLAWF: 950,
    CAPSAKID: 951,
    SCOVILLAIN: 952,
    RELLOR: 953,
    RABSCA: 954,
    FLITTLE: 955,
    ESPATHRA: 956,
    TINKATINK: 957,
    TINKATUFF: 958,
    TINKATON: 959,
    WIGLETT: 960,
    WUGTRIO: 961,
    BOMBIRDIER: 962,
    FINIZEN: 963,
    PALAFIN: 964,
    VAROOM: 965,
    REVAVROOM: 966,
    CYCLIZAR: 967,
    ORTHWORM: 968,
    GLIMMET: 969,
    GLIMMORA: 970,
    GREAVARD: 971,
    HOUNDSTONE: 972,
    FLAMIGO: 973,
    CETODDLE: 974,
    CETITAN: 975,
    VELUZA: 976,
    DONDOZO: 977,
    TATSUGIRI: 978,
    ANNIHILAPE: 979,
    CLODSIRE: 980,
    FARIGIRAF: 981,
    DUDUNSPARCE: 982,
    KINGAMBIT: 983,
    GREAT_TUSK: 984,
    SCREAM_TAIL: 985,
    BRUTE_BONNET: 986,
    FLUTTER_MANE: 987,
    SLITHER_WING: 988,
    SANDY_SHOCKS: 989,
    IRON_TREADS: 990,
    IRON_BUNDLE: 991,
    IRON_HANDS: 992,
    IRON_JUGULIS: 993,
    IRON_MOTH: 994,
    IRON_THORNS: 995,
    FRIGIBAX: 996,
    ARCTIBAX: 997,
    BAXCALIBUR: 998,
    GIMMIGHOUL: 999,
    GHOLDENGO: 1000,
    WO_CHIEN: 1001,
    CHIEN_PAO: 1002,
    TING_LU: 1003,
    CHI_YU: 1004,
    ROARING_MOON: 1005,
    IRON_VALIANT: 1006,
    KORAIDON: 1007,
    MIRAIDON: 1008,
    WALKING_WAKE: 1009,
    IRON_LEAVES: 1010,
    DIPPLIN: 1011,
    POLTCHAGEIST: 1012,
    SINISTCHA: 1013,
    OKIDOGI: 1014,
    MUNKIDORI: 1015,
    FEZANDIPITI: 1016,
    OGERPON: 1017,
    ARCHALUDON: 1018,
    HYDRAPPLE: 1019,
    GOUGING_FIRE: 1020,
    RAGING_BOLT: 1021,
    IRON_BOULDER: 1022,
    IRON_CROWN: 1023,
    TERAPAGOS: 1024,
    PECHARUNT: 1025,
    ALOLA_RATTATA: 2019,
    ALOLA_RATICATE: 2020,
    ALOLA_RAICHU: 2026,
    ALOLA_SANDSHREW: 2027,
    ALOLA_SANDSLASH: 2028,
    ALOLA_VULPIX: 2037,
    ALOLA_NINETALES: 2038,
    ALOLA_DIGLETT: 2050,
    ALOLA_DUGTRIO: 2051,
    ALOLA_MEOWTH: 2052,
    ALOLA_PERSIAN: 2053,
    ALOLA_GEODUDE: 2074,
    ALOLA_GRAVELER: 2075,
    ALOLA_GOLEM: 2076,
    ALOLA_GRIMER: 2088,
    ALOLA_MUK: 2089,
    ALOLA_EXEGGUTOR: 2103,
    ALOLA_MAROWAK: 2105,
    ETERNAL_FLOETTE: 2670,
    GALAR_MEOWTH: 4052,
    GALAR_PONYTA: 4077,
    GALAR_RAPIDASH: 4078,
    GALAR_SLOWPOKE: 4079,
    GALAR_SLOWBRO: 4080,
    GALAR_FARFETCHD: 4083,
    GALAR_WEEZING: 4110,
    GALAR_MR_MIME: 4122,
    GALAR_ARTICUNO: 4144,
    GALAR_ZAPDOS: 4145,
    GALAR_MOLTRES: 4146,
    GALAR_SLOWKING: 4199,
    GALAR_CORSOLA: 4222,
    GALAR_ZIGZAGOON: 4263,
    GALAR_LINOONE: 4264,
    GALAR_DARUMAKA: 4554,
    GALAR_DARMANITAN: 4555,
    GALAR_YAMASK: 4562,
    GALAR_STUNFISK: 4618,
    HISUI_GROWLITHE: 6058,
    HISUI_ARCANINE: 6059,
    HISUI_VOLTORB: 6100,
    HISUI_ELECTRODE: 6101,
    HISUI_TYPHLOSION: 6157,
    HISUI_QWILFISH: 6211,
    HISUI_SNEASEL: 6215,
    HISUI_SAMUROTT: 6503,
    HISUI_LILLIGANT: 6549,
    HISUI_ZORUA: 6570,
    HISUI_ZOROARK: 6571,
    HISUI_BRAVIARY: 6628,
    HISUI_SLIGGOO: 6705,
    HISUI_GOODRA: 6706,
    HISUI_AVALUGG: 6713,
    HISUI_DECIDUEYE: 6724,
    PALDEA_TAUROS: 8128,
    PALDEA_WOOPER: 8194,
    BLOODMOON_URSALUNA: 8901,
};
const EvolutionMap = {
    BULBASAUR: {name: "IVYSAUR", val: 16},
    IVYSAUR: {name: "VENUSAUR", val: 32},
    CHARMANDER: {name: "CHARMELEON", val: 16},
    CHARMELEON: {name: "CHARIZARD", val: 36},
    SQUIRTLE: {name: "WARTORTLE", val: 16},
    WARTORTLE: {name: "BLASTOISE", val: 36},
    CATERPIE: {name: "METAPOD", val: 7},
    METAPOD: {name: "BUTTERFREE", val: 10},
    WEEDLE: {name: "KAKUNA", val: 7},
    KAKUNA: {name: "BEEDRILL", val: 10},
    PIDGEY: {name: "PIDGEOTTO", val: 18},
    PIDGEOTTO: {name: "PIDGEOT", val: 36},
    RATTATA: {name: "RATICATE", val: 20},
    SPEAROW: {name: "FEAROW", val: 20},
    EKANS: {name: "ARBOK", val: 22},
    SANDSHREW: {name: "SANDSLASH", val: 22},
    NIDORAN_F: {name: "NIDORINA", val: 16},
    NIDORAN_M: {name: "NIDORINO", val: 16},
    ZUBAT: {name: "GOLBAT", val: 22},
    ODDISH: {name: "GLOOM", val: 21},
    PARAS: {name: "PARASECT", val: 24},
    VENONAT: {name: "VENOMOTH", val: 31},
    DIGLETT: {name: "DUGTRIO", val: 26},
    MEOWTH: {name: "PERSIAN", val: 28},
    PSYDUCK: {name: "GOLDUCK", val: 33},
    MANKEY: {name: "PRIMEAPE", val: 28},
    POLIWAG: {name: "POLIWHIRL", val: 25},
    ABRA: {name: "KADABRA", val: 16},
    MACHOP: {name: "MACHOKE", val: 28},
    BELLSPROUT: {name: "WEEPINBELL", val: 21},
    TENTACOOL: {name: "TENTACRUEL", val: 30},
    GEODUDE: {name: "GRAVELER", val: 25},
    PONYTA: {name: "RAPIDASH", val: 40},
    SLOWPOKE: [{name: "SLOWBRO", val: 37}, {name: "SLOWKING", val: 1}],
    MAGNEMITE: {name: "MAGNETON", val: 30},
    DODUO: {name: "DODRIO", val: 31},
    SEEL: {name: "DEWGONG", val: 34},
    GRIMER: {name: "MUK", val: 38},
    GASTLY: {name: "HAUNTER", val: 25},
    DROWZEE: {name: "HYPNO", val: 26},
    KRABBY: {name: "KINGLER", val: 28},
    VOLTORB: {name: "ELECTRODE", val: 30},
    CUBONE: [{name: "ALOLA_MAROWAK", val: 28}, {name: "MAROWAK", val: 28}],
    TYROGUE: [{name: "HITMONLEE", val: 20},{name: "HITMONCHAN", val: 20}, {name: "HITMONTOP", val: 20}],
    KOFFING: [{name: "WEEZING", val: 35}, {name: "GALAR_WEEZING", val: 35}],
    RHYHORN: {name: "RHYDON", val: 42},
    HORSEA: {name: "SEADRA", val: 32},
    GOLDEEN: {name: "SEAKING", val: 33},
    SMOOCHUM: {name: "JYNX", val: 30},
    ELEKID: {name: "ELECTABUZZ", val: 30},
    MAGBY: {name: "MAGMAR", val: 30},
    MAGIKARP: {name: "GYARADOS", val: 20},
    OMANYTE: {name: "OMASTAR", val: 40},
    KABUTO: {name: "KABUTOPS", val: 40},
    DRATINI: {name: "DRAGONAIR", val: 30},
    DRAGONAIR: {name: "DRAGONITE", val: 55},
    CHIKORITA: {name: "BAYLEEF", val: 16},
    BAYLEEF: {name: "MEGANIUM", val: 32},
    CYNDAQUIL: {name: "QUILAVA", val: 14},
    QUILAVA: [{name: "HISUI_TYPHLOSION", val: 36}, {name: "TYPHLOSION", val: 36}],
    TOTODILE: {name: "CROCONAW", val: 18},
    CROCONAW: {name: "FERALIGATR", val: 30},
    SENTRET: {name: "FURRET", val: 15},
    HOOTHOOT: {name: "NOCTOWL", val: 20},
    LEDYBA: {name: "LEDIAN", val: 18},
    SPINARAK: {name: "ARIADOS", val: 22},
    CHINCHOU: {name: "LANTURN", val: 27},
    NATU: {name: "XATU", val: 25},
    MAREEP: {name: "FLAAFFY", val: 15},
    FLAAFFY: {name: "AMPHAROS", val: 30},
    MARILL: {name: "AZUMARILL", val: 18},
    HOPPIP: {name: "SKIPLOOM", val: 18},
    SKIPLOOM: {name: "JUMPLUFF", val: 27},
    WOOPER: {name: "QUAGSIRE", val: 20},
    WYNAUT: {name: "WOBBUFFET", val: 15},
    PINECO: {name: "FORRETRESS", val: 31},
    SNUBBULL: {name: "GRANBULL", val: 23},
    TEDDIURSA: {name: "URSARING", val: 30},
    SLUGMA: {name: "MAGCARGO", val: 38},
    SWINUB: {name: "PILOSWINE", val: 33},
    REMORAID: {name: "OCTILLERY", val: 25},
    HOUNDOUR: {name: "HOUNDOOM", val: 24},
    PHANPY: {name: "DONPHAN", val: 25},
    LARVITAR: {name: "PUPITAR", val: 30},
    PUPITAR: {name: "TYRANITAR", val: 55},
    TREECKO: {name: "GROVYLE", val: 16},
    GROVYLE: {name: "SCEPTILE", val: 36},
    TORCHIC: {name: "COMBUSKEN", val: 16},
    COMBUSKEN: {name: "BLAZIKEN", val: 36},
    MUDKIP: {name: "MARSHTOMP", val: 16},
    MARSHTOMP: {name: "SWAMPERT", val: 36},
    POOCHYENA: {name: "MIGHTYENA", val: 18},
    ZIGZAGOON: {name: "LINOONE", val: 20},
    WURMPLE: [{name: "SILCOON", val: 7}, {name: "CASCOON", val: 7}],
    SILCOON: {name: "BEAUTIFLY", val: 10},
    CASCOON: {name: "DUSTOX", val: 10},
    LOTAD: {name: "LOMBRE", val: 14},
    SEEDOT: {name: "NUZLEAF", val: 14},
    TAILLOW: {name: "SWELLOW", val: 22},
    WINGULL: {name: "PELIPPER", val: 25},
    RALTS: {name: "KIRLIA", val: 20},
    KIRLIA: [{name: "GARDEVOIR", val: 30}, {name: "GALLADE", val: 30}],
    SURSKIT: {name: "MASQUERAIN", val: 22},
    SHROOMISH: {name: "BRELOOM", val: 23},
    SLAKOTH: {name: "VIGOROTH", val: 18},
    VIGOROTH: {name: "SLAKING", val: 36},
    NINCADA: [{name: "NINJASK", val: 20}, {name: "SHEDINJA", val: 20}],
    WHISMUR: {name: "LOUDRED", val: 20},
    LOUDRED: {name: "EXPLOUD", val: 40},
    MAKUHITA: {name: "HARIYAMA", val: 24},
    ARON: {name: "LAIRON", val: 32},
    LAIRON: {name: "AGGRON", val: 42},
    MEDITITE: {name: "MEDICHAM", val: 37},
    ELECTRIKE: {name: "MANECTRIC", val: 26},
    GULPIN: {name: "SWALOT", val: 26},
    CARVANHA: {name: "SHARPEDO", val: 30},
    WAILMER: {name: "WAILORD", val: 40},
    NUMEL: {name: "CAMERUPT", val: 33},
    SPOINK: {name: "GRUMPIG", val: 32},
    TRAPINCH: {name: "VIBRAVA", val: 35},
    VIBRAVA: {name: "FLYGON", val: 45},
    CACNEA: {name: "CACTURNE", val: 32},
    SWABLU: {name: "ALTARIA", val: 35},
    BARBOACH: {name: "WHISCASH", val: 30},
    CORPHISH: {name: "CRAWDAUNT", val: 30},
    BALTOY: {name: "CLAYDOL", val: 36},
    LILEEP: {name: "CRADILY", val: 40},
    ANORITH: {name: "ARMALDO", val: 40},
    SHUPPET: {name: "BANETTE", val: 37},
    DUSKULL: {name: "DUSCLOPS", val: 37},
    SNORUNT: [{name: "GLALIE", val: 42}, {name: "FROSLASS", val: 42}],
    SPHEAL: {name: "SEALEO", val: 32},
    SEALEO: {name: "WALREIN", val: 44},
    BAGON: {name: "SHELGON", val: 30},
    SHELGON: {name: "SALAMENCE", val: 50},
    BELDUM: {name: "METANG", val: 20},
    METANG: {name: "METAGROSS", val: 45},
    TURTWIG: {name: "GROTLE", val: 18},
    GROTLE: {name: "TORTERRA", val: 32},
    CHIMCHAR: {name: "MONFERNO", val: 14},
    MONFERNO: {name: "INFERNAPE", val: 36},
    PIPLUP: {name: "PRINPLUP", val: 16},
    PRINPLUP: {name: "EMPOLEON", val: 36},
    STARLY: {name: "STARAVIA", val: 14},
    STARAVIA: {name: "STARAPTOR", val: 34},
    BIDOOF: {name: "BIBAREL", val: 15},
    KRICKETOT: {name: "KRICKETUNE", val: 10},
    SHINX: {name: "LUXIO", val: 15},
    LUXIO: {name: "LUXRAY", val: 30},
    CRANIDOS: {name: "RAMPARDOS", val: 30},
    SHIELDON: {name: "BASTIODON", val: 30},
    BURMY: [{name: "MOTHIM", val: 20}, {name: "WORMADAM", val: 20}],
    COMBEE: {name: "VESPIQUEN", val: 21},
    BUIZEL: {name: "FLOATZEL", val: 26},
    CHERUBI: {name: "CHERRIM", val: 25},
    SHELLOS: {name: "GASTRODON", val: 30},
    DRIFLOON: {name: "DRIFBLIM", val: 28},
    GLAMEOW: {name: "PURUGLY", val: 38},
    STUNKY: {name: "SKUNTANK", val: 34},
    BRONZOR: {name: "BRONZONG", val: 33},
    GIBLE: {name: "GABITE", val: 24},
    GABITE: {name: "GARCHOMP", val: 48},
    HIPPOPOTAS: {name: "HIPPOWDON", val: 34},
    SKORUPI: {name: "DRAPION", val: 40},
    CROAGUNK: {name: "TOXICROAK", val: 37},
    FINNEON: {name: "LUMINEON", val: 31},
    MANTYKE: {name: "MANTINE", val: 32},
    SNOVER: {name: "ABOMASNOW", val: 40},
    SNIVY: {name: "SERVINE", val: 17},
    SERVINE: {name: "SERPERIOR", val: 36},
    TEPIG: {name: "PIGNITE", val: 17},
    PIGNITE: {name: "EMBOAR", val: 36},
    OSHAWOTT: {name: "DEWOTT", val: 17},
    DEWOTT: [{name: "HISUI_SAMUROTT", val: 36}, {name: "SAMUROTT", val: 36}],
    PATRAT: {name: "WATCHOG", val: 20},
    LILLIPUP: {name: "HERDIER", val: 16},
    HERDIER: {name: "STOUTLAND", val: 32},
    PURRLOIN: {name: "LIEPARD", val: 20},
    PIDOVE: {name: "TRANQUILL", val: 21},
    TRANQUILL: {name: "UNFEZANT", val: 32},
    BLITZLE: {name: "ZEBSTRIKA", val: 27},
    ROGGENROLA: {name: "BOLDORE", val: 25},
    DRILBUR: {name: "EXCADRILL", val: 31},
    TIMBURR: {name: "GURDURR", val: 25},
    TYMPOLE: {name: "PALPITOAD", val: 25},
    PALPITOAD: {name: "SEISMITOAD", val: 36},
    SEWADDLE: {name: "SWADLOON", val: 20},
    VENIPEDE: {name: "WHIRLIPEDE", val: 22},
    WHIRLIPEDE: {name: "SCOLIPEDE", val: 30},
    SANDILE: {name: "KROKOROK", val: 29},
    KROKOROK: {name: "KROOKODILE", val: 40},
    DARUMAKA: {name: "DARMANITAN", val: 35},
    DWEBBLE: {name: "CRUSTLE", val: 34},
    SCRAGGY: {name: "SCRAFTY", val: 39},
    YAMASK: {name: "COFAGRIGUS", val: 34},
    TIRTOUGA: {name: "CARRACOSTA", val: 37},
    ARCHEN: {name: "ARCHEOPS", val: 37},
    TRUBBISH: {name: "GARBODOR", val: 36},
    ZORUA: {name: "ZOROARK", val: 30},
    GOTHITA: {name: "GOTHORITA", val: 32},
    GOTHORITA: {name: "GOTHITELLE", val: 41},
    SOLOSIS: {name: "DUOSION", val: 32},
    DUOSION: {name: "REUNICLUS", val: 41},
    DUCKLETT: {name: "SWANNA", val: 35},
    VANILLITE: {name: "VANILLISH", val: 35},
    VANILLISH: {name: "VANILLUXE", val: 47},
    DEERLING: {name: "SAWSBUCK", val: 34},
    FOONGUS: {name: "AMOONGUSS", val: 39},
    FRILLISH: {name: "JELLICENT", val: 40},
    JOLTIK: {name: "GALVANTULA", val: 36},
    FERROSEED: {name: "FERROTHORN", val: 40},
    KLINK: {name: "KLANG", val: 38},
    KLANG: {name: "KLINKLANG", val: 49},
    TYNAMO: {name: "EELEKTRIK", val: 39},
    ELGYEM: {name: "BEHEEYEM", val: 42},
    LITWICK: {name: "LAMPENT", val: 41},
    AXEW: {name: "FRAXURE", val: 38},
    FRAXURE: {name: "HAXORUS", val: 48},
    CUBCHOO: {name: "BEARTIC", val: 37},
    MIENFOO: {name: "MIENSHAO", val: 50},
    GOLETT: {name: "GOLURK", val: 43},
    PAWNIARD: {name: "BISHARP", val: 52},
    BISHARP: {name: "KINGAMBIT", val: 64},
    RUFFLET: [{name: "HISUI_BRAVIARY", val: 54}, {name: "BRAVIARY", val: 54}],
    VULLABY: {name: "MANDIBUZZ", val: 54},
    DEINO: {name: "ZWEILOUS", val: 50},
    ZWEILOUS: {name: "HYDREIGON", val: 64},
    LARVESTA: {name: "VOLCARONA", val: 59},
    CHESPIN: {name: "QUILLADIN", val: 16},
    QUILLADIN: {name: "CHESNAUGHT", val: 36},
    FENNEKIN: {name: "BRAIXEN", val: 16},
    BRAIXEN: {name: "DELPHOX", val: 36},
    FROAKIE: {name: "FROGADIER", val: 16},
    FROGADIER: {name: "GRENINJA", val: 36},
    BUNNELBY: {name: "DIGGERSBY", val: 20},
    FLETCHLING: {name: "FLETCHINDER", val: 17},
    FLETCHINDER: {name: "TALONFLAME", val: 35},
    SCATTERBUG: {name: "SPEWPA", val: 9},
    SPEWPA: {name: "VIVILLON", val: 12},
    LITLEO: {name: "PYROAR", val: 35},
    FLABEBE: {name: "FLOETTE", val: 19},
    SKIDDO: {name: "GOGOAT", val: 32},
    PANCHAM: {name: "PANGORO", val: 32},
    ESPURR: {name: "MEOWSTIC", val: 25},
    HONEDGE: {name: "DOUBLADE", val: 35},
    INKAY: {name: "MALAMAR", val: 30},
    BINACLE: {name: "BARBARACLE", val: 39},
    SKRELP: {name: "DRAGALGE", val: 48},
    CLAUNCHER: {name: "CLAWITZER", val: 37},
    TYRUNT: {name: "TYRANTRUM", val: 39},
    AMAURA: {name: "AURORUS", val: 39},
    GOOMY: [{name: "HISUI_SLIGGOO", val: 40}, {name: "SLIGGOO", val: 40}],
    SLIGGOO: {name: "GOODRA", val: 50},
    BERGMITE: [{name: "HISUI_AVALUGG", val: 37}, {name: "AVALUGG", val: 37}],
    NOIBAT: {name: "NOIVERN", val: 48},
    ROWLET: {name: "DARTRIX", val: 17},
    DARTRIX: [{name: "HISUI_DECIDUEYE", val: 36}, {name: "DECIDUEYE", val: 34}],
    LITTEN: {name: "TORRACAT", val: 17},
    TORRACAT: {name: "INCINEROAR", val: 34},
    POPPLIO: {name: "BRIONNE", val: 17},
    BRIONNE: {name: "PRIMARINA", val: 34},
    PIKIPEK: {name: "TRUMBEAK", val: 14},
    TRUMBEAK: {name: "TOUCANNON", val: 28},
    YUNGOOS: {name: "GUMSHOOS", val: 20},
    GRUBBIN: {name: "CHARJABUG", val: 20},
    CUTIEFLY: {name: "RIBOMBEE", val: 25},
    MAREANIE: {name: "TOXAPEX", val: 38},
    MUDBRAY: {name: "MUDSDALE", val: 30},
    DEWPIDER: {name: "ARAQUANID", val: 22},
    FOMANTIS: {name: "LURANTIS", val: 34},
    MORELULL: {name: "SHIINOTIC", val: 24},
    SALANDIT: {name: "SALAZZLE", val: 33},
    STUFFUL: {name: "BEWEAR", val: 27},
    BOUNSWEET: {name: "STEENEE", val: 18},
    WIMPOD: {name: "GOLISOPOD", val: 30},
    SANDYGAST: {name: "PALOSSAND", val: 42},
    JANGMO_O: {name: "HAKAMO_O", val: 35},
    HAKAMO_O: {name: "KOMMO_O", val: 45},
    COSMOG: {name: "COSMOEM", val: 43},
    COSMOEM: [{name: "SOLGALEO", val: 53}, {name: "LUNALA", val: 53}],
    MELTAN: {name: "MELMETAL", val: 48},
    ALOLA_RATTATA: {name: "ALOLA_RATICATE", val: 20},
    ALOLA_DIGLETT: {name: "ALOLA_DUGTRIO", val: 26},
    ALOLA_GEODUDE: {name: "ALOLA_GRAVELER", val: 25},
    ALOLA_GRIMER: {name: "ALOLA_MUK", val: 38},
    GROOKEY: {name: "THWACKEY", val: 16},
    THWACKEY: {name: "RILLABOOM", val: 35},
    SCORBUNNY: {name: "RABOOT", val: 16},
    RABOOT: {name: "CINDERACE", val: 35},
    SOBBLE: {name: "DRIZZILE", val: 16},
    DRIZZILE: {name: "INTELEON", val: 35},
    SKWOVET: {name: "GREEDENT", val: 24},
    ROOKIDEE: {name: "CORVISQUIRE", val: 18},
    CORVISQUIRE: {name: "CORVIKNIGHT", val: 38},
    BLIPBUG: {name: "DOTTLER", val: 10},
    DOTTLER: {name: "ORBEETLE", val: 30},
    NICKIT: {name: "THIEVUL", val: 18},
    GOSSIFLEUR: {name: "ELDEGOSS", val: 20},
    WOOLOO: {name: "DUBWOOL", val: 24},
    CHEWTLE: {name: "DREDNAW", val: 22},
    YAMPER: {name: "BOLTUND", val: 25},
    ROLYCOLY: {name: "CARKOL", val: 18},
    CARKOL: {name: "COALOSSAL", val: 34},
    SILICOBRA: {name: "SANDACONDA", val: 36},
    ARROKUDA: {name: "BARRASKEWDA", val: 26},
    TOXEL: {name: "TOXTRICITY", val: 30},
    SIZZLIPEDE: {name: "CENTISKORCH", val: 28},
    HATENNA: {name: "HATTREM", val: 32},
    HATTREM: {name: "HATTERENE", val: 42},
    IMPIDIMP: {name: "MORGREM", val: 32},
    MORGREM: {name: "GRIMMSNARL", val: 42},
    CUFANT: {name: "COPPERAJAH", val: 34},
    DREEPY: {name: "DRAKLOAK", val: 50},
    DRAKLOAK: {name: "DRAGAPULT", val: 60},
    GALAR_MEOWTH: {name: "PERRSERKER", val: 28},
    GALAR_PONYTA: {name: "GALAR_RAPIDASH", val: 40},
    GALAR_FARFETCHD: {name: "SIRFETCHD", val: 30},
    GALAR_SLOWPOKE: [{name: "GALAR_SLOWBRO", val: 1}, {name: "GALAR_SLOWKING", val: 1}],
    GALAR_MR_MIME: {name: "MR_RIME", val: 42},
    GALAR_CORSOLA: {name: "CURSOLA", val: 38},
    GALAR_ZIGZAGOON: {name: "GALAR_LINOONE", val: 20},
    GALAR_LINOONE: {name: "OBSTAGOON", val: 35},
    GALAR_YAMASK: {name: "RUNERIGUS", val: 34},
    HISUI_ZORUA: {name: "HISUI_ZOROARK", val: 30},
    HISUI_SLIGGOO: {name: "HISUI_GOODRA", val: 50},
    SPRIGATITO: {name: "FLORAGATO", val: 16},
    FLORAGATO: {name: "MEOWSCARADA", val: 36},
    FUECOCO: {name: "CROCALOR", val: 16},
    CROCALOR: {name: "SKELEDIRGE", val: 36},
    QUAXLY: {name: "QUAXWELL", val: 16},
    QUAXWELL: {name: "QUAQUAVAL", val: 36},
    LECHONK: {name: "OINKOLOGNE", val: 18},
    TAROUNTULA: {name: "SPIDOPS", val: 15},
    NYMBLE: {name: "LOKIX", val: 24},
    PAWMI: {name: "PAWMO", val: 18},
    PAWMO: {name: "PAWMOT", val: 32},
    TANDEMAUS: {name: "MAUSHOLD", val: 25},
    FIDOUGH: {name: "DACHSBUN", val: 26},
    SMOLIV: {name: "DOLLIV", val: 25},
    DOLLIV: {name: "ARBOLIVA", val: 35},
    NACLI: {name: "NACLSTACK", val: 24},
    NACLSTACK: {name: "GARGANACL", val: 38},
    WATTREL: {name: "KILOWATTREL", val: 25},
    MASCHIFF: {name: "MABOSSTIFF", val: 30},
    SHROODLE: {name: "GRAFAIAI", val: 28},
    BRAMBLIN: {name: "BRAMBLEGHAST", val: 30},
    TOEDSCOOL: {name: "TOEDSCRUEL", val: 30},
    RELLOR: {name: "RABSCA", val: 29},
    FLITTLE: {name: "ESPATHRA", val: 35},
    TINKATINK: {name: "TINKATUFF", val: 24},
    TINKATUFF: {name: "TINKATON", val: 38},
    WIGLETT: {name: "WUGTRIO", val: 26},
    FINIZEN: {name: "PALAFIN", val: 38},
    VAROOM: {name: "REVAVROOM", val: 40},
    GLIMMET: {name: "GLIMMORA", val: 35},
    GREAVARD: {name: "HOUNDSTONE", val: 30},
    FRIGIBAX: {name: "ARCTIBAX", val: 35},
    ARCTIBAX: {name: "BAXCALIBUR", val: 54},
    PALDEA_WOOPER: {name: "CLODSIRE", val: 20},
    PIKACHU: [{name: "ALOLA_RAICHU", val: 1}, {name: "RAICHU", val: 1}],
    NIDORINA: {name: "NIDOQUEEN", val: 1},
    NIDORINO: {name: "NIDOKING", val: 1},
    CLEFAIRY: {name: "CLEFABLE", val: 1},
    VULPIX: {name: "NINETALES", val: 1},
    JIGGLYPUFF: {name: "WIGGLYTUFF", val: 1},
    GLOOM: [{name: "VILEPLUME", val: 1}, {name: "BELLOSSOM", val: 1}],
    GROWLITHE: {name: "ARCANINE", val: 1},
    POLIWHIRL: [{name: "POLIWRATH", val: 1}, {name: "POLITOED", val: 1}],
    WEEPINBELL: {name: "VICTREEBEL", val: 1},
    MAGNETON: {name: "MAGNEZONE", val: 1},
    SHELLDER: {name: "CLOYSTER", val: 1},
    EXEGGCUTE: [{name: "ALOLA_EXEGGUTOR", val: 1}, {name: "EXEGGUTOR", val: 1}],
    TANGELA: {name: "TANGROWTH", val: 34},
    LICKITUNG: {name: "LICKILICKY", val: 32},
    STARYU: {name: "STARMIE", val: 1},
    EEVEE: [{name: "SYLVEON", val: 1},{name: "ESPEON", val: 1},{name: "UMBREON", val: 1}, {name: "VAPOREON", val: 1}, {name: "JOLTEON", val: 1}, {name: "FLAREON", val: 1}, {name: "LEAFEON", val: 1}, {name: "GLACEON", val: 1} ],
    TOGETIC: {name: "TOGEKISS", val: 1},
    AIPOM: {name: "AMBIPOM", val: 32},
    SUNKERN: {name: "SUNFLORA", val: 1},
    YANMA: {name: "YANMEGA", val: 33},
    MURKROW: {name: "HONCHKROW", val: 1},
    MISDREAVUS: {name: "MISMAGIUS", val: 1},
    GIRAFARIG: {name: "FARIGIRAF", val: 32},
    DUNSPARCE: {name: "DUDUNSPARCE", val: 32},
    GLIGAR: {name: "GLISCOR", val: 1},
    SNEASEL: {name: "WEAVILE", val: 1},
    URSARING: {name: "URSALUNA", val: 1},
    PILOSWINE: {name: "MAMOSWINE", val: 1},
    STANTLER: {name: "WYRDEER", val: 25},
    LOMBRE: {name: "LUDICOLO", val: 1},
    NUZLEAF: {name: "SHIFTRY", val: 1},
    NOSEPASS: {name: "PROBOPASS", val: 1},
    SKITTY: {name: "DELCATTY", val: 1},
    ROSELIA: {name: "ROSERADE", val: 1},
    BONSLY: {name: "SUDOWOODO", val: 1},
    MIME_JR: [{name: "GALAR_MR_MIME", val: 1},{name: "MR_MIME", val: 1}],
    PANSAGE: {name: "SIMISAGE", val: 1},
    PANSEAR: {name: "SIMISEAR", val: 1},
    PANPOUR: {name: "SIMIPOUR", val: 1},
    MUNNA: {name: "MUSHARNA", val: 1},
    COTTONEE: {name: "WHIMSICOTT", val: 1},
    PETILIL: [{name: "HISUI_LILLIGANT", val: 1}, {name: "LILLIGANT", val: 1}],
    BASCULIN: {name: "BASCULEGION", val: 40},
    MINCCINO: {name: "CINCCINO", val: 1},
    EELEKTRIK: {name: "EELEKTROSS", val: 1},
    LAMPENT: {name: "CHANDELURE", val: 1},
    FLOETTE: {name: "FLORGES", val: 1},
    DOUBLADE: {name: "AEGISLASH", val: 1},
    HELIOPTILE: {name: "HELIOLISK", val: 1},
    CHARJABUG: {name: "VIKAVOLT", val: 1},
    CRABRAWLER: {name: "CRABOMINABLE", val: 1},
    ROCKRUFF: {name: "LYCANROC", val: 25},
    STEENEE: {name: "TSAREENA", val: 28},
    POIPOLE: {name: "NAGANADEL", val: 1},
    ALOLA_SANDSHREW: {name: "ALOLA_SANDSLASH", val: 1},
    ALOLA_VULPIX: {name: "ALOLA_NINETALES", val: 1},
    APPLIN: [{name: "DIPPLIN", val: 1},{name: "FLAPPLE", val: 1}, {name: "APPLETUN", val: 1}],
    CLOBBOPUS: {name: "GRAPPLOCT", val: 35},
    SINISTEA: {name: "POLTEAGEIST", val: 1},
    MILCERY: {name: "ALCREMIE", val: 1},
    DURALUDON: {name: "ARCHALUDON", val: 1},
    KUBFU: {name: "URSHIFU", val: 1},
    GALAR_DARUMAKA: {name: "GALAR_DARMANITAN", val: 1},
    HISUI_GROWLITHE: {name: "HISUI_ARCANINE", val: 1},
    HISUI_VOLTORB: {name: "HISUI_ELECTRODE", val: 1},
    HISUI_QWILFISH: {name: "OVERQWIL", val: 28},
    HISUI_SNEASEL: {name: "SNEASLER", val: 1},
    CHARCADET: [{name: "ARMAROUGE", val: 1}, {name: "CERULEDGE", val: 1}],
    TADBULB: {name: "BELLIBOLT", val: 1},
    CAPSAKID: {name: "SCOVILLAIN", val: 1},
    CETODDLE: {name: "CETITAN", val: 1},
    POLTCHAGEIST: {name: "SINISTCHA", val: 1},
    DIPPLIN: {name: "HYDRAPPLE", val: 1},
    KADABRA: {name: "ALAKAZAM", val: 1},
    MACHOKE: {name: "MACHAMP", val: 1},
    GRAVELER: {name: "GOLEM", val: 1},
    HAUNTER: {name: "GENGAR", val: 1},
    ONIX: {name: "STEELIX", val: 1},
    RHYDON: {name: "RHYPERIOR", val: 1},
    SEADRA: {name: "KINGDRA", val: 1},
    SCYTHER: [{name: "SCIZOR", val: 1}, {name: "KLEAVOR", val: 1}],
    ELECTABUZZ: {name: "ELECTIVIRE", val: 1},
    MAGMAR: {name: "MAGMORTAR", val: 1},
    PORYGON: {name: "PORYGON2", val: 1},
    PORYGON2: {name: "PORYGON_Z", val: 1},
    FEEBAS: {name: "MILOTIC", val: 1},
    DUSCLOPS: {name: "DUSKNOIR", val: 1},
    CLAMPERL: [{name: "HUNTAIL", val: 1}, {name: "GOREBYSS", val: 1}],
    BOLDORE: {name: "GIGALITH", val: 1},
    GURDURR: {name: "CONKELDURR", val: 1},
    KARRABLAST: {name: "ESCAVALIER", val: 1},
    SHELMET: {name: "ACCELGOR", val: 1},
    SPRITZEE: {name: "AROMATISSE", val: 1},
    SWIRLIX: {name: "SLURPUFF", val: 1},
    PHANTUMP: {name: "TREVENANT", val: 1},
    PUMPKABOO: {name: "GOURGEIST", val: 1},
    ALOLA_GRAVELER: {name: "ALOLA_GOLEM", val: 1},
    PRIMEAPE: {name: "ANNIHILAPE", val: 35},
    GOLBAT: {name: "CROBAT", val: 1},
    CHANSEY: {name: "BLISSEY", val: 1},
    PICHU: {name: "PIKACHU", val: 1},
    CLEFFA: {name: "CLEFAIRY", val: 1},
    IGGLYBUFF: {name: "JIGGLYPUFF", val: 1},
    TOGEPI: {name: "TOGETIC", val: 1},
    AZURILL: {name: "MARILL", val: 1},
    BUDEW: {name: "ROSELIA", val: 1},
    BUNEARY: {name: "LOPUNNY", val: 1},
    CHINGLING: {name: "CHIMECHO", val: 1},
    HAPPINY: {name: "CHANSEY", val: 1},
    MUNCHLAX: {name: "SNORLAX", val: 1},
    RIOLU: {name: "LUCARIO", val: 1},
    WOOBAT: {name: "SWOOBAT", val: 1},
    SWADLOON: {name: "LEAVANNY", val: 1},
    TYPE_NULL: {name: "SILVALLY", val: 1},
    ALOLA_MEOWTH: {name: "ALOLA_PERSIAN", val: 1},
    SNOM: {name: "FROSMOTH", val: 1},
    GIMMIGHOUL: {name: "GHOLDENGO", val: 1}
};

let preEvolutions = {};
const prevolutionKeys = Object.keys(EvolutionMap);
prevolutionKeys.forEach(pk =>{
    let evolutions =  EvolutionMap[pk];
    if (Array.isArray(evolutions)) {
        evolutions.forEach(evo => {
            preEvolutions[evo.name] = pk;
        });
    } else {
        preEvolutions[evolutions.name] = pk;
    }
});

let Abilities;
(function (Abilities) {
    Abilities[Abilities["NONE"] = 0] = "NONE";
    Abilities[Abilities["STENCH"] = 1] = "STENCH";
    Abilities[Abilities["DRIZZLE"] = 2] = "DRIZZLE";
    Abilities[Abilities["SPEED_BOOST"] = 3] = "SPEED_BOOST";
    Abilities[Abilities["BATTLE_ARMOR"] = 4] = "BATTLE_ARMOR";
    Abilities[Abilities["STURDY"] = 5] = "STURDY";
    Abilities[Abilities["DAMP"] = 6] = "DAMP";
    Abilities[Abilities["LIMBER"] = 7] = "LIMBER";
    Abilities[Abilities["SAND_VEIL"] = 8] = "SAND_VEIL";
    Abilities[Abilities["STATIC"] = 9] = "STATIC";
    Abilities[Abilities["VOLT_ABSORB"] = 10] = "VOLT_ABSORB";
    Abilities[Abilities["WATER_ABSORB"] = 11] = "WATER_ABSORB";
    Abilities[Abilities["OBLIVIOUS"] = 12] = "OBLIVIOUS";
    Abilities[Abilities["CLOUD_NINE"] = 13] = "CLOUD_NINE";
    Abilities[Abilities["COMPOUND_EYES"] = 14] = "COMPOUND_EYES";
    Abilities[Abilities["INSOMNIA"] = 15] = "INSOMNIA";
    Abilities[Abilities["COLOR_CHANGE"] = 16] = "COLOR_CHANGE";
    Abilities[Abilities["IMMUNITY"] = 17] = "IMMUNITY";
    Abilities[Abilities["FLASH_FIRE"] = 18] = "FLASH_FIRE";
    Abilities[Abilities["SHIELD_DUST"] = 19] = "SHIELD_DUST";
    Abilities[Abilities["OWN_TEMPO"] = 20] = "OWN_TEMPO";
    Abilities[Abilities["SUCTION_CUPS"] = 21] = "SUCTION_CUPS";
    Abilities[Abilities["INTIMIDATE"] = 22] = "INTIMIDATE";
    Abilities[Abilities["SHADOW_TAG"] = 23] = "SHADOW_TAG";
    Abilities[Abilities["ROUGH_SKIN"] = 24] = "ROUGH_SKIN";
    Abilities[Abilities["WONDER_GUARD"] = 25] = "WONDER_GUARD";
    Abilities[Abilities["LEVITATE"] = 26] = "LEVITATE";
    Abilities[Abilities["EFFECT_SPORE"] = 27] = "EFFECT_SPORE";
    Abilities[Abilities["SYNCHRONIZE"] = 28] = "SYNCHRONIZE";
    Abilities[Abilities["CLEAR_BODY"] = 29] = "CLEAR_BODY";
    Abilities[Abilities["NATURAL_CURE"] = 30] = "NATURAL_CURE";
    Abilities[Abilities["LIGHTNING_ROD"] = 31] = "LIGHTNING_ROD";
    Abilities[Abilities["SERENE_GRACE"] = 32] = "SERENE_GRACE";
    Abilities[Abilities["SWIFT_SWIM"] = 33] = "SWIFT_SWIM";
    Abilities[Abilities["CHLOROPHYLL"] = 34] = "CHLOROPHYLL";
    Abilities[Abilities["ILLUMINATE"] = 35] = "ILLUMINATE";
    Abilities[Abilities["TRACE"] = 36] = "TRACE";
    Abilities[Abilities["HUGE_POWER"] = 37] = "HUGE_POWER";
    Abilities[Abilities["POISON_POINT"] = 38] = "POISON_POINT";
    Abilities[Abilities["INNER_FOCUS"] = 39] = "INNER_FOCUS";
    Abilities[Abilities["MAGMA_ARMOR"] = 40] = "MAGMA_ARMOR";
    Abilities[Abilities["WATER_VEIL"] = 41] = "WATER_VEIL";
    Abilities[Abilities["MAGNET_PULL"] = 42] = "MAGNET_PULL";
    Abilities[Abilities["SOUNDPROOF"] = 43] = "SOUNDPROOF";
    Abilities[Abilities["RAIN_DISH"] = 44] = "RAIN_DISH";
    Abilities[Abilities["SAND_STREAM"] = 45] = "SAND_STREAM";
    Abilities[Abilities["PRESSURE"] = 46] = "PRESSURE";
    Abilities[Abilities["THICK_FAT"] = 47] = "THICK_FAT";
    Abilities[Abilities["EARLY_BIRD"] = 48] = "EARLY_BIRD";
    Abilities[Abilities["FLAME_BODY"] = 49] = "FLAME_BODY";
    Abilities[Abilities["RUN_AWAY"] = 50] = "RUN_AWAY";
    Abilities[Abilities["KEEN_EYE"] = 51] = "KEEN_EYE";
    Abilities[Abilities["HYPER_CUTTER"] = 52] = "HYPER_CUTTER";
    Abilities[Abilities["PICKUP"] = 53] = "PICKUP";
    Abilities[Abilities["TRUANT"] = 54] = "TRUANT";
    Abilities[Abilities["HUSTLE"] = 55] = "HUSTLE";
    Abilities[Abilities["CUTE_CHARM"] = 56] = "CUTE_CHARM";
    Abilities[Abilities["PLUS"] = 57] = "PLUS";
    Abilities[Abilities["MINUS"] = 58] = "MINUS";
    Abilities[Abilities["FORECAST"] = 59] = "FORECAST";
    Abilities[Abilities["STICKY_HOLD"] = 60] = "STICKY_HOLD";
    Abilities[Abilities["SHED_SKIN"] = 61] = "SHED_SKIN";
    Abilities[Abilities["GUTS"] = 62] = "GUTS";
    Abilities[Abilities["MARVEL_SCALE"] = 63] = "MARVEL_SCALE";
    Abilities[Abilities["LIQUID_OOZE"] = 64] = "LIQUID_OOZE";
    Abilities[Abilities["OVERGROW"] = 65] = "OVERGROW";
    Abilities[Abilities["BLAZE"] = 66] = "BLAZE";
    Abilities[Abilities["TORRENT"] = 67] = "TORRENT";
    Abilities[Abilities["SWARM"] = 68] = "SWARM";
    Abilities[Abilities["ROCK_HEAD"] = 69] = "ROCK_HEAD";
    Abilities[Abilities["DROUGHT"] = 70] = "DROUGHT";
    Abilities[Abilities["ARENA_TRAP"] = 71] = "ARENA_TRAP";
    Abilities[Abilities["VITAL_SPIRIT"] = 72] = "VITAL_SPIRIT";
    Abilities[Abilities["WHITE_SMOKE"] = 73] = "WHITE_SMOKE";
    Abilities[Abilities["PURE_POWER"] = 74] = "PURE_POWER";
    Abilities[Abilities["SHELL_ARMOR"] = 75] = "SHELL_ARMOR";
    Abilities[Abilities["AIR_LOCK"] = 76] = "AIR_LOCK";
    Abilities[Abilities["TANGLED_FEET"] = 77] = "TANGLED_FEET";
    Abilities[Abilities["MOTOR_DRIVE"] = 78] = "MOTOR_DRIVE";
    Abilities[Abilities["RIVALRY"] = 79] = "RIVALRY";
    Abilities[Abilities["STEADFAST"] = 80] = "STEADFAST";
    Abilities[Abilities["SNOW_CLOAK"] = 81] = "SNOW_CLOAK";
    Abilities[Abilities["GLUTTONY"] = 82] = "GLUTTONY";
    Abilities[Abilities["ANGER_POINT"] = 83] = "ANGER_POINT";
    Abilities[Abilities["UNBURDEN"] = 84] = "UNBURDEN";
    Abilities[Abilities["HEATPROOF"] = 85] = "HEATPROOF";
    Abilities[Abilities["SIMPLE"] = 86] = "SIMPLE";
    Abilities[Abilities["DRY_SKIN"] = 87] = "DRY_SKIN";
    Abilities[Abilities["DOWNLOAD"] = 88] = "DOWNLOAD";
    Abilities[Abilities["IRON_FIST"] = 89] = "IRON_FIST";
    Abilities[Abilities["POISON_HEAL"] = 90] = "POISON_HEAL";
    Abilities[Abilities["ADAPTABILITY"] = 91] = "ADAPTABILITY";
    Abilities[Abilities["SKILL_LINK"] = 92] = "SKILL_LINK";
    Abilities[Abilities["HYDRATION"] = 93] = "HYDRATION";
    Abilities[Abilities["SOLAR_POWER"] = 94] = "SOLAR_POWER";
    Abilities[Abilities["QUICK_FEET"] = 95] = "QUICK_FEET";
    Abilities[Abilities["NORMALIZE"] = 96] = "NORMALIZE";
    Abilities[Abilities["SNIPER"] = 97] = "SNIPER";
    Abilities[Abilities["MAGIC_GUARD"] = 98] = "MAGIC_GUARD";
    Abilities[Abilities["NO_GUARD"] = 99] = "NO_GUARD";
    Abilities[Abilities["STALL"] = 100] = "STALL";
    Abilities[Abilities["TECHNICIAN"] = 101] = "TECHNICIAN";
    Abilities[Abilities["LEAF_GUARD"] = 102] = "LEAF_GUARD";
    Abilities[Abilities["KLUTZ"] = 103] = "KLUTZ";
    Abilities[Abilities["MOLD_BREAKER"] = 104] = "MOLD_BREAKER";
    Abilities[Abilities["SUPER_LUCK"] = 105] = "SUPER_LUCK";
    Abilities[Abilities["AFTERMATH"] = 106] = "AFTERMATH";
    Abilities[Abilities["ANTICIPATION"] = 107] = "ANTICIPATION";
    Abilities[Abilities["FOREWARN"] = 108] = "FOREWARN";
    Abilities[Abilities["UNAWARE"] = 109] = "UNAWARE";
    Abilities[Abilities["TINTED_LENS"] = 110] = "TINTED_LENS";
    Abilities[Abilities["FILTER"] = 111] = "FILTER";
    Abilities[Abilities["SLOW_START"] = 112] = "SLOW_START";
    Abilities[Abilities["SCRAPPY"] = 113] = "SCRAPPY";
    Abilities[Abilities["STORM_DRAIN"] = 114] = "STORM_DRAIN";
    Abilities[Abilities["ICE_BODY"] = 115] = "ICE_BODY";
    Abilities[Abilities["SOLID_ROCK"] = 116] = "SOLID_ROCK";
    Abilities[Abilities["SNOW_WARNING"] = 117] = "SNOW_WARNING";
    Abilities[Abilities["HONEY_GATHER"] = 118] = "HONEY_GATHER";
    Abilities[Abilities["FRISK"] = 119] = "FRISK";
    Abilities[Abilities["RECKLESS"] = 120] = "RECKLESS";
    Abilities[Abilities["MULTITYPE"] = 121] = "MULTITYPE";
    Abilities[Abilities["FLOWER_GIFT"] = 122] = "FLOWER_GIFT";
    Abilities[Abilities["BAD_DREAMS"] = 123] = "BAD_DREAMS";
    Abilities[Abilities["PICKPOCKET"] = 124] = "PICKPOCKET";
    Abilities[Abilities["SHEER_FORCE"] = 125] = "SHEER_FORCE";
    Abilities[Abilities["CONTRARY"] = 126] = "CONTRARY";
    Abilities[Abilities["UNNERVE"] = 127] = "UNNERVE";
    Abilities[Abilities["DEFIANT"] = 128] = "DEFIANT";
    Abilities[Abilities["DEFEATIST"] = 129] = "DEFEATIST";
    Abilities[Abilities["CURSED_BODY"] = 130] = "CURSED_BODY";
    Abilities[Abilities["HEALER"] = 131] = "HEALER";
    Abilities[Abilities["FRIEND_GUARD"] = 132] = "FRIEND_GUARD";
    Abilities[Abilities["WEAK_ARMOR"] = 133] = "WEAK_ARMOR";
    Abilities[Abilities["HEAVY_METAL"] = 134] = "HEAVY_METAL";
    Abilities[Abilities["LIGHT_METAL"] = 135] = "LIGHT_METAL";
    Abilities[Abilities["MULTISCALE"] = 136] = "MULTISCALE";
    Abilities[Abilities["TOXIC_BOOST"] = 137] = "TOXIC_BOOST";
    Abilities[Abilities["FLARE_BOOST"] = 138] = "FLARE_BOOST";
    Abilities[Abilities["HARVEST"] = 139] = "HARVEST";
    Abilities[Abilities["TELEPATHY"] = 140] = "TELEPATHY";
    Abilities[Abilities["MOODY"] = 141] = "MOODY";
    Abilities[Abilities["OVERCOAT"] = 142] = "OVERCOAT";
    Abilities[Abilities["POISON_TOUCH"] = 143] = "POISON_TOUCH";
    Abilities[Abilities["REGENERATOR"] = 144] = "REGENERATOR";
    Abilities[Abilities["BIG_PECKS"] = 145] = "BIG_PECKS";
    Abilities[Abilities["SAND_RUSH"] = 146] = "SAND_RUSH";
    Abilities[Abilities["WONDER_SKIN"] = 147] = "WONDER_SKIN";
    Abilities[Abilities["ANALYTIC"] = 148] = "ANALYTIC";
    Abilities[Abilities["ILLUSION"] = 149] = "ILLUSION";
    Abilities[Abilities["IMPOSTER"] = 150] = "IMPOSTER";
    Abilities[Abilities["INFILTRATOR"] = 151] = "INFILTRATOR";
    Abilities[Abilities["MUMMY"] = 152] = "MUMMY";
    Abilities[Abilities["MOXIE"] = 153] = "MOXIE";
    Abilities[Abilities["JUSTIFIED"] = 154] = "JUSTIFIED";
    Abilities[Abilities["RATTLED"] = 155] = "RATTLED";
    Abilities[Abilities["MAGIC_BOUNCE"] = 156] = "MAGIC_BOUNCE";
    Abilities[Abilities["SAP_SIPPER"] = 157] = "SAP_SIPPER";
    Abilities[Abilities["PRANKSTER"] = 158] = "PRANKSTER";
    Abilities[Abilities["SAND_FORCE"] = 159] = "SAND_FORCE";
    Abilities[Abilities["IRON_BARBS"] = 160] = "IRON_BARBS";
    Abilities[Abilities["ZEN_MODE"] = 161] = "ZEN_MODE";
    Abilities[Abilities["VICTORY_STAR"] = 162] = "VICTORY_STAR";
    Abilities[Abilities["TURBOBLAZE"] = 163] = "TURBOBLAZE";
    Abilities[Abilities["TERAVOLT"] = 164] = "TERAVOLT";
    Abilities[Abilities["AROMA_VEIL"] = 165] = "AROMA_VEIL";
    Abilities[Abilities["FLOWER_VEIL"] = 166] = "FLOWER_VEIL";
    Abilities[Abilities["CHEEK_POUCH"] = 167] = "CHEEK_POUCH";
    Abilities[Abilities["PROTEAN"] = 168] = "PROTEAN";
    Abilities[Abilities["FUR_COAT"] = 169] = "FUR_COAT";
    Abilities[Abilities["MAGICIAN"] = 170] = "MAGICIAN";
    Abilities[Abilities["BULLETPROOF"] = 171] = "BULLETPROOF";
    Abilities[Abilities["COMPETITIVE"] = 172] = "COMPETITIVE";
    Abilities[Abilities["STRONG_JAW"] = 173] = "STRONG_JAW";
    Abilities[Abilities["REFRIGERATE"] = 174] = "REFRIGERATE";
    Abilities[Abilities["SWEET_VEIL"] = 175] = "SWEET_VEIL";
    Abilities[Abilities["STANCE_CHANGE"] = 176] = "STANCE_CHANGE";
    Abilities[Abilities["GALE_WINGS"] = 177] = "GALE_WINGS";
    Abilities[Abilities["MEGA_LAUNCHER"] = 178] = "MEGA_LAUNCHER";
    Abilities[Abilities["GRASS_PELT"] = 179] = "GRASS_PELT";
    Abilities[Abilities["SYMBIOSIS"] = 180] = "SYMBIOSIS";
    Abilities[Abilities["TOUGH_CLAWS"] = 181] = "TOUGH_CLAWS";
    Abilities[Abilities["PIXILATE"] = 182] = "PIXILATE";
    Abilities[Abilities["GOOEY"] = 183] = "GOOEY";
    Abilities[Abilities["AERILATE"] = 184] = "AERILATE";
    Abilities[Abilities["PARENTAL_BOND"] = 185] = "PARENTAL_BOND";
    Abilities[Abilities["DARK_AURA"] = 186] = "DARK_AURA";
    Abilities[Abilities["FAIRY_AURA"] = 187] = "FAIRY_AURA";
    Abilities[Abilities["AURA_BREAK"] = 188] = "AURA_BREAK";
    Abilities[Abilities["PRIMORDIAL_SEA"] = 189] = "PRIMORDIAL_SEA";
    Abilities[Abilities["DESOLATE_LAND"] = 190] = "DESOLATE_LAND";
    Abilities[Abilities["DELTA_STREAM"] = 191] = "DELTA_STREAM";
    Abilities[Abilities["STAMINA"] = 192] = "STAMINA";
    Abilities[Abilities["WIMP_OUT"] = 193] = "WIMP_OUT";
    Abilities[Abilities["EMERGENCY_EXIT"] = 194] = "EMERGENCY_EXIT";
    Abilities[Abilities["WATER_COMPACTION"] = 195] = "WATER_COMPACTION";
    Abilities[Abilities["MERCILESS"] = 196] = "MERCILESS";
    Abilities[Abilities["SHIELDS_DOWN"] = 197] = "SHIELDS_DOWN";
    Abilities[Abilities["STAKEOUT"] = 198] = "STAKEOUT";
    Abilities[Abilities["WATER_BUBBLE"] = 199] = "WATER_BUBBLE";
    Abilities[Abilities["STEELWORKER"] = 200] = "STEELWORKER";
    Abilities[Abilities["BERSERK"] = 201] = "BERSERK";
    Abilities[Abilities["SLUSH_RUSH"] = 202] = "SLUSH_RUSH";
    Abilities[Abilities["LONG_REACH"] = 203] = "LONG_REACH";
    Abilities[Abilities["LIQUID_VOICE"] = 204] = "LIQUID_VOICE";
    Abilities[Abilities["TRIAGE"] = 205] = "TRIAGE";
    Abilities[Abilities["GALVANIZE"] = 206] = "GALVANIZE";
    Abilities[Abilities["SURGE_SURFER"] = 207] = "SURGE_SURFER";
    Abilities[Abilities["SCHOOLING"] = 208] = "SCHOOLING";
    Abilities[Abilities["DISGUISE"] = 209] = "DISGUISE";
    Abilities[Abilities["BATTLE_BOND"] = 210] = "BATTLE_BOND";
    Abilities[Abilities["POWER_CONSTRUCT"] = 211] = "POWER_CONSTRUCT";
    Abilities[Abilities["CORROSION"] = 212] = "CORROSION";
    Abilities[Abilities["COMATOSE"] = 213] = "COMATOSE";
    Abilities[Abilities["QUEENLY_MAJESTY"] = 214] = "QUEENLY_MAJESTY";
    Abilities[Abilities["INNARDS_OUT"] = 215] = "INNARDS_OUT";
    Abilities[Abilities["DANCER"] = 216] = "DANCER";
    Abilities[Abilities["BATTERY"] = 217] = "BATTERY";
    Abilities[Abilities["FLUFFY"] = 218] = "FLUFFY";
    Abilities[Abilities["DAZZLING"] = 219] = "DAZZLING";
    Abilities[Abilities["SOUL_HEART"] = 220] = "SOUL_HEART";
    Abilities[Abilities["TANGLING_HAIR"] = 221] = "TANGLING_HAIR";
    Abilities[Abilities["RECEIVER"] = 222] = "RECEIVER";
    Abilities[Abilities["POWER_OF_ALCHEMY"] = 223] = "POWER_OF_ALCHEMY";
    Abilities[Abilities["BEAST_BOOST"] = 224] = "BEAST_BOOST";
    Abilities[Abilities["RKS_SYSTEM"] = 225] = "RKS_SYSTEM";
    Abilities[Abilities["ELECTRIC_SURGE"] = 226] = "ELECTRIC_SURGE";
    Abilities[Abilities["PSYCHIC_SURGE"] = 227] = "PSYCHIC_SURGE";
    Abilities[Abilities["MISTY_SURGE"] = 228] = "MISTY_SURGE";
    Abilities[Abilities["GRASSY_SURGE"] = 229] = "GRASSY_SURGE";
    Abilities[Abilities["FULL_METAL_BODY"] = 230] = "FULL_METAL_BODY";
    Abilities[Abilities["SHADOW_SHIELD"] = 231] = "SHADOW_SHIELD";
    Abilities[Abilities["PRISM_ARMOR"] = 232] = "PRISM_ARMOR";
    Abilities[Abilities["NEUROFORCE"] = 233] = "NEUROFORCE";
    Abilities[Abilities["INTREPID_SWORD"] = 234] = "INTREPID_SWORD";
    Abilities[Abilities["DAUNTLESS_SHIELD"] = 235] = "DAUNTLESS_SHIELD";
    Abilities[Abilities["LIBERO"] = 236] = "LIBERO";
    Abilities[Abilities["BALL_FETCH"] = 237] = "BALL_FETCH";
    Abilities[Abilities["COTTON_DOWN"] = 238] = "COTTON_DOWN";
    Abilities[Abilities["PROPELLER_TAIL"] = 239] = "PROPELLER_TAIL";
    Abilities[Abilities["MIRROR_ARMOR"] = 240] = "MIRROR_ARMOR";
    Abilities[Abilities["GULP_MISSILE"] = 241] = "GULP_MISSILE";
    Abilities[Abilities["STALWART"] = 242] = "STALWART";
    Abilities[Abilities["STEAM_ENGINE"] = 243] = "STEAM_ENGINE";
    Abilities[Abilities["PUNK_ROCK"] = 244] = "PUNK_ROCK";
    Abilities[Abilities["SAND_SPIT"] = 245] = "SAND_SPIT";
    Abilities[Abilities["ICE_SCALES"] = 246] = "ICE_SCALES";
    Abilities[Abilities["RIPEN"] = 247] = "RIPEN";
    Abilities[Abilities["ICE_FACE"] = 248] = "ICE_FACE";
    Abilities[Abilities["POWER_SPOT"] = 249] = "POWER_SPOT";
    Abilities[Abilities["MIMICRY"] = 250] = "MIMICRY";
    Abilities[Abilities["SCREEN_CLEANER"] = 251] = "SCREEN_CLEANER";
    Abilities[Abilities["STEELY_SPIRIT"] = 252] = "STEELY_SPIRIT";
    Abilities[Abilities["PERISH_BODY"] = 253] = "PERISH_BODY";
    Abilities[Abilities["WANDERING_SPIRIT"] = 254] = "WANDERING_SPIRIT";
    Abilities[Abilities["GORILLA_TACTICS"] = 255] = "GORILLA_TACTICS";
    Abilities[Abilities["NEUTRALIZING_GAS"] = 256] = "NEUTRALIZING_GAS";
    Abilities[Abilities["PASTEL_VEIL"] = 257] = "PASTEL_VEIL";
    Abilities[Abilities["HUNGER_SWITCH"] = 258] = "HUNGER_SWITCH";
    Abilities[Abilities["QUICK_DRAW"] = 259] = "QUICK_DRAW";
    Abilities[Abilities["UNSEEN_FIST"] = 260] = "UNSEEN_FIST";
    Abilities[Abilities["CURIOUS_MEDICINE"] = 261] = "CURIOUS_MEDICINE";
    Abilities[Abilities["TRANSISTOR"] = 262] = "TRANSISTOR";
    Abilities[Abilities["DRAGONS_MAW"] = 263] = "DRAGONS_MAW";
    Abilities[Abilities["CHILLING_NEIGH"] = 264] = "CHILLING_NEIGH";
    Abilities[Abilities["GRIM_NEIGH"] = 265] = "GRIM_NEIGH";
    Abilities[Abilities["AS_ONE_GLASTRIER"] = 266] = "AS_ONE_GLASTRIER";
    Abilities[Abilities["AS_ONE_SPECTRIER"] = 267] = "AS_ONE_SPECTRIER";
    Abilities[Abilities["LINGERING_AROMA"] = 268] = "LINGERING_AROMA";
    Abilities[Abilities["SEED_SOWER"] = 269] = "SEED_SOWER";
    Abilities[Abilities["THERMAL_EXCHANGE"] = 270] = "THERMAL_EXCHANGE";
    Abilities[Abilities["ANGER_SHELL"] = 271] = "ANGER_SHELL";
    Abilities[Abilities["PURIFYING_SALT"] = 272] = "PURIFYING_SALT";
    Abilities[Abilities["WELL_BAKED_BODY"] = 273] = "WELL_BAKED_BODY";
    Abilities[Abilities["WIND_RIDER"] = 274] = "WIND_RIDER";
    Abilities[Abilities["GUARD_DOG"] = 275] = "GUARD_DOG";
    Abilities[Abilities["ROCKY_PAYLOAD"] = 276] = "ROCKY_PAYLOAD";
    Abilities[Abilities["WIND_POWER"] = 277] = "WIND_POWER";
    Abilities[Abilities["ZERO_TO_HERO"] = 278] = "ZERO_TO_HERO";
    Abilities[Abilities["COMMANDER"] = 279] = "COMMANDER";
    Abilities[Abilities["ELECTROMORPHOSIS"] = 280] = "ELECTROMORPHOSIS";
    Abilities[Abilities["PROTOSYNTHESIS"] = 281] = "PROTOSYNTHESIS";
    Abilities[Abilities["QUARK_DRIVE"] = 282] = "QUARK_DRIVE";
    Abilities[Abilities["GOOD_AS_GOLD"] = 283] = "GOOD_AS_GOLD";
    Abilities[Abilities["VESSEL_OF_RUIN"] = 284] = "VESSEL_OF_RUIN";
    Abilities[Abilities["SWORD_OF_RUIN"] = 285] = "SWORD_OF_RUIN";
    Abilities[Abilities["TABLETS_OF_RUIN"] = 286] = "TABLETS_OF_RUIN";
    Abilities[Abilities["BEADS_OF_RUIN"] = 287] = "BEADS_OF_RUIN";
    Abilities[Abilities["ORICHALCUM_PULSE"] = 288] = "ORICHALCUM_PULSE";
    Abilities[Abilities["HADRON_ENGINE"] = 289] = "HADRON_ENGINE";
    Abilities[Abilities["OPPORTUNIST"] = 290] = "OPPORTUNIST";
    Abilities[Abilities["CUD_CHEW"] = 291] = "CUD_CHEW";
    Abilities[Abilities["SHARPNESS"] = 292] = "SHARPNESS";
    Abilities[Abilities["SUPREME_OVERLORD"] = 293] = "SUPREME_OVERLORD";
    Abilities[Abilities["COSTAR"] = 294] = "COSTAR";
    Abilities[Abilities["TOXIC_DEBRIS"] = 295] = "TOXIC_DEBRIS";
    Abilities[Abilities["ARMOR_TAIL"] = 296] = "ARMOR_TAIL";
    Abilities[Abilities["EARTH_EATER"] = 297] = "EARTH_EATER";
    Abilities[Abilities["MYCELIUM_MIGHT"] = 298] = "MYCELIUM_MIGHT";
    Abilities[Abilities["MINDS_EYE"] = 299] = "MINDS_EYE";
    Abilities[Abilities["SUPERSWEET_SYRUP"] = 300] = "SUPERSWEET_SYRUP";
    Abilities[Abilities["HOSPITALITY"] = 301] = "HOSPITALITY";
    Abilities[Abilities["TOXIC_CHAIN"] = 302] = "TOXIC_CHAIN";
    Abilities[Abilities["EMBODY_ASPECT_TEAL"] = 303] = "EMBODY_ASPECT_TEAL";
    Abilities[Abilities["EMBODY_ASPECT_WELLSPRING"] = 304] = "EMBODY_ASPECT_WELLSPRING";
    Abilities[Abilities["EMBODY_ASPECT_HEARTHFLAME"] = 305] = "EMBODY_ASPECT_HEARTHFLAME";
    Abilities[Abilities["EMBODY_ASPECT_CORNERSTONE"] = 306] = "EMBODY_ASPECT_CORNERSTONE";
    Abilities[Abilities["TERA_SHIFT"] = 307] = "TERA_SHIFT";
    Abilities[Abilities["TERA_SHELL"] = 308] = "TERA_SHELL";
    Abilities[Abilities["TERAFORM_ZERO"] = 309] = "TERAFORM_ZERO";
    Abilities[Abilities["POISON_PUPPETEER"] = 310] = "POISON_PUPPETEER";
})(Abilities || (Abilities = {}));

let Nature;
(function (Nature) {
    Nature[Nature["HARDY"] = 0] = "HARDY";
    Nature[Nature["LONELY"] = 1] = "LONELY";
    Nature[Nature["BRAVE"] = 2] = "BRAVE";
    Nature[Nature["ADAMANT"] = 3] = "ADAMANT";
    Nature[Nature["NAUGHTY"] = 4] = "NAUGHTY";
    Nature[Nature["BOLD"] = 5] = "BOLD";
    Nature[Nature["DOCILE"] = 6] = "DOCILE";
    Nature[Nature["RELAXED"] = 7] = "RELAXED";
    Nature[Nature["IMPISH"] = 8] = "IMPISH";
    Nature[Nature["LAX"] = 9] = "LAX";
    Nature[Nature["TIMID"] = 10] = "TIMID";
    Nature[Nature["HASTY"] = 11] = "HASTY";
    Nature[Nature["SERIOUS"] = 12] = "SERIOUS";
    Nature[Nature["JOLLY"] = 13] = "JOLLY";
    Nature[Nature["NAIVE"] = 14] = "NAIVE";
    Nature[Nature["MODEST"] = 15] = "MODEST";
    Nature[Nature["MILD"] = 16] = "MILD";
    Nature[Nature["QUIET"] = 17] = "QUIET";
    Nature[Nature["BASHFUL"] = 18] = "BASHFUL";
    Nature[Nature["RASH"] = 19] = "RASH";
    Nature[Nature["CALM"] = 20] = "CALM";
    Nature[Nature["GENTLE"] = 21] = "GENTLE";
    Nature[Nature["SASSY"] = 22] = "SASSY";
    Nature[Nature["CAREFUL"] = 23] = "CAREFUL";
    Nature[Nature["QUIRKY"] = 24] = "QUIRKY";
})(Nature || (Nature = {}));

let WeatherType;
(function (WeatherType) {
    WeatherType[WeatherType["NONE"] = 0] = "NONE";
    WeatherType[WeatherType["SUNNY"] = 1] = "SUNNY";
    WeatherType[WeatherType["RAIN"] = 2] = "RAIN";
    WeatherType[WeatherType["SANDSTORM"] = 3] = "SANDSTORM";
    WeatherType[WeatherType["HAIL"] = 4] = "HAIL";
    WeatherType[WeatherType["SNOW"] = 5] = "SNOW";
    WeatherType[WeatherType["FOG"] = 6] = "FOG";
    WeatherType[WeatherType["HEAVY_RAIN"] = 7] = "HEAVY_RAIN";
    WeatherType[WeatherType["HARSH_SUN"] = 8] = "HARSH_SUN";
    WeatherType[WeatherType["STRONG_WINDS"] = 9] = "STRONG_WINDS";
})(WeatherType || (WeatherType = {}));

function getPokemonSpriteURL(id) {
  // Construct the sprite URL based on the Pokemon ID
  const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return spriteURL;
}

// Function to get Pokémon type
async function getPokeType(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const types = data.types.map(type => type.type.name);
    return types;
  } catch (error) {
    console.error('Error fetching Pokémon type:', error);
    return null;
  }
}

// Function to get type effectiveness
async function getTypeEffectiveness(type) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    return data.damage_relations;
  } catch (error) {
    console.error(`Error fetching type effectiveness for ${type}:`, error);
    return null;
  }
}

// Function to calculate weaknesses, resistances, and immunities
async function calculateTypeEffectiveness(types) {
  const typeEffectiveness = await Promise.all(types.map(getTypeEffectiveness));
  if (typeEffectiveness.some(data => data === null)) {
    return null;
  }

  const weaknesses = new Set();
  const resistances = new Set();
  const immunities = new Set();

  if (types.length === 1) {
    const data = typeEffectiveness[0];
    data.double_damage_from.forEach(t => weaknesses.add(t.name));
    data.half_damage_from.forEach(t => resistances.add(t.name));
    data.no_damage_from.forEach(t => immunities.add(t.name));
  } else if (types.length === 2) {
    const [type1, type2] = types;
    const type1Effectiveness = typeEffectiveness[0];
    const type2Effectiveness = typeEffectiveness[1];

    // Calculate weaknesses
    type1Effectiveness.double_damage_from.forEach(t => {
      if (!type2Effectiveness.half_damage_from.some(r => r.name === t.name)) {
        weaknesses.add(t.name)
      }
    });
    type2Effectiveness.double_damage_from.forEach(t => {
      if (!type1Effectiveness.half_damage_from.some(r => r.name === t.name)) {
        weaknesses.add(t.name)
      }
    });

    // Calculate resistances
    type1Effectiveness.half_damage_from.forEach(t => {
      if (!type2Effectiveness.double_damage_from.some(r => r.name === t.name)) {
        resistances.add(t.name)
      }
    });

    type2Effectiveness.half_damage_from.forEach(t => {
      if (!type1Effectiveness.double_damage_from.some(r => r.name === t.name)) {
        resistances.add(t.name)
      }
    });

    // Calculate immunities
    type1Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))
    type2Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))
  }

  return { weaknesses, resistances, immunities };
}


// Example usage
async function getPokemonTypeEffectiveness(id) {
  const types = await getPokeType(id);
  if (types) {
    const { weaknesses, resistances, immunities } = await calculateTypeEffectiveness(types);
    return { 
      'weaknesses': weaknesses, 
      'resistances': resistances, 
      'immunities': immunities 
    }
  }
  return {}
}

function updateDiv(pokemon, weather, message) {
  browserApi.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browserApi.tabs.sendMessage(tabs[0].id, { type: message, pokemon: pokemon, weather: weather }, (response) => {
      if (response && response.success) {
          console.log('Div updated successfully');
      } else {
        console.error('Failed to update div');
      }
    });
  });
}


function findBasePokemon(pokemonName) {
    let currentName = pokemonName;
    while (preEvolutions[currentName] !== undefined) {
        currentName = preEvolutions[currentName];
    }
    return currentName;
}

let SpeciesNumberToName = {};
for (const [key, value] of Object.entries(Species)) {
    SpeciesNumberToName[value] = key;
}



function convertPokemonId(pokemonId) {
  const conversionList = {
    2019: 10091,
    2020: 10092,
    2026: 10100,
    2027: 10101,
    2028: 10102,
    2037: 10103,
    2038: 10104,
    2050: 10105,
    2051: 10106,
    2052: 10107,
    2053: 10108,
    2074: 10109,
    2075: 10110,
    2076: 10111,
    2088: 10112,
    2089: 10113,
    2103: 10114,
    2105: 10115,
    2670: 10061,
    4052: 10162,
    4077: 10163,
    4078: 10164,
    4079: 10165,
    4080: 10166,
    4083: 10167,
    4110: 10168,
    4122: 10169,
    4144: 10170,
    4145: 10171,
    4146: 10172,
    4199: 10173,
    4222: 10174,
    4263: 10175,
    4264: 10176,
    4554: 10177,
    4555: 10178,
    4562: 10179,
    4618: 10180,
    6058: 10229,
    6059: 10230,
    6100: 10231,
    6101: 10232,
    6157: 10233,
    6211: 10234,
    6215: 10235,
    6503: 10236,
    6549: 10237,
    6570: 10238,
    6571: 10239,
    6628: 10240,
    6705: 10241,
    6706: 10242,
    6713: 10243,
    6724: 10244,
    8128: 10252,
    8194: 10253,
    8901: 10272
  }
  if (pokemonId in conversionList) {
    return conversionList[pokemonId]
  } else {
    return pokemonId
  }
}

function mapPartyToPokemonArray(party) {
  return party.map(({ species, abilityIndex, nature, ivs }) => ({ species, abilityIndex, nature, ivs }))
}

// function test(){
// console.log("Test Function Hit");
// browserApi.storage.sync.
// }

const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary

// function getSessionData() {
//     // Retrieve the 'sessionData' from chrome.storage
//     return new Promise((resolve, reject) => {
//         browserApi.storage.local.get('sessionData', (data) => {
//             if (data.sessionData) {
//                 try {
//                     let sessionData;
//                     if (bypassLogin) {
//                         // Decode the session data using base64
//                         const decodedString = atob(data.sessionData);
//                         sessionData = JSON.parse(decodedString);
//                     } else {
//                         // Decrypt the session data using AES
//                         const decryptedString = AES.decrypt(data.sessionData, saveKey).toString(enc.Utf8);
//                         sessionData = JSON.parse(decryptedString);
//                     }
//                     console.log(sessionData);
//
//                     // Resolve the promise with the parsed session data
//                     resolve(sessionData);
//                 } catch (error) {
//                     console.error('Error parsing session data:', error);
//                     reject(error);
//                 }
//             } else {
//                 console.log('Session data not found in chrome.storage');
//                 resolve(null);
//             }
//         });
//     });
// }
// browserApi.storage.onChanged.addListener(
//     (changes, areaName)=>{
//         console.log(areaName);
//         console.log(changes);
//
//         // getSessionData();
//     }
// )

function onLocalDataChanged(){

}
//test();

// message can be either "UPDATE_ALLIES_DIV" or "UPDATE_ENEMIES_DIV"
async function appendPokemonArrayToDiv(pokemonArray, arena, message) {
    browserApi.storage.sync.get(['showItems'], (showData) => {
        let showItems = showData.showItems || {};
        let showEnemies = showItems.enemies || false;
        let showParty = showItems.party || false;

        // Call appendPokemonArrayToDiv for enemies only if showEnemies is true
        if (showEnemies && message === "UPDATE_ENEMIES_DIV" || showParty && message === "UPDATE_ALLIES_DIV") {
            let frontendPokemonArray = []
            pokemonArray.forEach((pokemon) => {
                const pokemonId = convertPokemonId(pokemon.species)
                let weather = {}
                    if (arena.weather && arena.weather.weatherType) {
                        weather = {
                            'type': WeatherType[arena.weather.weatherType],
                            'turnsLeft': arena.weather.turnsLeft || 0
                        }
                    }
                getPokemonTypeEffectiveness(pokemonId).then((typeEffectiveness) => {
                    console.log("Got pokemon", pokemonId, "type effectiveness", typeEffectiveness);
                    let basePokemon = findBasePokemon(SpeciesNumberToName[pokemon.species]);
                    frontendPokemonArray.push({
                        'id': pokemon.species,
                        'name': SpeciesNumberToName[pokemon.species],
                        'typeEffectiveness': {
                            'weaknesses': Array.from(typeEffectiveness.weaknesses),
                            'resistances': Array.from(typeEffectiveness.resistances),
                            'immunities': Array.from(typeEffectiveness.immunities)
                        },
                        'ivs': pokemon.ivs,
                        'ability': Abilities[pokemon.abilityIndex],
                        'nature': Nature[pokemon.nature],
                        'basePokemon': basePokemon,
                        'baseId': Species[basePokemon]
                    })
                    updateDiv(frontendPokemonArray, weather, message)
                })
            })
        }
    });
}



browserApi.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    console.log(request.extra);
  // Happens when loading a savegame or continuing an old run
  if (request.type == 'GET_SAVEDATA') {
      appendPokemonArrayToDiv(mapPartyToPokemonArray(request.data.enemyParty), request.data.arena, "UPDATE_ENEMIES_DIV")
      appendPokemonArrayToDiv(mapPartyToPokemonArray(request.data.party), request.data.arena, "UPDATE_ALLIES_DIV")
  }
    if(request.type == 'GET_SAVEDATA_2'){
        console.log("*&^&**");
        console.log("Received update save data", request.data);
        console.log("*&^&**");
    }
    if(request.type === `GET_LOCALDATA`){
        const decryptedString = CryptoJS.AES.decrypt(request.data, saveKey).toString(CryptoJS.enc.Utf8);
        let sessionData = JSON.parse(decryptedString);
        console.log("Setting from Local Data");
        console.log(sessionData);
        appendPokemonArrayToDiv(mapPartyToPokemonArray(sessionData.enemyParty), sessionData.arena, "UPDATE_ENEMIES_DIV")
        appendPokemonArrayToDiv(mapPartyToPokemonArray(sessionData.party), sessionData.arena, "UPDATE_ALLIES_DIV")
    }
    if(request.type === "BCK_READ_LOCAL_STORAGE"){
        console.log("BCK_READ_LOCAL_STORAGE Hit");
    }
});

browserApi.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method === 'POST') {
            try {
                let sessionData = JSON.parse(new TextDecoder().decode(details.requestBody.raw[0].bytes))
                console.log("POST Session data:", sessionData)
                if (details.url.includes("updateall")) sessionData = sessionData.session
                appendPokemonArrayToDiv(mapPartyToPokemonArray(sessionData.enemyParty), sessionData.arena, "UPDATE_ENEMIES_DIV")
                appendPokemonArrayToDiv(mapPartyToPokemonArray(sessionData.party), sessionData.arena, "UPDATE_ALLIES_DIV")
            } catch (e) {
                console.error("Error while intercepting web request: ", e)
            }
        }
    },
    {
        urls: ['https://api.pokerogue.net/savedata/update?datatype=1*', 'https://api.pokerogue.net/savedata/updateall']
    },
    ["requestBody"]
)

browserApi.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        if (details.url.includes('api.pokerogue.net/savedata/get?datatype=0')) {
            const requestBody = new TextDecoder("utf-8").decode(details.requestBody.raw[0].bytes);
            window.postMessage({ type: 'GET_SAVEDATA_2', data: JSON.parse(requestBody) }, '*');
        }
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ['*://api.pokerogue.net/*'] },
    ['blocking', 'requestHeaders', 'extraHeaders']
);