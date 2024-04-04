import { SlugOptions } from '@/modules/common/interface/slug-option.interface';

export const DefaultSlugOptions: SlugOptions = {
  slugField: 'slug',
  sourceField: 'title',
  generateUniqueSlugs: true,
  isCurrentExists: false,
};

export const UpdatableSlugOptions: SlugOptions = {
  slugField: 'slug',
  sourceField: 'title',
  generateUniqueSlugs: false,
  isCurrentExists: true,
};
