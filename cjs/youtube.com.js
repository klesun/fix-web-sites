// load more comments and sort them by likes 
// (cuz one moment i realised i waste too much time looking for them)
// TODO: oh, also put non-english comments down and filter some lame comments 
// patterns, like "who watching in 2016 like!", "play it on my funeral" and rest...

var $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

var loadedTimes = 0;
var loadMore = () => loadedTimes++ < 50 &&
	$$('.load-more-button:not(.yt-uix-load-more-loading)')
		.forEach(b => b.click());

var Comment = (elmt, idx) => 1 && {
	likes: $$('.comment-renderer-like-count.on', elmt)[0].innerHTML - 1,
	elmt: elmt,
	idx: idx,
};

var sortedCount = 0;

var sort = function()
{
	var commentElmts = $$('.comment-thread-renderer');
	if (sortedCount != commentElmts.length) {
		sortedCount = commentElmts.length;
		
		var cont = $$('.comment-section-renderer-items')[0];
		
		cont.innerHTML = '';
		commentElmts
			.map((elmt, idx) => Comment(elmt, idx))
			// ORDER BY likes DESC, original idx ASC
			.sort((a,b) => b.likes - a.likes || a.idx - b.idx)
			.forEach(c => cont.appendChild(c.elmt));
		
		console.log('sorted ' + sortedCount + ' comments');
	}
};

setTimeout(() => {
	setInterval(loadMore, 500);
	setTimeout(() => sort(), 2000);
	setTimeout(() => sort(), 5000);
	setTimeout(() => sort(), 10000);
	setTimeout(() => sort(), 20000);
	setTimeout(() => sort(), 100000);
}, 2000);
