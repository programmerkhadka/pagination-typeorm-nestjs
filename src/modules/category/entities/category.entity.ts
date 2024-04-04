import { TimestampableEntity } from '@/modules/common/entity/timestample';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category extends TimestampableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  slug: string;

  @Column({
    type: 'boolean',
    default: false,
    comment:
      'Will determine whether to show in the dropdown for lead/register form etc',
  })
  show_on_dropdown: boolean;
}
