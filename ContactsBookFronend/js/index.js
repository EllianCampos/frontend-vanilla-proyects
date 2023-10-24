const email = document.getElementById("email");
const password = document.getElementById("password");
const form_singin = document.getElementById("form_singin");
const alertbox = document.getElementById("alert");

const form_singup = document.getElementById("form_singup");
const register_name = document.getElementById("register_name");
const register_email = document.getElementById("register_email");
const register_password = document.getElementById("register_password");

form_singin.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar el correo
    if (email.value.trim() === ''){
        alertbox.classList.remove("d-none")
        alertbox.innerText = "Ingresa el correo"
        return;
    }

    // Validar la contraseña
    if (password.value.trim() === ''){
        alertbox.classList.remove("d-none")
        alertbox.innerText = "Ingresa la contraseña"
        return;
    }

    // Ocultar el la alerta
    alertbox.classList.add("d-none")

    // Hacer login en la api
    fetch(`${api}/usuarios/singin`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "correo": email.value,
            "contrasena": password.value           
        })
    }).then(res => res.json())
    .then(res => {
        if (res.resultado != true){
            alertbox.classList.remove("d-none")
            alertbox.innerText = "Datos de inicio de sesión incorrectos"
            return
        }

        setCookie('token', res.token)
        location.href = "contactos.html"
    })
})

form_singup.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (register_name.value == "" || 
        register_email.value == "" || 
        register_password.value == "")
    {
        alert_register.classList.remove('d-none')
        alert_register.innerText = "Todos los campos son requeridos"
    }

    fetch(`${api}/usuarios/singup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "nombre": register_name.value,
            "correo": register_email.value,
            "contrasena": register_password.value
        })})
        .then(res => {
            if (res.status === 200){
                alert("Registro exitoso")
                location.reload();
            } else {
                alert("Registro fallido")
                location.reload();
            }
        })
})