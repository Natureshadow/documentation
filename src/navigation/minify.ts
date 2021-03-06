import { NavigationItem, navigationTree, NavigationItemStyles } from './loader';
import { Theme } from '../themes';

/**
 * Minimalist navigation item
 */
export interface MinifiedNavigationItem {
	title: string;
	url: string;
	hidden?: boolean;
	unclickable?: boolean;
	theme?: Theme;
	styles?: NavigationItemStyles[];
	children?: MinifiedNavigationItem[];
}

/**
 * Minify navigation item, making it easy to export to bundled file
 */
function minifyNavigation(
	item: NavigationItem,
	parentTheme?: Theme
): MinifiedNavigationItem {
	const newItem: MinifiedNavigationItem = {
		title: item.title,
		url: item.url,
	};

	// Optional fields
	if (item.hidden) {
		newItem.hidden = true;
	}
	if (item.theme !== parentTheme) {
		newItem.theme = item.theme;
	}
	if (item.styles.length) {
		newItem.styles = item.styles;
	}
	if (item.unclickable) {
		newItem.unclickable = true;
	}

	// Child items
	if (item.children) {
		const children: MinifiedNavigationItem[] = [];
		item.children.forEach((child) => {
			children.push(minifyNavigation(child, item.theme));
		});
		if (children.length) {
			newItem.children = children;
		}
	}

	return newItem;
}

/**
 * Minify all navigation
 */
export const minifiedNavigation: MinifiedNavigationItem[] = [];

navigationTree.forEach((item) => {
	minifiedNavigation.push(minifyNavigation(item));
});
