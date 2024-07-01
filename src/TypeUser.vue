<template>
	<div class="modal-groups" v-if="isLoaded">
		<div class="modal-group">
			<TypeGroup :title="'User Group'" :opts="userGroups" :start-items="selectedGroups" @change="setGroups" :parent-selection="[]"></TypeGroup>
		</div>
		<div class="modal-group">
			<TypeGroup :title="'User'" :opts="users" :start-items="selectedUsers" :parent-selection="selectedGroups" :parent-id-key="'user_group_id'" @change="setUsers"></TypeGroup>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import TypeGroup from './TypeGroup.vue';
export default {
	name: 'TypeUser',
	components: {TypeGroup},
	created () {
		let self = this;
		axios.get('/api/user')
			.then((r) => {
				self.users = _.get(r, 'data.users');
				self.userGroups = _.get(r, 'data.user_groups');
			})
			.then(() => {
				let needsToUpdate = false;
				if (self.filterItem && self.filterItem.groups) {
					needsToUpdate = true;
					self.selectedGroups = self.filterItem.groups;
				}
				if (self.filterItem && self.filterItem.users) {
					needsToUpdate = true;
					self.selectedUsers = self.filterItem.users;
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
			users: [],
			userGroups: [],
			selectedGroups: [],
			selectedUsers: []
		}
	},
	methods: {
		setGroups (ev) {
			this.selectedGroups = ev;
			this.updated();
		},
		setUsers (ev) {
			this.selectedUsers = ev;
			this.updated();
		},
		updated () {
			let numSelected = this.selectedGroups.length + this.selectedUsers.length;

			let opts = {
				groups: this.selectedGroups,
				users: this.selectedUsers,
				num: numSelected
			};

			this.$emit('update-filter', opts);
		}
	}
}
</script>