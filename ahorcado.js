/**
 * JUEGO DEL AHORCADO - LÓGICA PRINCIPAL
 * ====================================
 */

//por que se usa class en lugar de funciones?
//Se usa una clase para encapsular toda la lógica y el estado del juego en un solo objeto. 
//Esto facilita la gestión del estado del juego, la organización del código y la reutilización de funcionalidades.
//Además, permite crear múltiples instancias del juego si es necesario en el futuro.
class HangmanGame {
    //por que se usa constructor?
    //El constructor se utiliza para inicializar las propiedades del objeto cuando se crea una nueva instancia de la clase. 
    //En este caso, establece el estado inicial del juego, como la palabra actual, las letras adivinadas, los intentos fallidos, etc.
    constructor() {
        //para que se usan estas variables?
        //Estas variables almacenan el estado actual del juego, como la palabra que se debe adivinar, la pista asociada, 
        //la categoría seleccionada, las letras que ya se han adivinado, el número de intentos fallidos, 
        //si el juego está activo o no, si se ha usado una pista y la puntuación actual.
        
        //que traduce cada variable?
        //this.currentWord: La palabra que el jugador debe adivinar.
        //this.currentHint: La pista asociada a la palabra actual.
        //this.currentCategory: La categoría seleccionada por el jugador.
        //this.guessedWord: Un array que representa las letras adivinadas hasta ahora, con '_' para letras no adivinadas.
        //this.wrongGuesses: El número de intentos fallidos del jugador.
        //this.usedLetters: Un conjunto de letras que el jugador ya ha intentado adivinar.
        //this.gameActive: Un booleano que indica si el juego está en curso.
        //this.hintUsed: Un booleano que indica si el jugador ha usado una pista.
        //this.currentScore: La puntuación actual del jugador en la partida.
        this.currentWord = '';
        this.currentHint = '';
        this.currentCategory = '';
        this.guessedWord = [];
        this.wrongGuesses = 0;
        //por que se usa new Set()?
        //Se usa un Set para almacenar las letras utilizadas porque un Set solo permite valores únicos. 
        //Esto significa que si el jugador intenta adivinar la misma letra varias veces, 
        //solo se almacenará una vez, lo que facilita el seguimiento de las letras ya intentadas.
        this.usedLetters = new Set();
        this.gameActive = false;
        this.hintUsed = false;
        this.currentScore = 0;
        
        // Elementos del DOM
        this.elements = {

            //por que se define una variable sin usar var, let o const?
            //En este caso, las propiedades del objeto this.elements se definen sin var, let o const
            //porque se están creando como propiedades del objeto this.elements, 
            //y no como variables independientes en el ámbito de la función.

            //por que esas variables se les coloca : y no = ?
            //Se usa ":" en lugar de "=" porque se está definiendo un objeto literal.

            categoryButtons: document.getElementById('categoryButtons'),
            currentCategoryIcon: document.getElementById('currentCategoryIcon'),
            currentCategoryName: document.getElementById('currentCategoryName'),
            wordDisplay: document.getElementById('wordDisplay'),
            attemptsLeft: document.getElementById('attemptsLeft'),
            totalScore: document.getElementById('totalScore'),
            categoryScore: document.getElementById('categoryScore'),
            hintButton: document.getElementById('hintButton'),
            hintDisplay: document.getElementById('hintDisplay'),
            newGameButton: document.getElementById('newGameButton'),
            resetScoreButton: document.getElementById('resetScoreButton'),
            resultModal: document.getElementById('resultModal'),
            resultTitle: document.getElementById('resultTitle'),
            resultMessage: document.getElementById('resultMenssage'),
            resultStats: document.getElementById('resultStats'),
            continueButton: document.getElementById('continueButton'),
            categoryStats: document.getElementById('categoryStats'),
            keys: document.querySelectorAll('.key')
        };

        // Partes del ahorcado
        this.hangmanParts = [

            'head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'
        ];

        this.init();

    }
    // para que se usa init?
    //El método init se utiliza para configurar el juego cuando se crea una nueva instancia de la clase. 
    //Carga los puntajes guardados, configura los event listeners para la interacción del usuario, 
    //genera los botones de categorías y actualiza la visualización inicial del juego y las estadísticas.

    init() {
        this.loadScores();
        this.setupEventListeners();
        this.generateCategoryButtons();
        this.updateDisplay();
        this.updateStats();
    }
    // para que se usa setupEventListeners?
    //El método setupEventListeners configura los event listeners para los diferentes elementos de la interfaz de usuario. 
    //Esto permite que el juego responda a las acciones del usuario, como seleccionar una categoría, adivinar una letra, 
    //pedir una pista, iniciar un nuevo juego, reiniciar puntajes y cerrar el modal de resultados.

