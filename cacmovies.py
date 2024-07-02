# Agregar películas
peliculas = []

def agregar_pelicula (id, titulo, anio_estreno, genero, duracion, portada):
    if consultar_pelicula(id):
        return False
    
    nueva_pelicula={
        'id':id,
        'titulo':titulo,
        'anio_estreno':anio_estreno,
        'genero': genero,
        'duracion':duracion,
        'portada':portada,
         }
    peliculas.append(nueva_pelicula)
    return True

# consultar producto
def consultar_pelicula(id):
    for pelicula in peliculas:
        if pelicula['id'] == id:
            return pelicula
    return False

# modificar producto(no sé si sirve a no ser que le agreguemos categoría y precio)

def modificar_pelicula(id, nuevo_titulo, nuevo_anio_estreno, nuevo_genero, nueva_duracion, nueva_portada):
    for pelicula in peliculas:
        if pelicula['id']== id:
            pelicula['titulo']= nuevo_titulo
            pelicula['anio_estreno']= nuevo_anio_estreno
            pelicula['genero']= nuevo_genero
            pelicula['duracion']=nueva_duracion
            pelicula['portada']=nueva_portada
            return True
    return False

# Listar peliculas
def listar_peliculas():
    print("-" * 20)
    for pelicula in peliculas:
        print(f"Id.........: {pelicula['nombre']}")
        print(f"Título.....: {pelicula['dibujo']}")
        print(f"Año........: {pelicula['anio']}")    
        print(f"Género.....: {pelicula['genero']}")    
        print(f"Duración...: {pelicula['duracion']}")    
        print(f"Portada....: {pelicula['portada']}")     
        print("-"*20)
        
# Eliminar película
def eliminar_pelicula(nombre):
    for pelicula in peliculas:
        if pelicula['id']==id:
            peliculas.remove(pelicula)
            return True
    return False



            



