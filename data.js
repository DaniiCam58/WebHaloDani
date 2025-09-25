//Configuración del juego
const GAME_CONFIG = {
    MAX_WRONG_GUESSES: 6,
    POINTS_PER_CORRECT_LETTER: 10,
    BONUS_PER_REMAINING_ATTEMPT: 20,
    BONUS_NO_HINTS: 50,
    HINT_PENALTY: 25,
    MAX_HINTS_PER_WORD: 1
};

/**
 * Categorías de palabras para el juego
 * Estructura: {
 *   'Nombre de Categoría': {
 *     icon: 'emoji',
 *     description: 'descripción de la categoría',
 *     words: ['PALABRA1', 'PALABRA2', ...],
 *     hints: ['pista para palabra1', 'pista para palabra2', ...]
 *   }
 * }
 */
const WORD_CATEGORIES = {
    'Animales': {
        icon: '🐘',
        description: 'Descubre nombres de animales del reino animal',
        words: [
            'ELEFANTE', 
            'JIRAFA', 
            'RINOCERONTE', 
            'HIPOPOTAMO', 
            'COCODRILO', 
            'MARIPOSA', 
            'DELFIN', 
            'TIBURON', 
            'AGUILA', 
            'SERPIENTE',
            'LEOPARDO',
            'CANGURO',
            'KOALA',
            'TORTUGA',
            'PINGUINO'
        ],
        hints: [
            'Mamífero grande con trompa',
            'Animal alto con cuello largo',
            'Mamífero con cuerno en la nariz',
            'Mamífero grande que vive en ríos',
            'Reptil grande que vive en agua',
            'Insecto colorido que vuela',
            'Mamífero marino inteligente',
            'Pez carnívoro del océano',
            'Ave rapaz que vuela alto',
            'Reptil sin patas que se arrastra',
            'Felino con manchas',
            'Marsupial que salta',
            'Marsupial que come eucalipto',
            'Reptil con caparazón',
            'Ave que no vuela y vive en el frío'
        ]
    },

    'Países': {
        icon: '🌍',
        description: 'Adivina países de todo el mundo',
        words: [
            'ARGENTINA', 
            'COLOMBIA', 
            'VENEZUELA', 
            'AUSTRALIA', 
            'ALEMANIA', 
            'FRANCIA', 
            'JAPON', 
            'BRASIL', 
            'CANADA', 
            'EGIPTO',
            'ITALIA',
            'ESPAÑA',
            'MEXICO',
            'PERU',
            'CHINA'
        ],
        hints: [
            'País sudamericano famoso por el tango',
            'País sudamericano del café',
            'País sudamericano con petróleo',
            'Continente y país oceánico',
            'País europeo conocido por la cerveza',
            'País europeo famoso por la torre Eiffel',
            'País asiático del sol naciente',
            'País más grande de Sudamérica',
            'País norteamericano muy frío',
            'País africano con pirámides',
            'País europeo con forma de bota',
            'País europeo donde se habla español',
            'País norteamericano con sombreros',
            'País sudamericano de los incas',
            'País asiático más poblado del mundo'
        ]
    },

    'Frutas': {
        icon: '🍎',
        description: 'Identifica deliciosas frutas naturales',
        words: [
            'MANZANA', 
            'PLATANO', 
            'NARANJA', 
            'SANDIA', 
            'PIÑA', 
            'FRESA', 
            'MANGO', 
            'PERA', 
            'UVA', 
            'KIWI',
            'PAPAYA',
            'CEREZA',
            'DURAZNO',
            'LIMON',
            'COCO'
        ],
        hints: [
            'Fruta roja o verde, símbolo de sabiduría',
            'Fruta amarilla alargada',
            'Fruta cítrica de color característico',
            'Fruta grande, verde por fuera y roja por dentro',
            'Fruta tropical con corona de hojas',
            'Fruta pequeña y roja con puntitos',
            'Fruta tropical dulce y jugosa',
            'Fruta con forma similar a una bombilla',
            'Fruta pequeña que crece en racimos',
            'Fruta peluda por fuera y verde por dentro',
            'Fruta tropical grande y naranja',
            'Fruta pequeña y roja con hueso',
            'Fruta peluda y dulce de verano',
            'Fruta cítrica muy ácida',
            'Fruta tropical con agua en su interior'
        ]
    },

    'Deportes': {
        icon: '⚽',
        description: 'Descubre diferentes disciplinas deportivas',
        words: [
            'FUTBOL', 
            'BALONCESTO', 
            'TENIS', 
            'NATACION', 
            'ATLETISMO', 
            'BOXEO', 
            'GOLF', 
            'VOLEIBOL', 
            'CICLISMO', 
            'GIMNASIA',
            'KARATE',
            'HOCKEY',
            'RUGBY',
            'BEISBOL',
            'AJEDREZ'
        ],
        hints: [
            'Deporte más popular del mundo con balón',
            'Deporte con canasta y pelota',
            'Deporte de raqueta individual',
            'Deporte acuático',
            'Deporte de pista y campo',
            'Deporte de combate con guantes',
            'Deporte con bastón y pelota pequeña',
            'Deporte con red alta',
            'Deporte con bicicleta',
            'Deporte de flexibilidad y acrobacias',
            'Arte marcial japonés',
            'Deporte con stick y disco',
            'Deporte similar al fútbol americano',
            'Deporte con bate y guante',
            'Juego de estrategia con rey y reina'
        ]
    },

    'Profesiones': {
        icon: '👨‍💼',
        description: 'Adivina diferentes trabajos y profesiones',
        words: [
            'DOCTOR',
            'MAESTRO',
            'INGENIERO',
            'BOMBERO',
            'POLICIA',
            'COCINERO',
            'PILOTO',
            'DENTISTA',
            'VETERINARIO',
            'ARQUITECTO',
            'ABOGADO',
            'ENFERMERA',
            'PROGRAMADOR',
            'ARTISTA',
            'MUSICO'
        ],
        hints: [
            'Profesional que cura enfermedades',
            'Persona que enseña en la escuela',
            'Profesional que diseña y construye',
            'Persona que apaga incendios',
            'Persona que mantiene la seguridad',
            'Persona que prepara comida',
            'Persona que vuela aviones',
            'Profesional que cuida los dientes',
            'Doctor de animales',
            'Profesional que diseña edificios',
            'Profesional del derecho',
            'Profesional que cuida pacientes',
            'Persona que crea software',
            'Persona que crea obras de arte',
            'Persona que toca instrumentos'
        ]
    },

    'Colores': {
        icon: '🌈',
        description: 'Identifica diferentes colores y tonos',
        words: [
            'ROJO',
            'AZUL',
            'VERDE',
            'AMARILLO',
            'NARANJA',
            'VIOLETA',
            'ROSA',
            'NEGRO',
            'BLANCO',
            'GRIS',
            'MARRON',
            'TURQUESA',
            'MAGENTA',
            'DORADO',
            'PLATEADO'
        ],
        hints: [
            'Color del fuego y las rosas',
            'Color del cielo y el mar',
            'Color de la naturaleza y las plantas',
            'Color del sol y los plátanos',
            'Color de las naranjas',
            'Color de las violetas',
            'Color suave y femenino',
            'Color de la noche',
            'Color de la nieve',
            'Color entre blanco y negro',
            'Color de la tierra y el chocolate',
            'Color azul verdoso del mar',
            'Color rosa intenso',
            'Color de los metales preciosos',
            'Color metálico brillante'
        ]
    }
};

