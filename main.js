/* document.activeElement("DOMcontendload", ()=>{
    getUserAll()
}) */
(function(){
    document.addEventListener('DOMContentLoaded',getUserAll);
    function getUserAll(){
        console.log('DESDE IIFE');
    }
})();

let myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    opc[e.submitter.dataset.accion](data)
})

const opc = {
    "GET": () => getUserAll(),
    "PUT": (data) => putUser(data),
    "DELETE": (data) => deleteUser(data),
    "SEARCH": (data) => searchUser(data),
    "POST": (data) => postUser(data)
}

let config = {
    headers: new Headers({
        "Content-Type": "application/json"
    }),
};
const getUserAll = async () => {
    config.method = "GET";
    let res = await (await fetch("http://localhost:4001/usuarios", config)).json();
    const contenedor = document.querySelector('tbody');
    res.forEach(user => {
        let row = document.createElement('tr'); // Crear una nueva fila para cada usuario
        row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.edad}</td>
        `;
        contenedor.appendChild(row); // Agregar la fila al contenedor dentro del bucle
    });
}


const postUser = async (data) => {
    config.method = "POST";
    config.body = JSON.stringify(data);
    let res = await (await fetch("http://localhost:4001/usuarios", config)).json();
    console.log(res);
}
const putUser = async (data) => {
    config.method = "PUT";
    config.body = JSON.stringify(data);
    let res = await (await fetch(`http://localhost:4001/usuarios/${data.id}`, config)).json();
    console.log(res);
}
const deleteUser = async (data) => {
    config.method = "DELETE";
    let res = await (await fetch(`http://localhost:4001/usuarios/${data.id}`, config)).json();
    console.log(res);
}
const searchUser = async (data) => {
    config.method = "GET";
    let res = await (await fetch(`http://localhost:4001/usuarios?q=${Object.values(data).join("")}`, config)).json();
    console.log(res);
}

/* function showAllSData(usuarios){
    const contenedor = document.querySelector('.tabla');
    usuarios.forEach((usuario)=>{
        const{id, nombre, apellido, edad}=usuarios
        const rows = document.createElement('div');
        rows.innerHTML=`
        <div>${id}</div>
        <div>${nombre}</div>
        <div>${apellido}</div>
        <div>${edad}</div>
        `;
        contenedor.appendChild(div)
    })
} */