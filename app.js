var aResources = [];
var sDraggedElementId;

function mouseUp() {
	sDraggedElementId = null;
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(oEvent) {
	sDraggedElementId = oEvent.currentTarget.id;
	window.addEventListener('mousemove', divMove, true);
}

function divMove(oEvent) {
	var oDiv = document.getElementById(sDraggedElementId);
	oDiv.style.position = 'absolute';
	oDiv.style.top = oEvent.clientY + 'px';
	oDiv.style.left = oEvent.clientX + 'px';
}

function _createResourceDiv(oResource) {
	var oElement = document.createElement("div");
	oElement.id = oResource.id;
	oElement.className = "circle";
	var oPosition = $('#addResourceButton').position();
	oElement.style.top = (oPosition.top + 40) + 'px';
	oElement.style.left = (oPosition.left + 130) + 'px';
	oElement.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

	return oElement;
}

function _addResourceDivToMap(oElement) {
	var oMainDiv = document.getElementById("main");
	oMainDiv.appendChild(oElement);
}

function createDivForResourceOnMap(oResource) {
	var oElement = _createResourceDiv(oResource);
	_addResourceDivToMap(oElement);	
}

function addResource(sResourceName) {
	var oResource = {
		id : "resource" + aResources.length,
		name: sResourceName,
		isUsed : false
	}
	aResources.push(oResource);
	createDivForResourceOnMap(oResource);
}

function _sendReq() {
	return [
	{
		name : "washroom0",
		isUsed: true
	}];
}

function _updateResources(aUpdatedResources) {
	for (let i = 0; i < aUpdatedResources.length; i++) {
		for (let j = 0; j < aResources.length; j++) {
			if (aUpdatedResources[i].name === aResources[j].name) {
				aResources[j].isUsed = aUpdatedResources[i].isUsed;
			}
		}
	}
}

function refreshData() {
	var aUpdatedResources = _sendReq();
	_updateResources(aUpdatedResources);
	renderUpdatedResources();
}

function renderUpdatedResources() {
	for (let i = 0; i < aResources.length; i++) {
		var oResource = aResources[i];
		var oResourceDiv = document.getElementById(oResource.id);
		oResourceDiv.style.backgroundColor = oResource.isUsed ? "red" : "green";
	}
}

function _createRefreshButton() {
	var oButton = document.createElement("button");
	oButton.id = "refreshButton";
	oButton.innerHTML = "Refresh";
	oButton.addEventListener("click", function() {
		refreshData();
	});
	return oButton;
}

function _createAddResourceButton() {
	var oButton = document.createElement("button");
	oButton.id = "addResourceButton";
	oButton.innerHTML = "Add";
	oButton.addEventListener("click", function() {
		addResource("washroom" + aResources.length);
	});
	return oButton;	
}

function createToolbar() {
	var oToolbar = document.getElementById("toolbar");
	var oRefreshButton = _createRefreshButton();
	var oAddResourceButton = _createAddResourceButton();
	oToolbar.appendChild(oRefreshButton);
	oToolbar.appendChild(oAddResourceButton);
}


createToolbar();