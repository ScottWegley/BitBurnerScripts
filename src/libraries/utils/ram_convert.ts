export function toReadable(inN:number,type:string = 'g'){
	let suffix = ((type == 'g') ? 'GB' : ((type == 't') ? 'TB' : 'PB'));
	if(inN < 1024) return inN + suffix;
	else if(inN >= Math.pow(2,20)) {
		return (inN / 1024 / 1024) + 'PB';
	}
	else {
		suffix = ((type == 'g') ? 'TB' : 'PB');
		return inN / 1024 + suffix;
	}
}