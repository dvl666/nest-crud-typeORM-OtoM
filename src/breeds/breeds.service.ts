import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>
  ) {}

  async create(createBreedDto: CreateBreedDto, user: UserActiveInterface) {

    return await this.breedRepository.create({
      ...createBreedDto,
      name: createBreedDto.name,
      relatedUserEmail: user.email
    })

  }

  findAll() {
    return this.breedRepository.find()
  }

  async findOne(id: number) {

    const breed = await this.breedRepository.findOneBy({id: id});
    
    if (!breed) throw new BadRequestException('Breed not found')

    return breed
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {

    await this.findOne(id)
    return await this.breedRepository.update(
      id, {
        ...updateBreedDto
      }   
    )

  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.breedRepository.softDelete(id)   
  }
}
