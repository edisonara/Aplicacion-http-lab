// API_BASE ahora gestionado en api.js mediante window.API

// DOM Elements
const tablaBody = document.querySelector('#tablaLaboratorios tbody');
const crearForm = document.getElementById('crearLaboratorioForm');

// Utils
function toast(msg) {
  const el = document.getElementById('toastMsg');
  el.querySelector('.toast-body').textContent = msg;
  const bsToast = bootstrap.Toast.getOrCreateInstance(el);
  bsToast.show();
}

function crearFila(lab) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${lab.id}</td>
    <td>${lab.nombre}</td>
    <td>${lab.capacidad || ''}</td>
    <td><button class="btn btn-sm btn-danger" data-id="${lab.id}"><i class="bi bi-trash"></i></button></td>
  `;
  return tr;
}

async function fetchLaboratorios() {
  try {
    const data = await API.laboratorios.list();

    tablaBody.innerHTML = '';
    data.forEach(lab => tablaBody.appendChild(crearFila(lab)));
    // listeners eliminar
    tablaBody.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('¿Eliminar laboratorio?')) return;
        try {
          await API.laboratorios.delete(btn.dataset.id);
          toast('Laboratorio eliminado');
          await fetchLaboratorios();
        } catch (err) { alert(err.message); }
      });
    });
  } catch (err) {
    alert(err.message);
  }
}

async function crearLaboratorio(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const capacidad = parseInt(document.getElementById('capacidad').value, 10);

  try {
    await API.laboratorios.create({ nombre, capacidad });

    // Limpiar formulario y recargar lista
    crearForm.reset();
    await fetchLaboratorios();
  } catch (err) {
    alert(err.message);
  }
}

// Event Listeners
crearForm.addEventListener('submit', crearLaboratorio);

// ------------------- Navegación entre secciones -------------------
const tabs = document.querySelectorAll('#mainTabs .nav-link');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    sections.forEach(sec => sec.classList.add('d-none'));
    document.querySelector(tab.dataset.target).classList.remove('d-none');
  });
});

// ------------------- Asignaturas -------------------
const tablaAsignaturasBody = document.querySelector('#tablaAsignaturas tbody');
const crearAsignaturaForm = document.getElementById('crearAsignaturaForm');

function filaAsignatura(asig) {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${asig.id}</td><td>${asig.nombre}</td><td><button class='btn btn-sm btn-danger' data-id='${asig.id}'><i class="bi bi-trash"></i></button></td>`;
  return tr;
}

async function cargarAsignaturas() {
  // Devuelve lista para llenar selects

  try {
    const data = await API.asignaturas.list();
    tablaAsignaturasBody && (tablaAsignaturasBody.innerHTML = '');
    data.forEach(a => {
      tablaAsignaturasBody && tablaAsignaturasBody.appendChild(filaAsignatura(a));
    });
    tablaAsignaturasBody && tablaAsignaturasBody.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('¿Eliminar asignatura?')) return;
        try {
          await API.asignaturas.delete(btn.dataset.id);
          toast('Asignatura eliminada');
          await cargarAsignaturas();
        } catch (err) { alert(err.message); }
      });
    });
  } catch (err) { alert(err.message); }
}

crearAsignaturaForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombreAsignatura').value.trim();
  if (!nombre) return;
  try {
    const payload = {
      codigo: document.getElementById('codigoAsignatura').value.trim(),
      nombre,
      docenteId: document.getElementById('docenteIdAsignatura').value.trim(),
      creditos: parseInt(document.getElementById('creditosAsignatura').value,10),
      descripcion: document.getElementById('descripcionAsignatura').value.trim()
    };
    await API.asignaturas.create(payload);
    crearAsignaturaForm.reset();
    await cargarAsignaturas();
  } catch (err) { alert(err.message); }
});

// -------------------- Autenticación --------------------
const USERS = {
  'admin@demo.com': { password: 'admin123', role: 'admin', nombre: 'Administrador' },
  'docente@demo.com': { password: 'admin123', role: 'docente', nombre: 'Docente' },
  'estudiante@demo.com': { password: 'admin123', role: 'estudiante', nombre: 'Estudiante' },
  'encargado@demo.com': { password: 'admin123', role: 'encargado', nombre: 'Encargado' }
};

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('currentUser')); }
  catch (_) { return null; }
}

function setCurrentUser(user) {
  if (user) localStorage.setItem('currentUser', JSON.stringify(user));
  else localStorage.removeItem('currentUser');
}

