<template>
	<div class="filters">
		<div class="filter-items-container">
			<div class="button" href="" @click.prevent="newFilter">
				<svg class="nicon nicon-outline"><use href="#nicon-filter" xlink:href="#nicon-filter"/></svg>
			</div>
			<FilterItem v-for="filterItem in filters" :key="filterItem.type" :filter-item="filterItem" @click="editFilter"></FilterItem>
		</div>
		<FilterApplyBtn @click="applyFilters" :filters="filters" v-if="needsToApply"></FilterApplyBtn>
		<div class="clear"></div>
		<modal
			v-if="modal.show === true"
			:title="modal.title"
			v-bind="modal.props"
			@cancelclicked="modalCancelClicked"
			@okclicked="modalClickOks"
			@deleteclicked="modalDeleteClicked">
				<div
					v-if="modal.component"
					:is="modal.component"
					v-bind="modal.componentProps"
					ref="modalComponent"></div>
		</modal>
	</div>

</template>

<script>
	import axios from 'axios';
	import Modal from './Modal.vue';
	import FilterDate from './FilterDate.vue';
	import FilterDateModal from './FilterDateModal.vue';
	import NewFilterModal from './NewFilterModal.vue';
	import FilterItem from './FilterItem.vue';
	import FilterApplyBtn from './FilterApplyBtn.vue';
	export default {
		name: 'FilterList',
		components: {Modal, FilterItem, FilterDate, FilterDateModal, NewFilterModal, FilterApplyBtn},
		created () {
			let self = this;

			if (self.authToken) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + self.authToken;
			}

			if (self.baseUrl) {
				axios.defaults.baseURL = self.baseUrl;
			}

			document.addEventListener('add-filter', (ev) => {
				self.$nextTick(() => {
					self.addFilter(ev.detail.filterItem);
				})
			})
		},
		props: {
			authToken: {
				type: String,
				default () {
					return null;
				}
			},
			baseUrl: {
				type: String,
				default () {
					return null;
				}
			}
		},
		data () {
			return {
				title: 'Title',
				needsToApply: false,
				filters: [],
				needsToSave: false,
				isSaving: false,
				widgetTabs: [{
					label: 'Tab 1',
					val: 'tab1'
				}],
				modal: {
					show: false,
					title: 'This is the title oh',
					component: 'new-item',
					props: {
					},
					componentProps: {
					}
				}
			}
		},
		methods: {
			addFilter (newFilter) {
				let idx = _.findIndex(this.filters, {type: newFilter.type});
				if (idx !== -1) {
					this.filters[idx] = newFilter;
				} else {
					this.filters.push(newFilter);
				}

				this.needsToApply = true;
				window.filterItems = this.filters;
			},
			applyFilters (filterList) {
				let ev = new CustomEvent('apply-filters', {detail: {filterList: filterList}});
				document.dispatchEvent(ev);
				this.$emit('apply-filters', {detail: {filterList: filterList}});
				this.needsToApply = false;
			},
			currentTab (name) {
				return this.selectedTab === name;
			},
			editFilter (filterItem) {
				let opts = {
					title: 'Edit Filter',
					component: 'new-filter-modal',
					props: {
						classes: {nopadding: true}
					},
					componentProps: {
						filterItem: filterItem
					}
				};

				return this.modalNew(opts);
			},
			setTab (name) {
				this.selectedTab = name;
			},
			modalClose () {
				this.modalReset();
				this.modal.show = false;
			},
			modalCancelClicked () {
				let cancelcb = _.get(this.$refs, 'modalComponent.cancelClicked');
				if (cancelcb) {
					let shouldCloseModal = cancelcb();
					if (shouldCloseModal === true) {
						this.modalClose();
					}
				} else {
					return this.modalClose();
				}
			},
			modalClickOks () {
				let okcb = _.get(this.$refs, 'modalComponent.okClicked');
				if (okcb) {
					let result = okcb();
					if (result === true) {
						return this.modalClose();
					}
				} else {
					return this.modalClose();
				}
			},
			modalDeleteClicked () {
				let deleteCb = _.get(this.$refs, 'modalComponent.deleteClicked');
				if (deleteCb) {
					let shouldCloseModal = deleteCb();
					if (shouldCloseModal === true) {
						return this.modalClose();
					}
				}
			},
			modalNew (modalOpts) {
				_.each(modalOpts, (opt, key) => {
					this.modal[key] = opt;
				})
				this.modal.componentProps.filters = this.filters;
				this.modal.show = true;
			},
			modalReset() {
				this.modal = {
					show: false,
					title: 'This is the title',
					component: 'new-item',
					props: {},
					componentProps: {}
				}
			},
			newFilter () {
				let opts = {
					title: 'New Filter',
					component: 'new-filter-modal',
					props: {
						classes: {nopadding: true}
					}
				};

				return this.modalNew(opts);
			}
		}
	}
</script>

<style scoped>
.filters {
	background: #1f7f5c;
	min-height: 45px;
	position: relative;
}
.filter-items-container {
	width: 821px;
}
.button {
	color: #fff;
	height: 45px;
	width: 45px;
	float: left;
	background: none;
	border: none;
	border-right: 1px solid #1a6b4d;
	border-bottom: 1px solid #1a6b4d;
	text-align: center;
	line-height: 45px;
	cursor: pointer;
}
.button:hover {
	background: #1a6b4d;
}
.button svg {
	height: 14px;
	width: 14px;
	color: #89b7a7;
}
>>> .modal-header {
	position: relative;
	border-bottom: none;
}
>>> .modal {
	width: 800px;
	margin-left: -400px;
}
>>> .modal.nopadding .modal-body {
	padding: 0;
}
>>> .modal-tabs {
	display: flex;
	height: 40px;
	background: #38737b;
	margin-bottom: 10px;
}
>>> .modal-tabs .modal-tab {
	flex: 1;
	display: block;
	height: 40px;
	padding: 0 10px;
	line-height: 40px;
	text-transform: uppercase;
	text-align: center;
	color: #fff;
	text-decoration: none;
	cursor: pointer;
}
>>> .modal-tabs .modal-tab.selected {
	background: #5a9aa8;
}
>>> .select-all-none {
	color: #999;
	margin-bottom: 5px;
}
>>> .select-all-none-divider {
	margin-left: 5px;
	margin-right: 5px;
}
>>> .modal-group h4 {
	text-transform: uppercase;
	font-family: 'soho-light';
	font-weight: normal;
	margin: 0;
}
</style>
