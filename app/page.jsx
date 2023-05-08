const createCategory = async () => {
	const response = await fetch(`${process.env.BASE_URL}/api/categories`, {
		method: "POST"
	});
	const data = await response.json();
	return data;
};

const getCategories = async () => {
	const response = await fetch(`${process.env.BASE_URL}/api/categories`);

	if (!response.ok) {
		throw new Error("Request error.");
	}

	const data = await response.json();
	return data;
};

const Home = async () => {
	const categories = await getCategories();

	console.log(categories);

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Hello there</h1>
					<div className="py-6">
						{categories.map(({name}) => (
							<p className="py-3">{name}</p>
						))}
					</div>
					<button type="button" className="btn btn-primary">
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