const loginModalEl = document.getElementById('loginModal');
const loginModal = bootstrap.Modal.getOrCreateInstance(loginModalEl);
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const currentUserSpan = document.getElementById('currentUser');
const logoutBtn = document.getElementById('logoutBtn');

function showLogin() {
  loginError.classList.add('d-none');
  loginForm.reset();
  loginModal.show();
}

function hideLogin() { loginModal.hide(); }

function applyRoleUI(role) {
  // Mostrar/ocultar secciones según rol
  const map = {
    docente: ['#sectionAsignaturas', '#sectionParciales', '#sectionPracticas'],
    estudiante: ['#sectionAsignaturas', '#sectionParciales', '#sectionPracticas'],
    encargado: ['#sectionLaboratorios'],
    admin: ['#sectionLaboratorios', '#sectionAsignaturas', '#sectionParciales', '#sectionPracticas']
  };
  // Ocultar todas primero
  document.querySelectorAll('#mainTabs .nav-item').forEach(li => li.classList.add('d-none'));
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('d-none'));
  (map[role] || []).forEach(sel => {
    // mostrar tab
    document.querySelector(`#mainTabs a[data-target='${sel}']`)?.parentElement.classList.remove('d-none');
  });
  // Activar primera pestaña visible
  const firstTab = document.querySelector('#mainTabs .nav-item:not(.d-none) a');
  firstTab?.click();
}

function initAuth() {
  const user = getCurrentUser();
  if (!user) {
    showLogin();
  } else {
    currentUserSpan.textContent = `${user.nombre} (${user.role})`;
    logoutBtn.classList.remove('d-none');
    applyRoleUI(user.role);
  }
}

loginForm?.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const data = USERS[email];
  if (data && data.password === password) {
    const user = { email, role: data.role, nombre: data.nombre };
    setCurrentUser(user);
    currentUserSpan.textContent = `${user.nombre} (${user.role})`;
    logoutBtn.classList.remove('d-none');
    hideLogin();
    applyRoleUI(user.role);
  } else {
    loginError.textContent = 'Credenciales incorrectas';
    loginError.classList.remove('d-none');
  }
});

logoutBtn?.addEventListener('click', () => {
  if (!confirm('¿Cerrar sesión?')) return;
  setCurrentUser(null);
  // limpiar UI
  logoutBtn.classList.add('d-none');
  currentUserSpan.textContent = '';
  // ocultar secciones y tabs
  document.querySelectorAll('#mainTabs .nav-item').forEach(li => li.classList.add('d-none'));
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('d-none'));
  showLogin();
});

// ------------------- Parciales -------------------
const tablaParcialesBody = document.querySelector('#tablaParciales tbody');
const crearParcialForm = document.getElementById('crearParcialForm');
const asignaturaSelect = document.getElementById('asignaturaSelect');

async function llenarSelectAsignaturas(selectEl, includeBlank = true) {
  const data = await API.asignaturas.list();
  selectEl.innerHTML = includeBlank ? '<option value="">-- Seleccione --</option>' : '';
  data.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.id;
    opt.textContent = a.nombre;
    selectEl.appendChild(opt);
  });
  return data;
}

function filaParcial(p) {
  return `<tr><td>${p.id}</td><td>${p.nombre}</td><td>${p.asignatura?.nombre || ''}</td><td><button class='btn btn-sm btn-danger' data-id='${p.id}' data-asig='${p.asignaturaId}'><i class="bi bi-trash"></i></button></td></tr>`;
}

async function cargarParciales() {
  if(!asignaturaSelect) return; // elemento no presente
  const asigId = asignaturaSelect.value;
  if(!asigId || asigId==='undefined'){ // nada seleccionado o valor inválido
    tablaParcialesBody.innerHTML='';
    parcialSelectP && (parcialSelectP.innerHTML='');
    return;
  }

  const data = await API.parciales.listByAsignatura(asigId);
  tablaParcialesBody.innerHTML = data.map(filaParcial).join('');
  tablaParcialesBody.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('¿Eliminar parcial?')) return;
      try {
        await API.parciales.delete(btn.dataset.asig, btn.dataset.id);
        toast('Parcial eliminado');
        await cargarParciales();
        await llenarParcialSelectP();
      } catch(err){ alert(err.message); }
    });
  });
  await llenarParcialSelectP();
}

crearParcialForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const asigId = asignaturaSelect.value;
  if(!asigId){ alert('Seleccione una asignatura primero'); return; }
  const nombre = document.getElementById('nombreParcial').value.trim();
  const fechaInicio = document.getElementById('fechaInicioParcial').value;
  const fechaFin = document.getElementById('fechaFinParcial').value;
  const descripcion = document.getElementById('descripcionParcial').value.trim();
  const estado = document.getElementById('estadoParcial').value;
  if(!asigId || !nombre || !fechaInicio || !fechaFin) return;
  const payload={
      nombre,
      fechaInicio: new Date(fechaInicio).toISOString(),
      fechaFin: new Date(fechaFin).toISOString(),
      descripcion,
      estado
  };
  try{
    await API.parciales.create(asigId,payload);
    crearParcialForm.reset();
    await cargarParciales();
  }catch(err){ alert(err.message); }
});

asignaturaSelect?.addEventListener('change', cargarParciales);

// ------------------- Prácticas -------------------
const tablaPracticasBody = document.querySelector('#tablaPracticas tbody');
const crearPracticaForm = document.getElementById('crearPracticaForm');
const asignaturaSelectP = document.getElementById('asignaturaSelectP');
const parcialSelectP = document.getElementById('parcialSelectP');

async function llenarParcialSelectP() {
  if(!asignaturaSelectP || !parcialSelectP) return;
  const asigId = asignaturaSelectP.value || asignaturaSelect?.value;
  if(!asigId || asigId==='undefined'){ parcialSelectP.innerHTML=''; return; }

  const data = await API.parciales.listByAsignatura(asigId);
  parcialSelectP.innerHTML = '<option value="">-- Seleccione parcial --</option>';
  data.forEach(p=>{
    const opt=document.createElement('option');
    opt.value=p.id;
    opt.textContent=p.nombre;
    parcialSelectP.appendChild(opt);
  });
}

function filaPractica(pr) {
  return `<tr><td>${pr.id}</td><td>${pr.nombre}</td><td>${pr.parcial?.nombre||''}</td><td><button class='btn btn-sm btn-danger' data-id='${pr.id}'><i class="bi bi-trash"></i></button></td></tr>`;
}

async function cargarPracticas() {
  if(!asignaturaSelectP || !parcialSelectP) return;
  const asigId = asignaturaSelectP.value;
  const parcialId = parcialSelectP.value;
  if(!asigId || !parcialId){ tablaPracticasBody.innerHTML=''; return; }
  if(!asigId || !parcialId){ tablaPracticasBody.innerHTML=''; return; }
  const data = await API.practicas.listByParcial(asigId,parcialId);
  tablaPracticasBody.innerHTML = data.map(filaPractica).join('');
  tablaPracticasBody.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      if(!confirm('¿Eliminar práctica?')) return;
      try{
        await API.practicas.delete(btn.dataset.id);
        toast('Práctica eliminada');
        await cargarPracticas();
      }catch(err){ alert(err.message); }
    });
  });
}

asignaturaSelectP?.addEventListener('change', async ()=>{ await llenarParcialSelectP(); tablaPracticasBody.innerHTML='';});
parcialSelectP?.addEventListener('change', cargarPracticas);

crearPracticaForm?.addEventListener('submit', async e=>{
  e.preventDefault();
  const asigId = asignaturaSelectP.value;
  const parcialId = parcialSelectP.value;
  const nombre = document.getElementById('nombrePractica').value.trim();
  if(!asigId || !parcialId || !nombre) return;
  try{
    await API.practicas.create(asigId,parcialId,{ nombre });
    crearPracticaForm.reset();
    await cargarPracticas();
  }catch(err){ alert(err.message); }
});

// ---------------- Fin autenticación --------------------

// ---- Carga inicial encapsulada ----
(async ()=>{
  const tabParciales = document.querySelector("a[data-target='#sectionParciales']");
  const tabPracticas = document.querySelector("a[data-target='#sectionPracticas']");
  try{
    await fetchLaboratorios();
    await cargarAsignaturas();
    try {
      await llenarSelectAsignaturas(asignaturaSelect);
      await llenarSelectAsignaturas(asignaturaSelectP);
    } catch(err){
      console.error('Fallo al cargar asignaturas', err);
      tabParciales?.classList.add('disabled');
      tabPracticas?.classList.add('disabled');
    }
    initAuth();
  }catch(err){ console.error(err); }
})();
