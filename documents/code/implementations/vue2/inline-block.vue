<template>
	<div>
		<p>
			Block:
			<!-- 
				Adding class to first icon to trigger animations used by line-md icon set.
				SVG framework automatically adds classes based on icon prefix,
				but components do not because they handle raw icon data.
			-->
			<Icon :icon="icons.image" class="iconify--line-md" />
			<Icon :icon="icons.account" />
		</p>
		<p>
			Inline:
			<Icon :icon="icons.image" class="iconify--line-md" :inline="true" />
			<Icon :icon="icons.account" :inline="true" />
		</p>
	</div>
</template>

<script>
// npm install --save-dev @iconify/vue@1 @iconify-icons/mdi @iconify-icons/line-md
import Icon from '@iconify/vue';
import imageTwotone from '@iconify-icons/line-md/image-twotone';
import accountBoxOutline from '@iconify-icons/mdi/account-box-outline';

export default {
	components: {
		Icon,
	},
	data() {
		return {
			icons: {
				image: imageTwotone,
				account: accountBoxOutline,
			},
		};
	},
};
</script>
