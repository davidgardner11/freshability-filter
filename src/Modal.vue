<template>
  <div>
  <div class="modal-backdrop"></div>
    <div id="save-warning" class="modal builder-modal" :class="classes">
      <div class="modal-header">
        <h3>{{title}}</h3>
        <div v-if="hasDelete && notConfirmDelete" class="delete-btn" @click="showConfirmDelete">
          <svg class="nicon nicon-outline"><use href="#nicon-bin" xlink:href="#nicon-bin"/></svg>
        </div>
      </div>
      <div class="modal-body">
        <div v-show="notConfirmDelete">
          <slot></slot>
        </div>
        <div v-show="confirmDelete">
          <div class="alert alert-danger"><svg class="nicon nicon-outline"><use href="#nicon-warning-sign" xlink:href="#nicon-warning-sign"/></svg> Are you sure you want to delete this item?</div>
        </div>
      </div>
      <div class="modal-footer with-groups">
        <div class="modal-footer-right" v-if="confirmDelete">
          <a href="#" @click.prevent="cancelDelete" class="btn">{{cancelDeleteBtnTxt}}</a>
          <button class="btn btn-danger" @click.prevent="deleteClicked">
            {{deleteBtnTxt}}
          </button>		
        </div>
        <div class="modal-footer-right" v-if="notConfirmDelete">
          <a href="#" @click.prevent="closeModal" class="btn">{{cancelBtnTxt}}</a>
          <button class="btn btn-primary" id="ok-btn" @click.prevent="okClicked">
            {{okBtnTxt}}
          </button>		
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
	props: {
		title: String,
		cancelBtnTxt: {
			type: String,
			default () {
				return 'Close'
			}
		},
		cancelDeleteBtnTxt: {
			type: String,
			default () {
				return 'Cancel'
			}
		},
		classes: {
			type: Object,
			default () {
				return {}
			}
		},
		deleteBtnTxt: {
			type: String,
			default () {
				return 'Yes, Delete'
			}
		},
		hasDelete: {
			type: Boolean,
			default () {
				return false;
			}
		},
		okBtnTxt: {
			type: String,
			default () {
				return 'Okay'
			}
		},
		okCb: {
			type: Function,
			default () {
				return true;
			}
		},
		template: Object
	},
	computed: {
		notConfirmDelete () {
			return this.confirmDelete !== true;
		}
	},
	data () {
		return {
			confirmDelete: false
		}
	},
	methods: {
		cancelDelete () {
			this.confirmDelete = false;
		},
		closeModal () {
			this.$emit('cancelclicked')
		},
		deleteClicked () {
			this.$emit('deleteclicked');
		},
		okClicked () {
			if (this.okCb) {
				this.okCb();
			}
			this.$emit('okclicked')
		},
		showConfirmDelete () {
			this.confirmDelete = true;
		}
	}
}
</script>
<style scoped>
.modal-backdrop {
	opacity: 0.8;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1040;
	background-color: #232323;
}
.alert.alert-danger svg {
	color: #e61922;
	stroke: #e61922;
	height: 18px;
	width: 18px;
	top: 4px;
	position: relative;
}
.delete-btn svg {
	color: #dba571;
	stroke: #dba571;
	height: 20px;
	width: 20px;
}
.modal.builder-modal {
	 border: none;
}
 .modal.builder-modal.nopadding .modal-body {
	 padding: 0;
}
 .modal.builder-modal.wide {
	 width: 800px;
	 margin-left: -400px;
}
 .modal.builder-modal.video-wide {
	 width: 640px;
	 margin-left: -300px;
}
 .modal.builder-modal .modal-header {
	 position: relative;
	 border-bottom: none;
}
 .modal.builder-modal .modal-header .delete-btn {
	 position: absolute;
	 right: 15px;
	 top: 15px;
	 width: 20px;
	 height: 20px;
	 color: #dba571;
	 cursor: pointer;
}
 .modal.builder-modal .modal-scroll-section {
	 max-height: 320px;
	 overflow-y: auto;
}
 .modal.builder-modal .modal-scroll-section.min {
	 min-height: 320px;
}
 .modal.builder-modal .modal-body input.max {
	 width: 100%;
	 box-sizing: border-box;
	 padding: 15px 5px !important;
}
 .modal.builder-modal .modal-body .add-file-options {
	 text-align: center;
	 padding: 8px;
	 margin: 8px;
}
 .modal.builder-modal .modal-tabs {
	 display: flex;
	 height: 40px;
	 background: #38737b;
	 margin-bottom: 10px;
}
 .modal.builder-modal .modal-tabs .modal-tab {
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
 .modal.builder-modal .modal-tabs .modal-tab.selected {
	 background: #5a9aa8;
}
 .modal.builder-modal .modal-tabs .modal-tab.disabled {
	 background-color: #e1e1e1;
	 color: #999;
}
 .modal.builder-modal .new-modal-section {
	 padding-bottom: 10px;
}
 .modal.builder-modal .new-modal-section select {
	 width: 530px;
}
 .modal.builder-modal .new-modal-section input.calcuation {
	 width: 500px;
}
 .modal.builder-modal .new-modal-section textarea.lg {
	 padding: 5px;
	 font-size: 12px;
	 margin: 0;
	 box-sizing: border-box;
	 width: 100%;
	 height: 80px;
	 border-width: 1px;
}
 .modal.builder-modal .question-tags-section {
	 margin-top: 20px;
}
 .modal.builder-modal .question-tags-list {
	 list-style: none;
	 padding: 0;
	 margin: 0;
}
 .modal.builder-modal .question-tags-list li {
	 display: inline-block;
	 margin-right: 20px;
}
 .modal.builder-modal .question-tags-list li label {
	 font-family: Helvetica, Arial, sans-serif;
	 text-transform: none;
}
 .modal.builder-modal .modal-positioning {
	 display: flex;
}
 .modal.builder-modal .modal-positioning .modal-positioning-gutter {
	 width: 20px;
}
 .modal.builder-modal .modal-positioning .modal-positioning-gutter.sm {
	 width: 10px;
}
 .modal.builder-modal .modal-positioning .modal-positioning-side {
	 flex: 1;
}
 .modal.builder-modal .modal-positioning .modal-positioning-side.w-33 {
	 flex: 0 0 33%;
}
 .modal.builder-modal .modal-positioning .modal-positioning-side select {
	 width: 100%;
}
 .modal.builder-modal .dropdown-items {
	 width: 100%;
}
 .modal.builder-modal .dropdown-items .dropdown-items-head {
	 width: 100%;
	 display: flex;
}
 .modal.builder-modal .dropdown-items .dropdown-item {
	 width: 100%;
	 display: flex;
}
 .modal.builder-modal .dropdown-items .dropdown-items-body {
	 border-bottom: 1px solid #eeefee;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt {
	 border: 1px solid #eeefee;
	 border-bottom: none;
	 border-right: none;
	 padding: 5px 8px;
	 box-sizing: border-box;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt:last-child {
	 border-right: 1px solid #eeefee;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.option {
	 flex: 1;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.option input.text {
	 width: 337px;
	 margin: 0;
	 border-width: 1px;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.th {
	 font-size: 11px;
	 font-color: #999;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out, .modal.builder-modal .dropdown-items .dropdown-item-opt.dragger {
	 width: 30px;
	 text-align: center;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.rangeval {
	 width: 173px;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.rangeval input {
	 border-width: 1px;
	 width: 144px;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out {
	 padding: 5px 0;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out input {
	 position: relative;
	 top: 4px;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out svg {
	 position: relative;
	 top: 6px;
	 cursor: pointer;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.in-out input.opt-val {
	 padding: 1px !important;
	 border-width: 1px;
	 width: 21px !important;
	 height: 16px !important;
	 font-size: 10px;
	 text-align: center;
	 position: relative;
	 top: 6px;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.dragger {
	 padding: 0;
}
 .modal.builder-modal .dropdown-items .dropdown-item-opt.dragger svg {
	 position: relative;
	 top: 11px;
}
 .modal.builder-modal .dropdown-items .dropdown-items-footer {
	 text-align: right;
	 padding-top: 10px;
}
 .modal.builder-modal .dropdown-items .dropdown-items-footer a svg {
	 fill: #5a9aa8;
	 height: 30px;
	 width: 30px;
}
 .modal.builder-modal .modal-footer.with-groups {
	 display: flex;
}
 .modal.builder-modal .modal-footer.with-groups .modal-footer-left {
	 flex: 1;
	 text-align: left;
}
 .modal.builder-modal .modal-footer.with-groups .modal-footer-right {
	 flex: 1;
	 text-align: right;
}
 .modal.builder-modal .modal-footer.with-groups .btn {
	 height: 60px;
	 padding: 0 20px;
	 line-height: 60px;
	 border: none;
	 margin: 0;
}
</style>