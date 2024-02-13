import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/enums/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';


@Auth(Role.USER)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(
      @Body() createCatDto: CreateCatDto,
      @ActiveUser() user: UserActiveInterface
    ) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll(
    @ActiveUser() user: UserActiveInterface
  ) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
