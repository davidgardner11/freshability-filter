<template>
	<div class="apply-filters" @click="clicked">Apply Filters</div>
</template>
<script>
export default {
	name: 'FilterApplyBtn',
	props: {
		filters: Array
	},
	methods: {
		clicked () {
			this.$emit('click', this.filters);
		}
	}
}
</script>
<style scoped>
.apply-filters {
	background: #ffc819;
	color: #fff;
	position: absolute;
	right: 0;
	top: 0;
	height: 45px;
	line-height: 45px;
	font-size: 12px;
	width: 116px;
	text-align: center;
	font-family: 'soho-light';
	font-weight: normal;
	text-transform: uppercase;
	cursor: pointer;
}
</style>