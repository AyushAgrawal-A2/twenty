import { ObjectType, ID, Field } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  Authorize,
  CursorConnection,
  IDField,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';

import { FieldMetadata } from 'src/metadata/field-metadata/field-metadata.entity';

@ObjectType('object')
@QueryOptions({
  defaultResultSize: 10,
  maxResultsSize: 100,
  disableFilter: true,
  disableSort: true,
})
@Authorize({
  authorize: (context: any) => ({
    workspaceId: { eq: context?.req?.user?.workspace?.id },
  }),
})
@CursorConnection('fields', () => FieldMetadata)
@Entity('object_metadata')
export class ObjectMetadata {
  @IDField(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'data_source_id' })
  dataSourceId: string;

  // Deprecated
  @Field()
  @Column({ nullable: false, name: 'display_name' })
  displayName: string;

  @Field()
  @Column({ nullable: true, name: 'display_name_singular' })
  displayNameSingular: string;

  @Field()
  @Column({ nullable: true, name: 'display_name_plural' })
  displayNamePlural: string;

  @Field()
  @Column({ nullable: true, name: 'description', type: 'text' })
  description: string;

  @Field()
  @Column({ nullable: true, name: 'icon' })
  icon: string;

  @Column({ nullable: false, name: 'target_table_name' })
  targetTableName: string;

  @Field()
  @Column({ default: false, name: 'is_custom' })
  isCustom: boolean;

  @Field()
  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @Column({ nullable: false, name: 'workspace_id' })
  workspaceId: string;

  @OneToMany(() => FieldMetadata, (field) => field.object)
  fields: FieldMetadata[];

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
