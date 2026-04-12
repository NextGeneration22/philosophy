const cards = document.querySelectorAll('.card');
const opositviewer = document.getElementById('opositQuot-button');

const QuoteAndOposit = [
    ["تعتمد الهوية حسب أرثر شوبنهاور على الإرادة، حيث أن الإرادة هي تلك الآلةأوالقالب التي تبني الشخص، ومنها يستمد الشخص هويته.", "ترتبط هوية الشخص بالفكر الحسي حسب جون لوك وتبقى هوية الشخص ثابتة مادامت الذاكرة تحافظ على هذا الوعي الحسي."],
    ["يرى إيمانويل كانت أن الإنسان هو غايةٌ في حد ذاته وليس وسيلةً تستخدمها أي إرادة وفق هواها، حيث أن قيمته لا تكمن بما يملك وبميولاته.","يتطرق ,جورج غوسدورف إلى الشخص الأخلاقي، حيث أنه لا يوجد إلا بالمشاركة وقبول الوجود النسبي، والتخلي نهائياً عن الاكتفاء الوهمي."],
    ["رى باروخ سبينوزا أن الشخص خاضعٌ إلى ضروريات يتصرف وفقها وليس كائناً حراً، ويعطي مثلاً الحجر الذي يتحرك بواسطة قوة خارجية، غير أن الكيان الواعي يعتقد أن هذه مهمته وهو يفعلها بكل إرادة وحرية.","يُعرَفُ الإنسان بمشروعه، وحسب جون بول سارتر، فإن الإنسان يختار مشاريعه لتحسين وضعيته، وهو من يختار هذه الوضعية بإرادته."],
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
    ["حسب ماكس فيبر، العنف هو الوسيلة الوحيدة والملازمة للدولة، حيث إن الدولة لا تملك أي وسيلة أخرى غير العنف لتطبيق القانون.","ترى جاكلين روسو أن الدولة ليست جوهراً يفرض نفسها على الجميع، بقدر ما هي ضرورة تجسّد البحث الدائم نحو تحقيق المصلحة المشتركة ومعقلنة السلطة."],
    ["فحسب توماس هوبز فإن أصل الحق هو أصل طبيعي، حيث إن الإنسان في الحالة الطبيعية—أي حرب الكل ضد الكل—يدافع عن حقوقه بقوّته، أي إن قوته هي التي تمنحه مدى الحقوق التي يتمتع بها.","يرى جون جاك روسو أن الإنسان خيّر بطبعه، وهو لا يلجأ إلى القوة لضمان حقوقه إلا بعد ظهور الملكية الخاصة، التي دفعت الأفراد إلى الصراع لحماية ممتلكاتهم، مما جعلهم ينتقلون إلى وضع قوانين وضعية والعيش في مجتمعات."],
    ["يرى فريدريك فون هايك أن إقامة العدالة هو التصرّف دون اقتراف أي فعل ظالم، أي إعطاء كل شخص ما يستحق ومنح كل فرد حقوقه، وهذا لا يعني أن الحكم العادل يصدره القانون.","حسب باروخ سبينوزا، فإن إقامة الحق والعدالة تقوم باتباع القوانين المتفق عليها، فلا حق خارج قوانين الدولة ومؤسساتها."],
    ["حسب أرسطو، إن العادل هو الذي يتصرّف طبقاً لمبدأ الإنصاف وليس حسب القوانين، لأن القوانين لها وضع عام ولا تأخذ بعين الاعتبار تلك الحالات الخاصة.","يعتقد جون راولس أن العدالة تقوم على تحقيق المساواة بين الأفراد في جميع الفرص المتاحة لتطوير قدراتهم ومواهبهم، ولكن ليس بالضرورة أن تكون النتائج متساوية."]
];

function flipCard(card) {
    card.classList.add('flipped');
}

function unflipCard(card) {
    card.classList.remove('flipped');
}

