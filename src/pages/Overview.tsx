import {useEffect, useState} from 'react';

const Overview = () => {
	const [recipes, setRecipes] = useState<any>(null);
	useEffect(() => {
			const request = new Request(`/api/recipes`, {
				method: "GET",
				credentials: "include",
				headers: new Headers({
					Authorization: `Basic ${btoa("admin:****************")}`,
					Accept: "text/plain"
				})
			});
			fetch(request).then(resonse => resonse.json()).then(jsonStr => {
				setRecipes(jsonStr);
			});
		}, []
	);


	return (
		<div>
			<h1>Overview</h1>
			<div>
				{recipes?.map((recipe: any) =>
					<div key={recipe.name}>
						<img src={recipe.img} alt="The current dish"/>
						{recipe.name}
					</div>
				)}
			</div>
		</div>
	);
};

export default Overview;
