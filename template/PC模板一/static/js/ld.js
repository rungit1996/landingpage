var rand = Math.floor(Math.random() * 900) + 100;
ld = [
	// ["18287177433", "玉香", "她"],
	// ["18701605680", "小五哥", "他"],
	// ["15368055662", "青青", "她"],
	["13161092715", "冬梅", "她"],
	["17788889999", "明明", "他"]
];
var index = Math.floor(Math.random() * (ld.length - 0.01));
$(".wx").text(ld[index][0]);
$(".wx").css("color","red");
$(".nickname").text(ld[index][1]);
$(".nickname").css("color","red");
$(".gender").text(ld[index][2]);