import { Module } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Escuela,Ciudad,Clase,Estudiante])],
  controllers: [EscuelaController],
  providers: [EscuelaService]
})
export class EscuelaModule {}