opositviewer.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const quotecards = card.querySelectorAll('.card__back p');
    const quotes = Array.from(quotecards).map(p => p.textContent.trim());
    if (quotes.length > 0) {
        const currentQuote = quotes[Math.floor(Math.random() * quotes.length)];

        // Find opposite quote
        let oppositeQuote = null;
        for (const pair of QuoteAndOposit) {
            if (pair.includes(currentQuote)) {
                oppositeQuote = pair[0] === currentQuote ? pair[1] : pair[0];
                break;
            }
        }

        // Speak the current quote
        const utterance = new SpeechSynthesisUtterance(currentQuote);
        utterance.lang = "ar";

        // When finished speaking, wait 2 seconds then flip opposite card and speak it
        utterance.onend = () => {
            if (oppositeQuote) {
                setTimeout(() => {
                    for (const c of cards) {
                        const pTags = c.querySelectorAll('.card__back p');
                        for (const p of pTags) {
                            if (p.textContent.trim() === oppositeQuote) {
                                c.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                flipCard(c);

                                const utteranceOpp = new SpeechSynthesisUtterance(oppositeQuote);
                                utteranceOpp.lang = "ar";
                                speechSynthesis.speak(utteranceOpp);
                                break;
                            }
                        }
                    }
                }, 4000); // 2 second delay
            }
        };

        speechSynthesis.speak(utterance);
    }

    flipCard(card);
});


// function getRandomCard() {
//     if (!cards || cards.length === 0) {
//         return null;
//     }
//     return cards[Math.floor(Math.random() * cards.length)];
// }

// function getRandomQuoteFromCard(card) {
//     if (!card) {
//         return null;
//     }
//     const pTags = Array.from(card.querySelectorAll('.card__back p'))
//         .map(p => p.textContent.trim())
//         .filter(text => text.length > 0);
//     if (pTags.length === 0) {
//         return null;
//     }
//     return pTags[Math.floor(Math.random() * pTags.length)];
// }

// function resetAllCards() {
//     cards.forEach(card => {
//         if (card.classList.contains('flipped')) {
//             card.classList.remove('flipped');
//         }
//     });
// }

// function normalizeText(text) {
//     return text.replace(/\s+/g, ' ').trim();
// }

// function findOppositeQuote(quote) {
//     const normalizedQuote = normalizeText(quote);
//     for (const pair of QuoteAndOposit) {
//         const first = normalizeText(pair[0]);
//         const second = normalizeText(pair[1]);
//         if (first === normalizedQuote) {
//             return pair[1];
//         }
//         if (second === normalizedQuote) {
//             return pair[0];
//         }
//     }
//     return null;
// }

// function findCardByQuote(quote) {
//     const normalizedQuote = normalizeText(quote);
//     return Array.from(cards).find(card => {
//         return Array.from(card.querySelectorAll('.card__back p'))
//             .map(p => normalizeText(p.textContent))
//             .includes(normalizedQuote);
//     }) || null;
// }

// function speakText(text, onEnd) {
//     if (!window.speechSynthesis) {
//         if (typeof onEnd === 'function') {
//             onEnd();
//         }
//         return;
//     }
//     speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'ar';
//     utterance.rate = 0.95;
//     utterance.pitch = 1;
//     if (typeof onEnd === 'function') {
//         utterance.onend = onEnd;
//     }
//     speechSynthesis.speak(utterance);
// }

// opositviewer.addEventListener('click', () => {
//     resetAllCards();

//     const card = getRandomCard();
//     if (!card) {
//         console.log('لم يتم العثور على بطاقة عشوائية.');
//         return;
//     }

//     const quote = getRandomQuoteFromCard(card);
//     if (!quote) {
//         console.log('لم يتم العثور على اقتباس في البطاقة المختارة.');
//         return;
//     }

//     const oppositeQuote = findOppositeQuote(quote);
//     if (!oppositeQuote) {
//         console.log('لم يتم العثور على القولة المعاكسة في مصفوفة QuoteAndOposit.');
//     }

//     // Flip and read the first random card.
//     unflipCard(card);
//     flipCard(card);
//     card.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     speakText(quote, () => {
//         // Wait a bit for guessing.
//         setTimeout(() => {
//             if (!oppositeQuote) {
//                 console.log('لا توجد قولة مقابلة للعرض.');
//                 return;
//             }

//             const oppositeCard = findCardByQuote(oppositeQuote);
//             if (!oppositeCard) {
//                 console.log('لم يتم العثور على البطاقة التي تحتوي القولة المقابلة.');
//                 return;
//             }

//             oppositeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             setTimeout(() => {
//                 unflipCard(oppositeCard);
//                 flipCard(oppositeCard);
//                 speakText(oppositeQuote);
//             }, 800);
//         }, 2000);
//     });
// });