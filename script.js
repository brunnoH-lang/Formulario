// Recuperar datos almacenados previamente en la memoria del navegador
let registros = JSON.parse(localStorage.getItem('registrosCbtis')) || [];
const maxRegistros = 5;

window.onload = function() {
    actualizarTabla();
    if (registros.length >= maxRegistros) {
        bloquearBoton();
    }
};

function fijarAnio() {
    const anio = document.getElementById('anioEgreso').value;
    if (!anio) {
        alert("Escribe primero el ano de egreso.");
        return;
    }
    alert("¡Ano de egreso (" + anio + ") fijado correctamente!");
}

function confirmarRegistro() {
    if (registros.length >= maxRegistros) {
        alert("Ya se han completado los 5 registros requeridos.");
        return;
    }

    const apellidoPaterno = document.getElementById('apellidoPaterno').value || "Sin apellido";
    const nombres = document.getElementById('nombres').value || "Sin nombre";
    const curp = (document.getElementById('curp').value || "S/N").toUpperCase();
    const celular = document.getElementById('celular').value || "S/N";
    const carrera = document.getElementById('carrera').value;
    const promedio = document.getElementById('promedio').value || "0";

    registros.push({
        nombreCompleto: `${nombres} ${apellidoPaterno}`,
        curp: curp,
        celular: celular,
        carrera: carrera,
        promedio: promedio
    });

    // Guardar permanentemente en localStorage para que no se borre al reiniciar
    localStorage.setItem('registrosCbtis', JSON.stringify(registros));

    actualizarTabla();

    // Limpiar campos del formulario
    document.getElementById('apellidoPaterno').value = '';
    document.getElementById('nombres').value = '';
    document.getElementById('curp').value = '';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('lugarNacimiento').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('secundaria').value = '';
    document.getElementById('cct').value = '';
    document.getElementById('promedio').value = '';
    document.getElementById('anioEgreso').value = '';

    if (registros.length === maxRegistros) {
        bloquearBoton();
        alert("¡Excelente! Has confirmado los 5 registros y se han guardado permanentemente.");
    } else {
        alert("¡Registro confirmado! Faltan " + (maxRegistros - registros.length) + " registros.");
    }
}

function actualizarTabla() {
    const tbody = document.getElementById('tablaRegistros');
    const contadorBadge = document.getElementById('contadorRegistros');
    
    contadorBadge.textContent = `Registros ingresados: ${registros.length} / 5`;

    if (registros.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #777;">Aun no hay registros agregados.</td></tr>`;
        return;
    }

    let html = '';
    registros.forEach((reg, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${reg.nombreCompleto}</td>
                <td>${reg.curp}</td>
                <td>${reg.celular}</td>
                <td>${reg.carrera}</td>
                <td>${reg.promedio}</td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function bloquearBoton() {
    const btn = document.getElementById('btnConfirmar');
    if (btn) {
        btn.disabled = true;
        btn.style.backgroundColor = '#A0AEC0';
        btn.style.cursor = 'not-allowed';
    }
}

function reiniciarRegistros() {
    if (confirm("¿Estas seguro de borrar todos los registros guardados?")) {
        localStorage.removeItem('registrosCbtis');
        registros = [];
        location.reload();
    }
}