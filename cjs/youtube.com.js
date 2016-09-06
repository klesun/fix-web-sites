// load more comments and sort them by likes 
// (cuz one moment i realised i waste too much time looking for them)
// oh, also put non-english comments down and filter some lame comments 
// patterns, like "who watching in 2016 like!", "play it on my funeral" and rest...

var $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

var scheduleResort = function()
{
	var interrupted = false;

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
			var adapted = commentElmts
				.map((elmt, idx) => Comment(elmt, idx))
				// ORDER BY likes DESC, original idx ASC
				.sort((a,b) => b.likes - a.likes || a.idx - b.idx);
			adapted.forEach(c => cont.appendChild(c.elmt));
			window.scrollTo(0, 0);
			
			console.log('sorted ' + sortedCount + ' comments', adapted);
		}
	};

	setTimeout(() => !interrupted && sort(), 2000);
	setTimeout(() => !interrupted && sort(), 5000);
	setTimeout(() => !interrupted && sort(), 10000);
	setTimeout(() => !interrupted && sort(), 20000);
	setTimeout(() => !interrupted && sort(), 100000);
	
	return () => interrupted = true;
};

var loadMore = () => {
	$$('.load-more-button:not(.yt-uix-load-more-loading)')
		.forEach(b => b.click());
	$$('.comment-replies-renderer-header:not(.yt-uix-expander-collapsed) .comment-replies-renderer-expander-down')
		.forEach(el => {el.click(); window.scrollTo(0, 0);});
};

setInterval(loadMore, 500);

var interrupt = scheduleResort();
var searchQuery = window.location.search;
setInterval(
	() => {
		// youtube does not actually reload the page when you play next video
		if (searchQuery != window.location.search) {
			searchQuery = window.location.search;
			interrupt();
			interrupt = scheduleResort();
		}
	},
	500
);
