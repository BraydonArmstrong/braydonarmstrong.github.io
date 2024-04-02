let width = 500;
let height = 500;
monWidth = 56;
monHeight = 56;
/*
 * 0 Normal
 * 1 Fire
 * 2 Water
 * 3 Grass
 * 4 Electric
 * 5 Poison
 * 6 Ground
 * 7 Psychic
 * 8 Bug
 * 9 Dark
 */
let typechart = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0.5, 0.5, 2, 1, 1, 1, 1, 2, 1],
	[1, 2, 0.5, 0.5, 1, 1, 2, 1, 1, 1],
	[1, 0.5, 2, 0.5, 1, 0.5, 1, 1, 0.5, 1],
	[1, 1, 2, 0.5, 0.5, 1, 0, 1, 1, 1],
	[1, 1, 1, 2, 1, 0.5, 0.5, 1, 1, 1],
	[1, 2, 1, 0.5, 2, 2, 1, 1, 0.5, 1],
	[1, 1, 1, 1, 1, 2, 1, 0.5, 1, 0],
	[1, 0.5, 1, 2, 1, 0.5, 1, 2, 1, 2],
	[1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5]
];
let Images = [];
let Tiles = [];
canLearn = [];
canEvolve = [];

const Monster = {
	id: 0,
	level: 0,
	type1: 0,
	type2: 0,
	health: 0,
	currhealth: 0,
	attack: 0,
	spattack: 0,
	defense: 0,
	spdefense: 0,
	speed: 0,
	currxp: 0,
	xp: 0,
	yoff1: 0,
	yoff2: 0,
	moves: [-1, -1, -1, -1],
	movespp: [-1,-1,-1,-1],
	evo: 0,
	learnset: new Array(100),
	levelUp: function(ind)
	{
		this.currxp -= this.xp;
		this.level += 1;
		if(this.learnset[this.level] != null)
		{
			canLearn.push(ind);
		}
		if(this.evo != -1)
		{
			if(this.level > this.evo)
			{
				canEvolve.push(ind);
			}
		}
		oldhealth = this.health;
		this.calcStats();
		this.currhealth += this.health - oldhealth;
	},
	evolve: function()
	{
		this.id++;
		this.name = Mons[this.id].name;
		this.evo = Mons[this.id].evo;
		hasloaded = false;
		this.calcStats();
		this.currhealth = this.health;
	},
	calcStats: function()
	{
		
		this.xp = Math.floor((4*((this.level+1)**3))/5) - Math.floor((4*((this.level)**3))/5);
		this.health = Math.floor(((Mons[this.id].health * 2) * this.level) / 100 + this.level + 10);
		this.attack = Math.floor(((Mons[this.id].attack * 2) * this.level) / 100 + 5);
		this.defense = Math.floor(((Mons[this.id].defense * 2) * this.level) / 100 + 5);
		this.spattack = Math.floor(((Mons[this.id].spattack * 2) * this.level) / 100 + 5);
		this.spdefense = Math.floor(((Mons[this.id].spdefense * 2) * this.level) / 100 + 5);
		this.speed = Math.floor(((Mons[this.id].speed * 2) * this.level) / 100 + 5);
	}
};
const Move = {
	name: "",
	type: 0,
	moveType: 0,
	damage: 0,
	effect: 0,
	pp: 0,
	currpp: 0,
	accuracy: 0,
	dmgtype: 0,
};
const Tile = {
	id: 0,
	x: 0,
	y: 0,
	isSolid: false,
	isGrass: false,
	isSatchel: false,
	heldItem: -1,
	isLip: false,
	isDoor: false,
	isPassable: false,
};
Mons = [];
for (let i = 0; i < 34; i++)
{
	Mons.push(Object.create(Monster));
	Mons[i].name = "";
	Mons[i].yoff1 = 0;
	Mons[i].yoff2 = 0;
	Mons[i].dex = "";
	Mons[i].moves = [null, null, null, null];
	Mons[i].movespp = [null, null, null, null];
	Mons[i].type1 = 0;
	Mons[i].type2 = 1;
	Mons[i].level = 0;
	Mons[i].health = 50;
	Mons[i].learnset = new Array(100);
	Mons[i].currhealth = Mons[i].health;
	Mons[i].attack = 5;
	Mons[i].defense = 5;
	Mons[i].spdefense = 5;
	Mons[i].spattack = 5;
	Mons[i].speed = 5;
	Mons[i].id = i;
	Mons[i].evo = -1;
}
/*
 * 0 Normal
 * 1 Fire
 * 2 Water
 * 3 Grass
 * 4 Electric
 * 5 Poison
 * 6 Ground
 * 7 Psychic
 * 8 Bug
 * 9 Dark
 */
start = 0;
Mons[start].name = "Woodzar";
Mons[start].dex = "Although young it has quite the aptitude for literature, reading grimoires and tomes to enhance it's abilities";
Mons[start].type1 = 3;
Mons[start].type2 = null;
Mons[start].health = 54;
Mons[start].attack = 45;
Mons[start].defense = 50;
Mons[start].spattack = 60;
Mons[start].spdefense = 55;
Mons[start].speed = 55;
Mons[start].evo = 16;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 1;
Mons[start].learnset[8] = 2;
Mons[start].learnset[16] = 12;
Mons[start].learnset[25] = 16;
Mons[start].learnset[30] = 11;
Mons[start].learnset[36] = 29;
start++
Mons[start].name = "Barklock";
Mons[start].dex = "Due to it's training when it was younger it has learned many spells and can create large blasts to scare off any would-be predators";
Mons[start].type1 = 3;
Mons[start].type2 = 7;
Mons[start].health = 65;
Mons[start].attack = 55;
Mons[start].defense = 60;
Mons[start].spattack = 80;
Mons[start].spdefense = 75;
Mons[start].speed = 70;
Mons[start].evo = 36;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 1;
Mons[start].learnset[8] = 2;
Mons[start].learnset[16] = 12;
Mons[start].learnset[25] = 16;
Mons[start].learnset[30] = 11;
Mons[start].learnset[36] = 29;
start++;
Mons[start].name = "Twiggdrasil";
Mons[start].dex = "It has reached the highest honor in it's magical arts, being declared an archmage and knowing every spell in the books";
Mons[start].type1 = 3;
Mons[start].type2 = 7;
Mons[start].health = 80;
Mons[start].attack = 70;
Mons[start].defense = 80;
Mons[start].spattack = 120;
Mons[start].spdefense = 90;
Mons[start].speed = 90;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 1;
Mons[start].learnset[8] = 2;
Mons[start].learnset[16] = 12;
Mons[start].learnset[25] = 16;
Mons[start].learnset[30] = 11;
Mons[start].learnset[36] = 29;
start++;
Mons[start].name = "Platypyro";
Mons[start].dex = "Despite it's fiery appearance, Platypyro are known to use venom on those who attack it rather than immediately going for burning";
Mons[start].type1 = 1;
Mons[start].type2 = 5;
Mons[start].health = 64;
Mons[start].attack = 30;
Mons[start].defense = 70;
Mons[start].spattack = 30;
Mons[start].spdefense = 70;
Mons[start].speed = 50;
Mons[start].evo = 16;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 8;
Mons[start].learnset[8] = 4;
Mons[start].learnset[12] = 7;
Mons[start].learnset[24] = 9;
Mons[start].learnset[30] = 20;
Mons[start].learnset[36] = 27;
start++;
Mons[start].name = "Ignatus";
Mons[start].dex = "Its become rather hot-headed, starting to develop stronger toxins but relying more on it's fiery roots";
Mons[start].type1 = 1;
Mons[start].type2 = 5;
Mons[start].health = 85;
Mons[start].attack = 50;
Mons[start].defense = 80;
Mons[start].spattack = 50;
Mons[start].spdefense = 80;
Mons[start].speed = 60;
Mons[start].evo = 36;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 8;
Mons[start].learnset[8] = 4;
Mons[start].learnset[12] = 7;
Mons[start].learnset[24] = 9;
Mons[start].learnset[30] = 20;
Mons[start].learnset[36] = 27;
start++;
Mons[start].name = "Scorapsid";
Mons[start].dex = "Master of both poison and flame, obliterating any opponents who would dare to stand in its path";
Mons[start].type1 = 1;
Mons[start].type2 = 5;
Mons[start].health = 110;
Mons[start].attack = 75;
Mons[start].defense = 100;
Mons[start].spattack = 75;
Mons[start].spdefense = 100;
Mons[start].speed = 70;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 8;
Mons[start].learnset[8] = 4;
Mons[start].learnset[12] = 7;
Mons[start].learnset[24] = 9;
Mons[start].learnset[30] = 20;
Mons[start].learnset[36] = 27;
start++;
Mons[start].name = "Toadart";
Mons[start].dex = "Despite the large cannon mounted on their back, they are actually quite peaceful creatures.";
Mons[start].type1 = 2;
Mons[start].type2 = null;
Mons[start].health = 49;
Mons[start].attack = 55;
Mons[start].defense = 55;
Mons[start].spattack = 40;
Mons[start].spdefense = 50;
Mons[start].speed = 65;
Mons[start].evo = 16;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 15;
Mons[start].learnset[8] = 3;
Mons[start].learnset[16] = 4;
Mons[start].learnset[24] = 19;
Mons[start].learnset[28] = 22;
Mons[start].learnset[32] = 23;
start++;
Mons[start].name = "Frogun";
Mons[start].dex = "Slowly growing less passive towards others it has grown a second cannon along with an overall stronger body.";
Mons[start].type1 = 2;
Mons[start].type2 = null;
Mons[start].health = 65;
Mons[start].attack = 80;
Mons[start].defense = 71;
Mons[start].spattack = 60;
Mons[start].spdefense = 54;
Mons[start].speed = 75;
Mons[start].evo = 32;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 15;
Mons[start].learnset[8] = 3;
Mons[start].learnset[16] = 4;
Mons[start].learnset[24] = 19;
Mons[start].learnset[28] = 22;
Mons[start].learnset[32] = 23;
start++;
Mons[start].name = "Frogangsta";
Mons[start].dex = "It has grown hostile after being exposed to many acts of violence. Ditching its cannons on its back for a single super powered blaster.";
Mons[start].type1 = 2;
Mons[start].type2 = 9;
Mons[start].health = 90;
Mons[start].attack = 120;
Mons[start].defense = 87;
Mons[start].spattack = 70;
Mons[start].spdefense = 63;
Mons[start].speed = 100;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 15;
Mons[start].learnset[8] = 3;
Mons[start].learnset[16] = 4;
Mons[start].learnset[24] = 19;
Mons[start].learnset[28] = 22;
Mons[start].learnset[32] = 23;
start++;
Mons[start].name = "Peckish";
Mons[start].dex = "Peckish struggle to find food, usually staying in packs to possibly survive with a Cooken to help them.";
Mons[start].type1 = 0;
Mons[start].type2 = null;
Mons[start].health = 40;
Mons[start].attack = 40;
Mons[start].defense = 40;
Mons[start].spattack = 31;
Mons[start].spdefense = 40;
Mons[start].speed = 60;
Mons[start].evo = 18;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 15;
Mons[start].learnset[10] = 2;
Mons[start].learnset[16] = 4;
Mons[start].learnset[25] = 26;
Mons[start].learnset[29] = 5;
Mons[start].learnset[36] = 20;
start++;
Mons[start].name = "Cooken";
Mons[start].dex = "As they struggled to find food in their youth, they learned how to procure good food to aid.";
Mons[start].type1 = 0;
Mons[start].type2 = 1;
Mons[start].health = 70;
Mons[start].attack = 55;
Mons[start].defense = 50;
Mons[start].spattack = 34;
Mons[start].spdefense = 50;
Mons[start].speed = 90;
Mons[start].evo = 36;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 15;
Mons[start].learnset[10] = 2;
Mons[start].learnset[16] = 4;
Mons[start].learnset[25] = 26;
Mons[start].learnset[29] = 5;
Mons[start].learnset[36] = 20;
start++;
Mons[start].name = "Satisfowl";
Mons[start].dex = "Learning to cook drove them to eat more and more, not knowing their own limits.";
Mons[start].type1 = 0;
Mons[start].type2 = 1;
Mons[start].health = 100;
Mons[start].attack = 80;
Mons[start].defense = 80;
Mons[start].spattack = 69;
Mons[start].spdefense = 80;
Mons[start].speed = 70;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 15;
Mons[start].learnset[10] = 2;
Mons[start].learnset[16] = 4;
Mons[start].learnset[25] = 26;
Mons[start].learnset[29] = 5;
Mons[start].learnset[36] = 20;
start++;
Mons[start].name = "Ajji";
Mons[start].dex = "A small rabbit that found a tophat, It decided to practice magic, entertaining others by pulling itself out of the hat";
Mons[start].type1 = 7;
Mons[start].type2 = null;
Mons[start].health = 50;
Mons[start].attack = 35;
Mons[start].defense = 50;
Mons[start].spattack = 70;
Mons[start].spdefense = 40;
Mons[start].speed = 65;
Mons[start].evo = 16;
Mons[start].learnset[1] = 12;
Mons[start].learnset[2] = 16;
Mons[start].learnset[10] = 4;
Mons[start].learnset[20] = 3;
Mons[start].learnset[22] = 17;
Mons[start].learnset[26] = 25;
Mons[start].learnset[30] = 9;
start++;
Mons[start].name = "Majji";
Mons[start].dex = "As it has grown it is harder to hide within the hat for it's tricks. It has now started learning more tricks not involving itself";
Mons[start].type1 = 7;
Mons[start].type2 = null;
Mons[start].health = 60;
Mons[start].attack = 50;
Mons[start].defense = 60;
Mons[start].spattack = 95;
Mons[start].spdefense = 50;
Mons[start].speed = 85;
Mons[start].evo = 30;
Mons[start].learnset[1] = 12;
Mons[start].learnset[2] = 16;
Mons[start].learnset[10] = 4;
Mons[start].learnset[20] = 3;
Mons[start].learnset[22] = 17;
Mons[start].learnset[26] = 25;
Mons[start].learnset[30] = 9;
start++;
Mons[start].name = "Tarajji";
Mons[start].dex = "It has much outgrown it's hat so it now decides to wear it. Sometimes will use other Ajji's in it's magic routines";
Mons[start].type1 = 7;
Mons[start].type2 = null;
Mons[start].health = 75;
Mons[start].attack = 70;
Mons[start].defense = 55;
Mons[start].spattack = 140;
Mons[start].spdefense = 45;
Mons[start].speed = 115;
Mons[start].learnset[1] = 12;
Mons[start].learnset[2] = 16;
Mons[start].learnset[10] = 4;
Mons[start].learnset[20] = 3;
Mons[start].learnset[22] = 17;
Mons[start].learnset[26] = 25;
Mons[start].learnset[30] = 9;
start++;
Mons[start].name = "Tailtic";
Mons[start].dex = "A very calm monster, it's hair sticks up due to a large amount of static electricity built up, it can discharge the electricity from it's tails";
Mons[start].type1 = 4;
Mons[start].type2 = null;
Mons[start].health = 50;
Mons[start].attack = 65;
Mons[start].defense = 65;
Mons[start].spattack = 90;
Mons[start].spdefense = 70;
Mons[start].speed = 90;
Mons[start].learnset[1] = 9;
Mons[start].learnset[2] = 6;
Mons[start].learnset[8] = 0;
Mons[start].learnset[14] = 8;
Mons[start].learnset[25] = 2;
Mons[start].learnset[30] = 21;
Mons[start].learnset[36] = 16;
start++;
Mons[start].name = "Mowdy";
Mons[start].dex = "Without arms, Mowdy use their tails to grab things out of reach of their mouth. They like to nibble on wheat.";
Mons[start].yoff1 = 25;
Mons[start].type1 = 0;
Mons[start].type2 = null;
Mons[start].health = 48;
Mons[start].attack = 55;
Mons[start].defense = 35;
Mons[start].spattack = 25;
Mons[start].spdefense = 30;
Mons[start].speed = 60;
Mons[start].evo = 20;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 6;
Mons[start].learnset[12] = 19;
Mons[start].learnset[20] = 26;
Mons[start].learnset[24] = 8;
Mons[start].learnset[29] = 24;
Mons[start].learnset[36] = 23;
start++;
Mons[start].name = "Rodeont";
Mons[start].dex = "They like to capture monsters with their tail who they deem as lawbreakers. Their sense of justice is very skewed.";
Mons[start].yoff1 = 15;
Mons[start].type1 = 0;
Mons[start].type2 = null;
Mons[start].health = 78;
Mons[start].attack = 75;
Mons[start].defense = 60;
Mons[start].spattack = 55;
Mons[start].spdefense = 55;
Mons[start].speed = 90;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 6;
Mons[start].learnset[12] = 19;
Mons[start].learnset[20] = 26;
Mons[start].learnset[24] = 8;
Mons[start].learnset[29] = 24;
Mons[start].learnset[36] = 23;
start++;
Mons[start].name = "Edgehog";
Mons[start].dex = "A very defensive and selfish monster, it likes to manufacture weaponry but it does not fully understand how they function so it is not seen as much of a threat.";
Mons[start].type1 = 9;
Mons[start].type2 = null;
Mons[start].health = 45;
Mons[start].attack = 60;
Mons[start].defense = 55;
Mons[start].spattack = 30;
Mons[start].spdefense = 55;
Mons[start].speed = 60;
Mons[start].evo = 22;
Mons[start].learnset[1] = 13;
Mons[start].learnset[2] = 1;
Mons[start].learnset[10] = 11;
Mons[start].learnset[18] = 19;
Mons[start].learnset[24] = 26;
Mons[start].learnset[27] = 23;
Mons[start].learnset[36] = 24;
start++;
Mons[start].name = "Hedgewolf";
Mons[start].dex = "Trading it's defense for more offensive ability, it has unleashed it's true potential. It no longer needs to forge weapons as it's fists are durable";
Mons[start].type1 = 9;
Mons[start].type2 = null;
Mons[start].health = 85;
Mons[start].attack = 100;
Mons[start].defense = 70;
Mons[start].spattack = 40;
Mons[start].spdefense = 70;
Mons[start].speed = 90;
Mons[start].learnset[1] = 13;
Mons[start].learnset[2] = 1;
Mons[start].learnset[10] = 11;
Mons[start].learnset[18] = 19;
Mons[start].learnset[24] = 26;
Mons[start].learnset[27] = 23;
Mons[start].learnset[36] = 24;
start++;
Mons[start].name = "Bugof";
Mons[start].dex = "Bugof are not fond of human interaction, they fly away as fast as they can just to avoid it.";
Mons[start].type1 = 8;
Mons[start].type2 = null;
Mons[start].health = 30;
Mons[start].attack = 30;
Mons[start].defense = 20;
Mons[start].spattack = 25;
Mons[start].spdefense = 25;
Mons[start].speed = 65;
Mons[start].evo = 7;
Mons[start].learnset[1] = 14;
Mons[start].learnset[2] = 8;
Mons[start].learnset[7] = 5;
Mons[start].learnset[12] = 0;
Mons[start].learnset[20] = 24;
Mons[start].learnset[25] = 6;
Mons[start].learnset[30] = 3;
start++;
Mons[start].name = "Buzzof";
Mons[start].dex = "Buzzof are starting to get fed up with people. Always trying to force themselves to it.";
Mons[start].type1 = 8;
Mons[start].type2 = null;
Mons[start].health = 30;
Mons[start].attack = 40;
Mons[start].defense = 20;
Mons[start].spattack = 25;
Mons[start].spdefense = 25;
Mons[start].speed = 65;
Mons[start].evo = 12;
Mons[start].learnset[1] = 14;
Mons[start].learnset[2] = 8;
Mons[start].learnset[7] = 5;
Mons[start].learnset[12] = 0;
Mons[start].learnset[20] = 24;
Mons[start].learnset[25] = 6;
Mons[start].learnset[30] = 3;
start++;
Mons[start].name = "Buggerof";
Mons[start].dex = "After too many people pestered them they have grown a spike to fend off any annoyances.";
Mons[start].type1 = 8;
Mons[start].type2 = null;
Mons[start].health = 60;
Mons[start].attack = 95;
Mons[start].defense = 60;
Mons[start].spattack = 45;
Mons[start].spdefense = 60;
Mons[start].speed = 75;
Mons[start].learnset[1] = 14;
Mons[start].learnset[2] = 8;
Mons[start].learnset[7] = 5;
Mons[start].learnset[12] = 0;
Mons[start].learnset[20] = 24;
Mons[start].learnset[25] = 6;
Mons[start].learnset[30] = 3;
start++;
Mons[start].name = "Shrude";
Mons[start].dex = "Although it may not have eyes it can see quite well, it was thought to have spread disease in the olden days";
Mons[start].type1 = 0;
Mons[start].type2 = 9;
Mons[start].health = 34;
Mons[start].attack = 42;
Mons[start].defense = 33;
Mons[start].spattack = 60;
Mons[start].spdefense = 33;
Mons[start].speed = 60;
Mons[start].evo = 22;
Mons[start].learnset[1] = 13;
Mons[start].learnset[2] = 0;
Mons[start].learnset[8] = 17;
Mons[start].learnset[15] = 12;
Mons[start].learnset[22] = 23;
Mons[start].learnset[30] = 4;
Mons[start].learnset[34] = 16;
start++;
Mons[start].name = "Corvicious";
Mons[start].dex = "Can create shadowy branches in which to perch on to stalk its prey, it emits an eerie tune that can alert things of it's presence";
Mons[start].type1 = 0;
Mons[start].type2 = 9;
Mons[start].health = 70;
Mons[start].attack = 50;
Mons[start].defense = 66;
Mons[start].spattack = 100;
Mons[start].spdefense = 66;
Mons[start].speed = 90;
Mons[start].learnset[1] = 13;
Mons[start].learnset[2] = 0;
Mons[start].learnset[8] = 17;
Mons[start].learnset[15] = 12;
Mons[start].learnset[22] = 23;
Mons[start].learnset[30] = 4;
Mons[start].learnset[34] = 16;
start++;
Mons[start].name = "Wormse";
Mons[start].dex = "Frankly horrible at everything it attempts to do, it cannot amount to much offense or defense so not very suitable for combat";
Mons[start].type1 = 8;
Mons[start].type2 = 0;
Mons[start].health = 20;
Mons[start].attack = 20;
Mons[start].defense = 20;
Mons[start].spattack = 20;
Mons[start].spdefense = 20;
Mons[start].speed = 95;
Mons[start].evo = 7;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 8;
Mons[start].learnset[7] = 5;
Mons[start].learnset[8] = 10;
Mons[start].learnset[10] = 14;
Mons[start].learnset[18] = 24;
Mons[start].learnset[30] = 22;
start++;
Mons[start].name = "Pupamid";
Mons[start].dex = "It's grown a sadness for being unable to do anything it strives to do. It has formed a shell around itself so that it may atleast have some benefit in combat";
Mons[start].type1 = 8;
Mons[start].type2 = 0;
Mons[start].health = 30;
Mons[start].attack = 10;
Mons[start].defense = 60;
Mons[start].spattack = 25;
Mons[start].spdefense = 60;
Mons[start].speed = 20;
Mons[start].evo = 10;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 8;
Mons[start].learnset[7] = 5;
Mons[start].learnset[8] = 10;
Mons[start].learnset[10] = 14;
Mons[start].learnset[18] = 24;
Mons[start].learnset[30] = 22;
start++;
Mons[start].name = "Betterfly";
Mons[start].dex = "It has achieved perfection, through all of it's hardships it has achieved peak condition. It took it's pain in strides and now continues to grow stronger.";
Mons[start].type1 = 8;
Mons[start].type2 = 0;
Mons[start].health = 65;
Mons[start].attack = 45;
Mons[start].defense = 65;
Mons[start].spattack = 90;
Mons[start].spdefense = 65;
Mons[start].speed = 65;
Mons[start].learnset[1] = 0;
Mons[start].learnset[2] = 8;
Mons[start].learnset[7] = 5;
Mons[start].learnset[8] = 10;
Mons[start].learnset[10] = 14;
Mons[start].learnset[18] = 24;
Mons[start].learnset[30] = 22;
start++;
Mons[start].name = "Squiddimi";
Mons[start].dex = "Quite the prankster, they are known for pulling minor tricks to get a ruse out of people nearby";
Mons[start].type1 = 9;
Mons[start].type2 = 2;
Mons[start].health = 50;
Mons[start].attack = 28;
Mons[start].defense = 48;
Mons[start].spattack = 68;
Mons[start].spdefense = 48;
Mons[start].speed = 58;
Mons[start].evo = 20;
Mons[start].learnset[1] = 13;
Mons[start].learnset[2] = 10;
Mons[start].learnset[8] = 3;
Mons[start].learnset[12] = 17; //(Crime)
Mons[start].learnset[20] = 23; //(Crime)
Mons[start].learnset[26] = 4;  //(Arson)
Mons[start].learnset[32] = 22;
start++;
Mons[start].name = "Squiddnapper";
Mons[start].dex = "As people stopped enjoying it's pranks, it upped the ante by commiting crimes instead, as it found that got more of a rise out of people";
Mons[start].type1 = 9;
Mons[start].type2 = 2;
Mons[start].health = 80;
Mons[start].attack = 38;
Mons[start].defense = 78;
Mons[start].spattack = 88;
Mons[start].spdefense = 78;
Mons[start].speed = 88;
Mons[start].learnset[1] = 13;
Mons[start].learnset[2] = 10;
Mons[start].learnset[8] = 3;
Mons[start].learnset[12] = 17; //(Crime)
Mons[start].learnset[20] = 23; //(Crime)
Mons[start].learnset[26] = 4;  //(Arson)
Mons[start].learnset[32] = 22;
start++;
Mons[start].name = "Shrimple";
Mons[start].dex = "Does not think of much, dwells in caves just relaxing and not doing anything in specific";
Mons[start].type1 = 6;
Mons[start].type2 = null;
Mons[start].health = 75;
Mons[start].attack = 45;
Mons[start].defense = 50;
Mons[start].spattack = 45;
Mons[start].spdefense = 50;
Mons[start].speed = 35;
Mons[start].evo = 15;
Mons[start].learnset[1] = 11;
Mons[start].learnset[2] = 5;
Mons[start].learnset[12] = 4;
Mons[start].learnset[15] = 12;
Mons[start].learnset[25] = 28;
Mons[start].learnset[33] = 10;
Mons[start].learnset[38] = 25;
start++;
Mons[start].name = "Clamplex";
Mons[start].dex = "Its brain has grown much larger, and it can now control things using nothing but it's many thoughts";
Mons[start].type1 = 6;
Mons[start].type2 = 7;
Mons[start].health = 100;
Mons[start].attack = 65;
Mons[start].defense = 60;
Mons[start].spattack = 65;
Mons[start].spdefense = 60;
Mons[start].speed = 45;
Mons[start].evo = 38;
Mons[start].learnset[1] = 11;
Mons[start].learnset[2] = 5;
Mons[start].learnset[12] = 4;
Mons[start].learnset[15] = 12;
Mons[start].learnset[25] = 28;
Mons[start].learnset[33] = 10;
Mons[start].learnset[38] = 25;
start++;
Mons[start].name = "Conchfusing";
Mons[start].dex = "As it's head grew more and more it found a shell to hide it's frail body within. Much more defensive and powerful than it's predecessor";
Mons[start].type1 = 6;
Mons[start].type2 = 7;
Mons[start].health = 120;
Mons[start].attack = 80;
Mons[start].defense = 95;
Mons[start].spattack = 60;
Mons[start].spdefense = 85;
Mons[start].speed = 50;
Mons[start].learnset[1] = 11;
Mons[start].learnset[2] = 5;
Mons[start].learnset[12] = 4;
Mons[start].learnset[15] = 12;
Mons[start].learnset[25] = 28;
Mons[start].learnset[33] = 10;
Mons[start].learnset[38] = 25;
start++;
Mons[start].name = "Claidmourn";
Mons[start].dex = "Likes to trap people within itself. It catches people off guard by sneaking behind them and once inside it splits in half, surprisingly the captive is unharmed";
Mons[start].type1 = 7;
Mons[start].type2 = null;
Mons[start].health = 80;
Mons[start].attack = 40;
Mons[start].defense = 105;
Mons[start].spattack = 50;
Mons[start].spdefense = 115;
Mons[start].speed = 40;
Mons[start].learnset[1] = 12;
Mons[start].learnset[2] = 10;
Mons[start].learnset[9] = 14;
Mons[start].learnset[15] = 5;
Mons[start].learnset[22] = 8;
Mons[start].learnset[31] = 18;
Mons[start].learnset[39] = 25;

