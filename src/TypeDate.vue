<template>
	<div class="modal-groups">
		<div class="modal-group">
			<select v-model="choiceVal" @change="setDateRange">
				<option
					v-for="opt in opts"
					:key="opt.val"
					:value="opt.val">{{opt.label}}</option>
			</select>
			<div class="show-date" v-if="showDates">
				{{labelStart}} - {{labelEnd}}
			</div>
		</div>
		<div class="modal-group" v-if="choiceVal === 'custom'">
			<div class="date-picker-container">
				<date-picker
					:inline="true"
					v-model="rangeVal"
					:clearable="false"
					range
					@change="pickerChanged"
					:format="formatNice"
					:value-type="format"></date-picker>
			</div>
		</div>
	</div>
</template>
<script>
import moment from 'moment';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
	name: 'TypeDate',
	components: { DatePicker },
	created () {
		this.setDateRange(true);
	},
	props: {
		filterItem: Object
	},
	data () {
		return {
			opts: [
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
			],
			formatNice: 'DD MMM YYYY',
			format: 'YYYY-MM-DD',
			choiceVal: 'current-month',
			dateVal: null,
			rangeVal: []
		}
	},
	computed: {
		labelEnd () {
			return moment(this.rangeVal[1]).format(this.formatNice);
		},
		labelStart () {
			return moment(this.rangeVal[0]).format(this.formatNice);
		},
		showDates () {
			if (this.choiceVal === 'custom' && this.rangeVal[0] && this.rangeVal[1]) {
				return true;
			} else if (this.rangeVal[0] && this.rangeVal[1]) {
				return true;
			}
			
			return false;
		}
	},
	methods: {
		pickerChanged () {
			let opts = {
				dateRange: this.rangeVal,
				dateChoiceVal: this.choiceVal
			};

			this.$emit('update-filter', opts);
		},
		setDateRange (starting) {
			let vals = [];
			if (starting === true && this.filterItem && this.filterItem.dateRange) {
				vals = this.filterItem.dateRange;
				this.choiceVal = this.filterItem.dateChoiceVal;
			} else if (this.choiceVal === 'current-month') {
				vals[0] = new moment().startOf('month').format(this.format);
				vals[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'last-3-months') {
				vals[0] = new moment().startOf('month').subtract(3, 'months').format(this.format);
				vals[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'last-6-months') {
				vals[0] = new moment().startOf('month').subtract(6, 'months').format(this.format);
				vals[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'current-week') {
				vals[0] = new moment().startOf('week').format(this.format);
				vals[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'last-2-weeks') {
				vals[0] = new moment().startOf('week').subtract(2, 'weeks').format(this.format);
				vals[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'custom') {
				vals = this.rangeVal;
			}
			
			this.rangeVal = vals;
			let opts = {
				dateRange: vals,
				dateChoiceVal: this.choiceVal
			};

			this.$emit('update-filter', opts);
		}
	}
}
</script>
<style scoped>
.date-picker-container {
	text-align: center;
}
.show-date {
	margin: 10px 15px;
}
select {
	margin: 0;
}
.mx-datepicker >>> input {
	font-size: 14px;
	line-height: 1;
	padding: 2px 0 2px 10px;
	width: 100%;
	border-width: 1px;
	margin-top: 5px;
}
.mx-datepicker >>> .mx-btn-icon-double-right,
.mx-datepicker >>> .mx-btn-icon-double-left {
	display: none;
}
</style>