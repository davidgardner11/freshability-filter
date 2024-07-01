<template>
	<div class="modal-groups" v-if="isLoaded === true">
		<div class="modal-group">
			<TypeGroup :title="'Region'" :opts="regions" :start-items="selectedRegions" @change="setRegions" :parent-selection="[]"></TypeGroup>
		</div>
		<div class="modal-group">
			<TypeGroup :title="'Location'" :opts="locations" :start-items="selectedLocations" :parent-selection="selectedRegions" :parent-id-key="'region_id'" @change="setLocations"></TypeGroup>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import TypeGroup from './TypeGroup.vue';
export default {
	name: 'TypeLocation',
	components: {TypeGroup},
	created () {
		let self = this;
		axios.get('/api/location?v2=1&regions=1')
			.then((r) => {
				self.locations = _.get(r, 'data.locations');
				self.regions = _.get(r, 'data.regions');
			})
			.then(() => {
				let needsToUpdate = false;
				if (self.filterItem && self.filterItem.locations) {
					needsToUpdate = true;
					self.selectedLocations = self.filterItem.locations;
				}
				if (self.filterItem && self.filterItem.regions) {
					needsToUpdate = true;
					self.selectedRegions = self.filterItem.regions;
				}
				
				if (needsToUpdate === true) {
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
			selectedRegions: [],
			selectedLocations: [],
			locations: [],
			regions: []
		}
	},
	computed: {
		showLocations () {
			let self = this;
			let arr = [];
			_.each(this.locations, (location) => {
				if (!self.selectedRegions.length) {
					arr.push(location);
				} else if (self.selectedRegions.indexOf(location.region_id) !== -1) {
					arr.push(location);
				}
			});
			
			return arr;
		}
	},
	methods: {
		setLocations (ev) {
			this.selectedLocations = ev;
			this.updated();
		},
		setRegions (ev) {
			this.selectedRegions = ev;
			this.updated();
		},
		updated () {
			let numSelected = this.selectedLocations.length + this.selectedRegions.length;
			let opts = {
				locations: this.selectedLocations,
				regions: this.selectedRegions,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
}
</script>