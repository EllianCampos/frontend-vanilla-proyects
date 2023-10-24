const alertbox = document.getElementById("alert");
const alertbox_edit = document.getElementById("alert_edit");
const alertbox_create = document.getElementById("alert_create");
const contacts_container = document.getElementById("contacts_container");
const table_body = document.getElementById("table_body");

const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");

const edit_nombre = document.getElementById("edit_nombre");
const edit_telefono = document.getElementById("edit_telefono");

const modalCrear = new bootstrap.Modal(document.getElementById("modalCrear"));

const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));

const form_edit = document.getElementById("form_edit")

const modalConfirmDelete = new bootstrap.Modal(
  document.getElementById("modalConfirmDelete")
);
const modalConfirmDeleteText = document.getElementById(
  "modalConfirmDeleteText"
);

const sesionExpiredAlert = new bootstrap.Modal(
  document.getElementById("sesionExpiredAlert")
);

const eliminar = document.getElementById("eliminar");

// Evento cerrar sesión cuando el token expira
const sesionExpiredAlertBtn = document.getElementById("sesionExpiredAlertBtn");
sesionExpiredAlertBtn.onclick = () => (location.href = "index.html");

// Cerrar sesion
document.getElementById('logout').addEventListener('click', () => {
  location.href = "/contactsbookfronend/"
})

// Obtener contactos
const loadTasks = () => {
  fetch(`${api}/contactos`, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 401) {
        sesionExpiredAlert.show();
      }
    })
    .then((res) => {
      for (const item of res) {
        const row = table_body.insertRow();
        row.setAttribute("id", item.idContacto)
        row.innerHTML += `
          <tr>
            <td>${item.nombre}</td>
            <td>${item.telefono}</td>
            <td></td>
          </tr>
        `
        // Crear el boton de editar
        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-warning", "me-1");
        editButton.textContent = "Editar"
        editButton.onclick = () => {
          modalEditar.show();
          form_edit.setAttribute("data-id", item.idContacto)
          edit_nombre.value = item.nombre;
          edit_telefono.value = item.telefono;
        };

        // Crear el boton de eliminar
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.textContent = "Eliminar"
        deleteButton.onclick = () => {
          modalConfirmDelete.show()           
          modalConfirmDeleteText.setAttribute('data-id', item.idContacto)     
          modalConfirmDeleteText.innerHTML = `¿Estás seguro que desea eliminar a <b>${item.nombre}</b> de tus contactos`
        };

        // Agregar los botones
        row.children[2].appendChild(editButton);
        row.children[2].appendChild(deleteButton);
      }
    });
};

loadTasks();

// Crear contacto
document.getElementById("create_contact").addEventListener("click", (e) => {
  if (nombre.value == ""){
    alertbox_create.classList.remove("d-none")
    alertbox_create.textContent = "El nombre no puede quedar en blanco"
  }

  e.preventDefault();
  console.log("creando")
  fetch(`${api}/contactos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      nombre: nombre.value,
      telefono: telefono.value,
    }),
  }).then((res) => {
    if (res.status === 200) {
      location.reload();
    } else if (res.status === 401) {
      sesionExpiredAlert.show();
    }
  });
});

// Editar contacto
document.getElementById("save_task").addEventListener("click", () => {
  if (edit_nombre.value == ""){
    alertbox_edit.classList.remove("d-none")
    alertbox_edit.textContent = "El nombre no puede quedar en blanco"
    return
  }

  id = form_edit.getAttribute("data-id")

  fetch(`${api}/contactos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      nombre: edit_nombre.value,
      telefono: edit_telefono.value,
    }),
  }).then((res) => {
    if (res.status === 200) {
      location.reload();
    } else if (res.status === 401) {
      sesionExpiredAlert.show();
    }
  });
});

// EliminarContacto
eliminar.addEventListener('click', () => {
  const id = modalConfirmDeleteText.getAttribute('data-id')
  fetch(`${api}/contactos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      location.reload();
    } else if (res.status === 401) {
      sesionExpiredAlert.show();
    }
  });
})