Moves = [];
/*
 * 0 Normal
 * 1 Fire
 * 2 Water
 * 3 Grass
 * 4 Electric
 * 5 Poison
 * 6 Ground
 * 7 Psychic
 * 8 Bug
 * 9 Dark
 */

start = 0;
Moves.push(Object.create(Move));
Moves[start].name = "Punch";
Moves[start].type = 0;
Moves[start].pp = 35;
Moves[start].damage = 35;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Roar";
Moves[start].type = 0;
Moves[start].pp = 40;
Moves[start].damage = 0;
Moves[start].effect = 1;
Moves[start].moveType = 1;

start++;
Moves.push(Object.create(Move));
Moves[start].name = "Leaf Thrw";
Moves[start].type = 3;
Moves[start].pp = 25;
Moves[start].damage = 35;

start++;
Moves.push(Object.create(Move));
Moves[start].name = "Squirt";
Moves[start].type = 2;
Moves[start].pp = 30;
Moves[start].damage = 20;
Moves[start].dmgtype = 1;

start++;
Moves.push(Object.create(Move));
Moves[start].name = "Burn";
Moves[start].type = 1;
Moves[start].pp = 25;
Moves[start].damage = 40;
Moves[start].dmgtype = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Stiffen";
Moves[start].type = 6;
Moves[start].pp = 30;
Moves[start].damage = 0;
Moves[start].effect = 7;
Moves[start].moveType = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Charge";
Moves[start].type = 4;
Moves[start].pp = 40;
Moves[start].damage = 0;
Moves[start].effect = 10;
Moves[start].moveType = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Grime";
Moves[start].type = 5;
Moves[start].pp = 20;
Moves[start].damage = 20;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Wrap";
Moves[start].type = 8;
Moves[start].pp = 40;
Moves[start].damage = 0;
Moves[start].effect = 5;
Moves[start].moveType = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Zap";
Moves[start].type = 4;
Moves[start].pp = 30;
Moves[start].damage = 40;
Moves[start].moveType = 0;
Moves[start].dmgtype = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Bubble";
Moves[start].type = 2;
Moves[start].pp = 40;
Moves[start].damage = 0;
Moves[start].effect = 9;
Moves[start].moveType = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Dig";
Moves[start].type = 6;
Moves[start].pp = 20;
Moves[start].damage = 35;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Mind Blow";
Moves[start].type = 7;
Moves[start].pp = 25;
Moves[start].damage = 40;
Moves[start].dmgtype = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Mug";
Moves[start].type = 9;
Moves[start].pp = 20;
Moves[start].damage = 45;


start++
Moves.push(Object.create(Move));
Moves[start].name = "Sting";
Moves[start].type = 8;
Moves[start].pp = 30;
Moves[start].damage = 35;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Weak Spot";
Moves[start].type = 9;
Moves[start].pp = 30;
Moves[start].damage = 0;
Moves[start].effect = 2;
Moves[start].moveType = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Study";
Moves[start].type = 7;
Moves[start].pp = 30;
Moves[start].damage = 0;
Moves[start].effect = 8;
Moves[start].moveType = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Pollute";
Moves[start].type = 5;
Moves[start].pp = 40;
Moves[start].damage = 0;
Moves[start].effect = 4;
Moves[start].moveType = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Drain";
Moves[start].type = 3;
Moves[start].pp = 40;
Moves[start].damage = 0;
Moves[start].effect = 3;
Moves[start].moveType = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Warmth";
Moves[start].type = 1;
Moves[start].pp = 40;
Moves[start].damage = 0;
Moves[start].effect = 6;
Moves[start].moveType = 1;

start++;
Moves.push(Object.create(Move));
Moves[start].name = "Scorch";
Moves[start].type = 1;
Moves[start].pp = 15;
Moves[start].damage = 60;
Moves[start].dmgtype = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Lightning";
Moves[start].type = 4;
Moves[start].pp = 10;
Moves[start].damage = 70;
Moves[start].dmgtype = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Geyser";
Moves[start].type = 2;
Moves[start].pp = 20;
Moves[start].damage = 55;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Shoot";
Moves[start].type = 9;
Moves[start].pp = 5;
Moves[start].damage = 100

start++
Moves.push(Object.create(Move));
Moves[start].name = "Bite";
Moves[start].type = 8;
Moves[start].pp = 20;
Moves[start].damage = 60;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Spoon Bnd";
Moves[start].type = 7;
Moves[start].pp = 15;
Moves[start].damage = 65;
Moves[start].dmgtype = 1;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Smack";
Moves[start].type = 0;
Moves[start].pp = 20;
Moves[start].damage = 60;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Spew";
Moves[start].type = 5;
Moves[start].pp = 15;
Moves[start].damage = 65;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Drill";
Moves[start].type = 6;
Moves[start].pp = 10;
Moves[start].damage = 70;

start++
Moves.push(Object.create(Move));
Moves[start].name = "Thrn Whip";
Moves[start].type = 6;
Moves[start].pp = 10;
Moves[start].damage = 70;

