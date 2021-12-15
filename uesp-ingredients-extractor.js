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
	})))