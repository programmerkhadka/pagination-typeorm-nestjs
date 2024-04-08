import { Injectable } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { faker } from '@faker-js/faker';
@Injectable()
export class SeederAction {
  constructor(private readonly categoryService: CategoryService) {}
  async seed() {
    return await this.seeding();
  }
  getRandomBooleanValue(): boolean {
    const array = [true, false];
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  async seeding() {
    for (let index = 0; index < 30; index++) {
      const categoryDto = new CreateCategoryDto();
      categoryDto.name = faker.commerce.productName();
      categoryDto.show_on_dropdown = this.getRandomBooleanValue();
      await this.categoryService.create(categoryDto);
    }
  }
}
