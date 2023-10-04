import { HttpException,HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CiudadDTO } from './dto/ciudad.dto';

@Injectable()
export class CiudadService {

    private ciudades:Ciudad[] = [];
    
    constructor(
        @InjectRepository(Ciudad)
        private ciudadRepository:Repository<Ciudad>
    ){}

    async findAllRaw():Promise<CiudadDTO[]>{
        try{
            this.ciudades = [];
            let datos = await this.ciudadRepository.query("select * from ciudad");

            datos.forEach(element => {
                let ciudad : Ciudad = new Ciudad(element['nombre']);
                this.ciudades.push(ciudad)
            });

            return this.ciudades;
        }
        catch(error){
            throw new HttpException({
              status: HttpStatus.CONFLICT,
              error: 'Error en Ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }      
    }    

    async findAllOrm():Promise<Ciudad[]>{
        return await this.ciudadRepository.find();
    }

    async findById(id:number) : Promise<CiudadDTO> {
        try{
            const criterio : FindOneOptions = { where: { id:id } };
            let ciudad : CiudadDTO = await this.ciudadRepository.findOne( criterio );
            if(ciudad)
                return ciudad
            else
                throw new Error('No se encuentra la ciudad')
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en Ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }

    }

    async create(ciudadDTO: CiudadDTO) : Promise<CiudadDTO>{
        try{
            let ciudad :Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDTO.nombre));
            if(!ciudad)
                throw new Error('no se pudo crear la ciudad');
            else
                return ciudadDTO;
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en Ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }
    }

    async update(ciudadDto:CiudadDTO, id:number):Promise<String>{
        try{
            const criterio : FindOneOptions = {where:{id:id}};
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);

            if(!ciudad)
                throw new Error('No se pudo encontrar la ciudad a modificar');
            else{ 
                let ciudadVieja = ciudad.getNombre();//guardo el nombre de la ciudad vieja para mostrarlo en el string
                ciudad.setNombre(ciudadDto.nombre);
                ciudad = await this.ciudadRepository.save(ciudad);//el save depende al contexto puede actualizar o crear 
                return `OK - ${ciudadVieja} --> ${ciudadDto.nombre}`
            }
        }
        catch(error){
            throw new HttpException({
              status: HttpStatus.CONFLICT,
              error: 'Error en Ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }      
    }

    async delete(id:number): Promise<any>{
        try{
            const criterio : FindOneOptions = {where:{id:id}};
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
    
            if(!ciudad)
                throw new Error('No se pudo eliminar ciudad');
            else{
                await this.ciudadRepository.remove(ciudad);
                 return { id:id,
                          message:'se elimino exitosamente' 
                        }
            }    
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en Ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }
   
    }
    
}
