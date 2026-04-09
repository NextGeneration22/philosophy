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
        console.warn('Speech synthesis not supported');
        showStatus('التحدث غير مدعوم في هذا المتصفح. سيتم عرض النص مباشرة.');
        if (typeof onEnd === 'function') {
            onEnd();
        }
        return;
    }
    
    // Ensure voices are loaded (important on mobile)
    let voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            speakWithVoices(text, onEnd, voices);
        };
        // Fallback timeout
        setTimeout(() => {
            speakWithVoices(text, onEnd, voices);
        }, 1000);
    } else {
        speakWithVoices(text, onEnd, voices);
    }
}

function speakWithVoices(text, onEnd, voices) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find an Arabic voice, fallback to default
    const arabicVoice = voices.find(voice => voice.lang.startsWith('ar'));
    if (arabicVoice) {
        utterance.voice = arabicVoice;
        utterance.lang = arabicVoice.lang;
    } else {
        utterance.lang = 'ar-SA'; // fallback
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 1;
    
    let hasStarted = false;
    let timeoutId;
    
    // Set a timeout in case speech doesn't start or end
    timeoutId = setTimeout(() => {
        if (!hasStarted) {
            console.warn('Speech synthesis did not start within 3 seconds, proceeding without audio');
            showStatus('فشل في تشغيل الصوت. سيتم المتابعة بدون صوت.');
            speechSynthesis.cancel();
            if (typeof onEnd === 'function') {
                onEnd();
            }
        }
    }, 3000); // 3 second timeout
    
    utterance.onstart = () => {
        hasStarted = true;
        clearTimeout(timeoutId);
        // Set another timeout for very long texts
        timeoutId = setTimeout(() => {
            console.warn('Speech synthesis took too long, stopping');
            speechSynthesis.cancel();
            if (typeof onEnd === 'function') {
                onEnd();
            }
        }, 30000); // 30 second max
    };
    
    utterance.onend = () => {
        clearTimeout(timeoutId);
        if (typeof onEnd === 'function') {
            onEnd();
        }
    };
    
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        showStatus('خطأ في تشغيل الصوت: ' + event.error);
        clearTimeout(timeoutId);
        if (typeof onEnd === 'function') {
            onEnd();
        }
    };
    
    try {
        speechSynthesis.speak(utterance);
    } catch (error) {
        console.error('Error speaking text:', error);
        showStatus('خطأ في تشغيل الصوت.');
        clearTimeout(timeoutId);
        if (typeof onEnd === 'function') {
            onEnd();
        }
    }
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
            setTimeout(() => showStatus(''), 3000); // Clear status after 3 seconds
            flashcardButton.disabled = false;
        }, 3000);
    });
}

function attachCardInteractions() {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            // If the card is now flipped (back side visible), read its content
            if (card.classList.contains('flipped')) {
                const quote = getCardQuote(card);
                if (quote) {
                    showStatus('جاري قراءة محتوى البطاقة...');
                    speakText(quote, () => {
                        showStatus('تم الانتهاء من القراءة.');
                        setTimeout(() => showStatus(''), 2000); // Clear status after 2 seconds
                    });
                }
            }
        });
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.classList.toggle('flipped');
                // If the card is now flipped (back side visible), read its content
                if (card.classList.contains('flipped')) {
                    const quote = getCardQuote(card);
                    if (quote) {
                        showStatus('جاري قراءة محتوى البطاقة...');
                        speakText(quote, () => {
                            showStatus('تم الانتهاء من القراءة.');
                            setTimeout(() => showStatus(''), 2000); // Clear status after 2 seconds
                        });
                    }
                }
            }
        });
    });
}

attachCardInteractions();

if (flashcardButton) {
    flashcardButton.addEventListener('click', startFlashcard);
}
