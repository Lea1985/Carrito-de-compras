// Variables

const carrito = document.querySelector('#carrito');

const listaCursos = document.querySelector('#lista-cursos');

const contenedorCarrito = document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];


// main

console.log(articulosCarrito);

cargarEventListener();

function cargarEventListener() {

    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })


}



// funciones

function agregarCurso(e) {

    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCurso(cursoSeleccionado);
    }
}


function eliminarCurso(e) {


    if (e.target.classList.contains('borrar-curso')) {


        const cursoId = e.target.getAttribute('data-id');

        const cant = parseInt(e.target.parentElement.previousSibling.previousSibling.textContent);

        if (cant > 1) {

            const curso = articulosCarrito.map(curso => {
                if (curso.id === cursoId) {
                    curso.cantidad--;
                    return curso //retorna el objeto actualizado
                } else {
                    return curso; // Retorna el objeto sin modificaciones. 
                }
            })

            articulosCarrito = [...curso]


        } else {

            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        }


        console.log(articulosCarrito);

        carritoHTML();
    }

}

function leerDatosCurso(curso) {

    //console.log(curso);

    // Crear un objeto con el contenido del curso actual.

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    // Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {

        // Actualizar cantidad.

        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso //retorna el objeto actualizado
            } else {
                return curso; // Retorna el objeto sin modificaciones. 
            }
        })

        articulosCarrito = [...cursos]

    } else {
        // Agregar elementos al carrito

        articulosCarrito = [...articulosCarrito, infoCurso]

    };



    console.log(articulosCarrito);

    carritoHTML();
}


// Muestra el carrito de compras en el HTML 

function carritoHTML() {

    // Limpiar el HTML

    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {

        const { imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('tr');


        row.innerHTML = `
        <td>
           <img src=${imagen} width=100 >
        </td>

        <td> ${titulo}  </td>

        <td> ${precio}  </td>

        <td> ${cantidad}   </td>

        <td>
               <a href"#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `

        contenedorCarrito.appendChild(row);

    });


    // Actualizamos el localStorage

    sincronizarStorage();

};

function limpiarHTML() {

    // Forma Lenta

    // contenedorCarrito.innerHTML = '';

    // Forma rapida--- RECOMENDADA.

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
};

function sincronizarStorage() {

    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));

}