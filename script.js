const cards = document.querySelectorAll('.card');
const flashcardButton = document.getElementById('flashcard-reader');
const flashcardStatus = document.getElementById('flashcard-status');
const opositviewer = document.getElementById('opositQuot-button');
const flippedCards = new Set(); // Track flipped cards in current session
let statusHideTimer = null;

const QuoteAndOposit = [
    ["تعتمد الهوية حسب أرثر شوبنهاور على الإرادة، حيث أن الإرادة هي تلك الآلةأوالقالب التي تبني الشخص، ومنها يستمد الشخص هويته.", "ترتبط هوية الشخص بالفكر الحسي حسب جون لوك وتبقى هوية الشخص ثابتة مادامت الذاكرة تحافظ على هذا الوعي الحسي."],
    ["يرى إيمانويل كانت أن الإنسان هو غايةٌ في حد ذاته وليس وسيلةً تستخدمها أي إرادة وفق هواها، حيث أن قيمته لا تكمن بما يملك وبميولاته.","يتطرق ,جورج غوسدورف إلى الشخص الأخلاقي، حيث أنه لا يوجد إلا بالمشاركة وقبول الوجود النسبي، والتخلي نهائياً عن الاكتفاء الوهمي."],
    ["يرى باروخ سبينوزا أن الشخص خاضعٌ إلى ضروريات يتصرف وفقها وليس كائناً حراً، ويعطي مثلاً الحجر الذي يتحرك بواسطة قوة خارجية، غير أن الكيان الواعي يعتقد أن هذه مهمته وهو يفعلها بكل إرادة وحرية.","يُعرَفُ الإنسان بمشروعه، وحسب جون بول سارتر، فإن الإنسان يختار مشاريعه لتحسين وضعيته، وهو من يختار هذه الوضعية بإرادته."],
    ["جون بول سارتر يعترض اعتراضاً كلياً على أن وجود الغير له عامل إثبات وإغناء، بل إنه يرى أن الغير هو استيلابٌ كليّ لوجود الأنا وإمكانياته.","وجود الغير، حسب مارتن هايدغر، يفرض على الأنا وجوداً مشتركاً، حيث إنه يذيب الوجود الفردي في نمط وجود الغير."],
    ["حسب جون بول سارتر، الأمر الذي يجعل هناك مسافة عدم بين الأنا والغير هو هذه العلاقة بينهما، حيث عندما يكون الإنسان لوحده يتصرف عكس ما يتصرف عندما يكون مراقباً من طرف الغير.","يدافع موريس ميرلو-بونتي عن أطروحة مفادها أن معرفة الغير ممكنة عبر التواصل معه والانفتاح عليه وكسر الحواجز التي تمنعنا من معرفة بعضنا البعض وتجعلنا نرى الغير كموضوع."],
    ["يرى أليكساندر غوجيف أن العلاقة مع الغير ليست علاقة صداقة أو قائمة على مبدأ الشفقة، بل على الهيمنة، فالإنسان إما سيّد الغير أو عبده، ولا يخرج من هذه العلاقة لأجل نيل الاعتراف وفرض الهيمنة.","يرى أوغست كونت أن العلاقة مع الغير هي علاقة تكامل وغيْرية، حيث يقول إن كل شيء فينا ينتمي إلى الإنسانية، وكل شيء يعطينا الحياة والثروة والمعارف والموهبة. ولكن هذه العلاقة لا تأتي دون ثمن، بل تأتي مقابل كبح ميول الفرد الشخصية والأنانية"],
    ["باعتقاد كولد برنان، لا يمكنك أن تكون عالماً إلا إذا امتلكت عقلاً مفكراً يؤطر المعرفة العلمية نظرياً، ويداً ماهرةً تطبق ذلك عملياً. وهو يرى مراحل التجربة على النحو التالي: أولاً الملاحظة， ثانياً الفرضية， ثالثاً التجربة， وأخيراً الاستنتاج. ومثاله الشهير هو تجربة الأرانب.","بحسب روني توم، إذا أردنا أن نصف الذين كان لهم دور في بناء التجربة العلمية، فسنضع الضفادع في المقام الأول."],
    ["يرى ألبرت أينشتاين أن استخدام المنطق الرياضي يمكّننا من بناء نظريات علمية، أما التجربة فلها فقط دور إكمال النظريات التي ينتجها العقل.","الفلسفة بعتقادهانز ريشنباخ هي منطق تأسس على التفكير العقلاني، أما العلم فقد استوجب التحقّق التجريبي واكتشاف أشياء جديدة، وفي العلم استوجبت العودة إلى العقلانية."],
    ["حسب الحسن ابن الهيثم، استخدام الأسلوب النقدي مهم عند النظر إلى النظريات العلمية والتفكر حولها، وذلك في كتابه 'الشكوك على بطلميوس'.","يرى بيير تويليي أن من الصعب إخضاع النظرية للتجربة، وحتى عند إخضاع النظرية إلى التجربة، يستوجب ذلك إدخال نظريات وفَرَضيات لدعم التجربة. وهكذا يبقى الفكر له الدور الأكبر في بناء العلم."],
    ["رى بليز باسكال أن العقل والقلب لهما دور متبادل في تحديد الحقائق، بقوله: نحن نعرف الحقيقة ليس بواسطة العقل فقط، ولكن أيضاً بوساطة القلب.","حسب غاستون باشلار، يتعارض العلم والرأي، فبالنسبة له الرأي تفكير سيّئ، بل إن الرأي لا يفكر البتّة، فهو يترجم الحاجات إلى معارف ويعيّن الأشياء بحسب فائدتها."],
    ["حسب رينيه ديكارت، أن الحقيقة تقوم على الحدس والاستنباط، والحدس هو ذلك التصور الصادر عن ذهن خالص ويقظ، أما الاستنباط فهو كل ما يتم استنتاجه بالضرورة من أشياء أخرى معلومة من قبل بنوع من اليقين.","يرى باروخ سبينوزا أن من لديه فكرة صحيحة يعلم أنه لديه فكرة صحيحة، ولا يمكن أن يشك في صدق معرفته. فكون الفكرة موافقة لموضوعها يجعل الحقيقة معياراً لذاتها."],
    ["يعتقد إيمانويل كانت أن الواجب هو أمر أخلاقي مطلق، لا مجال فيه لمراعاة الميول أو المصالح. ويُعتبر قول الحقيقة واجباً أخلاقياً مطلقاً مهما كانت الدوافع والنتائج والظروف، بتعريفه للحقيقة هو ضد الكذب","يدافع وليام جيمس عن أطروحة مفادها أن الحقيقة ليست صفةً تحملها الأفكار في ذاتها، أي أن الفكرة لا تحمل قيمةً في ذاتها، بل تستمد قيمتها من تحققها في الواقع، وتُستنبط قيمتها من انعكاسها على حياة الفرد اليومية."],
    ["يرى باروخ سبينوزا أن غاية الدولة هي تحرير الأفراد من الخوف لكي يعيش كل واحدٍ في أمانٍ قدر الإمكان، وأن يحتفظ بأكبر قدرٍ من حقوقه","يرفض فريدريش هيغل التصوّرات التي تجعل للدولة غايةً خارج الدولة، فهو يرى أن الدولة أكثر من مجرد نظام حاكم، بل هي غاية في حد ذاتها. فالإجماع الذي يؤسس الدولة هو الغاية، ومصير الأفراد رهينٌ باجتماعهم."],
    ["يرى توماس هوبز،أن الحاكم يجب أن يتمتع بسلطةٍ مطلقة، ولا يحق للأفراد معاقبته. فالإنسان ذئبٌ لأخيه الإنسان، ولا يمكن أن يعيش مع بعضهم البعض إلا بسلطة حاكمٍ جبّار","يرى جون لوك أن السلطة يجب أن تكون بيد الأفراد. هم الذين يقررون من يمثلهم، ولهم القدرة على تغيير النظام الحاكم متى لمسوا إخلالاً به. فالسلطة تبدأ بيد الأفراد وتنتهي بيدهم، فهم واضعو السلطة والخاضعون لها."],
    ["حسب ماكس فيبر، العنف هو الوسيلة الوحيدة والملازمة للدولة، حيث إن الدولة لا تملك أي وسيلة أخرى غير العنف لتطبيق القانون.","ترى جاكلين روسو أن الدولة ليست جوهراً يفرض نفسها على الجميع، بقدر ما هي سيرورة تجسّد البحث الدائم نحو تحقيق المصلحة المشتركة ومعقلنة السلطة."],
    ["فحسب توماس هوبز فإن أصل الحق هو أصل طبيعي، حيث إن الإنسان في الحالة الطبيعية—أي حرب الكل ضد الكل—يدافع عن حقوقه بقوّته، أي إن قوته هي التي تمنحه مدى الحقوق التي يتمتع بها.","يرى جون جاك روسو أن الإنسان خيّر بطبعه، وهو لا يلجأ إلى القوة لضمان حقوقه إلا بعد ظهور الملكية الخاصة، التي دفعت الأفراد إلى الصراع لحماية ممتلكاتهم، مما جعلهم ينتقلون إلى وضع قوانين وضعية والعيش في مجتمعات."],
    ["يرى فريدريك فون هايك أن إقامة العدالة هو التصرّف دون اقتراف أي فعل ظالم، أي إعطاء كل شخص ما يستحق ومنح كل فرد حقوقه، وهذا لا يعني أن الحكم العادل يصدره القانون.","حسب باروخ سبينوزا، فإن إقامة الحق والعدالة تقوم باتباع القوانين المتفق عليها، فلا حق خارج قوانين الدولة ومؤسساتها."],
    ["حسب أرسطو، إن العادل هو الذي يتصرّف طبقاً لمبدأ الإنصاف وليس حسب القوانين، لأن القوانين لها وضع عام ولا تأخذ بعين الاعتبار تلك الحالات الخاصة.","يعتقد جون راولس أن العدالة تقوم على تحقيق المساواة بين الأفراد في جميع الفرص المتاحة لتطوير قدراتهم ومواهبهم، ولكن ليس بالضرورة أن تكون النتائج متساوية."]
];