    setupEventListeners() {
        // Botones de categorías
        this.elements.categoryButtons.addEventListener('click', (e) => {
            
            if (e.target.classList.contains('category-button')) {
                this.selectCategory(e.target.dataset.category);
            }
        });

        // Teclado virtual

        this.elements.keys.forEach(key => {
            key.addEventListener('click', () => {
                console.log(key.dataset.letter);

                this.guessLetter(key.dataset.letter);
            });
        });


        // Botones de control
        this.elements.hintButton.addEventListener('click', () => this.showHint());
        this.elements.newGameButton.addEventListener('click', () => this.startNewGame());
        this.elements.resetScoreButton.addEventListener('click', () => this.resetAllScores());
        this.elements.continueButton.addEventListener('click', () => this.closeModal());

        // Cerrar modal al hacer clic fuera
        this.elements.resultModal.addEventListener('click', (e) => {
            //que significa e.target === this.elements.resultModal
            //e.target se refiere al elemento específico en el que se hizo clic dentro del modal. 
            //this.elements.resultModal es el contenedor del modal completo. 
            //Entonces, esta condición verifica si el clic ocurrió directamente en el fondo del modal (fuera del contenido del modal).
            if (e.target === this.elements.resultModal) {
                this.closeModal();
            }
        });
    }
    //El método generateCategoryButtons crea dinámicamente los botones para cada categoría disponible en el juego. 
    //Cada botón muestra el ícono y el nombre de la categoría, y se agrega al contenedor de botones de categorías en la interfaz de usuario.
    generateCategoryButtons() {
        const categories = getAllCategories();
        this.elements.categoryButtons.innerHTML = '';

        Object.keys(categories).forEach(categoryName => {
            const category = categories[categoryName];
            const button = document.createElement('button');
            button.className = 'category-button';
            button.dataset.category = categoryName;
            button.innerHTML = `${category.icon} ${categoryName}`;
            this.elements.categoryButtons.appendChild(button);
        });
    }
    //El método selectCategory se llama cuando el jugador selecciona una categoría. 
    //Actualiza la categoría actual, inicia una nueva partida y actualiza el botón seleccionado en la interfaz de usuario.
    selectCategory(categoryName) {
        // Actualizar botón seleccionado
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-category="${categoryName}"]`).classList.add('selected');

        this.currentCategory = categoryName;
        this.startNewGame();
    }
    //El método startNewGame inicia una nueva partida del juego. 
    //Selecciona una palabra aleatoria de la categoría actual, reinicia el estado del juego (letras adivinadas, intentos fallidos, etc.), 
    //y actualiza la interfaz de usuario para reflejar el nuevo estado del juego.

    startNewGame() {
        if (!this.currentCategory) {
            alert('Por favor selecciona una categoría primero');
            return;
        }

        const wordData = getRandomWord(this.currentCategory);
        if (!wordData) {
            return;
        }

        this.currentWord = wordData.word;
        this.currentHint = wordData.hint;
        this.guessedWord = Array(this.currentWord.length).fill('_');
        this.wrongGuesses = 0;
        this.usedLetters.clear();
        this.gameActive = true;
        this.hintUsed = false;
        this.currentScore = 0;

        this.updateDisplay();
        this.resetKeyboard();
        this.resetHangman();
        this.elements.hintDisplay.classList.remove('show');
        this.elements.hintButton.disabled = false;
    }

    guessLetter(letter) {
        if (!this.gameActive || this.usedLetters.has(letter)) {
            return;
        }

        this.usedLetters.add(letter);
        const keyElement = document.querySelector(`[data-letter="${letter}"]`);

        if (this.currentWord.includes(letter)) {
            // Letra correcta
            keyElement.classList.add('correct');
            
            // Actualizar palabra mostrada
            for (let i = 0; i < this.currentWord.length; i++) {
                if (this.currentWord[i] === letter) {
                    this.guessedWord[i] = letter;
                    this.currentScore += GAME_CONFIG.POINTS_PER_CORRECT_LETTER;
                }
            }

            // Verificar si ganó
            if (!this.guessedWord.includes('_')) {
                this.winGame();
            }
        } else {
            // Letra incorrecta
            keyElement.classList.add('incorrect');
            this.wrongGuesses++;
            this.drawHangmanPart();

            // Verificar si perdió
            if (this.wrongGuesses >= GAME_CONFIG.MAX_WRONG_GUESSES) {
                this.loseGame();
            }
        }

        this.updateDisplay();
    }
    //El método showHint muestra la pista asociada a la palabra actual si el jugador no ha usado una pista previamente. 
    //Deshabilita el botón de pista, resta puntos por usar la pista y actualiza la interfaz de usuario para reflejar estos cambios.

    showHint() {
        if (this.hintUsed || !this.gameActive) return;

        this.hintUsed = true;
        this.currentScore = Math.max(0, this.currentScore - GAME_CONFIG.HINT_PENALTY);
        this.elements.hintDisplay.textContent = `💡 ${this.currentHint}`;
        this.elements.hintDisplay.classList.add('show');
        this.elements.hintButton.disabled = true;
        this.updateDisplay();
    }

    //El método drawHangmanPart muestra una parte del ahorcado en la interfaz de usuario cada vez que el jugador comete un error. 
    //Utiliza el número de intentos fallidos para determinar qué parte del ahorcado mostrar.

    drawHangmanPart() {
        if (this.wrongGuesses <= this.hangmanParts.length) {
            const part = document.getElementById(this.hangmanParts[this.wrongGuesses - 1]);
            if (part) {
                part.style.display = 'block';
            }
        }
    }
//El método resetHangman oculta todas las partes del ahorcado en la interfaz de usuario,
//reiniciando la visualización del ahorcado para una nueva partida.
    resetHangman() {
        this.hangmanParts.forEach(partId => {
            const part = document.getElementById(partId);
            if (part) {
                part.style.display = 'none';
            }
        });
    }
    //El método resetKeyboard restablece el estado del teclado virtual en la interfaz de usuario,
    //habilitando todas las teclas y eliminando las clases que indican letras correctas o incorrectas.

    resetKeyboard() {
        this.elements.keys.forEach(key => {
            key.classList.remove('correct', 'incorrect');
            key.disabled = false;
        });
    }
    //El método winGame se llama cuando el jugador adivina correctamente la palabra.
    //Calcula la puntuación final, actualiza los puntajes guardados, muestra un modal con el resultado y las estadísticas de la partida,
    //y actualiza la interfaz de usuario para reflejar que el jugador ha ganado.

    winGame() {
        this.gameActive = false;
        
        // Calcular puntuación final
        const remainingAttempts = GAME_CONFIG.MAX_WRONG_GUESSES - this.wrongGuesses;
        const attemptsBonus = remainingAttempts * GAME_CONFIG.BONUS_PER_REMAINING_ATTEMPT;
        const noHintBonus = this.hintUsed ? 0 : GAME_CONFIG.BONUS_NO_HINTS;
        
        this.currentScore += attemptsBonus + noHintBonus;

        // Actualizar puntajes
        this.updateScore(this.currentCategory, this.currentScore);
        
        // Mostrar resultado
        this.showResult(
            '🎉 ¡Felicitaciones!',
            '¡Has adivinado la palabra correctamente!',
            {
                'Palabra': this.currentWord,
                'Puntos por letras': (this.currentWord.length * GAME_CONFIG.POINTS_PER_CORRECT_LETTER),
                'Bonus por intentos restantes': attemptsBonus,
                'Bonus sin pistas': noHintBonus,
                'Pista usada': this.hintUsed ? '❌ (-25 pts)' : '✅ (+50 pts)',
                'Total obtenido': this.currentScore
            }
        );

        this.elements.wordDisplay.classList.add('win');
    }

    loseGame() {
        this.gameActive = false;
        
        // Mostrar palabra completa
        this.guessedWord = Array.from(this.currentWord);
        
        this.showResult(
            '😔 ¡Qué lástima!',
            'No has logrado adivinar la palabra',
            {
                'La palabra era': this.currentWord,
                'Pista': this.currentHint,
                'Intentos fallidos': this.wrongGuesses,
                'Puntos obtenidos': this.currentScore
            }
        );

        this.elements.wordDisplay.classList.add('lose');
        
        // Actualizar estadísticas (aunque sea 0 puntos)
        this.updateScore(this.currentCategory, this.currentScore);
    }

    showResult(title, message, stats) {
        this.elements.resultTitle.textContent = title;
        this.elements.resultMessage.textContent = message;
        
        // Mostrar estadísticas
        let statsHtml = '';
        Object.keys(stats).forEach(key => {
            statsHtml += `<div class="stat-item"><span>${key}:</span><span>${stats[key]}</span></div>`;
        });
        this.elements.resultStats.innerHTML = statsHtml;
        
        this.elements.resultModal.classList.add('show');
    }

    closeModal() {
        this.elements.resultModal.classList.remove('show');
        this.elements.wordDisplay.classList.remove('win', 'lose');
    }
    //El método updateScore actualiza los puntajes guardados en el almacenamiento local para una categoría específica.
    //Calcula las estadísticas de la categoría (puntos totales, partidas jugadas, partidas ganadas, promedio por partida),
    //guarda los puntajes actualizados y actualiza la visualización de puntajes y estadísticas en la interfaz de usuario.

    updateScore(category, points) {
        let scores = this.getScores();
        
        if (!scores[category]) {
            scores[category] = {
                totalPoints: 0,
                gamesPlayed: 0,
                gamesWon: 0,
                averageScore: 0
            };
        }

        scores[category].totalPoints += points;
        scores[category].gamesPlayed++;
        if (points > 0) {
            scores[category].gamesWon++;
        }
        scores[category].averageScore = Math.round(scores[category].totalPoints / scores[category].gamesPlayed);

        this.saveScores(scores);
        this.updateDisplay();
        this.updateStats();
    }

    getTotalScore() {
        const scores = this.getScores();
        return Object.values(scores).reduce((total, category) => total + category.totalPoints, 0);
    }

    getCategoryScore() {
        const scores = this.getScores();
        return scores[this.currentCategory]?.totalPoints || 0;
    }

    getScores() {
        const saved = localStorage.getItem('hangmanScores');
        return saved ? JSON.parse(saved) : {};
    }

    saveScores(scores) {
        localStorage.setItem('hangmanScores', JSON.stringify(scores));
    }

    loadScores() {
        // Los puntajes se cargan automáticamente cuando se necesitan
    }

    resetAllScores() {
        if (confirm('¿Estás seguro de que quieres reiniciar todos los puntajes?')) {
            localStorage.removeItem('hangmanScores');
            this.updateDisplay();
            this.updateStats();
        }
    }

    updateDisplay() {
        // Actualizar categoría actual
        if (this.currentCategory) {
            const category = getCategoryInfo(this.currentCategory);
            this.elements.currentCategoryIcon.textContent = category.icon;
            this.elements.currentCategoryName.textContent = this.currentCategory;
        }

        // Actualizar palabra mostrada
        this.elements.wordDisplay.textContent = this.guessedWord.join(' ');

        // Actualizar intentos restantes
        this.elements.attemptsLeft.textContent = GAME_CONFIG.MAX_WRONG_GUESSES - this.wrongGuesses;

        // Actualizar puntajes
        this.elements.totalScore.textContent = this.getTotalScore().toLocaleString();
        this.elements.categoryScore.textContent = this.getCategoryScore().toLocaleString();
    }

    //El método updateStats actualiza la visualización de las estadísticas de todas las categorías en la interfaz de usuario.
    //Recorre todas las categorías, obtiene sus estadísticas guardadas y genera el HTML para mostrar estas estadísticas en la sección correspondiente.
    updateStats() {
        const scores = this.getScores();
        const categories = getAllCategories();
        let statsHtml = '';

        Object.keys(categories).forEach(categoryName => {
            const category = categories[categoryName];
            const stats = scores[categoryName] || {
                totalPoints: 0,
                gamesPlayed: 0,
                gamesWon: 0,
                averageScore: 0
            };

            const winRate = stats.gamesPlayed > 0 ? 
                Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

            statsHtml += `
                <div class="stat-card">
                    <div class="stat-header">
                        <span>${category.icon}</span>
                        <span>${categoryName}</span>
                    </div>
                    <div class="stat-item">
                        <span>Puntos totales:</span>
                        <span>${stats.totalPoints.toLocaleString()}</span>
                    </div>
                    <div class="stat-item">
                        <span>Partidas jugadas:</span>
                        <span>${stats.gamesPlayed}</span>
                    </div>
                    <div class="stat-item">
                        <span>Partidas ganadas:</span>
                        <span>${stats.gamesWon}</span>
                    </div>
                    <div class="stat-item">
                        <span>Tasa de victoria:</span>
                        <span>${winRate}%</span>
                    </div>
                    <div class="stat-item">
                        <span>Promedio por partida:</span>
                        <span>${stats.averageScore}</span>
                    </div>
                </div>
            `;
        });

        this.elements.categoryStats.innerHTML = statsHtml;
    }
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que los datos del juego estén disponibles
    if (typeof GAME_CONFIG === 'undefined' || typeof WORD_CATEGORIES === 'undefined') {
        alert('Error: No se pudo cargar el archivo data.js. Asegúrate de que esté en la misma carpeta.');
        return;
    }

    // Crear instancia del juego
    window.hangmanGame = new HangmanGame();
});

// Función de utilidad para debug
function getGameState() {
    if (window.hangmanGame) {
        return {
            currentWord: window.hangmanGame.currentWord,
            currentCategory: window.hangmanGame.currentCategory,
            wrongGuesses: window.hangmanGame.wrongGuesses,
            currentScore: window.hangmanGame.currentScore,
            gameActive: window.hangmanGame.gameActive
        };
    }
    return null;
}