let tileset;
let TileImages = [];
//var pixelFont = loadFont('assets/slkscr.ttf');
function preload()
{
	bigSatchel = loadImage('assets/satchel.png');
	font = loadFont("assets/PressStart2P-Regular.ttf");
	Images = [
		['assets/Woodzar.png', 'assets/Woodzar_back.png'],
		['assets/Barklock.png', 'assets/Barklock_back.png'],
		['assets/Twiggdrasil.png', 'assets/Twiggdrasil_back.png'],
		['assets/Platypyro.png', 'assets/Platypyro_back.png'],
		['assets/Ignatus.png', 'assets/Ignatus_back.png'],
		['assets/Scorapsid.png', 'assets/Scorapsid_back.png'],
		['assets/Toadart.png', 'assets/Toadart_back.png'],
		['assets/Frogun.png', 'assets/Frogun_back.png'],
		['assets/Frogangsta.png', 'assets/Frogangsta_back.png'],
		['assets/Peckish.png', 'assets/Peckish_back.png'],
		['assets/Cooken.png', 'assets/Cooken_back.png'],
		['assets/Satisfowl.png', 'assets/Satisfowl_back.png'],
		['assets/Ajji.png', 'assets/Ajji_back.png'],
		['assets/Majji.png', 'assets/Majji_back.png'],
		['assets/Tarajji.png', 'assets/Tarajji_back.png'],
		['assets/Tailtic.png', 'assets/Tailtic_back.png'],
		['assets/Mowdy.png', 'assets/Mowdy_back.png'],
		['assets/Rodeont.png', 'assets/Rodeont_back.png'],
		['assets/Edgehog.png', 'assets/Edgehog_back.png'],
		['assets/Hedgewolf.png', 'assets/Hedgewolf_back.png'],
		['assets/Bugof.png', 'assets/Bugof_back.png'],
		['assets/Buzzof.png', 'assets/Buzzof_back.png'],
		['assets/Buggerof.png', 'assets/Buggerof_back.png'],
		['assets/Shrude.png', 'assets/Shrude_back.png'],
		['assets/Corvicious.png', 'assets/Corvicious_back.png'],
		['assets/Wormse.png', 'assets/Wormse_back.png'],
		['assets/Pupamid.png', 'assets/Pupamid_back.png'],
		['assets/Betterfly.png', 'assets/Betterfly_back.png'],
		['assets/Squiddimi.png', 'assets/Squiddimi_back.png'],
		['assets/Squiddnapper.png', 'assets/Squiddnapper_back.png'],
		['assets/Shrimple.png', 'assets/Shrimple_back.png'],
		['assets/Clamplex.png', 'assets/Clamplex_back.png'],
		['assets/Conchfusing.png', 'assets/Conchfusing_back.png'],
		['assets/Claidmourn.png', 'assets/Claidmourn_back.png']
	];
	followMons = [
		[loadImage('assets/Woodzar_follow_front.png'), loadImage('assets/Woodzar_follow_left.png'), loadImage('assets/Woodzar_follow_right.png'), loadImage('assets/Woodzar_follow_back.png')],
		[loadImage('assets/Barklock_follow_front.png'), loadImage('assets/Barklock_follow_left.png'), loadImage('assets/Barklock_follow_right.png'), loadImage('assets/Barklock_follow_back.png')],
		[loadImage('assets/Twiggdrasil_follow_front.png'), loadImage('assets/Twiggdrasil_follow_left.png'), loadImage('assets/Twiggdrasil_follow_right.png'), loadImage('assets/Twiggdrasil_follow_back.png')],
		[loadImage('assets/Platypyro_follow_front.png'), loadImage('assets/Platypyro_follow_left.png'), loadImage('assets/Platypyro_follow_right.png'), loadImage('assets/Platypyro_follow_back.png')],
		[loadImage('assets/Ignatus_follow_front.png'), loadImage('assets/Ignatus_follow_left.png'), loadImage('assets/Ignatus_follow_right.png'), loadImage('assets/Ignatus_follow_back.png')],
		[loadImage('assets/Scorapsid_follow_front.png'), loadImage('assets/Scorapsid_follow_left.png'), loadImage('assets/Scorapsid_follow_right.png'), loadImage('assets/Scorapsid_follow_back.png')],
		[loadImage('assets/Toadart_follow_front.png'), loadImage('assets/Toadart_follow_left.png'), loadImage('assets/Toadart_follow_right.png'), loadImage('assets/Toadart_follow_back.png')],
		[loadImage('assets/Frogun_follow_front.png'), loadImage('assets/Frogun_follow_left.png'), loadImage('assets/Frogun_follow_right.png'), loadImage('assets/Frogun_follow_back.png')],
		[loadImage('assets/Frogangsta_follow_front.png'), loadImage('assets/Frogangsta_follow_left.png'), loadImage('assets/Frogangsta_follow_right.png'), loadImage('assets/Frogangsta_follow_back.png')],
		[loadImage('assets/Peckish_follow_front.png'), loadImage('assets/Peckish_follow_left.png'), loadImage('assets/Peckish_follow_right.png'), loadImage('assets/Peckish_follow_back.png')],
		[loadImage('assets/Cooken_follow_front.png'), loadImage('assets/Cooken_follow_left.png'), loadImage('assets/Cooken_follow_right.png'), loadImage('assets/Cooken_follow_back.png')],
		[loadImage('assets/Satisfowl_follow_front.png'), loadImage('assets/Satisfowl_follow_left.png'), loadImage('assets/Satisfowl_follow_right.png'), loadImage('assets/Satisfowl_follow_back.png')],
		[loadImage('assets/Ajji_follow_front.png'), loadImage('assets/Ajji_follow_left.png'), loadImage('assets/Ajji_follow_right.png'), loadImage('assets/Ajji_follow_back.png')],
		[loadImage('assets/Majji_follow_front.png'), loadImage('assets/Majji_follow_left.png'), loadImage('assets/Majji_follow_right.png'), loadImage('assets/Majji_follow_back.png')],
		[loadImage('assets/Tarajji_follow_front.png'), loadImage('assets/Tarajji_follow_left.png'), loadImage('assets/Tarajji_follow_right.png'), loadImage('assets/Tarajji_follow_back.png')],
		[loadImage('assets/Tailtic_follow_front.png'), loadImage('assets/Tailtic_follow_left.png'), loadImage('assets/Tailtic_follow_right.png'), loadImage('assets/Tailtic_follow_back.png')],
		[loadImage('assets/Mowdy_follow_front.png'), loadImage('assets/Mowdy_follow_left.png'), loadImage('assets/Mowdy_follow_right.png'), loadImage('assets/Mowdy_follow_back.png')],
		[loadImage('assets/Rodeont_follow_front.png'), loadImage('assets/Rodeont_follow_left.png'), loadImage('assets/Rodeont_follow_right.png'), loadImage('assets/Rodeont_follow_back.png')],
		[loadImage('assets/Edgehog_follow_front.png'), loadImage('assets/Edgehog_follow_left.png'), loadImage('assets/Edgehog_follow_right.png'), loadImage('assets/Edgehog_follow_back.png')],
		[loadImage('assets/Hedgewolf_follow_front.png'), loadImage('assets/Hedgewolf_follow_left.png'), loadImage('assets/Hedgewolf_follow_right.png'), loadImage('assets/Hedgewolf_follow_back.png')],
		[loadImage('assets/Bugof_follow_front.png'), loadImage('assets/Bugof_follow_left.png'), loadImage('assets/Bugof_follow_right.png'), loadImage('assets/Bugof_follow_back.png')],
		[loadImage('assets/Buzzof_follow_front.png'), loadImage('assets/Buzzof_follow_left.png'), loadImage('assets/Buzzof_follow_right.png'), loadImage('assets/Buzzof_follow_back.png')],
		[loadImage('assets/Buggerof_follow_front.png'), loadImage('assets/Buggerof_follow_left.png'), loadImage('assets/Buggerof_follow_right.png'), loadImage('assets/Buggerof_follow_back.png')],
		[loadImage('assets/Shrude_follow_front.png'), loadImage('assets/Shrude_follow_left.png'), loadImage('assets/Shrude_follow_right.png'), loadImage('assets/Shrude_follow_back.png')],
		[loadImage('assets/Corvicious_follow_front.png'), loadImage('assets/Corvicious_follow_left.png'), loadImage('assets/Corvicious_follow_right.png'), loadImage('assets/Corvicious_follow_back.png')],
		[loadImage('assets/Wormse_follow_front.png'), loadImage('assets/Wormse_follow_left.png'), loadImage('assets/Wormse_follow_right.png'), loadImage('assets/Wormse_follow_back.png')],
		[loadImage('assets/Pupamid_follow_front.png'), loadImage('assets/Pupamid_follow_left.png'), loadImage('assets/Pupamid_follow_right.png'), loadImage('assets/Pupamid_follow_back.png')],
		[loadImage('assets/Betterfly_follow_front.png'), loadImage('assets/Betterfly_follow_left.png'), loadImage('assets/Betterfly_follow_right.png'), loadImage('assets/Betterfly_follow_back.png')],
		[loadImage('assets/Squiddimi_follow_front.png'), loadImage('assets/Squiddimi_follow_left.png'), loadImage('assets/Squiddimi_follow_right.png'), loadImage('assets/Squiddimi_follow_back.png')],
		[loadImage('assets/Squiddnapper_follow_front.png'), loadImage('assets/Squiddnapper_follow_left.png'), loadImage('assets/Squiddnapper_follow_right.png'), loadImage('assets/Squiddnapper_follow_back.png')],
		[loadImage('assets/Shrimple_follow_front.png'), loadImage('assets/Shrimple_follow_left.png'), loadImage('assets/Shrimple_follow_right.png'), loadImage('assets/Shrimple_follow_back.png')],
		[loadImage('assets/Clamplex_follow_front.png'), loadImage('assets/Clamplex_follow_left.png'), loadImage('assets/Clamplex_follow_right.png'), loadImage('assets/Clamplex_follow_back.png')],
		[loadImage('assets/Conchfusing_follow_front.png'), loadImage('assets/Conchfusing_follow_left.png'), loadImage('assets/Conchfusing_follow_right.png'), loadImage('assets/Conchfusing_follow_back.png')],
		[loadImage('assets/Claidmourn_follow_front.png'), loadImage('assets/Claidmourn_follow_left.png'), loadImage('assets/Claidmourn_follow_right.png'), loadImage('assets/Claidmourn_follow_back.png')],
	];

	Player = [
		[loadImage('assets/Player_front1.png'), loadImage('assets/Player_front2.png')],
		[loadImage('assets/Player_left1.png'), loadImage('assets/Player_left2.png')],
		[loadImage('assets/Player_right1.png'), loadImage('assets/Player_right2.png')],
		[loadImage('assets/Player_back1.png'), loadImage('assets/Player_back2.png')]
	];
	trainerImages = [
		[loadImage('assets/Male_front1.png'), loadImage('assets/Male_left1.png'),loadImage('assets/Male_right1.png'),loadImage('assets/Male_back1.png')],
		[loadImage('assets/Female_front1.png'), loadImage('assets/Female_left1.png'),loadImage('assets/Female_right1.png'),loadImage('assets/Female_back1.png')],
		[loadImage('assets/GrimmOverworld.png')],
		[loadImage('assets/PsychicOverworld.png')]
	];
	grimmBattle = loadImage('assets/GrimmBattle.png');
	psychicBattle = loadImage('assets/Psychic.png');
	tileset = loadJSON('assets/Tiles/tileset.tsj', loadTiles);
	//gamestate = 2;
}

grassTypes = [];

function loadTiles()
{
	for (let i = 0; i < tileset.tiles.length; i++)
	{
		Tiles[tileset.tiles[i].id] = 'assets/Tiles/' + (tileset.tiles[i].image);
	}
	TileImages = new Array(Tiles.length);
	for (let i = 0; i < Tiles.length; i++)
	{
		if (Tiles[i] != null)
		{
			TileImages[i] = loadImage(Tiles[i]);
		}
	}
	TileObj = [];
	for (let i = 0; i < Tiles.length; i++)
	{
		if (tileset.tiles[i] != null)
		{
			TileObj[tileset.tiles[i].id] = Object.create(Tile);
			TileObj[tileset.tiles[i].id].id = tileset.tiles[i].id;
			for (let j = 0; j < tileset.tiles[i].properties.length; j++)
			{
				if (tileset.tiles[i].properties[j].name == "Solid")
				{
					TileObj[tileset.tiles[i].id].isSolid = tileset.tiles[i].properties[j].value;
				}
				if (tileset.tiles[i].properties[j].name == "Grass")
				{
					TileObj[tileset.tiles[i].id].isGrass = tileset.tiles[i].properties[j].value;
					if(TileObj[tileset.tiles[i].id].isGrass)
					{
						grassTypes.push(tileset.tiles[i].id);
					}
				}
				if (tileset.tiles[i].properties[j].name == "Satchel")
				{
					TileObj[tileset.tiles[i].id].isSatchel = tileset.tiles[i].properties[j].value;
				}
				if (tileset.tiles[i].properties[j].name == "ItemID")
				{
					TileObj[tileset.tiles[i].id].heldItem = tileset.tiles[i].properties[j].value;
				}
				if (tileset.tiles[i].properties[j].name == "Lip")
				{
					TileObj[tileset.tiles[i].id].isLip = tileset.tiles[i].properties[j].value;
				}
				if (tileset.tiles[i].properties[j].name == "Door")
				{
					TileObj[tileset.tiles[i].id].isDoor = tileset.tiles[i].properties[j].value;
				}
				if (tileset.tiles[i].properties[j].name == "Passable")
				{
					TileObj[tileset.tiles[i].id].isPassable = tileset.tiles[i].properties[j].value;
				}
			}
		}
	}
	csvIN = loadStrings('assets/Map.csv', makeMap);
}
satchels = []
function makeMap()
{
	//console.log(csvIN);
	for (let i = 0; i < csvIN.length; i++)
	{
		csvIN[i] = csvIN[i].split(',');
	}
	mapS = Array.from(Array(csvIN[0].length), () => new Array(csvIN.length));
	mapWidth = mapS.length - 1;
	mapHeight = mapS[0].length - 1;
	for (let i = 0; i < csvIN.length; i++)
	{
		for (let j = 0; j < csvIN[0].length; j++)
		{
			mapS[j][i] = Object.create(Tile)
			Object.assign(mapS[j][i],TileObj[Number(csvIN[i][j])]);
			mapS[j][i].x = j;
			mapS[j][i].y = i;
			//console.log(i + ", " + j);
			if(mapS[j][i] != undefined)
			{
				if(mapS[j][i].isSatchel)
				{
					mapS[j][i].heldItem = round(Math.random());
				}
			}
		}
	}
	mapS[1][17].heldItem = 2;
	//console.log(satchels);
	//console.log(mapS);
}

function saveData()
{
	localStorage.setItem("p",JSON.stringify(p));
	localStorage.setItem("m",JSON.stringify(m));
	localStorage.setItem("trainers",JSON.stringify(trainers));
	for(i = 0; i < trainers.length; i++)
	{
		localStorage.setItem("trainers"+i,JSON.stringify(trainers[i]));
	}
	for(i = 0; i < 6; i++)
	{
		localStorage.setItem("team"+i,JSON.stringify(team[i]));
	}
	for(i = 0; i < 81; i++)
	{
		localStorage.setItem("boxes"+i,JSON.stringify(boxes[0][i]));
	}
	//localStorage.setItem("boxes",JSON.stringify(boxes));
	localStorage.setItem("haskey",JSON.stringify(hasKey));
	localStorage.setItem("inv", JSON.stringify(inventory));
	localStorage.setItem("money", JSON.stringify(money));
	localStorage.setItem("dooropen", JSON.stringify(doorOpen));
	//localStorage.setItem("map",JSON.stringify(mapS));
}

function loadData()
{
	p = JSON.parse(localStorage.getItem("p"));
	m = JSON.parse(localStorage.getItem("m"));
	//trainers = JSON.parse(localStorage.getItem("trainers") || "[]");
	for(i = 0; i < trainers.length; i++)
	{
		//console.log(localStorage.getItem("trainers"+i));
		if(localStorage.getItem("trainers"+i) != "undefined")
		{
			Object.assign(trainers[i],JSON.parse(localStorage.getItem("trainers"+i)));
		}
	}
	for(i = 0; i < 6; i++)
	{
		//console.log(localStorage.getItem("team"+i));
		if(localStorage.getItem("team"+i) != "undefined")
		{
			temp = JSON.parse(localStorage.getItem("team"+i));
			team[i] = Object.create(Monster);
			Object.assign(team[i], Mons[temp.id]);
			Object.assign(team[i], temp);
			team[i].calcStats();
			
		}
	}
	for(i = 0; i < 81; i++)
	{
		//console.log(localStorage.getItem("team"+i));
		if(localStorage.getItem("boxes"+i) != "undefined")
		{
			temp = JSON.parse(localStorage.getItem("boxes"+i));
			boxes[0][i] = Object.create(Monster);
			Object.assign(boxes[0][i], Mons[temp.id]);
			Object.assign(boxes[0][i], temp);
			boxes[0][i].calcStats();
		}
	}
	//boxes = JSON.parse(localStorage.getItem("boxes"));
	hasKey = JSON.parse(localStorage.getItem("haskey"));
	inventory = JSON.parse(localStorage.getItem("inv"));
	money = JSON.parse(localStorage.getItem("money"));
	doorOpen = JSON.parse(localStorage.getItem("dooropen"));
	return p;
	//maps = JSON.parse(localStorage.getItem("map"));
}

