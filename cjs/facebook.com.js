
(function() {

/** @see https://github.com/klesun/midiana.lv/blob/master/src/utils/S.ts */
let opt = function(n,t=false){let u=()=>t||n!==null&&n!==undefined;let o;return o={map:t=>u()?opt(t(n)):opt(null),flt:t=>u()&&t(n)?opt(n):opt(null),saf:t=>{if(u()){try{return opt(t(n))}catch(n){console.error("Opt mapping threw an exception",n)}}return opt(null)},def:t=>u()?n:t,has:u,set get(t){if(u()){t(n)}},wth:t=>{if(u())t(n);return o},uni:(t,o)=>u()?t(n):o(),err:t=>{if(u()){return{set els(t){t(n)}}}else{t();return{set els(n){}}}}}};
let $$ = (s, el) => [...(el || document).querySelectorAll(s)];
let mkDom = (tagName, attrs = {}, innerHtml = '', children = []) => {
    let dom = document.createElement(tagName);
    for (let [k, v] of Object.entries(attrs)) {
        dom.setAttribute(k, v); // for "style", "class", "id" and alike
        dom[k] = v; // for "onclick" and alike
    }
    dom.innerHTML = innerHtml;
    children.forEach(c => dom.appendChild(c));
    return dom;
};

let scrollAllFlag = mkDom('input', {type: 'checkbox'});

// scroll till the end
// to filter blocked facebook ads in console - ^(?!net::ERR_BLOCKED_BY_CLIENT).*$
let intervalId = setInterval(() => {
    let $$ = (s, el) => [...(el || document).querySelectorAll(s)];
    if (scrollAllFlag.checked) {
        let reachedEnd = opt($$('.phm._64f')[0])
            .map(dom => dom.innerHTML.trim())
            .flt(txt => txt === 'End of Results')
            .def(false);
        if (reachedEnd) {
            clearInterval(intervalId);
        } else {
            window.scrollTo(0, 999999999);
        }
    }
}, 200);

// call this when you are on a group search page
let filterGroups = function () {
    let getMemberCount = function (groupBlock) {
        return opt($$('._pac', groupBlock)[0])
            .map(holder => holder.innerText)
            .map(mbrTxt => mbrTxt.match(/^([\d,\s]+)\s+/))
            .map(match => match[1].replace(/[,\s]/, ''))
            .def(0);
    };

    let isIrrelevantGroup = function (groupBlock) {
        return groupBlock.innerText.match(/школ/i)
            || groupBlock.innerText.match(/модел/i)
            || groupBlock.innerText.match(/дет/i)
            || groupBlock.innerText.match(/прод/i);
    };

    let groupListHolder = $$('._4-u2._58b7._4i6x._4-u8')[0];

    // remove шккудумфте groups from results in facebook search
    let groupBlocks = $$('._3u1._gli._5und');
    groupBlocks.forEach(g => g.remove());
    groupBlocks = groupBlocks
        .filter(g => !isIrrelevantGroup(g))
        .sort((a, b) => [a, b]
            .map(getMemberCount)
            .reduce((a, b) => b - a))
        .forEach(g => groupListHolder.appendChild(g));
};

// call this when you are on an event search page
let filterEvents = function () {
    let isIrrelevant = function (block) {
        let title = $$('a:not([href="#"])', block)
            .filter(a => $$('img', a).length === 0)
            .map(d => d.innerText)
            .join('\n');
        let descr = $$('p span', block).map(d => d.innerText).join('\n');
        let text = title + '\n' + descr;
        let hasLatvian = text.match(/\S*(ē|ī|ā|ū)\S*/i);
        let hasCyrillic = text.match(/\S*(ё|й|ц|у|к|е|н|г|ш|щ|з|х|ъ|ф|ы|в|а|п|р|о|л|д|ж|э|я|ч|с|м|и|т|ь|б|ю)\S*/i);
        return hasLatvian && !hasCyrillic
            || text.match(/дет/i) // children events
            || text.match(/школ/i)
            ;
    };

    let listHolder = $$('ul.uiList').filter(ul => !!ul.children[0].id)[0];

    let blocks = $$(':scope > li', listHolder);
    blocks
        .filter(isIrrelevant)
        .forEach(g => g.remove());
};

let navPanel = $$('[aria-label="Facebook"][role="navigation"]')[0];
navPanel.appendChild(mkDom('div', {}, '', [
    mkDom('label', {style: 'color: inherit'}, 'Scroll all:', [scrollAllFlag]),
    mkDom('button', {onclick: filterEvents}, 'Filter!'),
]));

}());
