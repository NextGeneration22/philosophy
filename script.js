const cards = document.querySelectorAll('.card');
const flashcardButton = document.getElementById('flashcard-reader');
const flashcardStatus = document.getElementById('flashcard-status');
const flippedCards = new Set(); // Track flipped cards in current session

function extractQuoteText(paragraph) {
    let quote = '';
    paragraph.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            quote += node.textContent;
        }
    });
    return quote.trim();
}

function getCardQuote(card) {
    const paragraphs = Array.from(card.querySelectorAll('.card__back p'));
    const quotes = paragraphs
        .map(paragraph => extractQuoteText(paragraph))
        .filter(text => text.length > 0);
    if (quotes.length === 0) {
        return '';
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function speakText(text, onEnd) {
    if (!window.speechSynthesis) {
        if (typeof onEnd === 'function') {
            onEnd();
        }
        return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;
    utterance.pitch = 1;
    if (typeof onEnd === 'function') {
        utterance.onend = onEnd;
    }
    speechSynthesis.speak(utterance);
}

function showStatus(message) {
    if (flashcardStatus) {
        flashcardStatus.textContent = message;
    }
}

function chooseRandomCard() {
    // Get cards that haven't been flipped yet
    const availableCards = Array.from(cards).filter(card => !flippedCards.has(card));
    
    // If all cards have been flipped, reset and start over
    if (availableCards.length === 0) {
        flippedCards.clear();
        return cards[Math.floor(Math.random() * cards.length)];
    }
    
    // Choose a random card from available ones
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIndex];
}

function flipCard(card) {
    card.classList.add('flipped');
}

function unflipCard(card) {
    card.classList.remove('flipped');
}

function startFlashcard() {
    if (!flashcardButton) {
        return;
    }

    flashcardButton.disabled = true;
    const card = chooseRandomCard();
    unflipCard(card);

    const quote = getCardQuote(card) || 'لا توجد اقتباسة لعرضها في هذه البطاقة.';
    showStatus('استمع إلى الاقتباس وحاول تخمين الفيلسوف...');

    speakText(quote, () => {
        showStatus('سأنتقل الآن إلى البطاقة المحددة ثم سأفتحها بعد ثوانٍ قليلة.');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
            flipCard(card);
            // Track this card as flipped
            flippedCards.add(card);
            
            // Check if all cards have been flipped
            if (flippedCards.size === cards.length) {
                showStatus('تم الانتهاء من جميع البطاقات! سيتم البدء من جديد.');
            } else {
                // Show progress
                showStatus(`تم فتح البطاقة. (${flippedCards.size}/${cards.length})`);
            }
            flashcardButton.disabled = false;
        }, 3000);
    });
}

function attachCardInteractions() {
    cards.forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
}

attachCardInteractions();

if (flashcardButton) {
    flashcardButton.addEventListener('click', startFlashcard);
}
