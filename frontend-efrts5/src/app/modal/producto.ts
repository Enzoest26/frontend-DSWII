import { Color } from "./color";
import { Material } from "./material";

export interface Producto {
    idProducto: number;
    cantidad: number;
    descripcion: string;
    nombre: string;
    precio: number;
    color: Color;
    idColor: number;
    material: Material;
    idMaterial: number;
}