// Select all <p> tags inside the back face of the cards
const philosopherQuotes = document.querySelectorAll('.card__back p');



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

function showStatus(message, duration = 3800) {
    if (!flashcardStatus) {
        return;
    }

    flashcardStatus.textContent = message;
    flashcardStatus.classList.add('visible');

    if (statusHideTimer) {
        clearTimeout(statusHideTimer);
    }

    statusHideTimer = setTimeout(() => {
        flashcardStatus.classList.remove('visible');
        statusHideTimer = null;
    }, duration);
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

/// guess the oposite function
opositviewer.addEventListener('click', () => {
    const randoCardIndex = Math.floor(Math.random() * cards.length);
    const cardo = cards[randoCardIndex];
    cardo.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const quotecards = cardo.querySelectorAll('.card__back p');
    const quotes = Array.from(quotecards).map(p => p.textContent.trim()).filter(text => text.length > 0);
    if (quotes.length === 0) {
        showStatus('لم يتم العثور على قولة في البطاقة العشوائية. حاول مرة أخرى.');
        return;
    }

    const currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    showStatus('تم اختيار القولة. استمع ثم سأعرض القولة المعارضة بعد قليل.');

    // Find opposite quote
    let oppositeQuote = null;
    for (const pair of QuoteAndOposit) {
        if (pair.includes(currentQuote)) {
            oppositeQuote = pair[0] === currentQuote ? pair[1] : pair[0];
            break;
        }
    }

    const utterance = new SpeechSynthesisUtterance(currentQuote);
    utterance.lang = 'ar';

    utterance.onend = () => {
        if (!oppositeQuote) {
            showStatus('لم يتم العثور على قولة معاكسة لهذه القولة. حاول مرة أخرى.');
            return;
        }

        showStatus('أحسنت! الآن سأعرض القولة المعارضة وأفتح البطاقة المناسبة.');
        setTimeout(() => {
            let foundOppositeCard = false;
            for (const c of cards) {
                const pTags = c.querySelectorAll('.card__back p');
                for (const p of pTags) {
                    if (p.textContent.trim() === oppositeQuote) {
                        c.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        flipCard(c);
                        foundOppositeCard = true;

                        const utteranceOpp = new SpeechSynthesisUtterance(oppositeQuote);
                        utteranceOpp.lang = 'ar';
                        utteranceOpp.onend = () => {
                            showStatus('تم عرض القولة المعارضة وفتح البطاقة المناسبة. يمكنك الضغط على الزر مرة أخرى لتجربة أخرى.');
                        };
                        speechSynthesis.speak(utteranceOpp);
                        break;
                    }
                }
                if (foundOppositeCard) {
                    break;
                }
            }
            if (!foundOppositeCard) {
                showStatus('تم العثور على القولة المعارضة ولكن لم يتم العثور على البطاقة الخاصة بها.');
            }
        }, 4000); // 4 second delay
    };

    speechSynthesis.speak(utterance);
    flipCard(cardo);
});
///

function resetAllCards() {
    // Flip all cards back to image side (front)
    cards.forEach(card => {
        if (card.classList.contains('flipped')) {
            card.classList.remove('flipped');
        }
    });
    showStatus('تم إعادة تعيين جميع البطاقات إلى الصورة الأمامية.');
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

function getPhilosopherName(card) {
    const frontText = card.querySelector('.card__front p');
    return frontText ? frontText.textContent.trim() : 'فيلسوف غير معروف';
}

function getH4Headers(card) {
    const headers = Array.from(card.querySelectorAll('.card__back h4'));
    return headers.map(h4 => h4.textContent.trim()).filter(text => text.length > 0);
}

function startQuiz() {
    const quizButton = document.getElementById('quiz-button');
    if (!quizButton) {
        return;
    }

    quizButton.disabled = true;
    showStatus('جاري تحضير الاختبار...');

    // Step 1: Flip all cards to show the text side (back)
    cards.forEach(card => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
        }
    });

    // Step 2: Choose a random card
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const philosopherName = getPhilosopherName(randomCard);
    const h4Headers = getH4Headers(randomCard);

    if (h4Headers.length === 0) {
        showStatus('عذراً، لا توجد عناوين في هذه البطاقة.');
        quizButton.disabled = false;
        return;
    }

    // Step 3: Choose a random H4 header
    const randomH4 = h4Headers[Math.floor(Math.random() * h4Headers.length)];

    // Step 4: Announce the philosopher name
    showStatus('استمع جيداً واحزر من يكون الفيلسوف...');
    speakText(`الفيلسوف: ${philosopherName}`, () => {
        // Step 5: Now read the H4 header
        setTimeout(() => {
            speakText(randomH4, () => {
                // Step 6: Wait longer for user to read and guess the quote
                showStatus('لديك وقتاً لقراءة ومحاولة التخمين...');
                setTimeout(() => {
                    // Step 7: Scroll to the card
                    randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Step 8: Wait a moment then unflip the card to reveal the philosopher's image
                    setTimeout(() => {
                        if (randomCard.classList.contains('flipped')) {
                            randomCard.classList.remove('flipped');
                        }
                        showStatus(`تم الكشف! الفيلسوف هو: ${philosopherName}`);
                        setTimeout(() => {
                            showStatus('الضغط على الزر مجدداً للاختبار التالي...');
                            quizButton.disabled = false;
                        }, 2000);
                    }, 500);
                }, 8000);
            });
        }, 500);
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
    flashcardButton.addEventListener('click', () => {
        const hasFlippedCards = Array.from(cards).some(card => card.classList.contains('flipped'));

        if (hasFlippedCards) {
            resetAllCards();
        }

        startFlashcard();
    });
}

const quizButton = document.getElementById('quiz-button');
if (quizButton) {
    quizButton.addEventListener('click', startQuiz);
}
