// document content loaded

document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is fully loaded and parsed');
    
    // Cargar y animar wagons en el header
    loadWagonsAnimation();
    
    // Cargar y animar frases
    loadPhrasesAnimation();
});

async function loadWagonsAnimation() {
    try {
        // Cargar el archivo JSON
        const response = await fetch('wagons.json');
        const data = await response.json();
        const wagons = data.wagons;
        
        // Obtener referencias a los elementos del header
        const headerH2 = document.querySelector('.header-container h2');
        const headerP = document.querySelector('.header-container p');
        
        if (!headerH2 || !headerP) {
            console.error('No se encontraron los elementos h2 o p en el header');
            return;
        }
        
        let currentIndex = 0;
        
        // Función para cambiar el contenido con animación
        function changeWagon() {
            const wagon = wagons[currentIndex];
            
            // Agregar clase para animación de salida
            headerH2.classList.add('fade-out');
            headerP.classList.add('fade-out');
            
            // Esperar a que termine la animación de salida
            setTimeout(() => {
                headerH2.textContent = wagon.title;
                headerP.textContent = wagon.subtitle;
                
                // Remover clase de salida y agregar de entrada
                headerH2.classList.remove('fade-out');
                headerP.classList.remove('fade-out');
                headerH2.classList.add('fade-in');
                headerP.classList.add('fade-in');
                
                // Remover clase de entrada después de la animación
                setTimeout(() => {
                    headerH2.classList.remove('fade-in');
                    headerP.classList.remove('fade-in');
                }, 500);
            }, 500);
            
            // Actualizar índice y reiniciar
            currentIndex = (currentIndex + 1) % wagons.length;
        }
        
        // Cargar el primer wagon inmediatamente
        changeWagon();
        
        // Cambiar wagon cada 5 segundos
        setInterval(changeWagon, 5000);
        
    } catch (error) {
        console.error('Error cargando wagons.json:', error);
    }
}

async function loadPhrasesAnimation() {
    try {
        // Cargar el archivo JSON
        const response = await fetch('phrases.json');
        const data = await response.json();
        const phrases = data.phrases;
        
        // Obtener referencias a los elementos de la sección de frases
        const phraseH3 = document.querySelector('.principal.ph h3');
        const phraseH4 = document.querySelector('.phrase-benjamin h4');
        const phraseP = document.querySelector('.phrase-benjamin p');
        
        if (!phraseH3 || !phraseH4 || !phraseP) {
            console.error('No se encontraron los elementos de la sección de frases');
            return;
        }
        
        let currentIndex = 0;
        
        // Función para cambiar la frase con animación
        function changePhrase() {
            const phrase = phrases[currentIndex];
            
            // Agregar clase para animación de salida
            phraseH3.classList.add('fade-out');
            phraseH4.classList.add('fade-out');
            phraseP.classList.add('fade-out');
            
            // Esperar a que termine la animación de salida
            setTimeout(() => {
                phraseH3.textContent = phrase.quote;
                phraseH4.textContent = phrase.author;
                phraseP.textContent = phrase.bio;
                
                // Remover clase de salida y agregar de entrada
                phraseH3.classList.remove('fade-out');
                phraseH4.classList.remove('fade-out');
                phraseP.classList.remove('fade-out');
                phraseH3.classList.add('fade-in');
                phraseH4.classList.add('fade-in');
                phraseP.classList.add('fade-in');
                
                // Remover clase de entrada después de la animación
                setTimeout(() => {
                    phraseH3.classList.remove('fade-in');
                    phraseH4.classList.remove('fade-in');
                    phraseP.classList.remove('fade-in');
                }, 500);
            }, 500);
            
            // Actualizar índice y reiniciar
            currentIndex = (currentIndex + 1) % phrases.length;
        }
        
        // Cargar la primera frase inmediatamente
        changePhrase();
        
        // Cambiar frase cada 6 segundos
        setInterval(changePhrase, 6000);
        
    } catch (error) {
        console.error('Error cargando phrases.json:', error);
    }
}