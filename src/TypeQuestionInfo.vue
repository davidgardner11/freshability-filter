<template>
	<div class="question-info-container">
		<a href="" class="remove-question" @click.prevent="removeQuestion">x</a>
		<h5>{{question.name}}</h5>
		<div v-if="question.opts_arr && question.opts_arr.length">
			<label v-for="opt in question.opts_arr" class="checkbox">
				<input type="checkbox" :alue="opt" v-model="question.filter.opts"  @change="updated"/> {{opt}}
			</label>
		</div>
		<div v-else-if="question.buttons && question.buttons.length">
			<label v-for="button in question.buttons" class="checkbox">
				<input type="checkbox" :value="button.value" v-model="question.filter.opts" @change="updated" /> {{button.title}}
			</label>
		</div>
		<div v-else-if="questionIsOpen">
			<input type="text" class="text" v-model="question.filter.str" @change="updated" />
		</div>
	</div>
</template>
<script>
export default {
	name: 'TypeQuestionInfo',
	props: {
		question: Object,
	},
	created () {
	},
	computed: {
		questionIsOpen () {
			if (['barcode', 'text', 'text-na', 'integer', 'integer-na', 'decimal', 'decimal-na'].indexOf(this.question.type) !== -1) {
				return true;
			}
			
			return false;
		}
	},
	methods: {
		removeQuestion () {
			this.$emit('remove-question', this.question);
		},
		updated () {
			this.$emit('change', this.question);
		}
	}
}
</script>
<style scoped>
h5 {
	font-weight: normal;
	font-size: 11px;
	margin: 0;
	padding-right: 15px;
}
.question-info-container {
	position: relative;
	margin-bottom: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid #eeefee;
}
.remove-question {
	position: absolute;
	right: 0;
	top: 0;
}
input.text {
	width: 300px;
	border-width: 1px !important;
	padding: 2px;
	font-size: 11px;
}
</style>