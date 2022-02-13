import { reactive } from 'vue';

export const store = reactive({
	userPanelIsVisible: false,
	setUserPanelVisibility(boolValue) {
		this.userPanelIsVisible = boolValue;
	},

	loaderIsVisible: false,
	setLoaderVisibility(param) {
		this.loaderIsVisible = param;
	},

	loginFormIsVisible: 'none',
	setLoginFormVisibility(param) {
		this.loginFormIsVisible = param;
	},

	alert: { className: null, msg: null, triggerElem: null },
	setAlert(className, msg, triggerElem) {
		this.className = className;
		this.msg = msg;
		this.triggerElem = triggerElem;
		this.triggerElem.disabled = true;

		setTimeout(() => {
			this.className = 'alert-hidden';
			this.msg = '';
			this.triggerElem.disabled = false;
		}, 3000);
	},
});
