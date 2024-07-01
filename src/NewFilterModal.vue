<template>
<div>
	<div class="modal-tabs rel">
		<div class="modal-tab" v-if="!isEditing" :class="{selected: isSelected('filter-type')}" @click="setTab('filter-type')">Filter Type</div>
		<div class="modal-tab" :class="{selected: isSelected('options')}" v-if="chosenType" @click="setTab('options')">Options</div>
	</div>
	<div class="modal-item" v-show="isSelected('filter-type')">
		<div class="field control-group">
			<label>Choose Filter</label>
			<select v-model="chosenType" @change="changedType">
				<option :value="null"></option>
				<option v-for="type in showTypes" :value="type.val">{{type.label}}</option>
			</select>
		</div>
	</div>
	<template v-if="isSelected('options')">
		<TypeLocation
			v-if="chosenType === 'location'"
			:filter-item="filterItem"
			@update-filter="updateFilter"></TypeLocation>
		<TypeDate
			v-if="chosenType === 'date'"
			:filter-item="filterItem"
			@update-filter="updateFilter"></TypeDate>
		<TypeUser
			v-if="chosenType === 'user'"
			:filter-item="filterItem"
			@update-filter="updateFilter"></TypeUser>
		<TypeTemplate
			v-if="chosenType === 'template'"
			:filter-item="filterItem"
			@update-filter="updateFilter"></TypeTemplate>
		<TypePreform
			v-if="chosenType === 'preform'"
			:filter-item="filterItem"
			@update-filter="updateFilter"></TypePreform>
		<TypeQuestion
			v-if="chosenType === 'question'"
			:filter-item="filterItem"
			@update-filter="updateFilter"></TypeQuestion>
	</template>
</div>
</template>
<script>
import _ from 'lodash';
import TypeLocation from './TypeLocation.vue';
import TypeDate from './TypeDate.vue';
import TypeUser from './TypeUser.vue';
import TypeTemplate from './TypeTemplate.vue';
import TypePreform from './TypePreform.vue';
import TypeQuestion from './TypeQuestion.vue';
export default {
	name: 'NewFilterModal',
	components: {TypeLocation, TypeDate, TypeUser, TypeTemplate, TypePreform, TypeQuestion},
	props: {
		filterItem: Object,
		filters: Array
	},
	created () {
		if (this.filterItem && this.filterItem.type) {
			this.chosenType = this.filterItem.type;
			this.isEditing = true;
			this.currentTab = 'options';
		}
	},
	data () {
		return {
			chosenType: null,
			isEditing: false,
			currentTab: 'filter-type',
			currentFilter: {
				type: null
			},
			types: [
				{
					label: 'Date',
					val: 'date',
				},
				{
					label: 'Location',
					val: 'location',
				},
				{
					label: 'Template',
					val: 'template',
				},
				{
					label: 'User',
					val: 'user',
				},
				{
					label: 'Pre-form',
					val: 'preform',
				},
				{
					label: 'Question',
					val: 'question',
				},
			]
		}
	},
	computed: {
		showTypes () {
			let self = this;
			let arr = [];
			_.each(this.types, (type) => {
				let foundFilter = _.find(self.filters, {type: type.val});
				if (!foundFilter) {
					arr.push(type);
				}
			})
			
			return arr;
		}
	},
	methods: {
		changedType () {
			this.currentTab = 'options';
		},
		isSelected (val) {
			return this.currentTab === val;
		},
		okClicked () {
			this.currentFilter.type = this.chosenType;
			let ev = new CustomEvent('add-filter', {detail: {filterItem: this.currentFilter}});
			document.dispatchEvent(ev);
			return true;
		},
		setTab (val) {
			this.currentTab = val;
		},
		updateFilter (val) {
			for (var key in val) {
				this.currentFilter[key] = val[key];
			}
		}
	}
}
</script>
<style scoped>
.modal-item {
	margin: 10px;
}
.field > select {
	height: auto;
	padding: 5px 0;
	font-size: 11px;
	border-width: 1px;
}
.modal-tabs.rel {
	position: relative;
}
>>> .modal-groups {
	display: flex;
	padding: 10px;
	max-height: 330px;
	padding-bottom: 30px;
	overflow-y: auto;
}
>>> .modal-group {
	flex: 1;
}
</style>