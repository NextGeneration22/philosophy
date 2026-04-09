const cards = document.querySelectorAll('.card');
const flashcardButton = document.getElementById('flashcard-reader');
const flashcardStatus = document.getElementById('flashcard-status');

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
    const index = Math.floor(Math.random() * cards.length);
    return cards[index];
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
            showStatus('تم فتح البطاقة. تحقق من اسم الفيلسوف والمحتوى خلف البطاقة.');
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
