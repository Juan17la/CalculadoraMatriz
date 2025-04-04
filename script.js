document.addEventListener('DOMContentLoaded', function () {
    const rowsAInput = document.getElementById('rows-a');
    const colsAInput = document.getElementById('cols-a');
    const matrixA = document.querySelector('.matrix'); // Updated selector
    const titleResult = document.querySelector('.result-section .section-title'); // Updated selector
    const resultado = document.querySelector('.result-matrix'); // Updated selector
    const determinanteBtn = document.getElementById('determinante');
    const transpuestaBtn = document.getElementById('transpuesta');
    const rowsBInput = document.getElementById('rows-b');
    const colsBInput = document.getElementById('cols-b');
    const matrixB = document.querySelector('.matrixB');
    const sumaBtn = document.getElementById('suma');
    const restaBtn = document.getElementById('resta');

    function crearMatriz(filas, columnas) {
        matrixA.innerHTML = '';
        matrixA.style.display = "grid";
        matrixA.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
        matrixA.style.gridTemplateRows = `repeat(${filas}, 1fr)`;

        for (let i = 0; i < filas * columnas; i++) {
            const celda = document.createElement('input');
            celda.type = 'number';
            celda.className = 'matrix-cell';
            matrixA.appendChild(celda);
        }
    }

    function crearMatrizB(filas, columnas) {
        matrixB.innerHTML = '';
        matrixB.style.display = "grid";
        matrixB.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
        matrixB.style.gridTemplateRows = `repeat(${filas}, 1fr)`;

        for (let i = 0; i < filas * columnas; i++) {
            const celda = document.createElement('input');
            celda.type = 'number';
            celda.className = 'matrix-cell';
            matrixB.appendChild(celda);
        }
    }

    function obtenerMatriz() {
        const celdas = document.querySelectorAll('.matrix-cell');
        const filas = parseInt(rowsAInput.value);
        const columnas = parseInt(colsAInput.value);
        let matriz = [];

        for (let i = 0; i < filas; i++) {
            matriz[i] = [];
            for (let j = 0; j < columnas; j++) {
                matriz[i][j] = parseFloat(celdas[i * columnas + j].value) || 0;
            }
        }

        return matriz;
    }

    function obtenerMatrizB() {
        const celdas = document.querySelectorAll('.matrixB .matrix-cell');
        const filas = parseInt(rowsBInput.value);
        const columnas = parseInt(colsBInput.value);
        let matriz = [];

        for (let i = 0; i < filas; i++) {
            matriz[i] = [];
            for (let j = 0; j < columnas; j++) {
                matriz[i][j] = parseFloat(celdas[i * columnas + j].value) || 0;
            }
        }

        return matriz;
    }

    function transponerMatriz(matriz) {
        const filas = matriz.length;
        const columnas = matriz[0].length;
        let matrizTranspuesta = [];

        for (let i = 0; i < columnas; i++) {
            matrizTranspuesta[i] = [];
            for (let j = 0; j < filas; j++) {
                matrizTranspuesta[i][j] = matriz[j][i];
            }
        }

        return matrizTranspuesta;
    }

    function calcularDeterminante(matriz) {
        const n = matriz.length;

        if (matriz.some(fila => fila.length !== n)) {
            return '❌ La matriz no es cuadrada.';
        }

        if (n === 1) return matriz[0][0];
        if (n === 2) {
            return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
        }

        let determinante = 0;
        for (let i = 0; i < n; i++) {
            const subMatriz = matriz.slice(1).map(fila => fila.filter((_, j) => j !== i));
            determinante += ((i % 2 === 0 ? 1 : -1) * matriz[0][i] * calcularDeterminante(subMatriz));
        }

        return determinante;
    }

    function sumarMatrices(matrizA, matrizB) {
        const filas = matrizA.length;
        const columnas = matrizA[0].length;
        let resultado = [];

        for (let i = 0; i < filas; i++) {
            resultado[i] = [];
            for (let j = 0; j < columnas; j++) {
                resultado[i][j] = matrizA[i][j] + matrizB[i][j];
            }
        }

        return resultado;
    }

    function restarMatrices(matrizA, matrizB) {
        const filas = matrizA.length;
        const columnas = matrizA[0].length;
        let resultado = [];

        for (let i = 0; i < filas; i++) {
            resultado[i] = [];
            for (let j = 0; j < columnas; j++) {
                resultado[i][j] = matrizA[i][j] - matrizB[i][j];
            }
        }

        return resultado;
    }

    function multiplicarMatrices(matrizA, matrizB) {
        const filasA = matrizA.length;
        const columnasA = matrizA[0].length;
        const filasB = matrizB.length;
        const columnasB = matrizB[0].length;

        if (columnasA !== filasB) {
            return '❌ Las matrices no son compatibles para multiplicación.';
        }

        let resultado = Array(filasA).fill(null).map(() => Array(columnasB).fill(0));

        for (let i = 0; i < filasA; i++) {
            for (let j = 0; j < columnasB; j++) {
                for (let k = 0; k < columnasA; k++) {
                    resultado[i][j] += matrizA[i][k] * matrizB[k][j];
                }
            }
        }

        return resultado;
    }

    function calcularAdjunta(matriz) {
        const n = matriz.length;

        if (matriz.some(fila => fila.length !== n)) {
            return '❌ La matriz no es cuadrada.';
        }

        let adjunta = Array(n).fill(null).map(() => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const subMatriz = matriz
                    .filter((_, fila) => fila !== i)
                    .map(fila => fila.filter((_, columna) => columna !== j));
                adjunta[j][i] = ((i + j) % 2 === 0 ? 1 : -1) * calcularDeterminante(subMatriz);
            }
        }

        return adjunta;
    }

    function calcularInversa(matriz) {
        const determinante = calcularDeterminante(matriz);

        if (determinante === 0) {
            return '❌ La matriz no tiene inversa.';
        }

        const adjunta = calcularAdjunta(matriz);
        return adjunta.map(fila => fila.map(valor => valor / determinante));
    }

    function mostrarResultadoMatriz(matriz) {
        resultado.innerHTML = '';
        resultado.style.display = 'grid';
        resultado.style.gridTemplateColumns = `repeat(${matriz[0].length}, 1fr)`;
        resultado.style.gridTemplateRows = `repeat(${matriz.length}, 1fr)`;

        matriz.forEach(fila => {
            fila.forEach(valor => {
                const celdaDiv = document.createElement('div');
                celdaDiv.className = 'result-cell';
                celdaDiv.textContent = typeof valor === 'number' ? valor.toFixed(2) : valor; // Limit decimals
                resultado.appendChild(celdaDiv);
            });
        });
    }

    rowsAInput.addEventListener('change', () => {
        crearMatriz(parseInt(rowsAInput.value), parseInt(colsAInput.value));
    });

    colsAInput.addEventListener('change', () => {
        crearMatriz(parseInt(rowsAInput.value), parseInt(colsAInput.value));
    });

    rowsBInput.addEventListener('change', () => {
        crearMatrizB(parseInt(rowsBInput.value), parseInt(colsBInput.value));
    });

    colsBInput.addEventListener('change', () => {
        crearMatrizB(parseInt(rowsBInput.value), parseInt(colsBInput.value));
    });

    determinanteBtn.addEventListener('click', function () {
        const matriz = obtenerMatriz();
        const resultadoDeterminante = calcularDeterminante(matriz);
        titleResult.innerText = 'Determinante:';
        resultado.innerHTML = `${resultadoDeterminante}`;
    });

    transpuestaBtn.addEventListener('click', function () {
        const matriz = obtenerMatriz();
        const matrizTranspuesta = transponerMatriz(matriz);

        titleResult.innerText = 'Matriz Transpuesta:';
        resultado.innerHTML = '';
        resultado.style.display = 'grid';
        resultado.style.gridTemplateColumns = `repeat(${matrizTranspuesta[0].length}, 1fr)`;
        resultado.style.gridTemplateRows = `repeat(${matrizTranspuesta.length}, 1fr)`;

        // Mostrar la matriz transpuesta
        matrizTranspuesta.forEach(fila => {
            fila.forEach(valor => {
                const celdaDiv = document.createElement('div');
                celdaDiv.className = 'result-cell';
                celdaDiv.textContent = valor;
                resultado.appendChild(celdaDiv);
            });
        });
    });

    sumaBtn.addEventListener('click', function () {
        const matrizA = obtenerMatriz();
        const matrizB = obtenerMatrizB();

        if (matrizA.length !== matrizB.length || matrizA[0].length !== matrizB[0].length) {
            titleResult.innerText = 'Error:';
            resultado.innerHTML = '❌ Las matrices deben tener las mismas dimensiones.';
            return;
        }

        const matrizSuma = sumarMatrices(matrizA, matrizB);
        titleResult.innerText = 'Suma de Matrices:';
        mostrarResultadoMatriz(matrizSuma);
    });

    restaBtn.addEventListener('click', function () {
        const matrizA = obtenerMatriz();
        const matrizB = obtenerMatrizB();

        if (matrizA.length !== matrizB.length || matrizA[0].length !== matrizB[0].length) {
            titleResult.innerText = 'Error:';
            resultado.innerHTML = '❌ Las matrices deben tener las mismas dimensiones.';
            return;
        }

        const matrizResta = restarMatrices(matrizA, matrizB);
        titleResult.innerText = 'Resta de Matrices:';
        mostrarResultadoMatriz(matrizResta);
    });

    document.querySelector('.operation-btn:nth-child(3)').addEventListener('click', function () {
        const matrizA = obtenerMatriz();
        const matrizB = obtenerMatrizB();

        const resultadoMultiplicacion = multiplicarMatrices(matrizA, matrizB);

        if (typeof resultadoMultiplicacion === 'string') {
            titleResult.innerText = 'Error:';
            resultado.innerHTML = resultadoMultiplicacion;
            return;
        }

        titleResult.innerText = 'Multiplicación de Matrices:';
        mostrarResultadoMatriz(resultadoMultiplicacion);
    });

    document.getElementById('adjunta').addEventListener('click', function () {
        const matriz = obtenerMatriz();
        const adjunta = calcularAdjunta(matriz);

        if (typeof adjunta === 'string') {
            titleResult.innerText = 'Error:';
            resultado.innerHTML = adjunta;
            return;
        }

        titleResult.innerText = 'Matriz Adjunta:';
        mostrarResultadoMatriz(adjunta);
    });

    document.querySelector('.operation-btn:nth-child(7)').addEventListener('click', function () {
        const matriz = obtenerMatriz();
        const inversa = calcularInversa(matriz);

        if (typeof inversa === 'string') {
            titleResult.innerText = 'Error:';
            resultado.innerHTML = inversa;
            return;
        }

        titleResult.innerText = 'Matriz Inversa:';
        mostrarResultadoMatriz(inversa);
    });

    // Crear matrices por defecto al cargar
    crearMatriz(parseInt(rowsAInput.value), parseInt(colsAInput.value));
    crearMatrizB(parseInt(rowsBInput.value), parseInt(colsBInput.value));
});
