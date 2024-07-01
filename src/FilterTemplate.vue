<template>
	<div @click="showModal" class="filter-item">
		<div class="filter-label">Date</div>
		<div class="filter-val">{{label}}</div>
	</div>
</template>
<script>
export default {
	name: 'FilterTemplate',
	props: {
		opts: {
			type: Object,
			default () {
				return {
					val: 'current-month',
					range: []
				}
			}
		}
	},
	data () {
		return {
			chosenGroups: [],
			chosenTemplates: []
		}
	}
}
</script>