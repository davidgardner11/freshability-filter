<template>
	<div class="modal-group">
		<h4>{{title}}</h4>
		<div class="select-all-none">
			<a href="" class="select-all" @click.prevent="selectAll()">Select All</a>
			<span class="select-all-none-divider">|</span>
			<a href="" class="select-none" @click.prevent="selectNone()">Select None</a>
		</div>
		<label class="checkbox" v-for="opt in showOpts">
			<input type="checkbox" v-model="selectedVals" :value="opt[valKey]" @change="updateSelected"/> {{opt[nameKey]}}
		</label>
	</div>
</template>
<script>
export default {
	name: 'TypeGroup',
	props: {
		title: String,
		opts: Array,
		parentSelection: Array,
		parentIdKey: String,
		startItems: Array,
		valKey: {
			type: String,
			default: 'id'
		},
		parentValKey: {
			type: String,
			default: 'id'
		},
		nameKey: {
			type: String,
			default: 'name'
		},
		deepCheck: {
			type: Boolean,
			default: false
		}
	},
	created () {
		let self = this;
		if (self.startItems && self.startItems.length) {
			_.each(self.startItems, (item) => {
				self.selectedVals.push(item);
			})
		}
	},
	data () {
		return {
			selectedVals: [],
		}
	},
	watch: {
		parentSelection () {
			return this.updateFromParent();
		}
	},
	computed: {
		showOpts () {
			let self = this;
			if (!self.parentIdKey) {
				return self.opts;
			}
			
			if (!self.parentSelection.length) {
				return self.opts;
			}

			let arr = [];
			_.each(self.opts, (opt) => {
				if (self.deepCheck === true) {
					let found = false;
					_.each(self.parentSelection, (id) => {
						let obj = {};
						obj[self.parentValKey] = id;
						if (_.find(opt[self.parentIdKey], obj)) {
							found = true;
						}
					})
					
					if (found === true) {
						arr.push(opt);
					}
				} else {
					if (self.parentSelection.indexOf(opt[self.parentIdKey]) !== -1) {
						arr.push(opt);
					}
				}
			})
			
			return arr;
		}
	},
	methods: {
		changed () {
			this.$emit('change', this.selectedVals);
		},
		selectAll () {
			let self = this;
			let arr = [];
			_.each(this.showOpts, (opt) => {
				arr.push(opt[self.valKey]);
			});
			
			this.selectedVals = arr;
			this.changed();
		},
		selectNone () {
			this.selectedVals = [];
			this.changed();
		},
		updateSelected () {
			this.changed();
		},
		updateFromParent () {
			let self = this;
			if (!self.parentIdKey) {
				return;
			}

			if (!self.parentSelection.length) {
				return;
			}

			_.each(self.opts, (opt) => {
				if (self.parentSelection.indexOf(opt[self.parentIdKey]) === -1) {
					let idx = self.selectedVals.indexOf(opt.id);
					if (idx !== -1) {
						self.selectedVals.splice(idx, 1);
					}
				}
			})

			self.changed();
		}
	}
}
</script>