import { Controller, Get, Body, Post, Put, Delete, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { IProfile } from './interface/profile.interface';
import { CreateProfileDto } from './model/profile.dto';

@Controller('profiles')
export class ProfilesController {

    constructor(private readonly profilesService: ProfilesService){}

    @Get()
    getAllProfiles(): Promise<IProfile[]> {
        return this.profilesService.findAll();
    }

    @Get(':id')
    getOneProfile(@Param('id') id): Promise<IProfile> {
        return this.profilesService.findOne(id);
    }

    @Post('add')
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.create(createProfileDto);
    }

    @Put('update/:id')
    updateProfile(@Body() creatProfileDto: CreateProfileDto, @Param('id') id): Promise<IProfile> {
        return this.profilesService.update(id, creatProfileDto);
    }

    @Delete('delete/:id')
    deleteProfile(@Param('id') id): Promise<IProfile> {
        return this.profilesService.delete(id);
    }

}
