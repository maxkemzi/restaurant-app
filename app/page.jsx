import Button from "@/components/Button";
import {RESTAURANT_NAME} from "@/lib/constants";

const Home = () => (
	<div className="bg-base-200">
		<div className="container mx-auto px-4">
			<div className="hero min-h-screen">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">{RESTAURANT_NAME}</h1>
						<p className="py-6">
							Indulge in Flavorful Delights at {RESTAURANT_NAME}
						</p>
						<Button>Get Started</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Home;
