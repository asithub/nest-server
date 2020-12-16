import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IProfile } from './interface/profile.interface';
import { ProfilesDocument } from './schema/profiles.schema';
 
@Injectable()
export class ProfilesService {

  constructor(@InjectModel('applicantprofiles') private readonly profileModel: Model<ProfilesDocument>){}


  async findAll(): Promise<ProfilesDocument[]> {
    return await this.profileModel.find();
  }

  async findOne(id: string): Promise<ProfilesDocument> {
    return await this.profileModel.findOne({_id: id});
  }

  async create(profile: IProfile): Promise<ProfilesDocument> {
    const newProfile = new this.profileModel(profile);
    return await newProfile.save();
  }

  async update(id: string, profile: IProfile): Promise<ProfilesDocument> {
    return await this.profileModel.findByIdAndUpdate(id, profile, {new: true});
  }

  async delete(id: string): Promise<ProfilesDocument> {
    return await this.profileModel.findByIdAndRemove(id);
  }
}
