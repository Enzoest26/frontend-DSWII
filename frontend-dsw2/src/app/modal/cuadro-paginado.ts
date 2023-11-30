import { Cuadro } from "./cuadro";

export interface CuadroPaginado{
    content: Cuadro[];
    totalPages: number;
    totalElements: number;
}