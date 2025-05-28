import { Module} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RecipeService],
  controllers: [RecipeController]
})
export class RecipeModule {}
