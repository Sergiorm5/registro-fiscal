'use client';
import { useState } from 'react';

const meses = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

export default function Page() {
const [form, setForm] = useState({
  fecha: '',
  rfc: '',
  periodo: '',
  
  ingresos: '',
  gastos: '',
  
  comprasGastosFacturados: '',
  isrRetenidoMes: '',

  actosRegionFronteriza: '',
  actosTasa16: '',

  actosPagadosTasa16: '',          // 👈 NUEVO
  actosPagadosRegionFronteriza: '',// 👈 NUEVO
  actosPagadosExentos: '',         // 👈 NUEVO

  ivaCargo8: '',
  ivaCargo16: '',
  ivaCargo0: '',
  
  ivaAcred8: '',
  ivaAcred16: '',
  ivaAcred0: '',

  tasa0: '',

  contrasena: '',
});


  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch('/api/registros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        Object.fromEntries(
          Object.entries(form).map(([k, v]) =>
            k === 'fecha' ||
            k === 'rfc' ||
            k === 'periodo' ||
            k === 'contrasena'
              ? [k, v]
              : [k, Number(v)]
          )
        )
      ),
    });

    alert('Registro guardado correctamente');
  };

  return (
    <main className="min-vh-100 bg-light d-flex justify-content-center align-items-start p-4">
      <div className="container">
        <div className="card shadow-lg mx-auto" style={{ maxWidth: 1200 }}>
          <div className="card-body p-4">

            <h1 className="mb-4 fw-bold text-secondary">
              Registro Fiscal
            </h1>

            {/* DATOS GENERALES */}
            <section className="mb-4">
              <h5 className="mb-3 text-primary">Datos Generales</h5>
              <div className="row g-3">
                <Input label="Fecha" name="fecha" type="date" onChange={handleChange} />
                <Input label="RFC" name="rfc" type="text" onChange={handleChange} />
                <Select label="Periodo" name="periodo" options={meses} onChange={handleChange} />
              </div>
            </section>

            {/* INGRESOS / GASTOS */}
            <section className="mb-4">
              <h5 className="mb-3 text-primary">Ingresos y Gastos</h5>
              <div className="row g-3">
                <Input label="Ingresos del mes" name="ingresos" onChange={handleChange} />
                <Input label="Compras y gastos del periodo" name="gastos" onChange={handleChange} />
              </div>
            </section>

            {/* ISR Y COMPRAS */}
            <section className="mb-4">
              <h5 className="mb-3 text-primary">
                ISR y Compras del Mes
              </h5>
              <div className="row g-3">
                <Input
                  label="ISR Retenido del Mes"
                  name="isrRetenidoMes"
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* ACTOS GRAVADOS */}
            <section className="mb-4">
              <h5 className="mb-3 text-primary">
                Actos o Actividades Gravados
              </h5>
              <div className="row g-3">
                <Input
                  label="Valor de los actos o actividades gravados sujetos al estímulo de la región fronteriza"
                  name="actosRegionFronteriza"
                  onChange={handleChange}
                />
                <Input
                  label="Valor de los actos o actividades pagados a la tasa del 16%"
                  name="actosTasa16"
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* ACTOS PAGADOS */}
            <section className="mb-4">
              <h5 className="mb-3 text-primary">
                Actos o Actividades Pagados (Resumen)
              </h5>
              <div className="row g-3">
                <Input
                  label="Actos pagados a la tasa del 16%"
                  name="actosPagadosTasa16"
                  onChange={handleChange}
                />
                <Input
                  label="Valor de los actos o actividades pagados sujetos al estímulo de la región fronteriza"
                  name="actosPagadosRegionFronteriza"
                  onChange={handleChange}
                />
              </div>
            </section>

            <section className="mb-4">
              <h5 className="mb-3 text-primary">Tasa IVA 0</h5>
              <div className="row g-3">
                <Input label="Valor de los demás actos o actividades pagados a la tasa del 0%" name="tasa0" onChange={handleChange} />
              </div>
            </section>

            <section className="mb-4">
              <h5 className="mb-3 text-primary">Contraseña</h5>
              <div className="row g-3">
                <Input type="text" label="Contraseña FIEL" name="contrasena" onChange={handleChange} />
              </div>
            </section>

            <div className="d-grid">
              <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
                Guardar Registro
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Componentes ---------- */

function Input({ label, name, type = 'number', onChange }: any) {
  return (
    <div className="col-12 col-md-4">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type={type}
        step={type === 'number' ? '0.01' : undefined}
        name={name}
        onChange={onChange}
        required
        className="form-control"
      />
    </div>
  );
}

function Select({ label, name, options, onChange }: any) {
  return (
    <div className="col-12 col-md-4">
      <label className="form-label fw-semibold">{label}</label>
      <select
        name={name}
        onChange={onChange}
        required
        className="form-select"
      >
        <option value="">Seleccione</option>
        {options.map((op: string) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}