stats = ['attack', 'defense', 'special attack', 'special defense', 'speed'];
z = false;
x = false;
s = false;
e = false;
d = false
up = false;
down = false;
left = false;
right = false;
function zPress()
{
	z = true;
}

function xPress() 
{
    x = true;
}

function sPress() 
{
    s = true;
}

function ePress() 
{
    e = true;
}

function dPress() 
{
    d = true;
}

function upPress() 
{
    up = true;
}

function downPress() 
{
    down = true;
}

function leftPress() 
{
    left = true;
}

function rightPress() 
{
    right = true;
}

function upStop() 
{
    up = false;
}

function downStop() 
{
    down = false;
}

function leftStop() 
{
    left = false;
}

function rightStop() 
{
    right = false;
}

function setup()
{
	frameRate(30);
	myCanvas = createCanvas(width, height);
	myCanvas.parent('canvasContainer');
	noSmooth();
	textFont(font);
	battleCircle = loadImage('assets/BattleCircle.png');
	box = loadImage('assets/Box.png');
	BattleBox = loadImage('assets/BattleBox.png');
	gwass = [loadImage('assets/GrassOverlay.png'),loadImage('assets/YellowGrassOverlay.png'),loadImage('assets/PinkGrassOverlay.png'),loadImage('assets/PurpleGrassOverlay.png'),loadImage('assets/GrayGrassOverlay.png')];
}

function calcDamage(user, target, move, isFriend)
{
	crit = 1;
	bonus = 0;
	mult = 1;
	atk = 1;
	if(isFriend)
	{
		if(move.dmgtype == 0)
		{
			if(friendStats[0] > 0)
			{
				atk = (user.attack * (2 + friendStats[0]))/2;
			}else
			{
				atk = (user.attack * 2)/(2 - friendStats[0]);
			}
		}else
		{
			if(friendStats[2] > 0)
			{
				atk = (user.spattack * (2 + friendStats[2]))/2;
			}else
			{
				atk = (user.spattack * 2)/(2 - friendStats[2]);
			}
		}
		if(move.dmgtype == 0)
		{
			if(enemyStats[1] > 0)
			{
				def = (target.defense * (2 + enemyStats[1]))/2;
			}else
			{
				def = (target.defense * 2)/(2 - enemyStats[1]);
			}
		}else
		{
			if(enemyStats[3] > 0)
			{
				def = (target.spdefense * (2 + enemyStats[3]))/2;
			}else
			{
				def = (target.spdefense * 2)/(2 - enemyStats[3]);
			}
		}
		if(friendStats[4] > 0)
		{
			spd = (user.speed * (2 + friendStats[4]))/2;
		}else
		{
			spd = (user.speed * 2)/(2 - friendStats[4]);
		}
	}else
	{
		if(move.dmgtype == 0)
		{
			if(enemyStats[0] > 0)
			{
				atk = (user.attack * (2 + enemyStats[0]))/2;
			}else
			{
				atk = (user.attack * 2)/(2 - enemyStats[0]);
			}
		}else
		{
			if(enemyStats[2] > 0)
			{
				atk = (user.spattack * (2 + enemyStats[2]))/2;
			}else
			{
				atk = (user.spattack * 2)/(2 - enemyStats[2]);
			}
		}
		if(move.dmgtype == 0)
		{
			if(friendStats[1] > 0)
			{
				def = (target.defense * (2 + friendStats[1]))/2;
			}else
			{
				def = (target.defense * 2)/(2 - friendStats[1]);
			}
		}else
		{
			if(friendStats[3] > 0)
			{
				def = (target.spdefense * (2 + friendStats[3]))/2;
			}else
			{
				def = (target.spdefense * 2)/(2 - friendStats[3]);
			}
		}
		if(enemyStats[4] > 0)
		{
			spd = (user.speed * (2 + enemyStats[4]))/2;
		}else
		{
			spd = (user.speed * 2)/(2 - enemyStats[4]);
		}
	}
	
	if(Math.ceil(Math.random() * 255) < spd/2)
	{
		currText.push("It was a critical hit");
		crit = 2;
	}
	if (user.type1 == move.type || user.type2 == move.type)
	{
		mult *= 1.5;
	}
	mult *= typechart[move.type][target.type1];
	if (target.type2 != null)
	{
		mult *= typechart[move.type][target.type2];
	}
	mult *= (217 + Math.floor(Math.random() * 40)) / 255;
	a = (Math.floor((2 * user.level * crit)/5) + 2);
	b = Math.floor((a * move.damage) * (atk/def));
	damageDealt = max(1,Math.floor((Math.floor(b/50) + 2) * mult));
	return damageDealt;
}

hasloaded = false;
let img1;
let img2;

function load(sprite1)
{
	hasloaded = true;
	return loadImage(sprite1);
}

function pickMove(enemy, target, skill)
{
	moveNum = 0;
	if(Math.floor(Math.random() * 100))
	{
		do
		{
			moveNum = Math.floor(Math.random() * 4)
		}while(enemy.moves[moveNum] == null)
	}
	else
	{
		has2 = target.type2 != null;
		currmult = 1;
		currmult *= typechart[Moves[enemy.moves[moveNum]].type][target.type1];
		if(has2) currmult *= typechart[Moves[enemy.moves[moveNum]].type][target.type2];
		for(i = 0; i < 4; i++)
		{
			if(enemy.moves[i] != null)
			{
				mult = 1;
				mult *= typechart[Moves[enemy.moves[i]].type][target.type1];
				if(has2) mult *= typechart[Moves[enemy.moves[i]].type][target.type2];
				if(mult > currmult)
				{
					moveNum = i;
					currmult = mult;
				}
			}
		}
	}
	return moveNum;

}

//0 - main menu
//1 - dex
//2 - world
//3 - battle
//4 - box
//5 - starter pick
//6 - shop
//7 - evolving
//8 - move choosing
gamestate = 0;
team = [];
const Trainer = {
	name: "",
	x: 0,
	y: 0,
	Skill: 50,
	team: [],
	gender: 0,
	beat: false,
	fightable: true,
	dir: 0,
	range: 0,
	addTeam: function(id, level)
	{
		this.team[this.team.length] = Object.create(Monster);
		Object.assign(this.team[this.team.length-1], Mons[id])
		this.team[this.team.length-1].level = level;
		this.team[this.team.length-1].calcStats();
		this.team[this.team.length-1].currhealth = this.team[this.team.length-1].health;
		currMove = 0;
		for(i = 0; i < this.team[this.team.length-1].level; i++)
		{
			if(this.team[this.team.length-1].learnset[i] != null)
			{
				this.team[this.team.length-1].moves[currMove] = this.team[this.team.length-1].learnset[i];
				this.team[this.team.length-1].movespp[currMove] = Moves[this.team[this.team.length-1].learnset[i]].pp;
				currMove = (currMove + 1) % 4;
			}
		}
		console.log(this.team);
	}
};

trainers = [];
//Pokemon Center
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Nurse";
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = false;
trainers[trainers.length-1].x = 45*57;
trainers[trainers.length-1].y = 45*44;

//Outside Cave
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Helper";
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = false;
trainers[trainers.length-1].x = 45*324;
trainers[trainers.length-1].y = 45*123;

//Grimm
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Grimm";
trainers[trainers.length-1].gender = 2;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = false;
trainers[trainers.length-1].x = 45*84;
trainers[trainers.length-1].y = 45*40;
trainers[trainers.length-1].addTeam(18,10);
trainers[trainers.length-1].addTeam(23,11);

//Outside Building
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Helper2";
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = false;
trainers[trainers.length-1].x = 45*321;
trainers[trainers.length-1].y = 45*64;

//Cecilia
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Cecilia";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 3;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = false;
trainers[trainers.length-1].x = 45*46;
trainers[trainers.length-1].y = 45*77;
trainers[trainers.length-1].addTeam(33,15);
trainers[trainers.length-1].addTeam(12,15);
trainers[trainers.length-1].addTeam(31,16);

//Shop guy
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Saul";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 1;
trainers[trainers.length-1].fightable = false;
trainers[trainers.length-1].x = 45*65;
trainers[trainers.length-1].y = 45*45;

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Doug";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 2;
trainers[trainers.length-1].x = 45*124;
trainers[trainers.length-1].y = 45*153;
trainers[trainers.length-1].addTeam(16,4);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Arnold";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 1;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 7;
trainers[trainers.length-1].x = 45*205;
trainers[trainers.length-1].y = 45*84;
trainers[trainers.length-1].addTeam(21,8);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Martha";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 1;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 5;
trainers[trainers.length-1].x = 45*203;
trainers[trainers.length-1].y = 45*55;
trainers[trainers.length-1].addTeam(21,7);
trainers[trainers.length-1].addTeam(23,7);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Jonathan";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 2;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 5;
trainers[trainers.length-1].x = 45*216;
trainers[trainers.length-1].y = 45*51;
trainers[trainers.length-1].addTeam(18,8);
trainers[trainers.length-1].addTeam(26,7);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Trixie";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 2;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 6;
trainers[trainers.length-1].x = 45*258;
trainers[trainers.length-1].y = 45*86;
trainers[trainers.length-1].addTeam(18,9);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Amanda";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 3;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 2;
trainers[trainers.length-1].x = 45*66;
trainers[trainers.length-1].y = 45*13;
trainers[trainers.length-1].addTeam(28,9);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Byrnle";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*84;
trainers[trainers.length-1].y = 45*18;
trainers[trainers.length-1].addTeam(24,8);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Joe";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*74;
trainers[trainers.length-1].y = 45*26;
trainers[trainers.length-1].addTeam(18,9);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Cleo";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 2;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 5;
trainers[trainers.length-1].x = 45*39;
trainers[trainers.length-1].y = 45*39;
trainers[trainers.length-1].addTeam(30,11);
trainers[trainers.length-1].addTeam(22,12);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Sadie";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 2;
trainers[trainers.length-1].x = 45*293;
trainers[trainers.length-1].y = 45*183;
trainers[trainers.length-1].addTeam(9,12);
trainers[trainers.length-1].addTeam(13,12);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Winston";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*258;
trainers[trainers.length-1].y = 45*189;
trainers[trainers.length-1].addTeam(13,13);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Steve";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 2;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*40;
trainers[trainers.length-1].y = 45*104;
trainers[trainers.length-1].addTeam(33,12);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Greg";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 1;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*55;
trainers[trainers.length-1].y = 45*98;
trainers[trainers.length-1].addTeam(30,13);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Eric";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 1;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*47;
trainers[trainers.length-1].y = 45*87;
trainers[trainers.length-1].addTeam(13,13);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Miranda";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*8;
trainers[trainers.length-1].y = 45*50;
trainers[trainers.length-1].addTeam(15,9);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Owen";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 1;
trainers[trainers.length-1].dir = 3;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*9;
trainers[trainers.length-1].y = 45*35;
trainers[trainers.length-1].addTeam(28,8);

//Trainer
trainers.push(Object.create(Trainer));
trainers[trainers.length-1].name = "Penelope";
trainers[trainers.length-1].team = [];
trainers[trainers.length-1].gender = 0;
trainers[trainers.length-1].dir = 0;
trainers[trainers.length-1].fightable = true;
trainers[trainers.length-1].range = 3;
trainers[trainers.length-1].x = 45*9;
trainers[trainers.length-1].y = 45*62;
trainers[trainers.length-1].addTeam(21,9);

numEnemies = 1;
enemy = [];
enemy[0] = Object.create(Monster);
Object.assign(enemy[0], Mons[0]);
enemy[0].level = 15;
enemy[0].calcStats();
enemy[0].currhealth = enemy[0].health;
team[0] = Object.create(Monster);
Object.assign(team[0],enemy[0]);
enemyIndex = 0;
dexIndex = 0;
teamIndex = 0;
let loc = 0;
spawnList = [
	[9,16,25], //Green
	[18,26,23,0], //Yellow
	[12,27,3, 15, 34], //Pink
	[20,28], //Purple
	[31,16,28,6] //Gray
];


