var $$ = s => Array.from(document.querySelectorAll(s));

var addLinkToRawgit = function()
{
    var rawGitUrl = 'https://rawgit.com' + window.location.pathname.replace('/blob/master/', '/master/');
    setTimeout(
        () => $$('.file-header').forEach(el => 
            el.innerHTML += '<br clear="all"/><a href="' + rawGitUrl + '">rawgit</a>'),
        500
    );
};

addLinkToRawgit();
var pathname = window.location.pathname;
setInterval(
	() => {
		// youtube does not actually reload the page when you play next video
		if (pathname != window.location.pathname) {
			pathname = window.location.pathname;
			addLinkToRawgit();
		}
	},
	500
);

