import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>){
    }
  async create(createCityDto: CreateCityDto) {
    const city = this.citiesRepository.create(createCityDto);
    return await this.citiesRepository.save(city);
  }

  async findAll(active) {
    return await this.citiesRepository.find(active) ;
  }

  async findOne(id: string) {
    return await this.citiesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    const city = await this.findOne(id);
    if(!city){
      return new NotFoundException();
    }
    Object.assign(city, updateCityDto);
    return await this.citiesRepository.save(city);
  }

  async remove(id: string) {
    const city = await this.findOne(id);
    if(!city){
      return new NotFoundException();
    } 
    return await this.citiesRepository.remove(city);
  }

  async isNameUnique(name: string): Promise<boolean> {
    const cityWithSameName = await this.citiesRepository.findOne({ where: {name} });
    return !cityWithSameName;
  } 
}