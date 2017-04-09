var aResources = [];

function _createResourceDiv(oResource) {
	var oElement = document.createElement("div");
	oElement.id = oResource.id;
	oElement.className = "circle";
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

function addResource() {
	var oResource = {
		id : "resource" + aResources.length,
		isUsed : false
	}
	aResources.push(oResource);
	createDivForResourceOnMap(oResource);
}

function _sendReq() {
	return [
	{
		id : "resource0",
		isUsed: true
	}];
}

function refreshData() {
	var aUpdatedResources = _sendReq();
	aResources = aUpdatedResources;
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
	oButton.innerHTML = "Refresh";
	oButton.addEventListener("click", function() {
		refreshData();
	});
	return oButton;
}

function createToolbar() {
	var oButton = _createRefreshButton();
	var oToolbar = document.getElementById("toolbar");
	oToolbar.appendChild(oButton);
}


createToolbar();
addResource();