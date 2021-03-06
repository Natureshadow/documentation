window.addEventListener('DOMContentLoaded', (event) => {
	document
		.querySelectorAll('.visual-block--bundle .demo-icons')
		.forEach((container) => {
			// Hide child nodes
			const children = container.querySelectorAll('.iconify');
			children.forEach((node) => {
				node.style.display = 'none';
			});
			const count = children.length;

			function getNode(index) {
				if (index > count) {
					index -= count;
				}
				if (index < 1) {
					index += count;
				}
				return container.querySelector('.iconify:nth-child(' + index + ')');
			}

			// Show on timer
			let index = 0;
			const createTimer = () =>
				window.setInterval(() => {
					index++;
					if (index > count) {
						index -= count;
					}

					// Node to show
					let node = getNode(index);
					if (node) {
						node.classList.remove('fade');
						node.style.display = '';
					}

					// Node to fade
					node = getNode(index + 4);
					if (node) {
						node.classList.add('fade');
					}

					// Node to hide
					node = getNode(index + 1);
					if (node) {
						node.style.display = 'none';
					}
				}, 500);

			// Create timer in few seconds, toggle when window is hidden
			setTimeout(() => {
				let timer = createTimer();
				let hidden = false;
				if (typeof document.hidden === 'boolean') {
					hidden = document.hidden;
					document.addEventListener('visibilitychange', () => {
						hidden = document.hidden;
						if (hidden) {
							if (timer) {
								clearInterval(timer);
								timer = null;
							}
						} else {
							if (!timer) {
								timer = createTimer();
							}
						}
					});
				}
			}, 1500);
		});
});

window.addEventListener('DOMContentLoaded', (event) => {
	const baseClass = 'code-block-content';
	const withButtonClass = baseClass + '--with-copy';

	const buttonClass = 'code-block-copy';

	const noticeClass = 'code-block-notice';

	/**
	 * Copy to clipboard
	 */
	function copyCode(node, code) {
		const rawCode = atob(code).trim();

		const textarea = document.createElement('textarea');
		textarea.value = rawCode;
		textarea.style.height = 0;
		node.appendChild(textarea);

		textarea.focus();
		textarea.select();

		let copied = false;
		try {
			// Modern way
			if (!document.execCommand || !document.execCommand('copy')) {
				// Ancient way
				if (window.clipboardData) {
					window.clipboardData.setData('Text', rawCode);
					copied = true;
				}
			} else {
				copied = true;
			}
		} catch (err) {}

		// Remove textarea on next tick
		setTimeout(() => {
			node.removeChild(textarea);
		});

		return copied;
	}

	// Find all code nodes
	const nodes = document.querySelectorAll('.' + baseClass);
	if (!nodes || !nodes.forEach) {
		// Ignore old browsers
		return;
	}
	nodes.forEach((node) => {
		if (
			!node.classList ||
			!node.classList.contains ||
			node.classList.contains(withButtonClass) ||
			!node.hasAttribute('data-raw-code')
		) {
			// Ignore old browsers and nodes without data
			return;
		}

		// Get raw code
		const code = node.getAttribute('data-raw-code');
		if (!code.length) {
			return;
		}

		// Mark div as parsed and add button
		node.classList.add(withButtonClass);

		const buttonNode = document.createElement('a');
		buttonNode.setAttribute('href', '#');
		buttonNode.setAttribute('title', 'Copy to clipboard');
		buttonNode.addEventListener('click', (event) => {
			event.preventDefault();
			if (copyCode(node, code)) {
				// Show notice
				const noticeNode = document.createElement('div');
				noticeNode.className = noticeClass;
				noticeNode.innerHTML =
					'<span class="iconify" data-icon="line-md:confirm"></span> Copied to clipboard';
				node.appendChild(noticeNode);

				// Remove notice after delay
				setTimeout(() => {
					node.removeChild(noticeNode);
				}, 2000);
			}
		});

		buttonNode.className = buttonClass;
		buttonNode.innerHTML =
			'<span class="iconify" data-icon="line-md:clipboard-arrow"></span>';

		node.appendChild(buttonNode);
	});
});

