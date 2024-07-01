<template>
	<div class="modal-groups" v-if="isLoaded">
		<div class="modal-group">
			<TypeGroup :title="'Tag'" :opts="tags" :start-items="selectedTags" :val-key="'name'" @change="setTags" :parent-selection="[]"></TypeGroup>
		</div>
		<div class="modal-group">
			<TypeGroup :title="'Template'" :opts="templates" :start-items="selectedTemplates" :val-key="'group'" :parent-val-key="'name'" :parent-selection="selectedTags" :parent-id-key="'tags'" @change="setTemplates" :deep-check="true"></TypeGroup>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import TypeGroup from './TypeGroup.vue';
export default {
	name: 'TypeTemplate',
	components: {TypeGroup},
	created () {
		let self = this;
		axios.get('/api/templates')
			.then((r) => {
				self.templates = _.get(r, 'data.templates');
				self.tags = _.get(r, 'data.tags');
			})
			.then(() => {
				let needsToUpdate = false;
				if (self.filterItem && self.filterItem.tags) {
					needsToUpdate = true;
					self.selectedTags = self.filterItem.tags;
				}
				if (self.filterItem && self.filterItem.templates) {
					needsToUpdate = true;
					self.selectedTemplates = self.filterItem.templates;
				}
				
				if (needsToUpdate === true) {
					self.updated();
				}
			})
			.then(() => {
				self.isLoaded = true;
			});
	},
	props: {
		filterItem: Object
	},
	data () {
		return {
			isLoaded: false,
			tags: [],
			templates: [],
			selectedTemplates: [],
			selectedTags: []
		}
	},
	methods: {
		setTags (ev) {
			this.selectedTags = ev;
			this.updated();
		},
		setTemplates (ev) {
			this.selectedTemplates = ev;
			this.updated();
		},
		updated () {
			let numSelected = this.selectedTemplates.length + this.selectedTags.length;
			let opts = {
				templates: this.selectedTemplates,
				tags: this.selectedTags,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
}
</script>