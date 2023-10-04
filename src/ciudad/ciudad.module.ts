import { Module } from '@nestjs/common';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { CiudadProfesor } from './entities/ciudad_profesor.entity';
import { CiudadEstudiante } from './entities/ciudad_estudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Ciudad,Escuela,CiudadProfesor,CiudadEstudiante])],
  controllers: [CiudadController],
  providers: [CiudadService]
})
export class CiudadModule {}
