var $$ = s => Array.from(document.querySelectorAll(s));

$$('iframe').forEach(el => el.remove());
