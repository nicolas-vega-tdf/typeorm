import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClasesService {

  constructor(
    @InjectRepository(Clase) 
    private claseRepository:Repository<Clase>
    ){}

  async create(claseDto: CreateClaseDto):Promise<boolean> {
    try{
      let clase:Clase =  await this.claseRepository.save(new Clase(claseDto.nombre));
      if(clase)
        return true;
      else
        return false;
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Clases - ' + error
      },HttpStatus.NOT_FOUND)
    }    
  }

  async findAll(): Promise<CreateClaseDto[]> {
    return await this.claseRepository.find({relations:['estudiantes']});
  }

  async findOne(id: number):Promise<CreateClaseDto> {
    try{
      const criterio : FindOneOptions = {where:{id:id}, relations:['estudiantes']}
      let clase : Clase = await this.claseRepository.findOne(criterio)
      if(!clase)
         throw new Error('no se encontro la clase');
      else
        return clase;
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Clases - ' + error
      },HttpStatus.NOT_FOUND)
    }     
  }

  async update(id: number, claseDto: CreateClaseDto):Promise<String> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      let clase: Clase = await this.claseRepository.findOne(criterio);
    
      
      if(!clase){
        throw new Error('no se pudo encontrar la clase ')
      }
      else{
        let nombreViejo = clase.getNombre();
        if(claseDto.nombre!= null && claseDto.nombre!=undefined)
          clase.setNombre(claseDto.nombre);
          clase = await this.claseRepository.save(clase);
        return `Se reemplazo: ${nombreViejo} --> ${claseDto.nombre}`
      }
    }  
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Clases - ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async remove(id: number):Promise<boolean> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      let clase: Clase = await this.claseRepository.findOne(criterio);
  
      if(clase){
        await this.claseRepository.remove(clase);
        return true;
      }else
        throw new Error('No se encontro clase para eliminar')
      return false
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:'Problemas en Clase - ' + error
      },HttpStatus.NOT_FOUND)
    }

  }
}
