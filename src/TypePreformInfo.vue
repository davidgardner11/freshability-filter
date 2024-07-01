<template>
	<div class="question-info-container">
		<a href="" class="remove-item" @click.prevent="removeItem">x</a>
		<h5>{{item.name}}</h5>
		<div v-if="item.type === 'Dropdown'">
			<label v-for="opt in item.options" class="checkbox">
				<input type="checkbox" v-model="item.filter.opts" :value="opt" @change="updated" /> {{opt}}
			</label>
		</div>
		<div v-else-if="itemIsOpen">
			<input type="text" v-model="item.filter.str" class="text" @change="updated" />
		</div>
	</div>
</template>
<script>
export default {
	name: 'TypePreformInfo',
	props: {
		item: Object
	},
	created () {
		
	},
	computed: {
		itemIsOpen () {
			if (['Barcode', 'Text', 'Integer'].indexOf(this.item.type) !== -1) {
				return true;
			}
			
			return false;
		}
	},
	methods: {
		removeItem () {
			this.$emit('remove-item', this.item);
		},
		updated () {
			this.$emit('change', this.item);
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
.remove-item {
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