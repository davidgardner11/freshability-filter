<template>
<div class="modal-groups" v-if="isLoaded">
	<div class="modal-group">
		<div class="field control-group" v-if="templates.length">
			<label>Choose Template</label>
			<select v-model="chosenTemplateId" @change="changeTemplate">
				<option :value="null"></option>
				<option v-for="template in templates" :value="template.id">{{template.name}}</option>
			</select>
		</div>
		<div class="field control-group" v-if="chosenTemplateId && questions.length">
			<label>Choose Question</label>
			<select v-model="chosenQuestionId" @change="changeQuestion">
				<option :value="null"></option>
				<option v-for="question in showQuestions" :value="question.id">{{question.name}}</option>
			</select>
		</div>
	</div>
	<div class="modal-group">
		<div v-for="question in selectedQuestions">
			<TypeQuestionInfo :question="question" @remove-question="removeQuestion" @change="questionsChanged"></TypeQuestionInfo>
		</div>
	</div>
</div>
</template>
<script>
import _ from 'lodash';
import TypeQuestionInfo from './TypeQuestionInfo.vue';
export default {
	name: 'TypeQuestion',
	components: {TypeQuestionInfo},
	created () {
		let self = this;
		axios.get('/api/templates')
		.then((r) => {
			self.templates = _.get(r, 'data.templates');
		})
		.then(() => {
			if (self.filterItem && self.filterItem.questions && self.filterItem.questions.length) {
				self.selectedQuestions = self.filterItem.questions;
				self.updated();
			}
		})
		.then(() => {
			self.isLoaded = true;
		})
	},
	props: {
		filterItem: Object
	},
	data () {
		return {
			isLoaded: false,
			chosenQuestionId: null,
			chosenTemplateId: null,
			templates: [],
			questions: [],
			selectedQuestions: []
		};
	},
	computed: {
		showQuestions () {
			let self = this;
			let arr = [];
			_.each(self.questions, (question) => {
				let foundQuestion = _.find(self.selectedQuestions, {id: question.id})
				if (!foundQuestion) {
					arr.push(question);
				}
			})
			
			return arr;
		}
	},
	methods: {
		getQuestionById (id) {
			let question = _.find(this.questions, {id: id});
			return question;
		},
		changeQuestion () {
			let question = this.getQuestionById(this.chosenQuestionId);
			question.filter = {
				opts: [],
				str: ''
			};
			this.chosenQuestionId = null;
			this.selectedQuestions.push(question);
		},
		changeTemplate () {
			this.updateQuestions();
		},
		questionsChanged () {
			console.log('changed');
			this.updated();
		},
		removeQuestion (question) {
			let idx = _.findIndex(this.selectedQuestions, {id: question.id});
			this.selectedQuestions.splice(idx, 1);
		},
		updateQuestions () {
			let self = this;
			axios.get('/api/filter_questions', {
				params: {
					audit_template_id: self.chosenTemplateId
				}
			})
			.then(r => {
				self.questions = _.get(r, 'data.questions', []);
			})
		},
		updated () {
			let numSelected = this.selectedQuestions.length;
			let opts = {
				questions: this.selectedQuestions,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
}
</script>
<style scoped>
select {
	width: 370px;
	border-width: 1px;
	padding: 5px;
	height: auto;
	font-size: 12px;
}

</style>