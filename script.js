// changes text of a node, not HTML of child elements
const changeText = (el, cb) => [...el.childNodes]
	.filter(node => node.nodeType === 3)
	.forEach(node => node.textContent = cb(node.textContent, node))

// highlightjs
document.querySelectorAll(
	'.source.swish, .query.swish, .verbatim, .highlight'
).forEach(el => {
	el.className += ' prolog';
	hljs.highlightBlock(el);

})

// fix broken link
document.querySelectorAll('a[href="index.php"]')
	.forEach(a => a.href = 'http://lpn.swi-prolog.org');

// remove weird inner spacing
'.verb, .cmti-10, .cmmi-10, .cmtt-10'.split(', ') // .content a
.forEach(selector =>
	// doing it this way because some replacements are nested and elements have
	// to be re-queried
	document.querySelectorAll(selector).forEach(el =>
		changeText(el, (text, node) => text
			.replace(/^[ \n\t]+/ig, '')
			.replace(/[ \n\t]+$/ig, '')
		)
	)
)

// replace text everywhere
document.querySelectorAll(
	'.content p, .content li, .content span'
).forEach(el =>
	changeText(el, text => text
		.replace(/’/g, '\'') // actual (valid in prolog) single quotes
		.replace(/‘/g, '\'') // actual (valid in prolog) single quotes
	)
);

// replace html everywhere
document.querySelectorAll(
	'.content p, .content li, .content span'
).forEach(el => {
	if (el.innerText.match(/(prolog)/ig)) {
		el.innerHTML = el.innerHTML
		.replace(
			/((SWI Prolog)|(SICStus Prolog)|(prolog))/ig,
			'\<span class="rainbow">$1</span>'
		)
	}
});

// [...document.querySelectorAll('')]
// 	.filter(el => el.innerHTML === "&nbsp;")
// 	.forEach(el => el.className+= ' nbspComment')

// remove unecessary nbsp
document.querySelectorAll('.cmtt-1, .cmti-10').forEach(el =>
	changeText(el, text => text.replace(/[\u202F\u00A0]/g, ''))
);

// replace in body text
document.querySelectorAll('.content p, .content li').forEach(el =>
	changeText(el, text => text
		.replace(/'[ \n\t]+$/g, '\'')
		.replace(/^[ \n\t]'+/g, '\'')
		.replace(/[ \n\t]+,/g, ',')
		.replace(/[ \n\t]+\./g, '.') // this is probably dangerous (or not cause in p)
		.replace(/'[ \n\t]+</g, '\'\<')
		.replace(/[\u202F\u00A0](\s)/g, '$1') // nbsp
		.replace(/(\s)[\u202F\u00A0]/g, '$1') // nbsp
		.replace(/^[ \n\t]+([\.;,'\!\?)\]])/g, '$1')
		.replace(/^[ \n\t]+s([ \n\t\.;,'\!\?)\]])/g, 's$1')
		// "List of as" http://lpn.swi-prolog.org/lpnpage.php?pagetype=html&pageid=lpn-htmlse15
		.replace(/([(\[])[ \n\t]+$/g, '$1')
	)
);

// replace in queries
document.querySelectorAll('.content>.query').forEach(el =>
	changeText(el, text => text
		.replace(/^\n+/g, '')
	)
);

// replace in queries
document.querySelectorAll('.query').forEach(el =>
	changeText(el, text => text
		.replace(/\n{3,}/g, '\n\n')
	)
);


// redirect to interactive version

if (location.href.includes("learnprolognow.org")) {
	let redirect;
	if (!localStorage._lpnEnhancedAlwaysRedirect) {
		// Dear Matt.hias: Don't ever use confirm() again. As stated in the super great mdn docs: It's
		// considered bad UI/UX. This time I will be merciful. -Thank you. Sincerely, Marc
		redirect =
			confirm('LPN Enhanced: Redirect to interactive version?');

		if (confirm('LPN Enhanced: Don\'t ask again? (You can also ' +
				'just click the extension icon to get to the ' +
				'interactive version)'))
			localStorage._lpnEnhancedAlwaysRedirect = redirect;
		}

	if (redirect || localStorage._lpnEnhancedAlwaysRedirect === "true")
		location.href = location.href
		.replace('//www.', '//')
		.replace('learnprolognow.org', 'lpn.swi-prolog.org')
}

document.body.className += ' _lpnEnhancedDoneFormatting'

console.log('Learn Prolog Now has been *enhanced*');