window.addEventListener('DOMContentLoaded', (event) => {
	const noButtonClass = 'docs-navigation--no-button';
	const hasButtonClass = 'docs-navigation--has-button';
	const containerVisibleClass = 'docs-navigation--visible';

	const visibleIcon = 'line-md:menu-unfold-left';
	const hiddenIcon = 'line-md:menu-fold-right';

	const container = document.querySelector('.docs-navigation');
	const buttonsContainer = document.querySelector('.docs-navigation-button');

	// Make sure contains are there and classList is supported
	try {
		if (
			!container ||
			!buttonsContainer ||
			!container.classList.contains(noButtonClass)
		) {
			return;
		}
	} catch (err) {
		return;
	}

	// Remove unnecessary classes
	const containerClasses = container.classList;
	containerClasses.remove(noButtonClass);
	containerClasses.remove(containerVisibleClass);
	containerClasses.add(hasButtonClass);

	// Visibility status
	let visible = false;

	// Add link
	buttonsContainer.innerHTML =
		'<a href="#" title="Navigation"><span class="iconify" data-icon="' +
		visibleIcon +
		'"></span></a>';

	const linkNode = buttonsContainer.querySelector('a');

	// Create event
	linkNode.addEventListener('click', (event) => {
		event.preventDefault();
		visible = !visible;
		containerClasses.toggle(containerVisibleClass);
		linkNode.innerHTML =
			'<span class="iconify" data-icon="' +
			(visible ? hiddenIcon : visibleIcon) +
			'"></span>';
	});
});

