import { NextResponse } from 'next/server';
import sql from 'mssql';
import { getConnection } from '../../lib/db';

// Valor de los actos o actividades pagados a la tasa del 16%
// Valor de los actos o actividades pagados sujetos al estímulo de la región fronteriza norte
// Valor de los actos o actividades pagados exentos de IVA

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

      tasa0
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

      .query(`
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
          Tasa0
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
          @tasa0
        )
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
