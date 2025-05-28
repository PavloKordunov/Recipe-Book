"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function HomePage() {
  const searchParams = useSearchParams();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const i = searchParams.get("i") || undefined;
  const a = searchParams.get("a") || undefined;
  const c = searchParams.get("c") || undefined;

  const [meals, setMeals] = useState<Meal[]>([]);
  const [title, setTitle] = useState("All Recipes");

  useEffect(() => {
    const fetchRecipes = async () => {
      let url = `${BASE_URL}`;
      let currentTitle = "All Recipes";

      if (i) {
        url = `${BASE_URL}/by-ingredient?i=${i}`;
        currentTitle = `Recipes with "${i}"`;
      } else if (a) {
        url = `${BASE_URL}/by-country?a=${a}`;
        currentTitle = `Recipes from "${a}"`;
      } else if (c) {
        url = `${BASE_URL}/by-category?c=${c}`;
        currentTitle = `Recipes in category "${c}"`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMeals(data.meals || []);
        setTitle(currentTitle);
      } catch (err) {
        console.error("Failed to fetch recipes", err);
      }
    };

    fetchRecipes();
  }, [i, a, c]);

  return (
    <div className="min-h-screen bg-rose-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-rose-800 mb-8">{title}</h1>

        {meals.length === 0 ? (
          <p className="text-rose-700">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <Link key={meal.idMeal} href={`/recipes/${meal.idMeal}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-rose-900">
                      {meal.strMeal}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
