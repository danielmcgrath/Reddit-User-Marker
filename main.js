(function () {
	var commentsList = null,
		clonedList = null,
		markTemplate = '<a href="#" class="mark-user mark-{USER_NAME}">Mark user</a>';

	var markUser = function (e) {
		var link = e.target;
		if (link.className.indexOf('mark-user') !== -1) {
			e.preventDefault();
			var targetClass = link.className.split(' ')[1],
				otherPosts = commentsList.getElementsByClassName(targetClass),
				postLen = otherPosts.length;
			
			while (postLen--) {
				var post = otherPosts[postLen].parentNode;
				if (post.className.indexOf('already-marked') !== -1) {
					post.className = post.className.replace('already-marked', '');
				} else {
					post.className += ' already-marked';
				}
			}
		}
	};
	
	var prepareMarkLinks = function (e) {
		commentsList = document.getElementsByClassName('nestedlisting')[0];
		clonedList = commentsList.cloneNode(true);
		
		var taglines = clonedList.getElementsByClassName('tagline'),
			tagLen = taglines.length;
			
		while (tagLen--) {
			var currentPost = taglines[tagLen],
				userLink = currentPost.getElementsByClassName('author');

			if (userLink.length) {
				var userName = userLink[0].innerHTML,
					markup = markTemplate.replace('{USER_NAME}', userName);
				
				currentPost.innerHTML += ' ' + markup;
			}
		}
		
		commentsList.innerHTML = clonedList.innerHTML;
		commentsList.addEventListener('click', markUser);
	};
	
	prepareMarkLinks();
})();
