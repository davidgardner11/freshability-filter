<template>
<div class="modal-groups" v-if="isLoaded">
	<div class="modal-group">
		<div class="field control-group" v-if="templates.length">
			<label>Choose Template</label>
			<select v-model="chosenTemplateId" @change="changeTemplate">
				<option :value="null"></option>
				<option v-for="template in showTemplates" :value="template.id">{{template.name}}</option>
			</select>
		</div>
		<div class="field control-group" v-if="chosenTemplateId && showPreformFields.length">
			<label>Choose Item</label>
			<select v-model="chosenPreformFieldId" @change="changePreformitem">
				<option :value="null"></option>
				<option v-for="item in showPreformFields" :value="item.id">{{item.name}}</option>
			</select>
		</div>
	</div>
	<div class="modal-group">
		<div v-for="item in chosenFields">
			<TypePreformInfo :item="item" @remove-item="removeItem" @change="updated"></TypePreformInfo>
		</div>
	</div>
</div>
</template>
<script>
import _ from 'lodash';
import TypePreformInfo from './TypePreformInfo.vue';
export default {
	name: 'TypePreform',
	components: {TypePreformInfo},
	created () {
		let self = this;
		axios.get('/api/templates')
		.then((r) => {
			self.templates = _.get(r, 'data.templates');
		})
		.then(() => {
			if (self.filterItem && self.filterItem.items && self.filterItem.items.length) {
				self.chosenFields = self.filterItem.items;
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
			chosenTemplateId: null,
			chosenPreformFieldId: null,
			templates: [],
			preformFields: [],
			chosenFields: []
		}
	},
	computed: {
		showPreformFields () {
			let self = this;
			let arr = [];
			_.each(self.preformFields, (field) => {
				let foundField = _.find(self.chosenFields, {id: field.id});
				if (!foundField) {
					arr.push(field);
				}
			})
			
			return arr;
		},
		showTemplates () {
			let arr = [];
			_.each(this.templates, (template) => {
				if (template.audit_template_pre_id) {
					arr.push(template);
				}
			})
			
			return arr;
		}
	},
	methods: {
		changePreformitem () {
			let preformField = _.find(this.preformFields, {id: this.chosenPreformFieldId});
			preformField.filter = {
				opts: [],
				str: ''
			};

			this.chosenPreformFieldId = null;
			this.chosenFields.push(preformField);
		},
		changeTemplate () {
			this.getPreformFields(this.chosenTemplateId);
		},
		getPreformFields (templateId) {
			let self = this;
			axios.get('/api/filter_preformfields', {
				params: {
					audit_template_id: templateId
				}
			})
			.then(r => {
				self.preformFields = _.get(r, 'data.preform_fields', []);
			})
		},
		removeItem (item) {
			let idx = _.findIndex(this.chosenFields, {id: item.id});
			this.chosenFields.splice(idx, 1);
		},
		updated () {
			let numSelected = this.chosenFields.length;
			let opts = {
				items: this.chosenFields,
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