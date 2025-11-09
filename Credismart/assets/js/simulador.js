(function(){
  const inputMonto = document.getElementById('monto');
  const inputMeses = document.getElementById('meses');
  const btn = document.getElementById('btnSimular');
  const elCuota = document.getElementById('cuota');
  const elResMonto = document.getElementById('resMonto');
  const elResPlazo = document.getElementById('resPlazo');
  const elResTasa = document.getElementById('resTasa');

  const MONTO_MIN = 1000000;
  const MONTO_MAX = 500000000;
  const PLAZO_MIN = 48;
  const PLAZO_MAX = 84;
  const TASA_MENSUAL = 0.015; // 1.5% mensual

  function toNumber(val){
    return Number(String(val).replace(/[^\d]/g,'')||0);
  }
  function formatCurrency(n){
    return n.toLocaleString('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});
  }

  function clamp(n, min, max){
    return Math.min(Math.max(n, min), max);
  }

  function amortizacionCuota(P, r, n){
    if(r===0) return P/n;
    const cuota = P * (r / (1 - Math.pow(1 + r, -n)));
    return cuota;
  }

  function actualizar(){
    const monto = clamp(toNumber(inputMonto.value), MONTO_MIN, MONTO_MAX);
    if(monto !== toNumber(inputMonto.value)){
      inputMonto.value = formatCurrency(monto);
    }
    let meses = Number(inputMeses.value)||PLAZO_MIN;
    meses = clamp(meses, PLAZO_MIN, PLAZO_MAX);

    const cuota = Math.round(amortizacionCuota(monto, TASA_MENSUAL, meses));

    elCuota.textContent = formatCurrency(cuota);
    elResMonto.textContent = formatCurrency(monto);
    elResPlazo.textContent = meses + ' meses';
    elResTasa.textContent = (TASA_MENSUAL*100).toFixed(2) + '%';
  }

  // Eventos
  inputMonto.addEventListener('blur', actualizar);
  inputMonto.addEventListener('input', () => {
    
  });
  inputMeses.addEventListener('input', actualizar);
  btn.addEventListener('click', actualizar);

  // inicial
  inputMeses.value = PLAZO_MIN;
  inputMonto.value = formatCurrency(0);
  actualizar();
})();
