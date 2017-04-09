var aResources = [
	{
		id : "resource1",
		isUsed: true
	}, {
		id : "resource2",
		isUsed: false
	}, {
		id : "resource3",
		isUsed: true
	}
];

function _createResourceDiv(oResource) {
	var oElement = document.createElement("div");
	oElement.id = oResource.id;
	return oElement;
}



function addResource() {
	var oResource = {
		id : "resource" + aResources.length,
		isUsed : false
	}
	var oElement = _createResourceDiv(oResource);
	var oMainDiv = document.getElementById("main");
	oMainDiv.appendChild(oElement);
	aResources.push(oResource);
}


function _sendReq() {
	return [
	{
		id : "resource1",
		isUsed: false
	}, {
		id : "resource2",
		isUsed: false
	}, {
		id : "resource3",
		isUsed: true
	}
	];
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