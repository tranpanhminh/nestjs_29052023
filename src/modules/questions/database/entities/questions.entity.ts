import { CategoryEntity } from 'src/modules/category/database/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  name: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable({ name: 'questions_category' })
  categories: CategoryEntity[];
}
