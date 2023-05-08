const getCreateAndDeleteElements = (currArr, newArr) => {
	const deleteEls = currArr.filter(num => !newArr.includes(num));
	const createEls = newArr.filter(num => !currArr.includes(num));

	// Taking duplicates into account
	const set = new Set(currArr);
	set.forEach(num => {
		const countCurr = currArr.filter(n => n === num).length;
		const countNew = newArr.filter(n => n === num).length;

		if (countCurr > countNew && !deleteEls.includes(num)) {
			for (let i = 0; i < countCurr - countNew; i += 1) {
				deleteEls.push(num);
			}
		} else if (countCurr < countNew && !createEls.includes(num)) {
			for (let i = 0; i < countNew - countCurr; i += 1) {
				createEls.push(num);
			}
		}
	});

	return [deleteEls, createEls];
};

export default getCreateAndDeleteElements;
