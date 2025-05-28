import {
  Controller,
  Get,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Get('by-ingredient')
  async getRecipesByIngredient(@Query('i') ingredient: string) {
    if (!ingredient) {
      throw new BadRequestException('Ingredient is required');
    }
    return this.recipeService.getRecipesByIngredient(ingredient);
  }

  @Get('by-country')
  async getRecipesByCountry(@Query('a') country: string) {
    if (!country) {
      throw new BadRequestException('Country is required');
    }
    return this.recipeService.getRecipesByCountry(country);
  }

  @Get('by-category')
  async getRecipesByCategory(@Query('c') category: string) {
    if (!category) {
      throw new BadRequestException('Category is required');
    }
    return this.recipeService.getRecipesByCategory(category);
  }

  @Get(':id')
  async getRecipeInfo(@Param('id') id: string) {
    return this.recipeService.getRecipeInfo(id);
  }
}
