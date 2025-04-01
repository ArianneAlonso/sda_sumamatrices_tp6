from flask import Flask, request, jsonify, render_template
import os

app = Flask(__name__, template_folder='frontend')

#ruta
@app.route('/')
def index():
    return render_template('main.html')

#ruta
@app.route('/sumarmatrices', methods=['POST'])
def sumar_matrices():
    try:
        data = request.get_json()
        filas = data['filas']
        columnas = data['columnas']
        matriz1 = data['matriz1']
        matriz2 = data['matriz2']

        if not isinstance(matriz1, list) or not isinstance(matriz2, list):
            return jsonify({'error': 'Las matrices deben ser arreglos'}), 400

        if len(matriz1) != filas or len(matriz2) != filas:
            return jsonify({'error': 'Las matrices no tienen el número de filas correcto'}), 400

        if len(matriz1[0]) != columnas or len(matriz2[0]) != columnas:
            return jsonify({'error': 'Las matrices no tienen el número de columnas correcto'}), 400

        #suma
        resultado = [
            [matriz1[i][j] + matriz2[i][j] for j in range(columnas)]
            for i in range(filas)
        ]

        return jsonify({'resultado': resultado})

    except Exception as e:
        print(e)
        return jsonify({'error': 'Ocurrió un error en el servidor'}), 500

#servidor
if __name__ == '__main__':
    app.run(debug=True, port=3000)
