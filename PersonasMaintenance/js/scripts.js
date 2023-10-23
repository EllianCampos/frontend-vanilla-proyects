const api = 'http://elliancamposcrudapi.somee.com/api'

const headers = new Headers();
headers.append('Content-Security-Policy', 'upgrade-insecure-requests');

const tbody = document.getElementById('tbody')
const form = document.getElementById('form')
const name = document.getElementById('name')
const age = document.getElementById('age')
const phone = document.getElementById('phone')
const salary = document.getElementById('salary')
const save = document.getElementById('save')
const alertbox = document.getElementById('alertbox')

let isEditing = false;
form.reset()

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (name.value.trim() == ""){
        alertbox.classList.remove("d-none")
        alertbox.textContent = "El nombre el obligatorio"
        return
    }

    if (age.value.trim() === "") age.value = 0
    if (salary.value.trim() === "") salary.value = 0

    alertbox.classList.add("d-none")

    isEditing? updatePerson() : createPerson()
})

// Obtener
fetch(`${api}/personas`, {headers})
.then(res => res.json())
.then(res =>{
    for (const item of res) {
        const row = document.createElement("tr")
        row.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.edad}</td>
                <td>${item.telefono}</td>
                <td>${item.salario}</td>
                <td></td>
            </tr>
        `
        // button edit
        const btnEdit = document.createElement("button")
        btnEdit.classList.add("btn", "btn-warning", "me-1")
        btnEdit.textContent = "Editar"
        btnEdit.onclick = () => {
            name.value = item.nombre
            age.value = item.edad
            phone.value = item.telefono
            salary.value = item.salario
            isEditing = true;
            save.classList.replace("btn-success", "btn-warning")
            save.textContent = "Editar cambios"
            save.setAttribute("data-id", item.idPersona)
            window.scrollTo(0,0)
        }

        // button delete
        const btnDelete = document.createElement("button")
        btnDelete.classList.add("btn", "btn-danger")
        btnDelete.textContent = "Eliminar"
        btnDelete.onclick = () => {
            if (confirm(`¿Esta seguro que sea eliminar el registro de ${item.nombre}`)){
                deletePerson(item.idPersona)
            }
        }

        row.children[4].append(btnEdit)
        row.children[4].append(btnDelete)

        tbody.append(row)
    }
})

// Create
const createPerson = () => {
    fetch(`${api}/personas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: name.value,
            edad: age.value,
            telefono: phone.value,
            salario: salary.value
        })
    })
    .then(res => {
        if (res.status === 200){
            location.reload()
        }
    })
}

// Update Person
const updatePerson = () => {
    const id = save.getAttribute("data-id")
    fetch(`${api}/personas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: name.value,
            edad: age.value,
            telefono: phone.value,
            salario: salary.value
        })
    })
    .then(res => {
        if (res.status === 200){
            location.reload()
        }
    })

    isEditing = false
}

// Delete
const deletePerson = (id) => {
    fetch(`${api}/personas/${id}`, {
        method: "DELETE",
    })
    .then(res => {
        if (res.status === 200) {location.reload()}
    })
}