/**
 * Función para obtener una palabra aleatoria de una categoría
 * @param {string} categoryName - Nombre de la categoría
 * @returns {object} Objeto con palabra, índice y pista
 */
function getRandomWord(categoryName) {
    const category = WORD_CATEGORIES[categoryName];
    
    if (!category) {
        console.error(`Categoría "${categoryName}" no encontrada`);
        return null;
    }

    const randomIndex = Math.floor(Math.random() * category.words.length);
    
    return {
        word: category.words[randomIndex],
        index: randomIndex,
        hint: category.hints[randomIndex],
        category: categoryName,
        icon: category.icon
    };
}

/**
 * Función para obtener información de una categoría
 * @param {string} categoryName - Nombre de la categoría
 * @returns {object} Información completa de la categoría
 */
function getCategoryInfo(categoryName) {
    return WORD_CATEGORIES[categoryName] || null;
}

/**
 * Función para obtener todas las categorías disponibles
 * @returns {object} Todas las categorías
 */
function getAllCategories() {
    return WORD_CATEGORIES;
}

/**
 * Función para validar si una categoría existe
 * @param {string} categoryName - Nombre de la categoría
 * @returns {boolean} True si existe, false si no
 */
function categoryExists(categoryName) {
    return categoryName in WORD_CATEGORIES;
}

// Exportar para uso en otros archivos
// (En un navegador, estas variables estarán disponibles globalmente)
window.GAME_CONFIG = GAME_CONFIG;
window.WORD_CATEGORIES = WORD_CATEGORIES;
window.getRandomWord = getRandomWord;
window.getCategoryInfo = getCategoryInfo;
window.getAllCategories = getAllCategories;
window.categoryExists = categoryExists;

