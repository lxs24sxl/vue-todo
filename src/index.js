import Vue from 'vue';
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div');
document.body.appendChild( root );

new Vue({
	// render: ( h ) => h( App )
	render: function ( h ) {
		return h(App)
	}
// $mount是挂载的意思
}).$mount( root )