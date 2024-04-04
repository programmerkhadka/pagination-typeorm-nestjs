import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { DataResponse } from '../common/dto/response.dto';
import { PageDto } from '../common/dto/pagination-responses.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { SlugManager } from '@/utils/slug-manager';
import { DefaultSlugOptions } from '@/shared/slug-options';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const categoryDto = await new SlugManager()
      .setSlugOptions({ ...DefaultSlugOptions, sourceField: 'name' })
      .setRepository(this.categoryRepository)
      .setEntity(createCategoryDto)
      .addSlug();

    const category = await this.categoryRepository.save(
      this.categoryRepository.create(categoryDto),
    );
    return new DataResponse(category);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<any>> {
    const queryBuilder =
      this.categoryRepository.createQueryBuilder('categories');
    queryBuilder
      .orderBy('categories.created_at', pageOptionsDto.order)
      .withDeleted()

      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  /* update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  } */

  /* remove(id: number) {
    return `This action removes a #${id} category`;
  } */
}
