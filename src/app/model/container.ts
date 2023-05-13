export interface Container {
    name: string;
    request: Request;
    response: Response[];
    
}

interface Request {
    method: string;
    header: Array<string>;
    body: RequestBody;
    url: RequestUrl;
    description?: string;
}

interface RequestBody{
    mode: string;
    raw: string;
}

interface RequestUrl{
    raw: string;
    protocol: string;
    host: Array<string>;
    port: string;
    path: Array<string>;
}

interface Response{
    id: string;
    name: string;
    originalRequest: Request;
    status: string;
    code: number;  
    _postman_previewlanguage: string;
    header: ResponseHeader[];
    cookie: Array<any>
    body: string;

}

interface ResponseHeader{
    key: string;
    value: string;
}

export interface ResponseBody{
    Mensaje: string;
    Ok: boolean;
    Estado: string;
    Datos: string;
    Objeto: ResponseBodyObjeto[];
}

export interface ResponseBodyObjeto{
    Id_Contenedor_Trasvaciado: number;
    Contenedor: string;
    Estado: string;
    Reconteo: boolean;
    Origen: string;
    Validacion: string;
    Destino: string;
    Flete: string;
}