var IconifyPreload = [
	{"prefix":"line-md","icons":{"home-twotone-alt":{"body":"<g fill=\"none\"><rect x=\"10\" y=\"13\" width=\"4\" height=\"8\" fill=\"currentColor\" fill-opacity=\"0.3\" class=\"il-md-fill il-md-duration-0 il-md-delay-7\"/><path d=\"M22 10L12 2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-4\"/><path d=\"M2 10L12 2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-4\"/><path d=\"M4.5 21.5V8\" stroke=\"currentColor\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M19.5 21.5V8\" stroke=\"currentColor\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M4.5 21.5H19.5\" stroke=\"currentColor\" stroke-linecap=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-0\"/><path d=\"M9.5 21.5V12.5H14.5V21.5\" stroke=\"currentColor\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-5\"/></g>"},"github":{"body":"<g fill=\"none\"><path d=\"M12 4C13.6683 4 14.6122 4.39991 15 4.5C15.5255 4.07463 16.9375 3 18.5 3C18.8438 4 18.7863 5.21921 18.5 6C19.25 7 19.5 8 19.5 9.5C19.5 11.6875 19.017 13.0822 18 14C16.983 14.9178 15.8887 15.3749 14.5 15.5C15.1506 16.038 15 17.3743 15 18C15 18.7256 15 21 15 21\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-40 il-md-duration-3 il-md-delay-0\"/><path d=\"M12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98301 13.0822 6 14C7.01699 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18C9 18.7256 9 21 9 21\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-40 il-md-duration-3 il-md-delay-0\"/><path d=\"M9 19C7.59375 19 6.15625 18.4375 5.3125 17.8125C4.46875 17.1875 4.21875 16.1562 3 15.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-3\"/></g>"},"document-list":{"body":"<g fill=\"none\"><path d=\"M13 3L19 9V21H5V3H13\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-0\"/><path d=\"M12.5 3V8.5H19\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-4\"/><path d=\"M9 13H13\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-6\"/><path d=\"M9 16H15\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-8\"/></g>"},"document-code":{"body":"<g fill=\"none\"><path d=\"M13 3L19 9V21H5V3H13\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-0\"/><path d=\"M12.5 3V8.5H19\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-4\"/><path d=\"M10 13L8 15L10 17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-6\"/><path d=\"M14 13L16 15L14 17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-8\"/></g>"},"image-twotone":{"body":"<g fill=\"none\"><path d=\"M7 13L3 16V19H21V14L16 10L10 15L7 13Z\" fill=\"currentColor\" fill-opacity=\"0.3\" class=\"il-md-fill il-md-duration-0 il-md-delay-9\"/><path d=\"M3 14V5H21V19H3V14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-0\"/><path d=\"M3 16L7 13L10 15L16 10L21 14\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-4\"/><circle cx=\"7.5\" cy=\"9.5\" r=\"1.5\" fill=\"currentColor\" class=\"il-md-fill il-md-delay-6\"/></g>"},"chevron-small-double-left":{"body":"<g fill=\"none\"><path d=\"M6 12L11 7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M6 12L11 17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M12 12L17 7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/><path d=\"M12 12L17 17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/></g>"},"hash-small":{"body":"<g fill=\"none\"><path d=\"M6 9H19\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/><path d=\"M5 15H18\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M10 5L8 19\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-4\"/><path d=\"M16 5L14 19\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-6\"/></g>"},"clipboard-arrow":{"body":"<g fill=\"none\"><path d=\"M12 3H19V11\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-0\"/><path d=\"M19 17V21H5V3H12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-2\"/><path d=\"M14.5 3.5V6.5H9.5V3.5\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-5\"/><path d=\"M21 14H12.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-5\"/><path d=\"M12 14L15 17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-7\"/><path d=\"M12 14L15 11\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-7\"/></g>"},"confirm":{"body":"<g fill=\"none\"><path d=\"M5 11L11 17L21 6.99999\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-4 il-md-delay-0\"/></g>"},"alert":{"body":"<g fill=\"none\"><path d=\"M12 3L21 20H3L12 3Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-0\"/><path d=\"M12 10V14\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-5\"/><circle cx=\"12\" cy=\"17\" r=\"1\" fill=\"currentColor\" class=\"il-md-fill il-md-delay-7\"/></g>"},"alert-circle":{"body":"<g fill=\"none\"><path d=\"M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-0\"/><path d=\"M12 7V13\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-5\"/><circle cx=\"12\" cy=\"17\" r=\"1\" fill=\"currentColor\" class=\"il-md-fill il-md-delay-7\"/></g>"},"construction-twotone":{"body":"<g fill=\"none\"><path d=\"M21 21H3V19C3 18 4 17 5 17H19C20 17 21 18 21 19V21Z\" fill=\"currentColor\" fill-opacity=\"0.3\" class=\"il-md-fill il-md-duration-0 il-md-delay-12\"/><path d=\"M21 21H3V19C3 18 4 17 5 17H19C20 17 21 18 21 19V21Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-0\"/><path d=\"M6 17L12 2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-4\"/><path d=\"M18 17L12 2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-4\"/><path d=\"M9.5 17L14.5 14.5\" stroke=\"currentColor\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-10\"/><path d=\"M6 16L13.5 12\" stroke=\"currentColor\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-8\"/><path d=\"M8 12L12.5 9.5\" stroke=\"currentColor\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-6\"/></g>"},"menu-unfold-left":{"body":"<g fill=\"none\"><path d=\"M14 12H5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M19 19H5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M19 5H5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M21 15L18 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/><path d=\"M21 9L18 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/></g>"},"menu-fold-left":{"body":"<g fill=\"none\"><path d=\"M19 12H10\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/><path d=\"M19 19H5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/><path d=\"M19 5H5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/><path d=\"M7 15L4 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M7 9L4 12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/></g>"},"chevron-small-left":{"body":"<g fill=\"none\"><path d=\"M9 12L14 7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-3 il-md-delay-0\"/><path d=\"M9 12L14 17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-3 il-md-delay-0\"/></g>"},"github-twotone":{"body":"<g fill=\"none\"><path d=\"M15 4.5C14.6122 4.39991 13.6683 4 12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98302 13.0822 6 14C7.01698 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18V22H15V18C15 17.3743 15.1506 16.038 14.5 15.5C15.8887 15.3749 16.983 14.9178 18 14C19.017 13.0822 19.5 11.6875 19.5 9.5C19.5 8 19.25 7 18.5 6C18.7863 5.21921 18.8438 4 18.5 3C16.9375 3 15.5255 4.07463 15 4.5Z\" fill=\"currentColor\" fill-opacity=\"0.3\" class=\"il-md-fill il-md-duration-0 il-md-delay-5\"/><path d=\"M12 4C13.6683 4 14.6122 4.39991 15 4.5C15.5255 4.07463 16.9375 3 18.5 3C18.8438 4 18.7863 5.21921 18.5 6C19.25 7 19.5 8 19.5 9.5C19.5 11.6875 19.017 13.0822 18 14C16.983 14.9178 15.8887 15.3749 14.5 15.5C15.1506 16.038 15 17.3743 15 18C15 18.7256 15 21 15 21\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-40 il-md-duration-3 il-md-delay-0\"/><path d=\"M12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98301 13.0822 6 14C7.01699 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18C9 18.7256 9 21 9 21\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-40 il-md-duration-3 il-md-delay-0\"/><path d=\"M9 19C7.59375 19 6.15625 18.4375 5.3125 17.8125C4.46875 17.1875 4.21875 16.1562 3 15.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-3\"/></g>"},"cloud-twotone":{"body":"<g fill=\"none\"><path d=\"M9 7L12 5L15 7L21 15L18 19H6L3 15L9 7Z\" fill=\"currentColor\" fill-opacity=\"0.3\" class=\"il-md-fill il-md-duration-0 il-md-delay-4\"/><path d=\"M12 19C12 19 9.5 19 7 19C4.5 19 3 17 3 15C3 13 4.5 11 7 11C8 11 8.5 11.5 8.5 11.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-0\"/><path d=\"M12 19H17C19.5 19 21 17 21 15C21 13 19.5 11 17 11C16 11 15.5 11.5 15.5 11.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-0\"/><path d=\"M17 11C17 11 17 10.5 17 10C17 7.5 15 5 12 5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M7 11V10C7 7.5 9 5 12 5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/></g>"},"cloud-down-twotone":{"body":"<g fill=\"none\"><path d=\"M9 6L12 4L15 6L21 14L17 19H7L3 14L9 6Z\" fill=\"currentColor\" fill-opacity=\"0.3\" class=\"il-md-fill il-md-duration-0 il-md-delay-8\"/><path d=\"M8 18H7C4.5 18 3 16 3 14C3 12 4.5 10 7 10C8 10 8.5 10.5 8.5 10.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-0\"/><path d=\"M16 18H17C19.5 18 21 16 21 14C21 12 19.5 10 17 10C16 10 15.5 10.5 15.5 10.5\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-0\"/><path d=\"M17 10C17 10 17 9.5 17 9C17 6.5 15 4 12 4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M7 10V9C7 6.5 9 4 12 4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-2\"/><path d=\"M12 15V21\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-4\"/><path d=\"M12 22L14 20\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-6\"/><path d=\"M12 22L10 20\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-6\"/></g>"},"computer-twotone":{"body":"<g fill=\"none\"><rect x=\"4\" y=\"6\" width=\"16\" height=\"10\" fill=\"currentColor\" fill-opacity=\"0.3\" class=\"il-md-fill il-md-duration-0 il-md-delay-6\"/><path d=\"M12 17H3V5H21V17H12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-2\"/><path d=\"M12 21H17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/><path d=\"M12 21V17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/><path d=\"M12 21H7\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-15 il-md-duration-2 il-md-delay-0\"/></g>"},"laptop-twotone":{"body":"<g fill=\"none\"><rect x=\"6\" y=\"8\" width=\"12\" height=\"8\" fill=\"currentColor\" fill-opacity=\"0.3\" class=\"il-md-fill il-md-duration-0 il-md-delay-6\"/><path d=\"M12 17H5V7H19V17H12\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"il-md-length-70 il-md-duration-4 il-md-delay-2\"/><path d=\"M3 19H21\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"il-md-length-25 il-md-duration-2 il-md-delay-0\"/></g>"}},"aliases":{"chevron-small-double-right":{"parent":"chevron-small-double-left","hFlip":true},"menu-fold-right":{"parent":"menu-fold-left","hFlip":true},"chevron-small-down":{"parent":"chevron-small-left","rotate":3},"chevron-small-right":{"parent":"chevron-small-left","hFlip":true}},"width":24,"height":24},
	{"prefix":"mdi","icons":{"alert":{"body":"<path d=\"M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2L1 21z\" fill=\"currentColor\"/>"},"home":{"body":"<path d=\"M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z\" fill=\"currentColor\"/>"}},"width":24,"height":24},
	{"prefix":"jam","icons":{"info":{"body":"<path d=\"M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2a1 1 0 0 1 0 2z\" fill=\"currentColor\"/>"}},"width":24,"height":24},
	{"prefix":"cil","icons":{"locomotive":{"body":"<path fill=\"currentColor\" d=\"M328 427.127c0-.175-.012-.347-.013-.522l14.29-.357c0 .294-.022.584-.022.879a52.873 52.873 0 1 0 105.745 0c0-1.051-.04-2.092-.1-3.127H496v-50.9l-24-64v-65.323a47.736 47.736 0 0 0-26.534-42.932L424 190.111V96H312v88h-68.468l-29.059-87.18A47.941 47.941 0 0 0 168.936 64H16v82.832l40 16v50.334l-40 16V432h86.488a52.866 52.866 0 0 0 105.449-2.393l14.372-.36A52.867 52.867 0 0 0 328 427.127zM395.127 448A20.873 20.873 0 1 1 416 427.127A20.9 20.9 0 0 1 395.127 448zm-240 0A20.873 20.873 0 1 1 176 427.127A20.9 20.9 0 0 1 155.127 448zm76.586-51l-32.607.815a52.83 52.83 0 0 0-89.34 2.185H48V250.833l40-16v-93.665l-40-16V96h120.936a15.979 15.979 0 0 1 15.179 10.94L220.468 216H344v-88h48v81.889l39.155 19.577A15.915 15.915 0 0 1 440 243.777V296H96v32h348.912L464 378.9V392h-29.4a52.78 52.78 0 0 0-80.594 1.945l-37.028.926A52.794 52.794 0 0 0 231.713 397zm43.414 51A20.873 20.873 0 1 1 296 427.127A20.9 20.9 0 0 1 275.127 448z\"/>"},"paper-plane":{"body":"<path fill=\"currentColor\" d=\"M474.444 19.857a20.336 20.336 0 0 0-21.592-2.781L33.737 213.8v38.066l176.037 70.414L322.69 496h38.074l120.3-455.4a20.342 20.342 0 0 0-6.62-20.743zM337.257 459.693L240.2 310.37l149.353-163.582l-23.631-21.576L215.4 290.069L70.257 232.012L443.7 56.72z\"/>"},"truck":{"body":"<path fill=\"currentColor\" d=\"M441.885 141.649A32.028 32.028 0 0 0 415.669 128H336V80a32.036 32.036 0 0 0-32-32H48a32.036 32.036 0 0 0-32 32v328h53.082a67.982 67.982 0 0 0 133.836 0h106.164a67.982 67.982 0 0 0 133.836 0H496V226.522a23.882 23.882 0 0 0-4.338-13.763zM47.98 80H304v176H48zM136 432a36 36 0 1 1 36-36a36.04 36.04 0 0 1-36 36zm240 0a36 36 0 1 1 36-36a36.04 36.04 0 0 1-36 36zm88-56h-23.006a68 68 0 0 0-129.988 0H200.994a68 68 0 0 0-129.988 0H48v-88h416zm0-120H336v-96h79.669L464 229.044z\"/>"}},"width":512,"height":512},
	{"prefix":"fa-regular","icons":{"id-badge":{"body":"<path d=\"M336 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm0 464H48V48h288v416zM144 112h96c8.8 0 16-7.2 16-16s-7.2-16-16-16h-96c-8.8 0-16 7.2-16 16s7.2 16 16 16zm48 176c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6c-10.8 0-18.7 8-44.8 8c-26.9 0-33.4-8-44.8-8c-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2z\" fill=\"currentColor\"/>","width":384},"handshake":{"body":"<path d=\"M519.2 127.9l-47.6-47.6A56.252 56.252 0 0 0 432 64H205.2c-14.8 0-29.1 5.9-39.6 16.3L118 127.9H0v255.7h64c17.6 0 31.8-14.2 31.9-31.7h9.1l84.6 76.4c30.9 25.1 73.8 25.7 105.6 3.8c12.5 10.8 26 15.9 41.1 15.9c18.2 0 35.3-7.4 48.8-24c22.1 8.7 48.2 2.6 64-16.8l26.2-32.3c5.6-6.9 9.1-14.8 10.9-23h57.9c.1 17.5 14.4 31.7 31.9 31.7h64V127.9H519.2zM48 351.6c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16c0 8.9-7.2 16-16 16zm390-6.9l-26.1 32.2c-2.8 3.4-7.8 4-11.3 1.2l-23.9-19.4l-30 36.5c-6 7.3-15 4.8-18 2.4l-36.8-31.5l-15.6 19.2c-13.9 17.1-39.2 19.7-55.3 6.6l-97.3-88H96V175.8h41.9l61.7-61.6c2-.8 3.7-1.5 5.7-2.3H262l-38.7 35.5c-29.4 26.9-31.1 72.3-4.4 101.3c14.8 16.2 61.2 41.2 101.5 4.4l8.2-7.5l108.2 87.8c3.4 2.8 3.9 7.9 1.2 11.3zm106-40.8h-69.2c-2.3-2.8-4.9-5.4-7.7-7.7l-102.7-83.4l12.5-11.4c6.5-6 7-16.1 1-22.6L367 167.1c-6-6.5-16.1-6.9-22.6-1l-55.2 50.6c-9.5 8.7-25.7 9.4-34.6 0c-9.3-9.9-8.5-25.1 1.2-33.9l65.6-60.1c7.4-6.8 17-10.5 27-10.5l83.7-.2c2.1 0 4.1.8 5.5 2.3l61.7 61.6H544v128zm48 47.7c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16c0 8.9-7.2 16-16 16z\" fill=\"currentColor\"/>","width":640}},"width":512,"height":512},
	{"prefix":"ion","icons":{"umbrella-sharp":{"body":"<path d=\"M128.93 280l-.26-.3c-.9-.74-1.83-1.43-2.77-2.1z\" fill=\"currentColor\"/><path d=\"M383.08 280l2.62-2.12c-.79.58-1.57 1.17-2.34 1.79z\" fill=\"currentColor\"/><path d=\"M463.14 186.44A224.55 224.55 0 0 0 272 48.57V32h-32v16.57A223.58 223.58 0 0 0 32 272v22.52l12.25-11.21a62.63 62.63 0 0 1 81.43-5.88l.22.17c.94.67 1.87 1.36 2.77 2.1q2.09 1.69 4 3.61L144 294.63l11.31-11.32a62.59 62.59 0 0 1 81.4-5.78L240 280v152a16 16 0 0 1-32 0v-16h-32v16a48 48 0 0 0 96 0V280l3.29-2.47a62.59 62.59 0 0 1 81.4 5.78L368 294.63l11.31-11.32q1.95-1.94 4.05-3.64c.77-.62 1.55-1.21 2.34-1.79l.26-.21c24.63-18.47 60-16.13 81.81 5.64l12.23 11.2V272a223.62 223.62 0 0 0-16.86-85.56z\" fill=\"currentColor\"/>"}},"width":512,"height":512},
	{"prefix":"noto","icons":{"paintbrush":{"body":"<radialGradient id=\"ssvg-id-paintbrusha\" cx=\"23.083\" cy=\"93.333\" r=\"19.364\" gradientTransform=\"matrix(1 0 0 .9999 0 .007)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#F57C00\" offset=\"0\"/><stop stop-color=\"#F47A00\" offset=\".428\"/><stop stop-color=\"#F17200\" offset=\".658\"/><stop stop-color=\"#ED6400\" offset=\".842\"/><stop stop-color=\"#E65100\" offset=\"1\"/></radialGradient><path d=\"M48.06 90.75s-5.46-8.56-9.81-6.94c-6.62 2.48-4.57 1.64-11.62 4.81c-17.66 7.93-4.81 18.13-21.78 31.46c-1.66 1.3-.72 3.98 1.38 3.91c9.42-.31 24.9-2.91 31.18-11.72c6.52-9.17 2.9-15.27 10.65-21.52z\" fill=\"url(#ssvg-id-paintbrusha)\"/><radialGradient id=\"ssvg-id-paintbrushb\" cx=\"15.255\" cy=\"105.49\" r=\"15.699\" gradientTransform=\"matrix(1 0 0 .9999 2.216 -16.194)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#D32F2F\" offset=\"0\"/><stop stop-color=\"#CF2D2D\" offset=\".388\"/><stop stop-color=\"#C42525\" offset=\".741\"/><stop stop-color=\"#B71C1C\" offset=\"1\"/></radialGradient><path d=\"M27.62 113.12c-6.68 2.49-7.46.31-7.3-8.39c.06-3.45-2.03-3.84-4.65-3.02c-1.23 5.22-1.67 11.19-10.81 18.37c-1.66 1.3-.72 3.87 1.38 3.91c12.1.25 23.43-2.65 30.19-10.5c-1-1.47-4.56-1.96-8.81-.37z\" fill=\"url(#ssvg-id-paintbrushb)\"/><path d=\"M39.4 86.6c.98 0 2.94 1.63 4.67 3.75c-3.24 3.44-4.11 6.93-4.95 10.32c-.75 3.03-1.53 6.16-4.15 9.85c-.22.31-.5.64-.81 1l-.13.15c-.16.18-.32.35-.49.52l-.04.04c-6.62 7.02-17.13 8.67-25.06 8.77c7.53-6.57 8.83-12.67 9.87-17.57c1.1-5.18 1.83-8.61 9.55-12.07c1.08-.49 1.95-.88 2.67-1.2c3.34-1.51 3.34-1.51 6.83-2.81l1.94-.72c.02-.02.05-.03.1-.03m0-3c-.39 0-.78.06-1.15.21c-6.62 2.48-4.57 1.64-11.63 4.81c-17.1 7.68-5.59 17.49-20.25 30.2c-.47.4-.96.81-1.48 1.22c-.01.01-.03.02-.04.03l-.01.01c-.61.49-.87 1.15-.83 1.79c.04 1.08.87 2.11 2.15 2.11h.08c.47.01.95.01 1.42.01c11.14 0 21.48-2.78 28.03-9.72c.24-.25.48-.5.71-.76c.01-.01.02-.02.03-.04c.35-.4.69-.8.99-1.22c6.53-9.17 2.91-15.27 10.66-21.52c-.02.02-4.57-7.13-8.68-7.13z\" fill=\"#424242\" opacity=\".2\"/><radialGradient id=\"ssvg-id-paintbrushc\" cx=\"90.5\" cy=\"3.25\" r=\"69.968\" gradientTransform=\"matrix(1 0 0 .9999 0 .007)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#2196F3\" offset=\"0\"/><stop stop-color=\"#1F8EEB\" offset=\".275\"/><stop stop-color=\"#1A79D5\" offset=\".701\"/><stop stop-color=\"#1976D2\" offset=\".754\"/><stop stop-color=\"#1976D2\" offset=\"1\"/></radialGradient><path d=\"M122.78 16.2c1.98-3.14 1.5-7.23-1.12-9.85s-6.72-3.1-9.85-1.12c-8.25 5.21-24.91 18.39-53.84 49.56l16.25 16.25c31.16-28.94 43.36-46.59 48.56-54.84z\" fill=\"url(#ssvg-id-paintbrushc)\"/><radialGradient id=\"ssvg-id-paintbrushd\" cx=\"55.25\" cy=\"59.25\" r=\"39.869\" gradientTransform=\"matrix(1 0 0 .9999 0 .007)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#BBDEFB\" offset=\"0\"/><stop stop-color=\"#64B5F6\" offset=\"1\"/></radialGradient><path d=\"M57.96 54.79c-7.65 8.24-15.38 18.41-24.58 29.4a2 2 0 0 0 .11 2.7l8.72 8.72a2 2 0 0 0 2.7.11C55.9 86.51 65.96 78.68 74.2 71.03L57.96 54.79z\" fill=\"url(#ssvg-id-paintbrushd)\"/><path d=\"M116.01 7.01c1.33 0 2.58.52 3.52 1.46c1.63 1.63 1.92 4.2.71 6.13c-9.72 15.4-25.9 33.65-48.08 54.24c-5.52 5.13-12.01 10.44-18.87 16.07c-3.1 2.55-6.31 5.17-9.61 7.93l-7.43-7.43c3.03-3.63 5.89-7.16 8.66-10.57c5.32-6.55 10.34-12.74 15.23-18.01c30.16-32.49 46.31-44.69 53.25-49.07c.8-.49 1.7-.75 2.62-.75m0-3c-1.45 0-2.91.4-4.21 1.22c-8.25 5.21-24.91 18.39-53.84 49.56c-7.65 8.24-15.38 18.41-24.58 29.4a2 2 0 0 0 .11 2.7l8.72 8.72c.39.39.9.58 1.41.58c.46 0 .92-.16 1.29-.47C55.9 86.51 65.96 78.68 74.2 71.03c31.17-28.93 43.36-46.58 48.57-54.83c1.98-3.14 1.5-7.23-1.12-9.85a7.932 7.932 0 0 0-5.64-2.34z\" fill=\"#424242\" opacity=\".2\"/>"}},"width":128,"height":128},
	{"prefix":"bx","icons":{"bx-home":{"body":"<path d=\"M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z\" fill=\"currentColor\"/>"},"bx-hourglass":{"body":"<path d=\"M15.566 11.021A7.016 7.016 0 0 0 19 5V4h1V2H4v2h1v1a7.016 7.016 0 0 0 3.434 6.021c.354.208.566.545.566.9v.158c0 .354-.212.69-.566.9A7.016 7.016 0 0 0 5 19v1H4v2h16v-2h-1v-1a7.014 7.014 0 0 0-3.433-6.02c-.355-.21-.567-.547-.567-.901v-.158c0-.355.212-.692.566-.9zm-1.015 3.681A5.008 5.008 0 0 1 17 19v1H7v-1a5.01 5.01 0 0 1 2.45-4.299c.971-.573 1.55-1.554 1.55-2.622v-.158c0-1.069-.58-2.051-1.551-2.623A5.008 5.008 0 0 1 7 5V4h10v1c0 1.76-.938 3.406-2.449 4.298C13.58 9.87 13 10.852 13 11.921v.158c0 1.068.579 2.049 1.551 2.623z\" fill=\"currentColor\"/>"}},"width":24,"height":24},
	{"prefix":"entypo","icons":{"attachment":{"body":"<path d=\"M5.602 19.8c-1.293 0-2.504-.555-3.378-1.44c-1.695-1.716-2.167-4.711.209-7.116l9.748-9.87c.988-1 2.245-1.387 3.448-1.06c1.183.32 2.151 1.301 2.468 2.498c.322 1.22-.059 2.493-1.046 3.493l-9.323 9.44c-.532.539-1.134.858-1.738.922c-.599.064-1.17-.13-1.57-.535c-.724-.736-.828-2.117.378-3.337l6.548-6.63c.269-.272.705-.272.974 0s.269.714 0 .986l-6.549 6.631c-.566.572-.618 1.119-.377 1.364c.106.106.266.155.451.134c.283-.029.606-.216.909-.521l9.323-9.439c.64-.648.885-1.41.69-2.145a2.162 2.162 0 0 0-1.493-1.513c-.726-.197-1.48.052-2.12.7l-9.748 9.87c-1.816 1.839-1.381 3.956-.209 5.143c1.173 1.187 3.262 1.629 5.079-.212l9.748-9.87a.683.683 0 0 1 .974 0a.704.704 0 0 1 0 .987L9.25 18.15c-1.149 1.162-2.436 1.65-3.648 1.65z\" fill=\"currentColor\"/>"}},"width":20,"height":20},
	{"prefix":"bi","icons":{"check2-circle":{"body":"<g fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z\"/><path fill-rule=\"evenodd\" d=\"M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0a6.5 6.5 0 1 1-3.25-5.63a.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z\"/></g>"}},"width":16,"height":16},
	{"prefix":"assets","icons":{"animation-arrow":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M191 1L2 9\" class=\"arrow-middle\"/><path d=\"M1 9l5 5.5\" class=\"arrow-sides\"/><path d=\"M1 9l4-6\" class=\"arrow-sides\"/></g>","width":192,"height":16},"bundle-bg":{"body":"<path d=\"M144 9H239V151H1V9H96\" stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>","width":240,"height":152},"logo-iconify":{"body":"<g fill=\"none\" fill-rule=\"evenodd\"><g stroke=\"#979797\" stroke-linecap=\"round\" stroke-width=\"2\"><path d=\"M8 13l-7 7M8 27l-7-7\"/><g><path d=\"M56 13l7 7M56 27l7-7\"/></g></g><g transform=\"translate(16 4)\"><circle stroke=\"#307594\" class=\"logo-stroke\" stroke-width=\"2\" cx=\"16\" cy=\"16\" r=\"15\"/><rect fill=\"#307594\" class=\"logo-fill\" x=\"9\" y=\"10\" width=\"3\" height=\"5\" rx=\"1.5\"/><rect fill=\"#307594\" x=\"20\" y=\"10\" width=\"3\" height=\"5\" rx=\"1.5\"/><path d=\"M16 26c5 0 9.545-4.505 9.024-5.5C24.5 19.5 22 23 16 23c-6 0-8-3.5-8.5-2.5S11 26 16 26z\" fill=\"#307594\" class=\"logo-fill\"/></g><g transform=\"translate(76 1)\"><rect fill=\"#E13E31\" width=\"3\" height=\"3\" rx=\"1.5\"/><path d=\"M1.5 6.5v12M18.596 7.404a6.5 6.5 0 1 0 0 9.192\" stroke=\"#E13E31\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle stroke=\"#E13E31\" stroke-width=\"3\" cx=\"30\" cy=\"12\" r=\"6.5\"/><path d=\"M53.5 18.5V11a5.5 5.5 0 0 0-11 0v7.5\" stroke=\"#E13E31\" stroke-width=\"3\" stroke-linecap=\"round\"/><g transform=\"translate(58)\"><rect fill=\"#AEAEAE\" width=\"3\" height=\"3\" rx=\"1.5\"/><path d=\"M1.5 6.5v12\" stroke=\"#AEAEAE\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g stroke=\"#AEAEAE\" stroke-linecap=\"round\" stroke-width=\"3\"><path d=\"M73.5 1.5H70c-2.5 0-4.5 2-4.5 4.5v12.5M69 10.5h2.5\"/></g><g stroke=\"#AEAEAE\" stroke-linecap=\"round\" stroke-width=\"3\"><path d=\"M78.5 21.5h4c2 0 4-2 4-4v-12\"/><path d=\"M77.5 5.5v5c0 2.5 1.5 4 4 4H83\"/></g></g><g transform=\"translate(73 24)\"><circle fill=\"#307594\" class=\"logo-fill\" cx=\"1\" cy=\"13\" r=\"1\"/><path d=\"M7 13A5 5 0 0 0 7 3H4v10h3z\" stroke=\"#307594\" class=\"logo-stroke\" stroke-width=\"2\" stroke-linejoin=\"round\"/><g stroke=\"#307594\" class=\"logo-stroke\" stroke-linecap=\"round\" stroke-width=\"2\"><path d=\"M22 13h-4c-1 0-2-1-2-2V5c0-1 1-2 2-2h4M18 8h3\"/></g><g stroke=\"#307594\" class=\"logo-stroke\" stroke-linecap=\"round\" stroke-width=\"2\"><path d=\"M31 5.5A2.5 2.5 0 1 0 28.5 8M26 10.5A2.5 2.5 0 1 0 28.5 8\"/></g><g transform=\"translate(34 2)\"><path d=\"M1 11V4\" stroke=\"#307594\" class=\"logo-stroke\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle fill=\"#307594\" class=\"logo-fill\" cx=\"1\" cy=\"1\" r=\"1\"/></g><path d=\"M48 5c-.152-.18-.29-.362-.464-.536a5 5 0 1 0 .463 6.538V9H47M52 13V3l7 10V3\" stroke=\"#307594\" class=\"logo-stroke\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g></g>","width":164,"height":40}}}
];