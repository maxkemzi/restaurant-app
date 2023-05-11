const capitalize = str => {
	const arr = str.split(" ");

	for (let i = 0; i < arr.length; i += 1) {
		const word = arr[i];
		arr[i] = word[0].toUpperCase() + word.slice(1);
	}

	return arr.join(" ");
};

export default capitalize;
