import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post('crear')
  async create(@Body() profesorDto: CreateProfesorDto):Promise<String> {
    return await this.profesorService.create(profesorDto);
  }

  @Get('obtener/todos')
  async findAll():Promise<CreateProfesorDto[]> {
    return await this.profesorService.findAll();
  }

  @Get('obtener/:id')
  async findOne(@Param('id') id: number):Promise<CreateProfesorDto> {
    return await this.profesorService.findOne(id);
  }

  @Put('actualizar/:id')
  async update(@Body() profesor: Profesor,@Param('id') id: number):Promise<String> {
    return await this.profesorService.update(id, profesor);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id: number):Promise<boolean> {
    return this.profesorService.remove(id);
  }
}
