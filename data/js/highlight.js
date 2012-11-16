(function() {
	var pageIsHTTP = window.location.protocol == 'http:';
	var passwordInputs = document.querySelectorAll('form input[type="password"]');
	for (var inputX = 0; inputX < passwordInputs.length; inputX++) {
		var inputEl = passwordInputs[inputX];
		var formEl = inputEl.form;
		var formIsHTTP = /^http:\/\//.test(formEl.action);
		if (pageIsHTTP != formIsHTTP) {
			inputEl.style['border'] = "2px solid red";	
		}
	}
})();