<template>
	<div @click="showModal" class="filter-item">
		<div class="filter-label">Date</div>
		<div class="filter-val">{{label}}</div>
	</div>
</template>
<script>
import _ from 'lodash';
export default {
	name: 'FilterDate',
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
			modalOpts: [
				{
					label: 'Current month',
					val: 'current-month'
				},
				{
					label: 'Last 3 months',
					val: 'last-3-months'
				},
				{
					label: 'Last 6 months',
					val: 'last-6-months'
				},
				{
					label: 'Current week',
					val: 'current-week'
				},
				{
					label: 'Last two weeks',
					val: 'last-2-weeks'
				},
				{
					label: 'Custom Range',
					val: 'custom'
				},
			]
		}
	},
	computed: {
		label () {
			let self = this;
			let label = 'Choose';
			_.each(this.modalOpts, (opt) => {
				if (opt.val === self.opts.val && opt.val !== 'custom') {
					label = opt.label;
					return false;
				} else if (opt.val === self.opts.val && opt.val === 'custom') {
					label = moment(self.opts.range[0]).format('DD MMM YYYY') + ' - ' + moment(self.opts.range[1]).format('DD MMM YYYY')
				}
			})
			
			return label;
		}
	},
	methods: {
		choiceLabel () {
			return 
		},
		showModal () {
			let self = this;
			let opts = {
				title: 'Choose date',
				component: 'filter-date-modal',
				componentProps: {
					val: self.opts.val,
					range: self.opts.range,
					opts: self.modalOpts
				}
			};
			return this.$emit('modal-new', opts);
		}
	}
}
</script>