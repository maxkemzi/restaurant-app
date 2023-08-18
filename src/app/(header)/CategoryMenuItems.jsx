import {PathName} from "@/src/lib/constants";
import MenuItem from "@/src/components/ui/MenuItem";

const getCategoryLinkPath = categoryName => ({
	pathname: PathName.PRODUCTS,
	query: {categoryName}
});

const CategoryMenuItems = ({categories}) => (
	<>
		<MenuItem path={PathName.PRODUCTS} text="All" testId="menu-item-all" />
		{categories.map(({name, id}) => (
			<MenuItem
				key={id}
				path={getCategoryLinkPath(name)}
				text={name}
				testId={`menu-item-category-${id}`}
			/>
		))}
	</>
);

export default CategoryMenuItems;
