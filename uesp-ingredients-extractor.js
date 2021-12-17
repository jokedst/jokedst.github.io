// Attempt to extract stuff from https://en.uesp.net/wiki/Skyrim:Ingredients

{
  "name": "Abecean Longfin",
  "cost": 44,
  "code": "00106e1b",
  "where": "Collected by catching Abacean Longfin fish.",
  "value": 15,
  "weight": 0.5,
  "merchants": "Common",
  "effects": [
    "Weakness to Frost",
    "Fortify Sneak",
    "Weakness to Poison",
    "Fortify Restoration"
  ]
}

{
  "name": "Abecean Longfin",
  "code": "00106e1b",
  "where": "Collected by catching Abacean Longfin fish.",
  "value": 15,
  "weight": 0.5,
  "merchants": "Common",
  "effects": [
    "Weakness to Frost",
    "Fortify Sneak",
    "Weakness to Poison",
    "Fortify Restoration"
  ]
}

function row2obj(tr){
	let ret = {};
	ret.name = tr.children[1].firstElementChild.innerText;
	ret.code = tr.children[1].lastElementChild.innerText;
	ret.where = tr.children[2].innerText;
	ret.value = tr.nextElementSibling.children[4].innerText * 1;
	ret.weight = tr.nextElementSibling.children[5].innerText * 1;
	ret.merchants = tr.nextElementSibling.children[6].innerText || 'None';
	ret.effects = [...tr.nextElementSibling.children].slice(0,4).map(x=>x.innerText.trim());
	return ret;
}
row2obj(t)

function row2obj(tr, group){
	let ret = {};
	ret.name = tr.children[1].firstElementChild.innerText;
	ret.code = tr.children[1].lastElementChild.innerText;
	ret.where = tr.children[2].innerText;
	ret.value = tr.nextElementSibling.children[4].innerText * 1;
	ret.weight = tr.nextElementSibling.children[5].innerText * 1;
	ret.merchants = tr.nextElementSibling.children[6].innerText || 'None';
	let dlc = tr.children[1].querySelector('sup>ba')?.title.replace(/^(Skyrim:)/,"");
	if(dlc) ret.groups = [dlc];
	else if(group) ret.groups = [group];

	ret.effects = [];
	let effects = [...tr.nextElementSibling.children].slice(0,4);
	for(let i=0;i<4;i++){
		let effect = effects[i];
		let effectText = effect.firstElementChild.title;
		if(effect.innerText.indexOf('(') != -1){
			let mods = [...effect.querySelectorAll('span')];
			for(let m=0;m<mods.length;m++){
				let mod = mods[m];
				let value = mod.firstElementChild.innerText * 1;
				// Sometimes the image follows the span, sometimes it's INSIDE the span. Seems like a bug in UESP
				let img = mod.nextElementSibling?.tagName == 'A' ? mod.nextElementSibling : mod.querySelector('a');
				switch(img.title){
					case 'Value': effectText += ' (' + value + '€)'; break;
					case 'Duration': effectText += ' (' + value + 'dur)'; break;
					case 'Magnitude': effectText += ' (' + value + '×)'; break;
				}
			}
		}
		ret.effects.push(effectText);
	}
	return ret;
}
// 6+73+109 = 188
function table2arr(table, group){
	let rows = [...table.querySelectorAll('td[style="width:1px; padding:1px"]')].map(x=>x.parentElement);
	let o = rows.map(tr => row2obj(tr, group));
	return o;
}

function allTables(){
	let tables = document.querySelectorAll('table.wikitable');
	let arr = table2arr(tables[0]);
	arr.push(...table2arr(tables[1], 'Creation Club'));
	arr.push(...table2arr(tables[2], 'Unique/Quest'));
	arr.sort((a,b) => a.name.localeCompare(b.name));
	return arr;
}

document.querySelectorAll('td[style="width:1px; padding:1px"]')
 [...tbody.querySelectorAll('td[style="width:1px; padding:1px"]')].map(x=>x.parentElement)
 
 row2obj([...tbody.querySelectorAll('td[style="width:1px; padding:1px"]')].map(x=>x.parentElement)[1])
 
 function row2obj(tr){
	return {
	name: tr.children[1].firstElementChild.innerText,
	code: tr.children[1].lastElementChild.innerText,
	where: tr.children[2].innerText,
	value: tr.nextElementSibling.children[4].innerText * 1,
	weight: tr.nextElementSibling.children[5].innerText * 1,
	merchants: tr.nextElementSibling.children[6].innerText || 'None',
	effects: [...tr.nextElementSibling.children].slice(0,4).map(x=>x.innerText.trim())
	}
}
row2obj(t)


 [...[...tbody.querySelectorAll('td[style="width:1px; padding:1px"]')].map(x=>x.parentElement)].map(tr=>({
	name: tr.children[1].firstElementChild.innerText,
	code: tr.children[1].lastElementChild.innerText,
	where: tr.children[2].innerText,
	value: tr.nextElementSibling.children[4].innerText * 1,
	weight: tr.nextElementSibling.children[5].innerText * 1,
	merchants: tr.nextElementSibling.children[6].innerText || 'None',
	effects: [...tr.nextElementSibling.children].slice(0,4).map(x=>x.innerText.trim())
	}))
	

// =========================================
// Effects
// =========================================

// tr's
document.querySelector('table.sortable').tBodies[0].children

function parseEffects(){
	// "Damage Magicka Regen":{isPotion:false,fixedMagnitude:true,baseMagnitude:100,fixedDuration:false,baseDuration:5,description:"Decrease the target's Magicka regeneration by <mag>% for <dur> seconds.",baseGold:0.5}
	let rows = document.querySelector('table.sortable').tBodies[0].children;
	let effects = {}
	for(let i=0;i<rows.length;i++){
		let tr = rows[i];
		let name = tr.querySelector('th a').innerText;
		effects[name] = {
			"isPotion": tr.firstElementChild.className == 'EffectPos',
			"fixedMagnitude": tr.children[4].className == 'EffectNeg',
			"baseMagnitude": tr.children[4].innerText * 1,
			"fixedDuration": tr.children[5].className != 'EffectPos',
			"baseDuration": tr.children[5].innerText * 1,
			"description": tr.children[2].innerText,
			"baseGold": tr.children[3].innerText * 1
		  };
		  // Some values are missing on UESP
		  if(effects[name].baseMagnitude == null || effects[name].baseDuration == null || effects[name].baseGold == null) effects[name].wildGuess = true;
		  if(effects[name].baseMagnitude == null) effects[name].baseMagnitude = 1;
		  if(effects[name].baseDuration == null) effects[name].baseDuration = 30;
		  if(effects[name].baseGold == null) effects[name].baseGold = 0.1;
	}
	return effects;
}

function parserow(tr){
	let ret = {
		"isPotion": tr.firstElementChild.className == 'EffectPos',
		"fixedMagnitude": tr.children[4].className == 'EffectNeg',
		"baseMagnitude": tr.children[4].innerText * 1,
		"fixedDuration": tr.children[5].className != 'EffectPos',
		"baseDuration": tr.children[5].innerText * 1,
		"description": tr.children[2].innerText,
		"baseGold": tr.children[3].innerText * 1
	  };
	  return ret;
}