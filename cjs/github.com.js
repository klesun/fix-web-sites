var $$ = s => Array.from(document.querySelectorAll(s));

var rawGitUrl = 'https://rawgit.com' + window.location.pathname.replace('/blob/master/', '/master/');
setTimeout(
    () => $$('.file-header').forEach(el => 
        el.innerHTML += '<br clear="all"/><a href="' + rawGitUrl + '">rawgit</a>'),
    500
);
