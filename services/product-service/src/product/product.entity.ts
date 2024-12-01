import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @Column()
  description: string;
}
