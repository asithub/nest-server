import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ProfilesSchema } from './schema/profiles.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'applicantprofiles', schema: ProfilesSchema}
    ])
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
