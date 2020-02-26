/**
 * @param object elm
 * @param object anchor
 * @param int topOffset
 */
function moveImg(elm, anchor, imgSize, topOffset = 0) {
	let anchorPos = anchor.position();
	$(elm).css({
		"position": "absolute",
		"left": anchorPos.left + (imgSize / 2),
		"top": anchorPos.top + (imgSize / 2) + topOffset
	});
}

/**
 * @param object elm
 * @param string folder
 * @param array items
 * @params bool preventTurnOff
 */
function switchImg(elm, folder, items = [], preventTurnOff = false) {
	let thisSrc = $(elm).attr("src");
	let prefix = "images/" + folder + "/";
	
	// if item is off or is last item, switch to first item and toggle "itemOff"
	// this will turn item on if off, and revert to first image and off if at last item
	if ($(elm).hasClass("itemOff")) {
		$(elm).attr("src", prefix + items[0] + ".png");
		elm.classList.toggle("itemOff");
	} else if (thisSrc === prefix + items[items.length - 1] + ".png") {
		$(elm).attr("src", prefix + items[0] + ".png");
		if (!preventTurnOff) {
			elm.classList.toggle("itemOff");
		}
	} else {
		for (let i = 0; i < items.length - 1; i++) {
			if (thisSrc === prefix + items[i] + ".png") {
				$(elm).attr("src", prefix + items[i + 1] + ".png");
				break;
			}
		}
	}
}

$(document).ready(function() {
	var baseImgSizes = {
		"md": 32,
		"lg": 48,
		"xl": 64
	};

	let url = new URL(window.location.href);
	let selectedSize = url.searchParams.get("selectedSize") || "lg";
	let selectedSizeNum = baseImgSizes[selectedSize];

	$(".itemImg").addClass("itemImg_" + selectedSize);
	$(".itemDungeon").addClass("itemDungeon_" + selectedSize);
	$(".itemMedallion").addClass("itemMedallion_" + selectedSize);

	let imgOvers = {
		"dungeon02": "boss02",
		"dungeon12": "boss12",
		"dungeon22": "boss22",
		"dungeon32": "boss32",
		"dungeon42": "boss42",
		"dungeon52": "boss52",
		"dungeon62": "boss62",
		"dungeon72": "boss72",
		"dungeon82": "boss82",
		"medallion82": "boss82",
		"dungeon92": "boss92",
		"medallion92": "boss92",
	};
	let overIds = Object.keys(imgOvers);
	for (let i = 0; i < overIds.length; i++) {
		let anchor = $("#" + imgOvers[overIds[i]]);
		let topOffset = 0;
		if (overIds[i].substr(0, 9) === "medallion") {
			topOffset -= (selectedSizeNum / 2);
		}
		moveImg($("#" + overIds[i])[0], anchor, selectedSizeNum, topOffset);
	}
	
	let clickFunc = function() {
		let thisSrc = $(this).attr("src");
		let parts = thisSrc.split("/");
		let folder = parts[1];
		let id = parts[2].replace(".png", "");
		
		if ($(this).hasClass("itemSword")) {
			switchImg(this, "zelda3", ["sword1", "sword2", "sword3", "sword4"]);
		} else if ($(this).hasClass("itemDungeon")) {
			switchImg(this, "zelda3", ["dungeon0", "dungeon1", "dungeon2", "dungeon3"], true);
		} else if ($(this).hasClass("itemMedallion")) {
			switchImg(this, "zelda3", ["medallion0", "bombos", "ether", "quake"], true);
		} else if ($(this).hasClass("itemGlove"))  {
			switchImg(this, "zelda3", ["glove1", "glove2"]);
		} else {
			switchImg(this, folder, [id]);
		}
	};

	$(".itemImg").click(clickFunc);
	$(".itemDungeon").click(clickFunc);
	$(".itemMedallion").click(clickFunc);
	
	let toggleFunc = function () {
		$("div#" + this.id.substr(0, 2)).toggle();
	}
	
	$("div#z3button").click(toggleFunc);
	$("div#smbutton").click(toggleFunc);
});
