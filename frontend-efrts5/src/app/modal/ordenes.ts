import { Usuario } from './usuario';

export interface ordenes {
    id: number;
    fechaCreacion: string;
    fechaRecibida: string;
    numero: string;
    total: number;
    usuario: Usuario; 

}