
(function() {
  window.IMG_DIR = 'http://paulsawaya.com/pics/'
    // Wait a beat so that window.IMG_DIR is injected
    setTimeout(function() {

    	var pageIsHTTP = window.location.protocol == 'http:';
    	var passwordInputs = document.querySelectorAll('form input[type="password"]');
    	for (var inputX = 0; inputX < passwordInputs.length; inputX++) {
    		var inputEl = passwordInputs[inputX];
        var inputPos = findPos(inputEl);
    		var formEl = inputEl.form;
    		var formIsHTTP = /^http:\/\//.test(formEl.action);
        
        // inputPos may be undefined for invisible elements. skip 'em.
        if (typeof(inputPos) === 'undefined') continue;
                        
        // Create eye icon, and position on top of input element
        var newIcon = document.createElement('a');
        newIcon.href = '#';
        newIcon.addEventListener('click', makeIconClick(inputEl,newIcon));
        var newImg = document.createElement('img');
        newIcon.appendChild(newImg);
        newImg.src = window.IMG_DIR + 'eye.png';
        document.body.appendChild(newIcon);
            
        newIcon.style['position'] = 'absolute';
        // Keep the icon floating on top
        newIcon.style['zIndex'] = '99999999';
        // Align right
        console.log('inputPos: ');
        console.log(inputPos);
        newIcon.style['left'] = (inputPos[0] + 5) + 'px';
        //(inputPos[0] + (inputEl.width - (newImg.width + 3))).toString() + 'px';
        // Center vertically in password element
        newIcon.style['top'] = (inputPos[1] + Math.max(inputEl.offsetHeight/2 - newImg.height/2,3)).toString() + 'px';

        var warnForSecurity = pageIsHTTP || formIsHTTP;


        makeIconHovertext(newIcon,warnForSecurity);
        if (warnForSecurity) {
            // Change eye icon to warning
            newImg.src = window.IMG_DIR + 'warning.png';
            // Give password input element a red border
            inputEl.style['border'] = '2px solid red';
        }
    	}
    },1);
    
    // Thanks, http://www.quirksmode.org/js/findpos.html
    function findPos(obj) {
    	var curleft = curtop = 0;
    		if (obj.offsetParent) {
    		    do {
            			curleft += obj.offsetLeft;
            			curtop += obj.offsetTop;
            		} while (obj = obj.offsetParent);
        	    return [curleft,curtop];
            }
    }
    
    function makeIconHovertext(iconEl,addWarning) {
        var hoverTextEl = document.createElement('div');
        hoverTextEl.appendChild(makeTextDiv("Click to see what you've typed."));
        document.body.appendChild(hoverTextEl);
        hoverTextEl.style['border'] = '1px black solid';
        hoverTextEl.style['padding'] = '3px';
        hoverTextEl.style['position'] = 'absolute';
        hoverTextEl.style['left'] = iconEl.offsetLeft;
        hoverTextEl.style['top'] = iconEl.offsetTop + 15;
        hoverTextEl.style['display'] = 'none';
        iconEl.addEventListener('mouseover', function() {
            hoverTextEl.style['display'] = 'inline';
        }); 
        iconEl.addEventListener('mouseout', function() {
            hoverTextEl.style['display'] = 'none';
        });
        if (addWarning) {
            addWarningToHovertext(hoverTextEl,"WARNING: This password form may not be secure.");
        }
    }
    
    function addWarningToHovertext(hoverTextEl,_text) {
        var warningEl = makeTextDiv(_text);
        warningEl.style['color'] = 'red';
        hoverTextEl.appendChild(warningEl);
    }
    
    function makeIconClick(el,icon) {
        return function(e) {
            el.type = (el.type == 'password') ? 'text' : 'password';
            // Prevent clicking the anchor from changing the page
            e.preventDefault();
            return false;
        };
    }
    
    function makeTextDiv(_text) {
        var newDiv = document.createElement('div');
        newDiv.innerHTML = _text;
        return newDiv;
    }
})();