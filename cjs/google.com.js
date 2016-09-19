var $$ = s => Array.from(document.querySelectorAll(s));

var blacklist = [
    // mp3 hosts with ads... hate them!
    'junglesvibes1.net',
    'daimp3.org',

    // misc
    'w3schools.com',
    'booklistonline.com', // paying service, seriously?!
    'inpearls.ru', // disgusting ads

    // got books, but they are split into pages... hate them!
    'librebook.ru',
    'loveread.ec',
    'knijky.ru',
    'litmir.me', // "Конец ознакомительного фрагмента."
    'lifeinbooks.net/', // "Конец ознакомительного фрагмента."
    'coollib.com/', // читать бесплатно можно только на сайте
    'fantasy-worlds.org', // платно
    'e-reading.club', // конец ознакомительного просмотра
    'bookz.ru/', // "скачать" -> "купить" и конец ознакомительного просмотра
    'masterimargo.ru', // split into chapters
    'nashbulgakov.ru/', // split into chapters
    'book-online.com.ua/', // split into pages
    'bookmate.com', // malware
    'vehi.net', // split into chapters

    // anime
    'funimation.com', // "this video is not available in your territory"
    'hulu.com', // "our video library can only be watched from within the United States"
];

var shuffle = arr => arr.forEach((_,i,__,
    randIdx = Math.random() * arr.length | 0) =>
        [arr[i], arr[randIdx]] = [arr[randIdx], arr[i]]);

shuffle(blacklist);

$$('#lst-ib')[0].onkeydown = function(e)
{
    if (e.keyCode === 13) {
        var was = $$('#lst-ib')[0].value;
        $$('#lst-ib')[0].value += ' ' + blacklist.map(d => '-site:' + d).join(' ');
        setTimeout(() => $$('#lst-ib')[0].value = was, 500);
    }
};

$$('#lst-ib')[0].value = $$('#lst-ib')[0].value
    .split(' ')
    .filter($w => $w[0] !== '-')
    .join(' ');

var hideAds = function()
{
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = '#body, #footer, #lga, #tads, #tvcap, input[type="submit"] { display: none !important;  }';
    document.body.appendChild(css);
};

hideAds();
