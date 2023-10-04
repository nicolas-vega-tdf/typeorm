import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto):Promise<CreateAsistenciaDto> {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get()
  async findAll():Promise<CreateAsistenciaDto[]> {
    return await this.asistenciaService.findAll();
  }

  @Get('obtener/:id')
  async findOne(@Param('id') id: number):Promise<CreateAsistenciaDto> {
    return await this.asistenciaService.findOne(id);
  }

  @Put('actualizar/:id')
  async update(@Param('id') id: number, @Body() asistenciaDto: CreateAsistenciaDto):Promise<CreateAsistenciaDto> {
    return this.asistenciaService.update(id,asistenciaDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id: number):Promise<CreateAsistenciaDto>{
    return await this.asistenciaService.remove(id);
  }
}
