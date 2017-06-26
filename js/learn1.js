//隨機回傳範圍[m,n](包括頭尾)之間的整數
function rand(m ,n ){
	return m + Math.floor((n - m + 1 )*Math.random());
}

//隨機回傳一個代表
//六個crowm and anchor圖案的字串
function randFace(){
	return["crown", "anchor", "heart", "spade", "club", "diamond"]
		[rand(0, 5)];
}

var funds = 50; //起始條件
var round = 0;

while(funds > 1 && funds <100){
	round++;
	console.log('round ${round}:');
	console.log('\tstarting funds: ${funds}p');
	//下注
	var bets = { crown:0, anchor:0, heart:0, spade:0, club:0, diamond:0}
	var totalBet = rand(1, funds);
	if(totalBet === 7){
		totalBet = funds;
		bets.heart = totalBet;
	}else{
		//分發賭注
		var remaining = totalBet;
		do{
			var bet = rand(1, remaining);
			var face = randFace();
			bets[face] = bet[face] + bet;
			remaining = remaining - bet;
		}while(remaining > 0);
	}
	funds = funds - totalBet;
	//console.log('\tbets:' + Object.keys(bets).map(face => '${face}: ${bets[face]} pence').join(', ') + '(total: ${totalBet} pence)');

	//擲骰子
	const hand =[];
	for (var roll = 0; roll <3; roll++){
		hand.push(randFace());
	}
	console.log('\thand: ${hand.join(', ')}');

	//拿贏的錢
	var winnings = 0;
	for(var die=0; die<hand.length; die++){
		var face = hand[die];
		if(bets[face] > 0) winnings = winnings + bets[face];
	}
	funds = funds + winnings;
	console.log('\twinnings: ${winnings}');
}
console.log('\tending funs: ${funds}');