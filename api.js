// api.js – Cliente ligero para todas las rutas del backend
(function (global) {
  const API_BASE = 'https://guc9zkb4ee.execute-api.us-east-2.amazonaws.com';

  function json(res) {
    if (!res.ok) throw new Error(res.statusText || 'Error en la petición');
    return res.json();
  }

  const API = {
    laboratorios: {
      list: () => fetch(`${API_BASE}/laboratorios`).then(json),
      get: (id) => fetch(`${API_BASE}/laboratorios/${id}`).then(json),
      create: (data) => fetch(`${API_BASE}/laboratorios`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      }).then(json),
      update: (id, data) => fetch(`${API_BASE}/laboratorios/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      }).then(json),
      delete: (id) => fetch(`${API_BASE}/laboratorios/${id}`, { method: 'DELETE' }).then(json),
      disponibilidad: (id, params) => {
        const qs = new URLSearchParams(params).toString();
        return fetch(`${API_BASE}/laboratorios/${id}/disponibilidad?${qs}`).then(json);
      },
      practicas: (id) => fetch(`${API_BASE}/laboratorios/${id}/practicas`).then(json),
      usos: (id) => fetch(`${API_BASE}/laboratorios/${id}/usos`).then(json),
      estadisticas: (id) => fetch(`${API_BASE}/laboratorios/${id}/estadisticas`).then(json)
    },
    asignaturas: {
      list: () => fetch(`${API_BASE}/asignaturas`).then(json),
      get: (id) => fetch(`${API_BASE}/asignaturas/${id}`).then(json),
      create: (data) => fetch(`${API_BASE}/asignaturas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(json),
      update: (id, data) => fetch(`${API_BASE}/asignaturas/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(json),
      delete: (id) => fetch(`${API_BASE}/asignaturas/${id}`, { method: 'DELETE' }).then(json),
      byDocente: (docenteId) => fetch(`${API_BASE}/docentes/${docenteId}/asignaturas`).then(json),
      conParciales: (id) => fetch(`${API_BASE}/asignaturas/id/${id}/parciales`).then(json)
    },
    parciales: {
      listByAsignatura: (asignaturaId) => fetch(`${API_BASE}/asignaturas/${asignaturaId}/parciales`).then(json),
      create: (asignaturaId, data) => fetch(`${API_BASE}/asignaturas/${asignaturaId}/parciales`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(json),
      get: (asignaturaId, id) => fetch(`${API_BASE}/asignaturas/${asignaturaId}/parciales/${id}`).then(json),
      update: (asignaturaId, id, data) => fetch(`${API_BASE}/asignaturas/${asignaturaId}/parciales/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(json),
      delete: (asignaturaId, id) => fetch(`${API_BASE}/asignaturas/${asignaturaId}/parciales/${id}`, { method: 'DELETE' }).then(json),
      activos: () => fetch(`${API_BASE}/parciales/activos`).then(json),
      conPracticas: (asignaturaId, id) => fetch(`${API_BASE}/asignaturas/${asignaturaId}/parciales/id/${id}/practicas`).then(json)
    },
    practicas: {
      listByParcial: (asignaturaId, parcialId) => fetch(`${API_BASE}/asignaturas/${asignaturaId}/parciales/parcial/${parcialId}/practicas`).then(json),
      listByLaboratorio: (laboratorioId) => fetch(`${API_BASE}/laboratorios/${laboratorioId}/practicas`).then(json),
      create: (asignaturaId, parcialId, data) => fetch(`${API_BASE}/asignaturas/${asignaturaId}/parciales/${parcialId}/practicas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(json),
      get: (id) => fetch(`${API_BASE}/practicas/${id}`).then(json),
      update: (id, data) => fetch(`${API_BASE}/practicas/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(json),
      delete: (id) => fetch(`${API_BASE}/practicas/${id}`, { method: 'DELETE' }).then(json),
      usos: (id) => fetch(`${API_BASE}/practicas/${id}/usos`).then(json)
    },
    usos: {
      registrar: (data) => fetch(`${API_BASE}/uso-equipos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(json),
      finalizar: (id) => fetch(`${API_BASE}/uso-equipos/${id}/finalizar`, { method: 'PUT' }).then(json),
      get: (id) => fetch(`${API_BASE}/uso-equipos/${id}`).then(json),
      listByEstudiante: (estudianteId) => fetch(`${API_BASE}/estudiantes/${estudianteId}/usos`).then(json),
      listByPractica: (practicaId) => fetch(`${API_BASE}/practicas/id/${practicaId}/usos`).then(json),
      listByLaboratorio: (laboratorioId) => fetch(`${API_BASE}/laboratorios/${laboratorioId}/usos`).then(json)
    }
  };

  global.API = API;
})(window);
