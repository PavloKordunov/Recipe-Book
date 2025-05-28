"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HiArrowNarrowLeft } from "react-icons/hi";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  strCategory: string;
  [key: string]: any;
};

export default function RecipeInfoPage() {
  const params = useParams();
  const recipeId = params.id;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [meal, setMeal] = useState<Meal | null>(null);
  const [relatedMeals, setRelatedMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) return;

    const fetchMeal = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/${recipeId}`);
        const data = await res.json();
        setMeal(data.meals[0]);

        if (data.meals[0]?.strCategory) {
          const resRelated = await fetch(
            `${BASE_URL}/by-category?c=${data.meals[0].strCategory}`
          );
          const relatedData = await resRelated.json();
          setRelatedMeals(relatedData.meals || []);
        }
      } catch (error) {
        console.error("Failed to fetch recipe info", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeal();
  }, [recipeId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rose-50 p-8 flex items-center justify-center">
        <div className="text-rose-800 text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-rose-50 p-8 flex items-center justify-center">
        <div className="text-rose-800 text-xl">Recipe not found</div>
      </div>
    );
  }

  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="min-h-screen bg-rose-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-3xl shadow-lg p-6">
          <Link
            href={"/"}
            className="flex gap-2 mb-6 cursor-pointer items-center"
          >
            <HiArrowNarrowLeft
              className="fill-rose-600 hover:fill-rose-800 transition-colors"
              size={28}
            />
            <p className="font-bold text-rose-600 hover:text-rose-800 transition-colors text-xl">
              All recipes
            </p>
          </Link>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl object-cover shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-rose-900 mb-2">
                {meal.strMeal}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  href={`/?a=${meal.strArea}`}
                  className="inline-block bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-200 transition-colors"
                >
                  {meal.strArea}
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-rose-800 mb-4">
              Instructions
            </h2>
            <div className="prose prose-rose max-w-none text-gray-700">
              {meal.strInstructions.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-rose-800 mb-4">
              Full Ingredients
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ingredients.map(({ ingredient, measure }, index) => (
                <div
                  key={`${ingredient}-${index}`}
                  className="flex items-center bg-rose-50 rounded-xl p-3"
                >
                  <Link
                    href={`/?i=${ingredient}`}
                    className="flex-1 text-rose-800 hover:underline"
                  >
                    {ingredient}
                  </Link>
                  <span className="text-sm text-rose-600 ml-2">{measure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-8">
            <h3 className="text-xl font-semibold text-rose-800 mb-4">
              More in {meal.strCategory}
            </h3>

            {relatedMeals.length > 0 ? (
              <div className="space-y-4">
                {relatedMeals.map((related) => (
                  <Link
                    key={related.idMeal}
                    href={`/recipes/${related.idMeal}`}
                    className="flex gap-3 items-center group"
                  >
                    <img
                      src={related.strMealThumb}
                      alt={related.strMeal}
                      className="w-16 h-16 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="font-medium text-rose-900 hover:text-rose-700 transition-colors">
                        {related.strMeal}
                      </h4>
                      <span className="text-xs text-rose-500">
                        {related.strArea}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-rose-600">No other recipes in this category</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
