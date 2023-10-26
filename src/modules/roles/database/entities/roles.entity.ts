/* eslint-disable prettier/prettier */
import { UsersEntity } from 'src/modules/users/database/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UsersEntity, (user) => user.role)
  users: UsersEntity[];
}
