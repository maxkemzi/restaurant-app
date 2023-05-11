import {RESTAURANT_NAME} from "@/utils/constants/restaurantInfo";

const Home = async () => (
	<div className="hero min-h-screen bg-base-200">
		<div className="hero-content text-center">
			<div className="max-w-md">
				<h1 className="text-5xl font-bold">{RESTAURANT_NAME}</h1>
				<p className="py-6">
					Indulge in Flavorful Delights at {RESTAURANT_NAME}
				</p>
				<button type="button" className="btn btn-primary">
					Get Started
				</button>
			</div>
		</div>
	</div>
);

export default Home;
