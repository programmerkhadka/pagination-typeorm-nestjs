import { SlugOptions } from '@/modules/common/interface/slug-option.interface';
import SlugAlreadyUsedException from '@/shared/exceptions/slug-already-exist.exception';
import { DefaultSlugOptions } from '@/shared/slug-options';

export class SlugManager {
  protected dto: any;
  public slugOptions: SlugOptions;
  protected repository: any;
  constructor() {
    this.slugOptions = DefaultSlugOptions;
  }
  setSlugOptions(slugOptions: SlugOptions) {
    this.slugOptions = slugOptions;
    return this;
  }

  setEntity(dto: any) {
    this.dto = dto;

    return this;
  }

  setRepository(repo: any) {
    this.repository = repo;
    return this;
  }

  public slugify(value: string) {
    return this.slug(value);
  }
  public slugifyWithModification(title: string, id: number) {
    return this.slug(title) + '-' + (id + 1);
  }

  public slug(value: string) {
    return String(value)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
  }

  public async addSlug(): Promise<any> {
    let slug = this.generateNonUniqueSlug();

    if (this.slugOptions.generateUniqueSlugs) {
      slug = await this.makeSlugUnique(slug);
    }

    this.setSlugField(slug);
    return this.dto;
  }
  private setSlugField(slug: string): void {
    const slugField = this.slugOptions.slugField;
    this.dto[slugField] = slug;
  }

  protected async makeSlugUnique(slug: string): Promise<string> {
    let suffix = 1;
    let uniqueSlug = slug;

    while (
      (await this.otherRecordExistsWithSlug(uniqueSlug)) ||
      uniqueSlug === ''
    ) {
      //throw new SlugAlreadyUsedException(slug);
      uniqueSlug = `${slug}-${suffix++}`;
    }

    return uniqueSlug;
  }

  public async otherRecordExistsWithSlug(slug: string): Promise<boolean> {
    const queryBuilder = this.repository
      .createQueryBuilder('check')
      .where(`check.${this.slugOptions.slugField} = :slugValue`, {
        slugValue: slug,
      })
      .withDeleted()
      .select(['check.id', `check.${this.slugOptions.slugField}`]);

    if (this.slugOptions.isCurrentExists) {
      queryBuilder.andWhere(`check.id != :entityId`, { entityId: this.dto.id });
    }

    const count = await queryBuilder.getCount();
    return count > 0;
  }

  protected generateNonUniqueSlug(): string {
    const rawValue = this.getSlugRawValue() || this.getSourceField();
    return this.slugify(rawValue);
  }

  protected getSourceField(): string {
    return this.dto[this.slugOptions.sourceField];
  }

  protected getSlugRawValue(): string {
    return this.dto[this.slugOptions.slugField];
  }

  /**
   * will return the dto/entity passed with filtered slug to be saved
   * @returns
   */
  public async validateSlugForUpdate(): Promise<any> {
    const slug = this.slugify(this.getSlugRawValue());

    const isExists = await this.otherRecordExistsWithSlug(slug);

    if (isExists) {
      throw new SlugAlreadyUsedException(slug);
    }

    const entityWithSlug = { ...this.dto, slug };

    return entityWithSlug;
  }
}
