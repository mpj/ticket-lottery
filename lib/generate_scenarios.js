module.exports = function(drawings) {

	var cases = [[0], [1]];

	for(var j=0;j<drawings;j++) {
		var l=cases.length;
		for(var i=0;i<l;i++) {
			var cw = cases[i].slice(0);
			var cl = cases[i].slice(0);
			cw.push(1)
			cl.push(0)
			cases.push(cw)
			cases.push(cl)
		}
		var cleanedCases = []
		for(var i=0;i<cases.length;i++) 
			if (cases[i].length == j+1)
				cleanedCases.push(cases[i])
		cases = cleanedCases
	
	}
	return cases;
}