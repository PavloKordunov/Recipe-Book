import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  async getRecipesByIngredient(ingredient: string) {
    const url = `${this.baseUrl}/filter.php?i=${ingredient}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getRecipesByCountry(country: string) {
    const url = `${this.baseUrl}/filter.php?a=${country}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getRecipesByCategory(category: string) {
    const url = `${this.baseUrl}/filter.php?c=${category}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getAllRecipes() {
    const url = `${this.baseUrl}/search.php?s=`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getRecipeInfo(id: string) {
    const url = `${this.baseUrl}/lookup.php?i=${id}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
