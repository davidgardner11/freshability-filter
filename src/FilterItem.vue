<template>
	<div class="filter-item" @click="clicked">
		<div class="filter-label">{{typeLabel}}</div>
		<div class="filter-val">{{label}}</div>
	</div>
</template>
<script>
import moment from 'moment';
export default {
	name: 'FilterItem',
	props: {
		filterItem: Object
	},
	data () {
		return {
			formatNice: 'DD MMM YYYY',
		}
	},
	computed: {
		label () {
			if (this.filterItem.type === 'date') {
				let str = moment(this.filterItem.dateRange[0]).format(this.formatNice);
				str += ' - ';
				str += moment(this.filterItem.dateRange[1]).format(this.formatNice);
				return str;
			} else if (this.filterItem.num > 0) {
				return '' + this.filterItem.num + ' selected';
			}
			return '-';
		},
		typeLabel () {
			return this.filterItem.type;
		}
	},
	methods: {
		clicked () {
			this.$emit('click', this.filterItem);
		}
	}
}
</script>
<style scoped>
.filter-item {
	padding-left: 10px;
	padding-right: 10px;
	border-right: 1px solid #1a6b4d;
	border-bottom: 1px solid #1a6b4d; 
	height: 45px;
	float: left;
	cursor: pointer;
}
.filter-item:hover {
	background: #1a6b4d;
}
.filter-label {
	color: #89b7a7;
	font-siZe: 12px;
	text-transform: capitalize;
}
.filter-val {
	color: #fff;
}

</style>