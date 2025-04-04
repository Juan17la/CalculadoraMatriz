document.addEventListener('DOMContentLoaded', function () {
    const rowsAInput = document.getElementById('rows-a');
    const colsAInput = document.getElementById('cols-a');
    const matrixA = document.querySelector('.matrix'); // Updated selector
    const titleResult = document.querySelector('.result-section .section-title'); // Updated selector
    const resultado = document.querySelector('.result-matrix'); // Updated selector
    const determinanteBtn = document.getElementById('determinante');
    const transpuestaBtn = document.getElementById('transpuesta');

    function createMatrix(rows, cols) {
        matrixA.innerHTML = '';
        matrixA.style.display = "grid";
        matrixA.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        matrixA.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        for (let i = 0; i < rows * cols; i++) {
            const cell = document.createElement('input');
            cell.type = 'number';
            cell.className = 'matrix-cell';
            matrixA.appendChild(cell);
        }
    }

    function getMatrix() {
        const matrixCells = document.querySelectorAll('.matrix-cell');
        const rows = parseInt(rowsAInput.value);
        const cols = parseInt(colsAInput.value);
        let matriz = [];

        for (let i = 0; i < rows; i++) {
            matriz[i] = [];
            for (let j = 0; j < cols; j++) {
                matriz[i][j] = parseFloat(matrixCells[i * cols + j].value) || 0;
            }
        }

        return matriz;
    }

    function transposeMatrix(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        let transposed = [];

        for (let i = 0; i < cols; i++) {
            transposed[i] = [];
            for (let j = 0; j < rows; j++) {
                transposed[i][j] = matrix[j][i];
            }
        }

        return transposed;
    }

    function determinant(matrix) {
        const n = matrix.length;

        if (matrix.some(row => row.length !== n)) {
            return '❌ La matriz no es cuadrada.';
        }

        if (n === 1) return matrix[0][0];
        if (n === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }

        let det = 0;
        for (let i = 0; i < n; i++) {
            const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
            det += ((i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix));
        }

        return det;
    }

    rowsAInput.addEventListener('change', () => {
        createMatrix(parseInt(rowsAInput.value), parseInt(colsAInput.value));
    });

    colsAInput.addEventListener('change', () => {
        createMatrix(parseInt(rowsAInput.value), parseInt(colsAInput.value));
    });

    determinanteBtn.addEventListener('click', function () {
        const matrix = getMatrix();
        const result = determinant(matrix);
        titleResult.innerText = 'Determinante:';
        resultado.innerHTML = `${result}`;
    });

    transpuestaBtn.addEventListener('click', function () {
        const matrix = getMatrix();
        const transposed = transposeMatrix(matrix);

        titleResult.innerText = 'Matriz Transpuesta:';
        resultado.innerHTML = '';
        resultado.style.display = 'grid';
        resultado.style.gridTemplateColumns = `repeat(${transposed[0].length}, 1fr)`;
        resultado.style.gridTemplateRows = `repeat(${transposed.length}, 1fr)`;

        // Mostrar la matriz transpuesta
        transposed.forEach(row => {
            row.forEach(value => {
                const cellDiv = document.createElement('div');
                cellDiv.className = 'result-cell';
                cellDiv.textContent = value;
                resultado.appendChild(cellDiv);
            });
        });
    });

    // Crear una matriz por defecto al cargar
    createMatrix(parseInt(rowsAInput.value), parseInt(colsAInput.value));
});
