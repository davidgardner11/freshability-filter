<template>
	<div>
		<div>
			<select v-model="choiceVal" @change="setDateRange">
				<option
					v-for="opt in opts"
					:key="opt.val"
					:value="opt.val">{{opt.label}}</option>
			</select>
		</div>
		<div class="show-date" v-if="showDates">
			{{labelStart}} - {{labelEnd}}
		</div>
		<template v-if="choiceVal === 'custom'">
			<div class="date-picker-container">
				<date-picker
					:inline="true"
					v-model="rangeVal"
					:clearable="false"
					range
					:format="formatNice"
					:value-type="format"></date-picker>
			</div>
		</template>
	</div>
</template>
<script>
import moment from 'moment';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
	name: 'FilterDateModal',
	components: { DatePicker },
	props: {
		val: String,
		range: Array,
		opts: Array
	},
	created () {
		this.choiceVal = this.val;
		this.rangeVal = this.range;
		this.setDateRange();
	},
	data () {
		return {
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
			}
			
			return false;
		}
	},
	methods: {
		okClicked () {
				
		},
		setDateRange () {
			if (this.choiceVal === 'current-month') {
				this.rangeVal[0] = new moment().startOf('month').format(this.format);
				this.rangeVal[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'last-3-months') {
				this.rangeVal[0] = new moment().startOf('month').subtract(3, 'months').format(this.format);
				this.rangeVal[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'last-6-months') {
				this.rangeVal[0] = new moment().startOf('month').subtract(6, 'months').format(this.format);
				this.rangeVal[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'current-week') {
				this.rangeVal[0] = new moment().startOf('week').format(this.format);
				this.rangeVal[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'last-2-weeks') {
				this.rangeVal[0] = new moment().startOf('week').subtract(2, 'weeks').format(this.format);
				this.rangeVal[1] = new moment().format(this.format);
			} else if (this.choiceVal === 'custom') {
			}
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