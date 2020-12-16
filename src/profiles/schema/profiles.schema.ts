import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfilesDocument = Profiles & Document;

@Schema()
export class Profiles {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  country: string;
}

export const ProfilesSchema = SchemaFactory.createForClass(Profiles);