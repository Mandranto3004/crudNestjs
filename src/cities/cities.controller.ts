import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {
  }

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    const isUnique = await this.citiesService.isNameUnique(createCityDto.name)
    if(isUnique){
      const response =  await this.citiesService.create(createCityDto)
      console.log('mahazo', response);
      return response;
    }else{
      return 'Le nom d\'utilisateur existe déjà.';
    }
    
  }
  
  
  @Get()
  async findAll() {
    const active = false;
    const result =  (await this.citiesService.findAll({where: {active}}))
    console.log('haza v sa ts haza', result);
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citiesService.remove(id);
  }
}


