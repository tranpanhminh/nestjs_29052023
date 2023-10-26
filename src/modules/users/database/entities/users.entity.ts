/* eslint-disable prettier/prettier */
import { RolesEntity } from 'src/modules/roles/database/entities/roles.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  address: string;

  @ManyToOne(() => RolesEntity, (role) => role.users, {
    cascade: true, // Tùy chọn cascade update
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Tùy chọn ondelete
  })
  role: RolesEntity;
}
