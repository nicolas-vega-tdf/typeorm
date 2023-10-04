import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/create-estudiante.dto';



@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('crear')
  async create(@Body() createEstudianteDto: EstudianteDto):Promise<String> {
    return await this.estudianteService.create(createEstudianteDto);
  }

  @Post('agregar-clase')
  async addClase(@Body() body:any):Promise<any>{
    return await this.estudianteService.addClase(body);
  }

  @Get('obtener/todos')
  async findAll():Promise<EstudianteDto[]> {
    return await this.estudianteService.findAll();
  }

  @Get('obtener/:id')
  async findOne(@Param('id') id:number):Promise<EstudianteDto> {
    return await this.estudianteService.findOne(id);
  }

  @Put('actualizar/:id')
  async update( @Body() estudiante:EstudianteDto,@Param('id') id:number):Promise<String> {
    return await this.estudianteService.update(id,estudiante);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id:number):Promise<EstudianteDto> {
    return await this.estudianteService.remove(id);
  }
}
