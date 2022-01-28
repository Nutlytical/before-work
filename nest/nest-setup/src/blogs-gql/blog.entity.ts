import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Blog {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({
    type: 'simple-array',
    default: [],
  })
  @Field(() => [String])
  content: string[];

  @Column()
  @Field()
  writer: string;
}

@InputType()
export class CreateBlogInput {
  @Field()
  title: string;

  @Field(() => [String])
  content: string[];

  @Field()
  writer: string;
}