spawnListLevel = [2,7,13,5,9];
p = {};
p.x = 45 * 11;
p.y = 45 * 2;
p.newx = 0;
p.newy = 0;
p.dir = 0;
p.sprite = 0;
m = {};
m.id = 0;
m.dir = 0;
m.x = p.x;
m.y = p.y;
m.newx = 0;
m.newy = 0;
isBack = false;
holding = false;
selected = 0;
option = 0;
battlemenu = 0;
movestart = -1;
isTrainer = false;
frame = 0;
pickup = -1;
pickupTeam = null;
onTeam = false;
selectedTeam = 0;
textBox = false;
hasloaded = false;
enteredCenter = 0;
money = 500;
hasKey = false;
catchNum = 0;
needed = 0;
buttonsHit = 0;
doorOpen = false;
currText = [];
typeNames = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Poison', 'Ground', 'Psychic', 'Bug', 'Dark'];
typeColors = ['gray', 'darkorange', 'blue', 'green', 'goldenrod', 'purple', 'brown', 'darkorchid', 'darkseagreen', 'darkslateblue'];
boxes = Array.from(Array(9), () => new Array(81));
teamParticipated = [];
for(i = 0; i < team.length; i++)
{
	teamParticipated[i] = false;
}
//Object.assign(boxes[0][32], Mons[30]);
function draw_text(textIn)
{
	textAlign(LEFT);
	textSize(13);
	image(box, 0, 400, 500, 100);
	text(textIn, 15, 426, 500);
	text('V', 475, 495);
}
// A D SPA SPD SPE
friendStats = [0,0,0,0,0];
enemyStats = [0,0,0,0,0];
function healAll()
{
	for(i = 0; i < team.length; i++)
	{
		team[i].currhealth = team[i].health;
		for(j = 0; j < team[i].moves.length; j++)
		{
			if(Moves[team[i].moves[j]] != null)
			{
				team[i].movespp[j] = Moves[team[i].moves[j]].pp;
			}
		}
	}
	for(i = 0; i < boxes[0].length; i++)
	{
		if(boxes[0][i] != null)
		{
			boxes[0][i].currhealth = boxes[0][i].health;
			for(j = 0; j < boxes[0][i].moves.length; j++)
			{
				if(Moves[boxes[0][i].moves[j]] != null)
				{
					boxes[0][i].movespp[j] = Moves[boxes[0][i].moves[j]].pp;
				}
			}
		}
	}
}
currTrainer = 0;
items = ['Potion', 'Satchel'];
menuOpen = false;
inventory = [0, 5];
itemCost = [50,100];
fightDone = false;
friendFainted = false;
isGym = true;
starter1 = null;
hasEvolved = false;
oldName = "";
starter2 = null;
starter3 = null;
starterChoice = 0;
itemIndex = 0;
yes = 0;
checktile = null;
toggle = false;
function draw()
{
	frame += 1;
	if (gamestate == 0) //Main Menu
	{
		background(255);
		textAlign(CENTER);
		textSize(25);
		text("SATCHEL CREATURES",250,50)
		textSize(12);
		image(bigSatchel,90,60,320,280);
		text("Press Z to load save",250,370);
		text("Press X to make new save",250,385);
		textAlign(LEFT);
		text("Controls\nArrows - Movement\nZ - Confirm/Interact\nX - Back/Exit\nS - Save\nE - Box\nD - Dex",10,400)
		if((keyIsDown(90) || z))
		{
			check = loadData();
			if(check != undefined && check != null)
			{
				gamestate = 2;
				holding = true;
			}
		}
		if((keyIsDown(88) ||x))
		{
			saveData()
			gamestate = 5;
			holding = true;
		}
	}
	else if (gamestate == 1) //Dex
	{
		if (!hasloaded)
		{
			if (isBack)
			{
				img = load(Images[dexIndex][1]);
			}
			else
			{
				img = load(Images[dexIndex][0]);
			}
		}
		background('salmon');
		textSize(15);
		fill(0);
		for (let i = 0; i < Mons.length; i++)
		{
			text(" " + (i + 1) + ": " + Mons[i].name, 25, 250 - (dexIndex - i) * 30);
		}
		//triangle(15,230,15,250,25,240);
		text(">", 15, 250);
		textAlign(CENTER);
		text(Mons[dexIndex].name, 380, 155);
		textAlign(LEFT);
		textSize(10);
		text(Mons[dexIndex].dex, 300, 350, 170);
		/*
		 * 0 Normal
		 * 1 Fire
		 * 2 Water
		 * 3 Grass
		 * 4 Electric
		 * 5 Poison
		 * 6 Ground
		 * 7 Psychic
		 * 8 Bug
		 * 9 Dark
		 */
		fill(255);
		rect(290, 110, 95, 20);
		fill(typeColors[Mons[dexIndex].type1]);
		text(typeNames[Mons[dexIndex].type1], 300, 125, 170);
		if (Mons[dexIndex].type2 != null)
		{
			fill(255);
			rect(390, 110, 95, 20);
			fill(typeColors[Mons[dexIndex].type2]);
			text(typeNames[Mons[dexIndex].type2], 400, 125, 170);
		}
		fill(255);
		square(300, height / 2 - 1.5 * monHeight, 3 * monWidth);
		image(img, 300, height / 2 - 1.5 * monHeight, 3 * monWidth, 3 * monHeight);
		if ((keyIsDown(88) ||x))
		{
			gamestate = 2;
		}
		if (!(keyIsDown(UP_ARROW) || up) && !(keyIsDown(DOWN_ARROW) || down) && !(keyIsDown(LEFT_ARROW) || left) && !(keyIsDown(RIGHT_ARROW) || right))
		{
			holding = false;
		}
		if ((keyIsDown(UP_ARROW) || up) && !holding)
		{
			dexIndex = (dexIndex - 1);
			if (dexIndex == -1)
			{
				dexIndex = Mons.length - 1;
			}
			hasloaded = false;
			holding = true;
		}
		if ((keyIsDown(DOWN_ARROW) || down) && !holding)
		{
			dexIndex = (dexIndex + 1) % (Mons.length);
			hasloaded = false;
			holding = true;
		}
		if (((keyIsDown(LEFT_ARROW) || left) || (keyIsDown(RIGHT_ARROW) || right)) && !holding)
		{
			isBack = !isBack;
			hasloaded = false;
			holding = true;
		}
	}
	else if (gamestate == 2) //Overworld
	{
		
		if((buttonsHit >= 3 || doorOpen) && !toggle)
		{
			doorOpen = true;
			toggle = true;
			for(i = 0; i < 3; i++)
			{
				for(j = 0; j < 3; j++)
				{
					mapS[40+i][81+j] = Object.create(TileObj);
					Object.assign(mapS[40+i][81+j],TileObj[111]);
				}
			}
			
		}
		for(i = 0; i < trainers.length; i++)
		{
			if(trainers[i].fightable && !trainers[i].beat)
				{
					canFight = false;
					switch(trainers[i].dir)
					{
						case 0:
							if(p.x == trainers[i].x && p.y <= trainers[i].y+45*(trainers[i].range) && p.y > trainers[i].y)
							{
								canFight = true;
							}
							break;
						case 1:
							if(p.y == trainers[i].y && p.x >= trainers[i].x-45*(trainers[i].range) && p.x < trainers[i].x)
							{
								canFight = true;
							}
							break;
						case 2:
							if(p.y == trainers[i].y && p.x <= trainers[i].x+45*(trainers[i].range) && p.x > trainers[i].x)
							{
								canFight = true;
							}
							break;
						case 3:
							if(p.x == trainers[i].x && p.y >= trainers[i].y-45*(trainers[i].range) && p.y < trainers[i].y)
							{
								canFight = true;
							}
							break;
					}

					if(canFight)
					{
						gamestate = 3;
						enemy = trainers[i].team;
						fightDone = false;
						isTrainer = true;
						isGym = false;
						currText.push("You are challenged by " + trainers[i].name);
						for(j = 0; j < trainers[i].team.length; j++)
						{
							trainers[i].team[j].currhealth = trainers[i].team[j].health;
						}
						friendStats = [0,0,0,0,0];
						enemyStats = [0,0,0,0,0];
						teamIndex = 0;
						battlemenu = 2;
						hasloaded = false;
						numEnemies = trainers[i].team.length;
						currTrainer = i;
						break;
					}

				}
		}
		//console.log(Math.floor(p.x/45) + ", " + Math.floor(p.y/45));
		if(canEvolve.length > 0)
		{
			gamestate = 7;
			hasloaded = false;
		}
		if(canLearn.length > 0)
		{
			gamestate = 8;
			hasloaded = false;
		}
		
		fill('white');
		background('black');
		for (let i = Math.ceil((p.x) / 45) - 10; i < Math.ceil((p.x) / 45) + 10; i++)
		{
			for (let j = Math.ceil((p.y) / 45) - 10; j < Math.ceil((p.y) / 45) + 10; j++)
			{
				if (i >= 0 && j >= 0 && i < mapWidth && j < mapHeight)
				{
					if (mapS[i][j] != null)
					{
						if (!mapS[i][j].isPassable)
						{
							image(TileImages[mapS[i][j].id], 225 + i * 45 - p.x, 225 + j * 45 - p.y, 45, 45);
						}
					}
					if (i == Math.ceil((p.x) / 45) && j == Math.ceil((p.y) / 45))
					{
						image(Player[p.dir][Math.floor(p.sprite)], 225, 210, 45, 60);
						if (mapS[i][j].isGrass)
						{
							image(gwass[grassTypes.findIndex((element) => element == mapS[i][j].id)], 225, 225, 45, 45);
						}
					}
					if (i == Math.ceil((m.x) / 45) && j == Math.ceil((m.y) / 45))
					{
						for(k = 0; k < team.length; k++)
						{
							if(team[k].currhealth != 0)
							{
								m.id = team[k].id;
								break;
							}
						}
						
						image(followMons[m.id][m.dir], 225 - (p.x - m.x), 225 - (p.y - m.y), 45, 45);
						if (mapS[i][j].isGrass)
						{
							image(gwass[grassTypes.findIndex((element) => element == mapS[i][j].id)], 225 - (p.x - m.x), 225 - (p.y - m.y), 45, 45);
						}
					}
				}
				for(k = 0; k < trainers.length;k++)
				{
					if(i == Math.ceil((trainers[k].x) / 45) && j == Math.ceil((trainers[k].y) / 45))
					{
						//console.log(trainers[k].dir)
						image(trainerImages[trainers[k].gender][trainers[k].dir],225 + i * 45 - p.x, 210 + j * 45 - p.y,45,60)
					}
				}
			}
		}
		for (let i = Math.ceil((p.x) / 45) - 10; i < Math.ceil((p.x) / 45) + 10; i++)
		{
			for (let j = Math.ceil((p.y) / 45) - 10; j < Math.ceil((p.y) / 45) + 10; j++)
			{
				if (i >= 0 && j >= 0 && i < mapWidth && j < mapHeight)
				{
					if (mapS[i][j] != null)
					{
						if (mapS[i][j].isPassable)
						{
							image(TileImages[mapS[i][j].id], 225 + i * 45 - p.x, 225 + j * 45 - p.y, 45, 45);
						}
					}
				}
			}
		}
		if (movestart <= frame - 6)
		{
			p.newx = 0;
			p.newy = 0;
			m.newx = 0;
			m.newy = 0;
			oldmdir = m.dir;
			moved = false;
			if (!textBox)
			{
				if (!(keyIsDown(90) || z) && !(keyIsDown(69) || e) && !(keyIsDown(68) || d) && !(keyIsDown(83) || s))
				{
					holding = false;
				}
				if(p.dir == 0)
				{
					checktile = mapS[((p.x) / 45)][((p.y) / 45) + 1];
				}
				if(p.dir == 1)
				{
					checktile = mapS[((p.x) / 45) - 1][(p.y) / 45];
				}
				if (p.dir == 2)
				{
					checktile = mapS[((p.x) / 45) + 1][(p.y) / 45];
				}
				if (p.dir == 3)
				{
					checktile = mapS[((p.x) / 45)][((p.y) / 45) - 1];
				}
				if((keyIsDown(83) || s) && !holding)
				{
					saveData();
					currText.push("Game was saved");
					textBox = true;
					holding = true;
				}
				if((keyIsDown(90) || z) && !holding)
				{
					moved = true;
					holding = true;
					xf = 0;
					yf = 0;
					if (checktile.isSatchel)
					{
						if(checktile.heldItem != 2)
						{
							currText.push("You found a " + items[checktile.heldItem]);
							currText.push("You put the " + items[checktile.heldItem] + " in your satchel");
							inventory[checktile.heldItem]++;
							textBox = true;
							mapS[checktile.x][checktile.y] = mapS[((p.x) / 45)][(p.y) / 45];
						}else
						{
							currText.push("You found the mansion key");
							currText.push("You put the mansion key in your satchel");
							textBox = true;
							hasKey = true;
							mapS[checktile.x][checktile.y] = mapS[((p.x) / 45)][(p.y) / 45];
						}
					}
					for(i = 0; i < trainers.length; i++)
					{
						if(checktile.x == trainers[i].x/45 && checktile.y == trainers[i].y/45 && !trainers[i].beat)
						{
							if(i == 1)
							{
								currText.push("Sorry, the cave is too dangerous to enter right now");
								switch(p.dir)
								{
									case 0:
										trainers[i].dir = 3;
										break;
									case 1:
										trainers[i].dir = 2;
										break;
									case 2:
										trainers[i].dir = 1;
										break;
									case 3:
										trainers[i].dir = 0;
										break;
								}
								textBox = true;
								break;
							}
							if(i == 2)
							{
								gamestate = 3;
								enemy = trainers[i].team;
								fightDone = false;
								isTrainer = true;
								isGym = true;
								currText.push("You are challenged by leader Grimm");
								currText.push("You won't beat my dark types");
								friendStats = [0,0,0,0,0];
								enemyStats = [0,0,0,0,0];
								teamIndex = 0;
								battlemenu = 2;
								hasloaded = false;
								numEnemies = trainers[i].team.length;
								currTrainer = i;
								break;
							}
							if(i == 3)
							{
								currText.push("I've heard that the key to the forest mansion might be in here");
								currText.push("Maybe you could challenge whatever lies inside if you had the key")
								textBox = true;
								switch(p.dir)
								{
									case 0:
										trainers[i].dir = 3;
										break;
									case 1:
										trainers[i].dir = 2;
										break;
									case 2:
										trainers[i].dir = 1;
										break;
									case 3:
										trainers[i].dir = 0;
										break;
								}
								break;
							}
							if(i == 4)
							{
								gamestate = 3;
								enemy = trainers[i].team;
								fightDone = false;
								isTrainer = true;
								isGym = true;
								currText.push("You are challenged by leader Cecilia");
								currText.push("I hope our duel is honorable");
								friendStats = [0,0,0,0,0];
								enemyStats = [0,0,0,0,0];
								teamIndex = 0;
								battlemenu = 2;
								hasloaded = false;
								numEnemies = trainers[i].team.length;
								currTrainer = i;
								break;
							}
						}
					}
					if (checktile.id == 523)
					{
						buttonsHit++;
						Object.assign(mapS[checktile.x][checktile.y],TileObj[checktile.id-1]);
					}
					if (checktile.id == 525)
					{
						buttonsHit++;
						Object.assign(mapS[checktile.x][checktile.y],TileObj[checktile.id-1]);
					}
					if (checktile.id == 527)
					{
						buttonsHit++;
						Object.assign(mapS[checktile.x][checktile.y],TileObj[checktile.id-1]);
					}
					if (checktile.id == 548)
					{
						gamestate = 6;
					}
					if (checktile.id == 549)
					{
						currText.push("You healed all your monsters");
						textBox = true;
						healAll();
					}
				}
				if((keyIsDown(69) || e) && !holding)
				{
					menuOpen = true;
					holding = true;
					gamestate = 4;
					hasloaded = false;
				}
				if((keyIsDown(68) || d) && !holding)
				{
					menuOpen = true;
					gamestate = 1;
					hasloaded = false;
				}
				if ((keyIsDown(UP_ARROW) || up))
				{
					p.newy = -45;
					m.dir = p.dir;
					p.dir = 3;
					movestart = frame;
					moved = true;
				}
				if ((keyIsDown(DOWN_ARROW) || down) && !moved)
				{
					p.newy = 45;
					m.dir = p.dir;
					p.dir = 0;
					movestart = frame;
					moved = true;
				}
				if ((keyIsDown(LEFT_ARROW) || left) && !moved)
				{
					p.newx = -45;
					m.dir = p.dir;
					p.dir = 1;
					movestart = frame;
					moved = true;
				}
				if ((keyIsDown(RIGHT_ARROW) || right) && !moved)
				{
					p.newx = 45;
					m.dir = p.dir;
					p.dir = 2;
					movestart = frame;
					moved = true;
				}
			}
			else
			{
				fill('black');
				draw_text(currText[0]);
				if (!(keyIsDown(90) || z))
				{
					holding = false;
				}
				if ((keyIsDown(90) || z) && !holding)
				{
					currText.shift();
					if (currText.length == 0)
					{
						textBox = false;
					}
					holding = true;
				}
			}
			if (!moved)
			{
				p.sprite = 0;
			}
			if (p.newx != 0 || p.newy != 0)
			{
				if ((p.x + p.newx) / 45 >= 0 && (p.y + p.newy) / 45 >= 0 && (p.y + p.newy) / 45 < mapHeight && (p.x + p.newx) / 45 < mapWidth)
				{
					m.newx = p.x - m.x;
					m.newy = p.y - m.y;
					if (mapS[(p.x + p.newx) / 45][(p.y + p.newy) / 45] != null)
					{
						if (mapS[(p.x + p.newx) / 45][(p.y + p.newy) / 45].isSolid)
						{
							p.newx = 0;
							p.newy = 0;
							m.newx = 0;
							m.newy = 0;
							m.dir = oldmdir;
						}
						else
						if (mapS[(p.x + p.newx) / 45][(p.y + p.newy) / 45].isLip && p.newy != 45)
						{
							p.newx = 0;
							p.newy = 0;
							m.newx = 0;
							m.newy = 0;
							m.dir = oldmdir;
						}
						else
						if (mapS[(p.x + p.newx) / 45][(p.y + p.newy) / 45].isGrass)
						{
							if(Math.floor(Math.random() * 256) < 20)
							{
								isTrainer = false;
								isGym = false;
								gamestate = 3;
								friendStats = [0,0,0,0,0];
								enemyStats = [0,0,0,0,0];
								enemy = []
								enemy[0] = Object.create(Monster);
								Object.assign(enemy[0], Mons[spawnList[grassTypes.findIndex((element) => element == mapS[(p.x + p.newx) / 45][(p.y + p.newy) / 45].id)][Math.floor(Math.random() * spawnList[grassTypes.findIndex((element) => element == mapS[(p.x + p.newx) / 45][(p.y + p.newy) / 45].id)].length)]])
								enemy[0].level = spawnListLevel[grassTypes.findIndex((element) => element == mapS[(p.x + p.newx) / 45][(p.y + p.newy) / 45].id)] + round(Math.random() * 2);
								enemy[0].calcStats();
								enemy[0].currhealth = enemy[0].health;
								numEnemies = 1;
								teamIndex = 0;
								fightDone = false;
								hasloaded = false;
								holding = true;
								currMove = 0;
								for(i = 0; i < enemy[0].level; i++)
								{
									if(enemy[0].learnset[i] != null)
									{
										enemy[0].moves[currMove] = enemy[0].learnset[i];
										enemy[0].movespp[currMove] = Moves[enemy[0].learnset[i]].pp;
										currMove = (currMove + 1) % 4;
									}
								}
							}
						}
						else
						if (mapS[(p.x + p.newx) / 45][(p.y + p.newy) / 45].isDoor)
						{
							p.newx = 0;
							p.newy = 0;
							m.newx = 0;
							m.newy = 0;
							//Center doors
						
							if ((p.x + p.newx) / 45 == 58 && (p.y + p.newy) / 45 == 48)
							{
								if(enteredCenter == 0)
								{
										p.x = 45 * 137;
										p.y = 45 * 92;
								}else if(enteredCenter == 1)
								{
									p.x = 45 * 320;
									p.y = 45 * 88;
								}else if(enteredCenter == 2)
								{
									p.x = 45* 216;
									p.y = 45 * 244;
								}
							}else
							{
								if ((p.x + p.newx) / 45 == 7 && (p.y + p.newy) / 45 == 6)
								{
									p.x = 45 * 60;
									p.y = 45 * 178;
								}
								else
								if ((p.x + p.newx) / 45 == 60 && (p.y + p.newy) / 45 == 178)
								{
									p.x = 45 * 7;
									p.y = 45 * 6;
								}
								else
								if ((p.x + p.newx) / 45 == 137 && (p.y + p.newy) / 45 == 92)
								{
									p.x = 45 * 58;
									p.y = 45 * 48;
									enteredCenter = 0;
								}
								else
								if ((p.x + p.newx) / 45 == 320 && (p.y + p.newy) / 45 == 88)
								{
									p.x = 45 * 58;
									p.y = 45 * 48;
									enteredCenter = 1;
								}
								else
								if ((p.x + p.newx) / 45 == 216 && (p.y + p.newy) / 45 == 244)
								{
									p.x = 45 * 58;
									p.y = 45 * 48;
									enteredCenter = 2;
								}
								else
								if ((p.x + p.newx) / 45 == 261 && (p.y + p.newy) / 45 == 37)
								{
									if(hasKey)
									{
										p.x = 45 * 74;
										p.y = 45 * 13;
									}
								}
								else
								if ((p.x + p.newx) / 45 == 74 && (p.y + p.newy) / 45 == 13)
								{
									p.x = 45 * 261;
									p.y = 45 * 37;
								}
								else
								if ((p.x + p.newx) / 45 == 322 && (p.y + p.newy) / 45 == 63)
								{
									p.x = 45 * 7;
									p.y = 45 * 81;
								}
								else
								if ((p.x + p.newx) / 45 == 7 && (p.y + p.newy) / 45 == 81)
								{
									p.x = 45 * 322;
									p.y = 45 * 63;
								}
								else
								if ((p.x + p.newx) / 45 == 323 && (p.y + p.newy) / 45 == 63)
								{
									p.x = 45 * 8;
									p.y = 45 * 81;
								}
								else
								if ((p.x + p.newx) / 45 == 8 && (p.y + p.newy) / 45 == 81)
								{
									p.x = 45 * 323;
									p.y = 45 * 63;
								}
								else
								if ((p.x + p.newx) / 45 == 16 && (p.y + p.newy) / 45 == 75)
								{
									p.x = 45 * 16;
									p.y = 45 * 61;
								}
								else
								if ((p.x + p.newx) / 45 == 16 && (p.y + p.newy) / 45 == 61)
								{
									p.x = 45 * 16;
									p.y = 45 * 75;
								}
								else
								if ((p.x + p.newx) / 45 == 2 && (p.y + p.newy) / 45 == 60)
								{
									p.x = 45 * 16;
									p.y = 45 * 46;
								}
								else
								if ((p.x + p.newx) / 45 == 16 && (p.y + p.newy) / 45 == 46)
								{
									p.x = 45 * 2;
									p.y = 45 * 60;
								}
								else
								if ((p.x + p.newx) / 45 == 2 && (p.y + p.newy) / 45 == 45)
								{
									p.x = 45 * 16;
									p.y = 45 * 31;
								}
								else
								if ((p.x + p.newx) / 45 == 16 && (p.y + p.newy) / 45 == 31)
								{
									p.x = 45 * 2;
									p.y = 45 * 45;
								}
								else
								if ((p.x + p.newx) / 45 == 2 && (p.y + p.newy) / 45 == 30)
								{
									p.x = 45 * 16;
									p.y = 45 * 16;
								}
								else
								if ((p.x + p.newx) / 45 == 16 && (p.y + p.newy) / 45 == 16)
								{
									p.x = 45 * 2;
									p.y = 45 * 30;
								}
								else
								if ((p.x + p.newx) / 45 == 324 && (p.y + p.newy) / 45 == 123)
								{
									p.x = 45 * 30;
									p.y = 45 * 14;
								}
								else
								if ((p.x + p.newx) / 45 == 30 && (p.y + p.newy) / 45 == 14)
								{
									p.x = 45 * 324;
									p.y = 45 * 123;
								}
								else
								if ((p.x + p.newx) / 45 == 35 && (p.y + p.newy) / 45 == 65)
								{
									p.x = 45 * 322;
									p.y = 45 * 184;
								}
								else
								if ((p.x + p.newx) / 45 == 322 && (p.y + p.newy) / 45 == 184)
								{
									p.x = 45 * 35;
									p.y = 45 * 65;
								}
								else
								if ((p.x + p.newx) / 45 == 138 && (p.y + p.newy) / 45 == 233)
								{
									p.x = 45 * 85;
									p.y = 45 * 66;
								}
								else
								if ((p.x + p.newx) / 45 == 85 && (p.y + p.newy) / 45 == 66)
								{
									p.x = 45 * 138;
									p.y = 45 * 233;
								}
								else
								if ((p.x + p.newx) / 45 == 90 && (p.y + p.newy) / 45 == 54)
								{
									p.x = 45 * 73;
									p.y = 45 * 80;
								}
								else
								if ((p.x + p.newx) / 45 == 73 && (p.y + p.newy) / 45 == 80)
								{
									p.x = 45 * 90;
									p.y = 45 * 54;
								}
								else
								if ((p.x + p.newx) / 45 == 82 && (p.y + p.newy) / 45 == 78)
								{
									p.x = 45 * 29;
									p.y = 45 * 94;
								}
								else
								if ((p.x + p.newx) / 45 == 29 && (p.y + p.newy) / 45 == 94)
								{
									p.x = 45 * 82;
									p.y = 45 * 78;
								}
							}
						}
						for(i = 0; i < trainers.length; i++)
						{
							if (((p.x + p.newx) / 45 == (trainers[i].x) / 45) && ((p.y + p.newy) / 45 == (trainers[i].y) / 45))
							{
								p.newx = 0;
								p.newy = 0;
								m.newx = 0;
								m.newy = 0;
								m.dir = oldmdir;
							}
						}
					}
				}
				else
				{
					p.newx = 0;
					p.newy = 0;
					m.newx = 0;
					m.newy = 0;
				}
			}
			p.x = max(0, min(p.x, mapWidth * 45));
			p.y = max(0, min(p.y, mapHeight * 45));
		}
		else
		{
			p.x += p.newx / 5;
			p.y += p.newy / 5;
			m.x += m.newx / 5;
			m.y += m.newy / 5;
			p.sprite = (p.sprite + .25) % 2
		}
	}
	else if (gamestate == 3) //Battle
	{
		if(team[teamIndex].currhealth == 0 && !friendFainted)
		{
			for(i = 0; i < team.length; i++)
			{
				if(team[i].currhealth != 0)
				{
					teamIndex = i;
					hasloaded = false;
					break;
				}
			}
		}
		if (!hasloaded)
		{
			img1 = load(Images[team[teamIndex].id][1]);
			img2 = load(Images[enemy[enemyIndex].id][0]);
			hasloaded = true;
		}
		if (!(keyIsDown(UP_ARROW) || up) && !(keyIsDown(DOWN_ARROW) || down) && !(keyIsDown(LEFT_ARROW) || left) && !(keyIsDown(RIGHT_ARROW) || right) && !(keyIsDown(90) || z) && !(keyIsDown(88) ||x))
		{
			holding = false;
		}
		teamParticipated[teamIndex] = true;
		fill('white');
		background('white');
		image(battleCircle, 260, 180, 192, 48);
		//image(battleCircle,0,370,192,48);
		image(img1, 0, 176 + Mons[team[teamIndex].id].yoff2, 4 * monWidth, 4 * monHeight);
		if(!isGym)
		{
			image(img2, 275, 50 + Mons[enemy[enemyIndex].id].yoff1, 3 * monWidth, 3 * monHeight);
			textSize(12);
			//rect(20,40,200,80);
			image(BattleBox, 15, 40, 200, 80);
			fill('black');
			text(enemy[enemyIndex].name, 25, 68);
			textSize(10);
			text("Lv." + enemy[enemyIndex].level, 150, 68);
			textSize(11);
			//rect(25,75,175,10);
			fill(255 * (1 - (enemy[enemyIndex].currhealth / enemy[enemyIndex].health)), 255 * ((enemy[enemyIndex].currhealth / enemy[enemyIndex].health)), 0);
			noStroke();
			rect(25, 74, 168 * (enemy[enemyIndex].currhealth / enemy[enemyIndex].health), 8);
			stroke(0);
		}else
		{
			if(trainers[currTrainer].gender == 2)
			{
				image(grimmBattle, 275, 50, 3 * monWidth, 3 * monHeight);
			}else
			{
				image(psychicBattle, 275, 50, 3 * monWidth, 3 * monHeight);
			}
		}
		textSize(12);
		fill('white');
		//rect(290,300,200,80);
		image(BattleBox, 285, 300, 200, 80);
		fill('black');
		text(team[teamIndex].name, 295, 328);
		textSize(10);
		text("Lv." + team[teamIndex].level, 420, 328);
		textSize(15);
		text(team[teamIndex].currhealth + "/" + team[teamIndex].health, 295, 375);
		//rect(295,335,175,10);
		fill(255 * (1 - (team[teamIndex].currhealth / team[teamIndex].health)), 255 * ((team[teamIndex].currhealth / team[teamIndex].health)), 0);
		noStroke();
		rect(295, 334, 168 * (team[teamIndex].currhealth / team[teamIndex].health), 8);
		stroke(0);
		fill('white');
		image(box, 0, 400, 500, 100);
		//rect(0,400,500,100);
		fill('black');
		if (battlemenu == 0)
		{
			if(fightDone)
			{
				gamestate = 2;
				
			}else
			{
				if (enemy[enemyIndex].currhealth == 0)
				{
					
					numEnemies -= 1;
					battlemenu = 2;
					hasloaded = false;
					enemyStats = [0,0,0,0,0];
					numParticipated = 0;
						for(i = 0; i < team.length; i++)
						{
							if(teamParticipated[i])
							{
								if(team[i].currhealth != 0)
								{
									numParticipated += 1;
								}else
								{
									teamParticipated[i] = false;
								}
							}
						}
						for(i = 0; i < team.length; i++)
						{
							if(teamParticipated[i])
							{
								if(isTrainer)
								{
									team[i].currxp += Math.floor(Math.floor((128 * enemy[enemyIndex].level)/7) * (1 / numParticipated) * 1.5)
									currText.push(team[i].name + " has gained " + Math.floor(Math.floor((128 * enemy[enemyIndex].level)/7) * (1 / numParticipated) * 1.5) + " experience" );
								}else
								{
									team[i].currxp += Math.floor(Math.floor((128 * enemy[enemyIndex].level)/7) * (1 / numParticipated));
									currText.push(team[i].name + " has gained " + (Math.floor(Math.floor((128 * enemy[enemyIndex].level)/7) * (1 / numParticipated))) + " experience" )
								}
								
								while(team[i].currxp > team[teamIndex].xp)
								{
									team[i].levelUp(i);
									currText.push(team[i].name + " grew to level " + team[i].level);
								}
							}
						}
						teamParticipated = [];
					if (numEnemies > 0)
					{
						enemy.shift();
						currText.push(trainers[currTrainer].name + " sent out " + enemy[enemyIndex].name);
						
					}
					else
					{
						
						battlemenu = 2;
						if(isTrainer)
						{
							trainers[currTrainer].beat = true;
							if(trainers[currTrainer].gender == 2)
							{
								trainers[1].x -= 45;
							}
						}
						fightDone = true;
					}
				}else
				{
					if (team[teamIndex].currhealth == 0)
					{
						//swap
						allDead = true;
						for(i = 0; i < team.length; i++)
						{
							if(team[i].currhealth != 0)
							{
								allDead = false;
								break;
							}
						}
						if(!allDead)
						{
							battlemenu = 3;
							friendFainted = true;
						}else
						{
							p.x = 45 * 57;
							p.y = 45 * 46;
							gamestate = 2;
							healAll();
						}
					}
					text(">", 250 + Math.floor(option / 2) * 100, 440 + (option % 2) * 40);
					text("Fight", 270, 440);
					text("Sack", 270, 480);
					text("Party", 370, 440);
					text("Flee", 370, 480);
					if (((keyIsDown(UP_ARROW) || up) || (keyIsDown(DOWN_ARROW) || down)) && !holding)
					{
						option = (option + 1) % 2 + Math.floor(option / 2) * 2;
						holding = true;
					}
					if (((keyIsDown(RIGHT_ARROW) || right) || (keyIsDown(LEFT_ARROW) || left)) && !holding)
					{
						option += 2;
						holding = true;
					}
					if ((option == 0 && (keyIsDown(90) || z)) && !holding)
					{
						battlemenu = 1;
						holding = true;
						option = 0;
					}
					if((option == 1 && (keyIsDown(90) || z)) && !holding)
					{
						battlemenu = 4;
						holding = true;
						itemIndex = 0;
					}
					if ((option == 2 && (keyIsDown(90) || z)) && !holding)
					{
						battlemenu = 3;
						holding = true;
						selected = 0;
					}
					if ((option == 3 && (keyIsDown(90) || z)) && !holding)
					{
						holding = true;
						if(!isTrainer)
						{
							if(team[teamIndex].speed > enemy[enemyIndex].speed)
							{
								fightDone = true;
								battlemenu = 2;
								currText.push("You escaped");
								option = 0;
							}else
							{
								chance = team[teamIndex].speed * 32;
								chance /= (enemy[enemyIndex].speed/5)%256;
								chance += 30;
								if((Math.floor(Math.random() * 256) < chance))
								{
									fightDone = true;
									battlemenu = 2;
									currText.push("You escaped");
									option = 0;
								}else
								{
									currText.push("You failed to escape");
									skill = 50;
									picked = pickMove(enemy[enemyIndex], team[teamIndex], skill);
									currText.push(enemy[enemyIndex].name + " used " + Moves[enemy[enemyIndex].moves[picked]].name);
									team[teamIndex].currhealth -= calcDamage(enemy[enemyIndex], team[teamIndex], Moves[enemy[enemyIndex].moves[picked]]);
									if (team[teamIndex].currhealth <= 0) 
									{
										team[teamIndex].currhealth = 0;
										currText.push(team[teamIndex].name + " has fainted");
									}
									battlemenu = 2;
									option = 0;
								}
							}
						}
					}
				}
			}
		}
		else if (battlemenu == 1)
		{
			text(">", 185 + (option % 2) * 140, 440 + Math.floor(option / 2) * 40);
			fill(typeColors[Moves[team[teamIndex].moves[0]].type]);
			text(Moves[team[teamIndex].moves[0]].name, 200, 440);
			if (team[teamIndex].moves[2] == null)
			{
				fill('black');
				text("-", 200, 480);
			}else
			{
				fill(typeColors[Moves[team[teamIndex].moves[2]].type]);
				text(Moves[team[teamIndex].moves[2]].name, 200, 480);
			}
			if (team[teamIndex].moves[1] == null)
			{
				fill('black');
				text("-", 350, 440);
			}else
			{
				fill(typeColors[Moves[team[teamIndex].moves[1]].type]);
				text(Moves[team[teamIndex].moves[1]].name, 350, 440);
			}
			if (team[teamIndex].moves[3] == null)
			{
				fill('black');
				text("-", 350, 480);
			}else
			{
				fill(typeColors[Moves[team[teamIndex].moves[3]].type]);
				text(Moves[team[teamIndex].moves[3]].name, 350, 480);
			}
			fill('black');
			if (((keyIsDown(RIGHT_ARROW) || right) || (keyIsDown(LEFT_ARROW) || left)) && !holding)
			{
				option = (option + 1) % 2 + Math.floor(option / 2) * 2;
				holding = true;
			}
			if (((keyIsDown(DOWN_ARROW) || down) || (keyIsDown(UP_ARROW) || up)) && !holding)
			{
				option += 2;
				holding = true;
			}
			if ((keyIsDown(88) ||x) && !holding)
			{
				battlemenu = 0;
				holding = true;
				option = 0;
			}
			if(Moves[team[teamIndex].moves[option]] != null)
			{
				text("dmg " + Moves[team[teamIndex].moves[option]].damage, 80, 440);
				text(team[teamIndex].movespp[option] + "/" + Moves[team[teamIndex].moves[option]].pp, 85, 470);
			}
			if(friendStats[4] > 0)
			{
				fspd = (team[teamIndex].speed * (2 + friendStats[4]))/2;
			}else
			{
				fspd = (team[teamIndex].speed * 2)/(2 - friendStats[4]);
			}
			if(enemyStats[4] > 0)
			{
				espd = (enemy[enemyIndex].speed * (2 + enemyStats[4]))/2;
			}else
			{
				espd = (enemy[enemyIndex].speed * 2)/(2 - enemyStats[4]);
			}
			if (team[teamIndex].moves[option] != null && (keyIsDown(90) || z) && !holding && team[teamIndex].movespp[option] > 0)
			{
				team[teamIndex].movespp[option]--;
				if (fspd >= espd)
				{
					currText.push(team[teamIndex].name + " used " + Moves[team[teamIndex].moves[option]].name);
					if(Moves[team[teamIndex].moves[option]].moveType == 0)
					{
						enemy[enemyIndex].currhealth -= calcDamage(team[teamIndex], enemy[enemyIndex], Moves[team[teamIndex].moves[option]], true);
						mult = 1;
						mult *= typechart[Moves[team[teamIndex].moves[option]].type][enemy[enemyIndex].type1];
						if (enemy[enemyIndex].type2 != null)
						{
							mult *= typechart[Moves[team[teamIndex].moves[option]].type][enemy[enemyIndex].type2];
						}
						if(mult > 1)
						{
							currText.push("It was super effective");
						}else if(mult < 1)
						{
							currText.push("It was not very effective");
						}
					}
					if((Moves[team[teamIndex].moves[option]].effect <= 5 && Moves[team[teamIndex].moves[option]].effect > 0))
					{
						enemyStats[Moves[team[teamIndex].moves[option]].effect-1] = max(-6,enemyStats[Moves[team[teamIndex].moves[option]].effect-1]-1) 
						currText.push(enemy[enemyIndex].name + " had it's " + stats[Moves[team[teamIndex].moves[option]].effect-1] + " lowered.");
					}else if(Moves[team[teamIndex].moves[option]].effect > 5)
					{
						friendStats[Moves[team[teamIndex].moves[option]].effect-6] = min(6,friendStats[Moves[team[teamIndex].moves[option]].effect-6]+1) 
						currText.push(team[teamIndex].name + " had it's " + stats[Moves[team[teamIndex].moves[option]].effect-6] + " raised.");
					}
					holding = true;
					if (enemy[enemyIndex].currhealth <= 0) 
					{
						enemy[enemyIndex].currhealth = 0;
						currText.push(enemy[enemyIndex].name + " has fainted");
					}else
					{
						skill = 50;
						picked = pickMove(enemy[enemyIndex], team[teamIndex], skill);
						currText.push(enemy[enemyIndex].name + " used " + Moves[enemy[enemyIndex].moves[picked]].name);
						if(Moves[enemy[enemyIndex].moves[picked]].moveType == 0)
						{
							team[teamIndex].currhealth -= calcDamage(enemy[enemyIndex], team[teamIndex], Moves[enemy[enemyIndex].moves[picked]], false);
							mult = 1;
							mult *= typechart[Moves[enemy[enemyIndex].moves[picked]].type][team[teamIndex].type1];
							if (team[teamIndex].type2 != null)
							{
								mult *= typechart[Moves[enemy[enemyIndex].moves[picked]].type][team[teamIndex].type2];
							}
							if(mult > 1)
							{
								currText.push("It was super effective");
							}else if(mult < 1)
							{
								currText.push("It was not very effective");
							}
						}
						if((Moves[enemy[enemyIndex].moves[picked]].effect <= 5 &&Moves[enemy[enemyIndex].moves[picked]].effect > 0))
						{
							friendStats[Moves[enemy[enemyIndex].moves[picked]].effect-1] = max(-6,friendStats[Moves[enemy[enemyIndex].moves[picked]].effect-1]-1) 
							currText.push(team[teamIndex].name + " had it's " + stats[Moves[enemy[enemyIndex].moves[picked]].effect-1] + " lowered.");
						}else if(Moves[enemy[enemyIndex].moves[picked]].effect > 5)
						{
							enemyStats[Moves[enemy[enemyIndex].moves[picked]].effect-6] = min(6,enemyStats[Moves[enemy[enemyIndex].moves[picked]].effect-6]+1) 
							currText.push(enemy[enemyIndex].name + " had it's " + stats[Moves[enemy[enemyIndex].moves[picked]].effect-6] + " raised.");
						}
						if (team[teamIndex].currhealth <= 0) 
						{
							team[teamIndex].currhealth = 0;
							friendFainted = true;
							currText.push(team[teamIndex].name + " has fainted");
							holding = true;
							battlemenu = 3;
						}
					}
				}else
				{
					skill = 50;
					picked = pickMove(enemy[enemyIndex], team[teamIndex], skill);
					currText.push(enemy[enemyIndex].name + " used " + Moves[enemy[enemyIndex].moves[picked]].name);
					if(Moves[enemy[enemyIndex].moves[picked]].moveType == 0)
					{
						team[teamIndex].currhealth -= calcDamage(enemy[enemyIndex], team[teamIndex], Moves[enemy[enemyIndex].moves[picked]], false);
						mult = 1;
						mult *= typechart[Moves[enemy[enemyIndex].moves[picked]].type][team[teamIndex].type1];
						if (team[teamIndex].type2 != null)
						{
							mult *= typechart[Moves[enemy[enemyIndex].moves[picked]].type][team[teamIndex].type2];
						}
						if(mult > 1)
						{
							currText.push("It was super effective");
						}else if(mult < 1)
						{
							currText.push("It was not very effective");
						}
					}
					if((Moves[enemy[enemyIndex].moves[picked]].effect <= 5 &&Moves[enemy[enemyIndex].moves[picked]].effect > 0))
					{
						friendStats[Moves[enemy[enemyIndex].moves[picked]].effect-1] = max(-6,friendStats[Moves[enemy[enemyIndex].moves[picked]].effect-1]-1) 
						currText.push(team[teamIndex].name + " had it's " + stats[Moves[enemy[enemyIndex].moves[picked]].effect-1] + " lowered.");
					}else if(Moves[enemy[enemyIndex].moves[picked]].effect > 5)
					{
						enemyStats[Moves[enemy[enemyIndex].moves[picked]].effect-6] = min(6,enemyStats[Moves[enemy[enemyIndex].moves[picked]].effect-6]+1) 
						currText.push(enemy[enemyIndex].name + " had it's " + stats[Moves[enemy[enemyIndex].moves[picked]].effect-6] + " raised.");
					}
					if (team[teamIndex].currhealth <= 0) 
					{
						team[teamIndex].currhealth = 0;
						friendFainted = true;
						currText.push(team[teamIndex].name + " has fainted");
						holding = true;
						battlemenu = 3;
					}else
					{
						currText.push(team[teamIndex].name + " used " + Moves[team[teamIndex].moves[option]].name);
						if(Moves[team[teamIndex].moves[option]].moveType == 0)
						{
							enemy[enemyIndex].currhealth -= calcDamage(team[teamIndex], enemy[enemyIndex], Moves[team[teamIndex].moves[0]], true);
							mult = 1;
							mult *= typechart[Moves[team[teamIndex].moves[option]].type][enemy[enemyIndex].type1];
							if (enemy[enemyIndex].type2 != null)
							{
								mult *= typechart[Moves[team[teamIndex].moves[option]].type][enemy[enemyIndex].type2];
							}
							if(mult > 1)
							{
								currText.push("It was super effective");
							}else if(mult < 1)
							{
								currText.push("It was not very effective");
							}
						}
						if((Moves[team[teamIndex].moves[option]].effect <= 5 && Moves[team[teamIndex].moves[option]].effect > 0))
						{
							enemyStats[Moves[team[teamIndex].moves[option]].effect-1] = max(-6,enemyStats[Moves[team[teamIndex].moves[option]].effect-1]-1) 
							currText.push(enemy[enemyIndex].name + " had it's " + stats[Moves[team[teamIndex].moves[option]].effect-1] + " lowered.");
						}else if(Moves[team[teamIndex].moves[option]].effect > 5)
						{
							friendStats[Moves[team[teamIndex].moves[option]].effect-6] = min(6,friendStats[Moves[team[teamIndex].moves[option]].effect-6]+1) 
							currText.push(team[teamIndex].name + " had it's " + stats[Moves[team[teamIndex].moves[option]].effect-6] + " raised.");
						}
						if (enemy[enemyIndex].currhealth < 0) 
						{
							enemy[enemyIndex].currhealth = 0;
							currText.push(enemy[enemyIndex].name + " has fainted");
						}
						
					}
					
				}
				battlemenu = 2;
				holding = true;
				option = 0;
				textBox = true;
			}
		}
		else if(battlemenu == 2)
		{
			
			draw_text(currText[0]);
			if (!(keyIsDown(90) || z))
			{
				holding = false;
			}
			if ((keyIsDown(90) || z) && !holding)
			{
				currText.shift();
				if (currText.length == 0)
				{
					textBox = false;
					isGym = false;
					battlemenu = 0;
				}
				holding = true;
			}
		}
		else if(battlemenu == 3)
		{
			background(255);
			for(i = 0; i < team.length; i++)
			{
				fill('white');
				rect(150+75*(i%2),150+Math.floor(i/2)*75,45,45)
				image(followMons[team[i].id][0], 150+ 75*(i%2),150 + Math.floor(i/2)*75, 45, 45);
				if(team[i].currhealth == 0)
				{
					fill('red');
					text('x',180+75*(i%2), 160+Math.floor(i/2)*75);
				}
				fill('black')
			}
			text("v",150+75*(selected%2),150+Math.floor(selected/2)*75)
			if ((keyIsDown(88) ||x) && !holding)
			{
				battlemenu = 0;
				holding = true;
				option = 0;
			}
			if (((keyIsDown(RIGHT_ARROW) || right) || (keyIsDown(LEFT_ARROW) || left)) && !holding)
			{
				selected = (selected + 1) % 2 + Math.floor(selected / 2) * 2;
				holding = true;
			}
			if ((keyIsDown(DOWN_ARROW) || down) && !holding)
			{
				selected += 2;
				holding = true;
			}
			if ((keyIsDown(UP_ARROW) || up) && !holding)
			{
				selected -= 2;
				holding = true;
			}
			if(((keyIsDown(90) || z) && !holding))
			{
				if(team[selected] != undefined && team[selected] != null)
				{
					if(team[selected].currhealth != 0)
					{
						teamIndex = selected
						currText.push("Go " + team[teamIndex].name);
						friendStats = [0,0,0,0,0];
						if(!friendFainted)
						{
							skill = 50;
							picked = pickMove(enemy[enemyIndex], team[teamIndex], skill);
							currText.push(enemy[enemyIndex].name + " used " + Moves[enemy[enemyIndex].moves[picked]].name);
							team[teamIndex].currhealth -= calcDamage(enemy[enemyIndex], team[teamIndex], Moves[enemy[enemyIndex].moves[picked]]);
							if (team[teamIndex].currhealth <= 0) 
							{
								team[teamIndex].currhealth = 0;
								currText.push(team[teamIndex].name + " has fainted");
							}
						}
						textBox = true;
						battlemenu = 2;
						hasloaded = false;
						holding = true;
						friendFainted = false;
						option = 0;
					}
				}
			}
		}
		else if(battlemenu == 4)
		{
			background('white');
			for (i = 0; i < items.length; i++)
			{
				text(items[i], 30, 250 - (itemIndex - i) * 30);
			}
			//triangle(15,230,15,250,25,240);
			text("Held: " + inventory[itemIndex], 300,300)
			text(">", 15, 250);
			if (!(keyIsDown(UP_ARROW) || up) && !(keyIsDown(DOWN_ARROW) || down) && !(keyIsDown(LEFT_ARROW) || left) && !(keyIsDown(RIGHT_ARROW) || right) && !(keyIsDown(90) || z) && !(keyIsDown(88) ||x))
			{
				holding = false;
			}
			if ((keyIsDown(90) || z) && !holding)
			{
				switch(itemIndex)
				{
					case 0:
						if(inventory[itemIndex] > 0)
						{
							battlemenu = 5;
						}
						break;
					case 1:
						if(!isTrainer)
						{
							if(inventory[itemIndex] > 0)
							{
								inventory[itemIndex] -= 1;
								textBox = true;
								currText.push("You threw a satchel at the " + enemy[enemyIndex].name);
								battlemenu = 2;
								catchNum = Math.floor(Math.random() * 255);
								needed = 3 * enemy[enemyIndex].health - (2*enemy[enemyIndex].currhealth);
								needed *= 75;
								needed /= 3 * enemy[enemyIndex].health;
								needed = max(1, min(255, needed));
								needed = Math.floor(needed);
								console.log(needed);
								if(catchNum > needed)
								{
									currText.push("The " + enemy[enemyIndex].name + " was caught")
									if(team.length == 6)
									{
										firstEmpty = 0;
										for(i = 0; i < boxes[0].length; i++)
										{
											if(boxes[0][i] == null)
											{
												firstEmpty = i;
												break;
											}
										}
										boxes[0][firstEmpty] = Object.create(Monster);
										Object.assign(boxes[0][firstEmpty],enemy[enemyIndex])
										currText.push(enemy[enemyIndex].name + " was sent to the box");
									}else
									{
										
										team.push(Object.create(Monster));
										Object.assign(team[team.length-1],enemy[enemyIndex])
										currText.push(enemy[enemyIndex].name + " was added to your team");
									}
									fightDone = true;
								}else
								{
									skill = 50;
									picked = pickMove(enemy[enemyIndex], team[teamIndex], skill);
									currText.push(enemy[enemyIndex].name + " used " + Moves[enemy[enemyIndex].moves[picked]].name);
									team[teamIndex].currhealth -= calcDamage(enemy[enemyIndex], team[teamIndex], Moves[enemy[enemyIndex].moves[picked]]);
									if (team[teamIndex].currhealth <= 0) 
									{
										team[teamIndex].currhealth = 0;
										currText.push(team[teamIndex].name + " has fainted");
									}
								}
							}
						}
						break;
				}
				holding = true;
			}
			if((keyIsDown(88) ||x) && !holding)
			{
				battlemenu = 0;
				holding = true;
			}
			if ((keyIsDown(UP_ARROW) || up) && !holding)
			{
				itemIndex = (itemIndex - 1);
				if (itemIndex == -1)
				{
					itemIndex = items.length - 1;
				}
				hasloaded = false;
				holding = true;
			}
			if ((keyIsDown(DOWN_ARROW) || down) && !holding)
			{
				itemIndex = (itemIndex + 1) % (items.length);
				hasloaded = false;
				holding = true;
			}
		}
		else if(battlemenu == 5)
		{
			background(255);
			for(i = 0; i < team.length; i++)
			{
				fill('white');
				rect(150+75*(i%2),150+Math.floor(i/2)*75,45,45)
				image(followMons[team[i].id][0], 150+ 75*(i%2),150 + Math.floor(i/2)*75, 45, 45);
				if(team[i].currhealth == 0)
				{
					fill('red');
					text('x',180+75*(i%2), 160+Math.floor(i/2)*75);
				}
				fill('black')
			}
			text("v",150+75*(selected%2),150+Math.floor(selected/2)*75)
			if ((keyIsDown(88) ||x) && !holding)
			{
				battlemenu = 4;
				holding = true;
				option = 0;
			}
			if (((keyIsDown(RIGHT_ARROW) || right) || (keyIsDown(LEFT_ARROW) || left)) && !holding)
			{
				selected = (selected + 1) % 2 + Math.floor(selected / 2) * 2;
				holding = true;
			}
			if ((keyIsDown(DOWN_ARROW) || down) && !holding)
			{
				selected += 2;
				holding = true;
			}
			if ((keyIsDown(UP_ARROW) || up) && !holding)
			{
				selected -= 2;
				holding = true;
			}
			if(((keyIsDown(90) || z) && !holding))
			{
				if(team[selected] != undefined && team[selected] != null)
				{
					if(team[selected].currhealth != 0)
					{
						team[selected].currhealth = min(team[selected].health,team[selected].currhealth+30)
						inventory[itemIndex]--;
						currText.push("You used a potion on " + team[selected].name);
						skill = 50;
						picked = pickMove(enemy[enemyIndex], team[teamIndex], skill);
						currText.push(enemy[enemyIndex].name + " used " + Moves[enemy[enemyIndex].moves[picked]].name);
						team[teamIndex].currhealth -= calcDamage(enemy[enemyIndex], team[teamIndex], Moves[enemy[enemyIndex].moves[picked]]);
						if (team[teamIndex].currhealth <= 0) 
						{
							team[teamIndex].currhealth = 0;
							currText.push(team[teamIndex].name + " has fainted");
						}
						battlemenu = 2;
						holding = true;
					}
				}
			}
		}
		if (option > 3)
		{
			option -= 4;
		}
		if (option < 0)
		{
			option += 4;
		}
		if (selected > 5)
		{
			selected -= 6;
		}
		if (selected < 0)
		{
			selected += 6;
		}
	}
	else if(gamestate == 4) //Box view
	{
		textSize(12);
		stroke(1);
		if(!hasloaded)
		{
			if(pickup == -1 && pickupTeam == null)
			{
				if(onTeam)
				{
					if(team[selectedTeam] != null)
					{
						summaryImg = loadImage(Images[team[selectedTeam].id][0]);
					}else
					{
						summaryImg = null;
					}
				}else
				{
					if(boxes[0][selected] != null)
					{
						summaryImg = loadImage(Images[boxes[0][selected].id][0]);
					}else
					{
						summaryImg = null;
					}
				}
			}else
			{
				if(pickupTeam != null)
				{
					summaryImg = loadImage(Images[pickupTeam.id][0]);
				}else
				{
					summaryImg = loadImage(Images[boxes[0][pickup].id][0]);
				}
			}
			hasloaded = true;
		}
		if(holding)
		{
			hasloaded = false;
		}
		if(!(keyIsDown(RIGHT_ARROW) || right) && !(keyIsDown(LEFT_ARROW) || left) && !(keyIsDown(UP_ARROW) || up) && !(keyIsDown(DOWN_ARROW) || down) && !(keyIsDown(90) || z) && !(keyIsDown(88) ||x) && !(keyIsDown(69) || e))
		{
			holding = false;
		}		
		
		background(150);
		currbox = 0;
		for(i = 0; i < 6; i++)
		{
			fill('white');
			rect(5+40*(i%2),150+Math.floor(i/2)*40,30,30)
			if(i == selectedTeam && onTeam)
			{
				fill('gray');
				rect(5+40*(selectedTeam%2),150 + Math.floor(selectedTeam/2)*40, 30, 30)
			}
			if(team[i] != null)
			{
				image(followMons[team[i].id][0],5+ 40*(i%2),150 + Math.floor(i/2)*40, 30, 30);
			}
		}
		fill('white');
		
		rect(90,50,310,310)
		fill('gray');
		if(!onTeam)
		{
			rect(90 + 35*(selected%9),50 + Math.floor(selected/9)*35, 30, 30)
		}
		for(i = 0; i < 81; i++)
		{
			if(boxes[currbox][i] != null && boxes[currbox][i] != undefined)
			{
				if(i != pickup)
				{
					image(followMons[boxes[currbox][i].id][0],90 + 35*(i%9),50 + Math.floor(i/9)*35, 30, 30);
				}
			}
		}
		if(onTeam)
		{
			if(pickup != -1)
			{
				image(followMons[boxes[currbox][pickup].id][0],5+40*(selectedTeam%2),145 + Math.floor(selectedTeam/2)*40, 30, 30);
			}
			if(pickupTeam != null)
			{
				image(followMons[pickupTeam.id][0],40*(selectedTeam%2),145 + Math.floor(selectedTeam/2)*40, 30, 30);
			}
		}else
		{
			if(pickup != -1)
			{
				image(followMons[boxes[currbox][pickup].id][0],90 + 35*(selected%9),45 + Math.floor(selected/9)*35, 30, 30);
			}
			if(pickupTeam != null)
			{
				image(followMons[pickupTeam.id][0],90 + 35*(selected%9),45 + Math.floor(selected/9)*35, 30, 30);
			}
		}
		fill(255)
		
		rect(5,370,112,112)
		fill(0);
		text("Potions: " + inventory[0], 0,50);
		if(summaryImg != null)
		{
			image(summaryImg,5,370,112,112);
			fill(0);
			summary = null
			if(pickup == -1 && pickupTeam == null)
			{
				if(onTeam)
				{
					if(team[selectedTeam] != null)
					{
						summary = team[selectedTeam];
					}
				}else
				{
					if(boxes[0][selected] != null)
					{
						summary = boxes[0][selected]
					}
				}
			}else
			{
				if(pickupTeam != null)
				{
					summary = pickupTeam;
				}else
				{
					summary = boxes[0][pickup];
				}
			}
			if(summary != null)
			{
				noStroke();
				text(summary.name + "\tLv. " + summary.level,150,380);
				fill(255);
				rect(150, 390, 100, 20);
				fill(typeColors[summary.type1]);
				text(typeNames[summary.type1], 155, 405, 170);
				if (summary.type2 != null)
				{
					fill(255);
					rect(255, 390, 100, 20);
					fill(typeColors[summary.type2]);
					text(typeNames[summary.type2], 260, 405, 170);
				}
				fill(0);
				text("HP " + summary.currhealth + "/" + summary.health, 155, 425);
				text("ATK " + summary.attack, 155, 440);
				text("SPATK " + summary.spattack, 155, 455);
				text("XP to next level: " + (summary.xp - summary.currxp), 155, 470)
				text("SPD " + summary.speed, 260, 425);
				text("DEF " + summary.defense, 260, 440);
				text("SPDEF " + summary.spdefense, 260, 455);
			}
		}
		if ((keyIsDown(69) || e) && !holding)
			{
				if(inventory[0] > 0)
				{
					if(onTeam)
					{
						if(team[selectedTeam] != null)
						{
							if(team[selectedTeam].currhealth > 0 && team[selectedTeam].currhealth < team[selectedTeam].health)
							{
								inventory[0]--;
								team[selectedTeam].currhealth = min(team[selectedTeam].currhealth+30,team[selectedTeam].health);
							}
						}
					}else
					{
						if(boxes[0][selected] != null)
						{
							if(boxes[0][selected].currhealth > 0 && boxes[0][selected].currhealth < boxes[0][selected].health)
							{
								inventory[0]--;
								boxes[0][selected].currhealth = min(boxes[0][selected].currhealth+30,boxes[0][selected].health);
							}
						}
					}
				}
				holding = true;
			}
		if(onTeam)
		{
			if ((keyIsDown(RIGHT_ARROW) || right)&& !holding)
			{
				if((selectedTeam + 1) % 2 == 0)
				{
					onTeam = false;
				}else
				{
					selectedTeam = (selectedTeam + 1) % 2 + Math.floor(selectedTeam / 2) * 2;
				}
				holding = true;
			}
			if ((keyIsDown(LEFT_ARROW) || left) && !holding)
			{
				selectedTeam = (selectedTeam - 1) % 2 + Math.floor(selectedTeam / 2) * 2;
				holding = true;
				
			}
			if ((keyIsDown(DOWN_ARROW) || down) && !holding)
			{
				selectedTeam += 2;
				holding = true;
			}
			if ((keyIsDown(UP_ARROW) || up) && !holding)
			{
				selectedTeam -= 2;
				holding = true;
			}
			if ((keyIsDown(90) || z) && !holding)
			{
				
				if(pickupTeam == null && pickup == -1)
				{
					if(team.length > 1)
					{
						if(team[selectedTeam] != null)
						{
							pickupTeam = Object.create(Monster);
							Object.assign(pickupTeam, team[selectedTeam]);
							team.splice(selectedTeam, 1);
						}
					}
				}else
				{
					if(pickupTeam != null)
					{
						
						if(team[selectedTeam] == null || team[selectedTeam] == undefined)
						{
							team[selectedTeam] = Object.create(Monster)
							Object.assign(team[selectedTeam],pickupTeam);
							pickupTeam = null;
							
						}else
						{
							[team[selectedTeam], pickupTeam] = [pickupTeam, team[selectedTeam]];
						}
					}else if (pickup != -1)
					{
						[team[selectedTeam], boxes[0][pickup]] = [boxes[0][pickup], team[selectedTeam]]
						pickup = -1;
						
					}
					team = team.filter(function (el) {
						return el != null;
					});
				}
				holding = true;
			}
		}else
		{
			if ((keyIsDown(RIGHT_ARROW) || right)&& !holding)
			{
				selected = (selected + 1) % 9 + Math.floor(selected / 9) * 9;
				holding = true;
			}
			if ((keyIsDown(LEFT_ARROW) || left) && !holding)
			{
				if((selected - 1) % 9 == 8 || (selected - 1) == -1)
				{
					onTeam = true;
				}else
				{
					selected = (selected - 1) % 9 + Math.floor(selected / 9) * 9;
				}
				holding = true;
				
			}
			if ((keyIsDown(DOWN_ARROW) || down) && !holding)
			{
				selected += 9;
				holding = true;
			}
			if ((keyIsDown(UP_ARROW) || up) && !holding)
			{
				selected -= 9;
				holding = true;
			}
			if ((keyIsDown(90) || z) && !holding)
			{
				if(pickup == -1 && (boxes[currbox][selected] != null ||boxes[currbox][selected] != undefined) && pickupTeam == null)
				{
					pickup = selected;
				}else
				{
					if(pickupTeam != null)
					{
						[boxes[0][selected],pickupTeam] = [pickupTeam,boxes[0][selected]];
						
						
					}else
					{
						[boxes[0][pickup], boxes[0][selected]] = [boxes[0][selected], boxes[0][pickup]];
						if(selected == pickup || (boxes[0][pickup] == null))
						{
							pickup = -1;
						}
					}
				}
				holding = true;
			}
		}
		if(pickup == -1 && pickupTeam == null)
		{
			if((keyIsDown(88) ||x) && !holding)
			{
				gamestate = 2;
			}
		}
		if (selected > 80)
		{
			selected -= 81;
		}
		if (selected < 0)
		{
			selected += 81;
		}
		if(selectedTeam > 5)
		{
			selectedTeam -= 6;
		}
		if (selectedTeam < 0)
		{
			selectedTeam += 6;
		}
	}
	else if(gamestate == 5) //Starter
	{
		if(!(keyIsDown(RIGHT_ARROW) || right) && !(keyIsDown(LEFT_ARROW) || left) && !(keyIsDown(UP_ARROW) || up) && !(keyIsDown(DOWN_ARROW) || down) && !(keyIsDown(90) || z) && !(keyIsDown(88) ||x))
		{
			holding = false;
		}	
		background(200);
		if(!hasloaded)
		{
			starter1 = load(Images[0][0]);
			starter2 = load(Images[3][0]);
			starter3 = load(Images[6][0]);
		}
		if ((keyIsDown(RIGHT_ARROW) || right)&& !holding)
		{
			starterChoice += 1;
			holding = true;
		}
		if ((keyIsDown(LEFT_ARROW) || left) && !holding)
		{
			starterChoice -= 1;
			holding = true;
			
		}
		if(starterChoice > 2)
		{
			starterChoice -= 3;
		}
		if(starterChoice < 0)
		{
			starterChoice += 3;
		}
		if((keyIsDown(90) || z) && !holding)
		{
			team[0] = Object.create(Monster);
			Object.assign(team[0], Mons[starterChoice*3]);
			team[0].level = 5;
			//team[0].moves[2] = 2;
			team[0].movespp[2] = 25;
			team[0].calcStats();
			team[0].currhealth = team[0].health;
			currMove = 0;
			for(i = 0; i < team[0].level; i++)
			{
				if(team[0].learnset[i] != null)
				{
					team[0].moves[currMove] = team[0].learnset[i];
					team[0].movespp[currMove] = Moves[team[0].learnset[i]].pp;
					currMove = (currMove + 1) % 4;
				}
			}
			gamestate = 2;
			//team[0].learnset[5] = 1;
			//canLearn.push(0);
		}
		fill('white');
		rect(25,150,145,145);
		rect(175,150,145,145);
		rect(325,150,145,145);
		fill('black')
		text("Woodzar",55,140)
		text("Platypyro",190,140)
		text("Toadart",355,140)
		fill('gray');
		rect(25 + 150*starterChoice,150,145,145);
		image(starter1,25,150,158,158);
		image(starter2,175,150,158,158);
		image(starter3,325,150,158,158);
		

	}
	else if(gamestate == 6) //Shop
	{
		
		background('salmon');
		textAlign(RIGHT);
		text("$" + money,500,20);
		textAlign(LEFT);
		textSize(15);
		fill(0);
		for (i = 0; i < items.length; i++)
		{
			text(items[i] + " - $" + itemCost[i], 30, 250 - (itemIndex - i) * 30);
		}
		//triangle(15,230,15,250,25,240);
		text("Held: " + inventory[itemIndex], 300,300)
		text(">", 15, 250);
		if (!(keyIsDown(UP_ARROW) || up) && !(keyIsDown(DOWN_ARROW) || down) && !(keyIsDown(LEFT_ARROW) || left) && !(keyIsDown(RIGHT_ARROW) || right) && !(keyIsDown(90) || z))
		{
			holding = false;
		}
		if ((keyIsDown(90) || z) && !holding)
		{
			if(money >= itemCost[itemIndex])
			{
				money -= itemCost[itemIndex];
				inventory[itemIndex]++;
			}
			holding = true;
		}
		if((keyIsDown(88) ||x))
		{
			gamestate = 2;
		}
		if ((keyIsDown(UP_ARROW) || up) && !holding)
		{
			itemIndex = (itemIndex - 1);
			if (itemIndex == -1)
			{
				itemIndex = items.length - 1;
			}
			hasloaded = false;
			holding = true;
		}
		if ((keyIsDown(DOWN_ARROW) || down) && !holding)
		{
			itemIndex = (itemIndex + 1) % (items.length);
			hasloaded = false;
			holding = true;
		}
	}
	else if(gamestate == 7) //Evolution
	{
		background('salmon');
		if(!hasloaded)
		{
			img = load(Images[team[canEvolve[0]].id][0]);
			if(oldName == "")
			{
				currText.push(team[canEvolve[0]].name + " wants to evolve");
				oldName = team[canEvolve[0]].name;
			}
			holding = true;
			textBox = true;
		}
		fill('white');
		square(150, height / 2 - 2 * monHeight, 3 * monWidth);
		
		image(img, 150, height / 2 - 2 * monHeight, 3 * monWidth, 3 * monHeight);
		
		if (!(keyIsDown(90) || z) && !(keyIsDown(UP_ARROW) || up) && !(keyIsDown(DOWN_ARROW) || down))
		{
			holding = false;
		}
		if(!hasEvolved)
		{
			square(390, 270, 100);
			fill('black');
			text("Yes", 420, 300);
			text("No", 420, 350);
			if ((keyIsDown(UP_ARROW) || up) && !holding)
			{
				yes = (yes - 1);
				if (yes == -1)
				{
					yes = 1;
				}
				holding = true;
			}
			if ((keyIsDown(DOWN_ARROW) || down) && !holding)
			{
				yes = (yes + 1) % (2);
				holding = true;
			}
			if(textBox)
			{
				
				text(">", 400, 300 + yes*50);
				draw_text(currText[0]);
				if ((keyIsDown(90) || z) && !holding)
				{
					currText.shift();
					if (currText.length == 0)
					{
						if(yes == 0)
						{
							team[canEvolve[0]].evolve();
							hasloaded = false;
							hasEvolved = true;
							currText.push("Your " + oldName + " turned into a " + team[canEvolve[0]].name);
						}else
						{
							canEvolve.shift();
							gamestate = 2;
							textBox = false;
						}
					}
					holding = true;
				}
			}
		}else
		{
			fill('black');
			if(textBox)
			{
				
				draw_text(currText[0]);
				if ((keyIsDown(90) || z) && !holding)
				{
					currText.shift();
					if (currText.length == 0)
					{
						textBox = false;
						gamestate = 2;
						canEvolve.shift();
						oldName = "";
					}
					holding = true;
				}
			}
		}
	}
	else if(gamestate == 8) //Move choice
	{
		background('salmon');
		if(!hasloaded)
		{
			img = load(Images[team[canLearn[0]].id][0]);

			holding = true;
			textBox = true;
			learnIndex = -1;
			for(i = 0; i < 4; i++)
			{
				if(team[canLearn[0]].moves[i] == null)
				{
					learnIndex = i;
					break;
				}
			}
			if(learnIndex == -1)
			{
				currText.push(team[canLearn[0]].name + " wants to learn " + Moves[team[canLearn[0]].learnset[team[canLearn[0]].level]].name);
			}else
			{
				currText.push(team[canLearn[0]].name + " learned " + Moves[team[canLearn[0]].learnset[team[canLearn[0]].level]].name);
			}
			
		}
		if (!(keyIsDown(90) || z) && !(keyIsDown(88) ||x) && !(keyIsDown(UP_ARROW) || up) && !(keyIsDown(DOWN_ARROW) || down) && !(keyIsDown(LEFT_ARROW) || left) && !(keyIsDown(RIGHT_ARROW) || right))
		{
			holding = false;
		}
		fill('white');
		square(150, height / 2 - 2 * monHeight, 3 * monWidth);
		image(box, 0, 400, 500, 100);
		image(img, 150, height / 2 - 2 * monHeight, 3 * monWidth, 3 * monHeight);
		fill('black');
		text(">", 215 + (option % 2) * 140, 440 + Math.floor(option / 2) * 40);
		fill(typeColors[Moves[team[teamIndex].moves[0]].type]);
		text(Moves[team[teamIndex].moves[0]].name, 230, 440);
		if (team[teamIndex].moves[2] == null)
		{
			fill('black');
			text("-", 270, 480);
		}else
		{
			fill(typeColors[Moves[team[teamIndex].moves[2]].type]);
			text(Moves[team[teamIndex].moves[2]].name, 230, 480);
		}
		if (team[teamIndex].moves[1] == null)
		{
			fill('black');
			text("-", 370, 440);
		}else
		{
			fill(typeColors[Moves[team[teamIndex].moves[1]].type]);
			text(Moves[team[teamIndex].moves[1]].name, 370, 440);
		}
		if (team[teamIndex].moves[3] == null)
		{
			fill('black');
			text("-", 370, 480);
		}else
		{
			fill(typeColors[Moves[team[teamIndex].moves[3]].type]);
			text(Moves[team[teamIndex].moves[3]].name, 370, 480);
		}
		fill('black');
		if (((keyIsDown(RIGHT_ARROW) || right) || (keyIsDown(LEFT_ARROW) || left)) && !holding)
		{
			option = (option + 1) % 2 + Math.floor(option / 2) * 2;
			holding = true;
		}
		if (((keyIsDown(DOWN_ARROW) || down) || (keyIsDown(UP_ARROW) || up)) && !holding)
		{
			option += 2;
			holding = true;
		}
		if (option > 3)
		{
			option -= 4;
		}
		if (option < 0)
		{
			option += 4;
		}
		if(textBox)
		{
			
			draw_text(currText[0]);
			if ((keyIsDown(90) || z) && !holding)
			{
				currText.shift();
				if (currText.length == 0)
				{
					textBox = false;
					if(learnIndex != -1)
					{
						team[canLearn[0]].moves[learnIndex] = team[canLearn[0]].learnset[team[canLearn[0]].level];
						team[canLearn[0]].movespp[learnIndex] = Moves[team[canLearn[0]].moves[learnIndex]].pp;
						gamestate = 2;
						canLearn.shift();
					}
				}
				holding = true;
			}
		}else
		{
			if ((keyIsDown(88) ||x) && !holding)
			{
				gamestate = 2;
				canLearn.shift();
			}
			if((keyIsDown(90) || z) && !holding)
			{
				team[canLearn[0]].moves[option] = team[canLearn[0]].learnset[team[canLearn[0]].level];
				team[canLearn[0]].movespp[option] = Moves[team[canLearn[0]].moves[option]].pp;
				gamestate = 2;
				canLearn.shift();
			}
		}
	}
	z = false;
	x = false;
	s = false;
	e = false;
	d = false
}