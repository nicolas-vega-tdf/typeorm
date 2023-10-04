import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Escuela } from './entities/escuela.entity';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Post()
  async create(@Body() createEscuelaDto: CreateEscuelaDto):Promise<String> {
    return await this.escuelaService.create(createEscuelaDto);
  }

  // @Post()
  // async createEstudiante(@Body() estudiante : Estudiante) {
  //   return this.escuelaService.createEstudiante(estudiante);
  // }

  @Get()
  async findAll():Promise<CreateEscuelaDto[]> {
    return await this.escuelaService.findAll();
  }

  @Get('obtener/:id')
  async findOne(@Param('id') id: number):Promise<CreateEscuelaDto> {
    return await this.escuelaService.findOne(id);
  }

  @Put('actualizar/:id')
  async update(@Param('id') id: number, @Body() escuelaDto: CreateEscuelaDto):Promise<String> {
    return await this.escuelaService.update(id, escuelaDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id: number):Promise<CreateEscuelaDto> {
    return this.escuelaService.remove(id);
  }
}
