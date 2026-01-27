import { NextResponse } from 'next/server';
import sql from 'mssql';
import { getConnection } from '../../lib/db';


//campo guardado(entero)
//campo aprobacion(true/false) 

export async function POST(req: Request) {
  try {
    const {
      fecha,
      rfc,
      periodo,

      ingresos,
      gastos,
      comprasGastosFacturados,
      isrRetenidoMes,

      actosRegionFronteriza,
      actosTasa16,

      actosPagadosTasa16,
      actosPagadosRegionFronteriza,
      actosPagadosExentos,

      ivaCargo8,
      ivaCargo16,
      ivaCargo0,

      ivaAcred8,
      ivaAcred16,
      ivaAcred0,

      tasa0,

      contrasena,
    } = await req.json();

    const pool = await getConnection();

    await pool.request()
      .input('fecha', sql.Date, fecha)
      .input('rfc', sql.VarChar(13), rfc)
      .input('periodo', sql.VarChar(15), periodo)

      .input('ingresos', sql.Decimal(18, 2), ingresos)
      .input('gastos', sql.Decimal(18, 2), gastos)
      .input('comprasGastosFacturados', sql.Decimal(18, 2), comprasGastosFacturados)
      .input('isrRetenidoMes', sql.Decimal(18, 2), isrRetenidoMes)

      .input('actosRegionFronteriza', sql.Decimal(18, 2), actosRegionFronteriza)
      .input('actosTasa16', sql.Decimal(18, 2), actosTasa16)

      .input('actosPagadosTasa16', sql.Decimal(18, 2), actosPagadosTasa16)
      .input('actosPagadosRegionFronteriza', sql.Decimal(18, 2), actosPagadosRegionFronteriza)
      .input('actosPagadosExentos', sql.Decimal(18, 2), actosPagadosExentos)

      .input('ivaCargo8', sql.Decimal(18, 2), ivaCargo8)
      .input('ivaCargo16', sql.Decimal(18, 2), ivaCargo16)
      .input('ivaCargo0', sql.Decimal(18, 2), ivaCargo0)

      .input('ivaAcred8', sql.Decimal(18, 2), ivaAcred8)
      .input('ivaAcred16', sql.Decimal(18, 2), ivaAcred16)
      .input('ivaAcred0', sql.Decimal(18, 2), ivaAcred0)

      .input('tasa0', sql.Decimal(18, 2), tasa0)

      .input('contrasena', sql.VarChar(200), contrasena)
      
      .query(`
      IF EXISTS (SELECT 1 FROM RegistrosFiscales WHERE RFC = @rfc)
      BEGIN
          UPDATE RegistrosFiscales
          SET
              Fecha = @fecha,
              Periodo = @periodo,
              Ingresos = @ingresos,
              Gastos = @gastos,
              ComprasGastosFacturados = @comprasGastosFacturados,
              IsrRetenidoMes = @isrRetenidoMes,
              ActosRegionFronteriza = @actosRegionFronteriza,
              ActosTasa16 = @actosTasa16,
              ActosPagadosTasa16 = @actosPagadosTasa16,
              ActosPagadosRegionFronteriza = @actosPagadosRegionFronteriza,
              ActosPagadosExentos = @actosPagadosExentos,
              IvaCargo8 = @ivaCargo8,
              IvaCargo16 = @ivaCargo16,
              IvaCargo0 = @ivaCargo0,
              IvaAcred8 = @ivaAcred8,
              IvaAcred16 = @ivaAcred16,
              IvaAcred0 = @ivaAcred0,
              Tasa0 = @tasa0,
              Contrasena = @contrasena,
              guardado = 1
          WHERE RFC = @rfc;
      END
      ELSE
      BEGIN
          INSERT INTO RegistrosFiscales (
              Fecha,
              RFC,
              Periodo,
              Ingresos,
              Gastos,
              ComprasGastosFacturados,
              IsrRetenidoMes,
              ActosRegionFronteriza,
              ActosTasa16,
              ActosPagadosTasa16,
              ActosPagadosRegionFronteriza,
              ActosPagadosExentos,
              IvaCargo8,
              IvaCargo16,
              IvaCargo0,
              IvaAcred8,
              IvaAcred16,
              IvaAcred0,
              Tasa0,
              Contrasena,
              guardado,
              aprobacion
          )
          VALUES (
              @fecha,
              @rfc,
              @periodo,
              @ingresos,
              @gastos,
              @comprasGastosFacturados,
              @isrRetenidoMes,
              @actosRegionFronteriza,
              @actosTasa16,
              @actosPagadosTasa16,
              @actosPagadosRegionFronteriza,
              @actosPagadosExentos,
              @ivaCargo8,
              @ivaCargo16,
              @ivaCargo0,
              @ivaAcred8,
              @ivaAcred16,
              @ivaAcred0,
              @tasa0,
              @contrasena,
              1,
              0
          );
      END
      `);


    return NextResponse.json({
      message: 'Registro guardado correctamente',
    });
  } catch (error) {
    console.error('Error al guardar:', error);
    return NextResponse.json(
      { error: 'Error al guardar el registro' },
      { status: 500 }
    );
  }
}
