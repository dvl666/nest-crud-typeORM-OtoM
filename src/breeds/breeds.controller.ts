import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/enums/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';

@Auth(Role.ADMIN)
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  create(
      @Body() createBreedDto: CreateBreedDto,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.breedsService.create(createBreedDto , user);
  }

  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(+id, updateBreedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedsService.remove(+id);
  }
}
