import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styles from './Recipe.module.scss';
import BackButton from '../components/BackButton';

const Recipe = () => {

	const [recipe, setRecipe] = useState<any>(null);
	const {id} = useParams<{ id: string }>();

	useEffect(() => {
			const request = new Request(`/api/nextcloud/remote.php/dav/files/admin/Recipes/${id}/recipe.json`, {
				method: "GET",
				credentials: "include",
				headers: new Headers({
					Authorization: `Basic ${btoa("admin:********************")}`,
					Accept: "text/plain"
				})
			});
			fetch(request).then(resonse => resonse.json()).then(jsonStr => {
				setRecipe(jsonStr);
			});
		}, [id]
	);

	const renderIngredient = (ingredient: string, i: Number) => {
		return <div key={ingredient + i}>
			{ingredient}
		</div>;
	};

	const renderInstruction = (instruction: string) => {
		return <li key={instruction}>
			{instruction}
		</li>;
	};

	const renderKeyword = (keyword: string) => {
		return <span className={styles.keyword} key={keyword}>
			{keyword}
		</span>;

	};

	return (
		<>
			<BackButton/>
			<img src={recipe?.image} alt="The current dish" className={styles.displayImg}/>
			<img src={recipe?.image} alt="The current dish" className={styles.bgImg}/>
			<div className={styles.recipeContainer}>

				<h1>{recipe?.name}</h1>

				<div className={styles.divider}></div>

				<div className={styles.keywords}>
					{recipe?.keywords?.split(',').map(renderKeyword)}
				</div>

				<div className={styles.divider}></div>

				<div className={styles.recipeInfo}>
					<div>
						<span>Preparation Time</span>
						<div>{recipe?.prepTime ?? 'N/A'}</div>
					</div>
					<div>
						<span>Cooking Time</span>
						<div>{recipe?.cookTime ?? 'N/A'}</div>
					</div>
					<div>
						<span>Yield</span>
						<div>{recipe?.recipeYield ?? 1} servings</div>
					</div>
				</div>

				<div className={styles.divider}></div>

				<h2>Ingredients</h2>
				{recipe?.recipeIngredient.map(renderIngredient)}

				<div className={styles.divider}></div>

				<h2>Instructions</h2>
				<ol>
					{recipe?.recipeInstructions.map(renderInstruction)}
				</ol>
			</div>
		</>
	);
};

export default Recipe;
