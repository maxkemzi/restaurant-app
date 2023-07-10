import MyLink from "@/components/MyLink";
import {PathName, RestaurantInfo} from "@/lib/constants";

const Home = () => (
	<div className="bg-neutral">
		<div className="container mx-auto px-4">
			<div className="hero min-h-screen">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">{RestaurantInfo.NAME}</h1>
						<p className="py-6">{RestaurantInfo.SLOGAN}</p>
						<MyLink path={PathName.PRODUCTS}>Get Started</MyLink>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Home;
