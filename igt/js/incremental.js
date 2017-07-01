var Timer = window.setInterval(function(){Tick()}, 1000);
var buildings = [];

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
				}	
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
				}
			}
			return "";
}

function GameSave(){
	this.money = 0;
}

function Building(name,cost,persec,qty) {
	this.Name = "Building Name";
	this.Cost = 10;
	this.PerSec = 1;
	this.Qty = 0;
}

function InitBuildings() {
	LoadBuilding("Lemonade Stand",25,1);
	LoadBuilding("Recycling",100,3);
}

function LoadBuilding(name,cost,persec) {
	var digit = buildings.length;
	
	buildings[digit] = new Building(name,cost,persec);
	buildings[digit].Name = name;
	buildings[digit].Cost = cost;
	buildings[digit].PerSec = persec;
	buildings[digit].CurrentCost = cost;
}

function GatherMoney() {
	game.money++;
	document.getElementById("money").innerHTML = game.money;
}

function Tick() {
	var persec = game.money;
	for (var i = 0; i < buildings.length; i++){
		game.money += buildings[i].PerSec * buildings[i].Qty
	}
	document.getElementById("money").innerHTML = game.money;
}

function Build(id) {
	if (game.money >= buildings[id].CurrentCost) {
		game.money -= buildings[id].CurrentCost;
		buildings[id].Qty = buildings[id].Qty + 1;
		document.getElementById("money").innerHTML = game.money;
		document.getElementById("Building"+id+".Qty").innerHTML = buildings[id].Qty;
		var temp = 0;
		for (var i = 0; i < buildings.length; i++){
			temp += buildings[i].PerSec * buildings[i].Qty
		}
		document.getElementById("moneyPerSec").innerHTML = temp;
		var nextCost = Math.floor(buildings[id].Cost * Math.pow(1.05,buildings[id].Qty))
		document.getElementById("Building"+id+".Cost").innerHTML = nextCost;
		buildings[id].CurrentCost = nextCost
	};
}

function Save(){
	var m = buildings[0].Qty
	var mt = buildings[1].Qty
	var mtp = game.money
	var mtpa = document.getElementById("moneyPerSec")
	setCookie("building0", m , 9999)
	setCookie("building1", mt , 9999)
	setCookie("money", mtp , 9999)
	setCookie("moneyPerSec", mtpa, 9999)
}

function Reset(){
	var m = buildings[0]
	var mt = buildings[1]
	var mtp = game.money
	if (confirm("Do you really want to reset all of your progress? YOU WILL LOSE ALL YOUR DATA!") == true) {
		setCookie("building0", m , -1)
		setCookie("building1", mt , -1)
		setCookie("money", mtp , -1)
		window.location.reload()
	} else {}
}

window.onload = function() {
	InitBuildings();
	window.game = new GameSave();
	
	game.money = getCookie('money');
	if(game.money != "") {
		game.money = parseInt(game.money)
		if(!Number.isInteger(game.money)) {
			game.money = 0;
		}
	} else {
    game.money = 0;
	}
};