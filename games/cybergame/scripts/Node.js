"use strict";
// Creates a new Node
window.Node = (function(){
	// params - pos X, pos Y, bool - true if last node.
	function Node(pX, pY, pEnding) {
		this.x = pX;
		this.y = pY;
		this.ending = pEnding;
		this.start = false;
	};
	return Node;
})();

function populateNodes(nodeArray) {
     nodeArray.push(new Node(16, 47, false));
    nodeArray.push(new Node(138, 33, false));
    nodeArray.push(new Node(250, 36, false));
    nodeArray.push(new Node(339, 37, false));
    nodeArray.push(new Node(428, 43, false));
    nodeArray.push(new Node(525, 43, false));
    nodeArray.push(new Node(580, 39, false));
    nodeArray.push(new Node(648, 33, false));
    nodeArray.push(new Node(692, 35, false));
    nodeArray.push(new Node(709, 43, false));
    nodeArray.push(new Node(723, 56, false));
    nodeArray.push(new Node(728, 65, false));
    nodeArray.push(new Node(732, 78, false));
    nodeArray.push(new Node(735, 94, false));
    nodeArray.push(new Node(736, 115, false));
    nodeArray.push(new Node(732, 131, false));
    nodeArray.push(new Node(723, 145, false));
    nodeArray.push(new Node(714, 155, false));
    nodeArray.push(new Node(704, 160, false));
    nodeArray.push(new Node(692, 166, false));
    nodeArray.push(new Node(681, 170, false));
    nodeArray.push(new Node(664, 177, false));
    nodeArray.push(new Node(626, 186, false));
    nodeArray.push(new Node(579, 185, false));
    nodeArray.push(new Node(521, 175, false));
    nodeArray.push(new Node(456, 158, false));
    nodeArray.push(new Node(419, 149, false));
    nodeArray.push(new Node(368, 144, false));
    nodeArray.push(new Node(314, 141, false));
    nodeArray.push(new Node(268, 142, false));
    nodeArray.push(new Node(210, 147, false));
    nodeArray.push(new Node(178, 154, false));
    nodeArray.push(new Node(163, 163, false));
    nodeArray.push(new Node(154, 174, false));
    nodeArray.push(new Node(149, 190, false));
    nodeArray.push(new Node(156, 205, false));
    nodeArray.push(new Node(166, 216, false));
    nodeArray.push(new Node(182, 222, false));
    nodeArray.push(new Node(203, 225, false));
    nodeArray.push(new Node(220, 224, false));
    nodeArray.push(new Node(241, 218, false));
    nodeArray.push(new Node(254, 213, false));
    nodeArray.push(new Node(266, 210, false));
    nodeArray.push(new Node(290, 207, false));
    nodeArray.push(new Node(306, 207, false));
    nodeArray.push(new Node(315, 210, false));
    nodeArray.push(new Node(323, 219, false));
    nodeArray.push(new Node(334, 239, false));
    nodeArray.push(new Node(337, 258, false));
    nodeArray.push(new Node(335, 271, false));
    nodeArray.push(new Node(324, 291, false));
    nodeArray.push(new Node(309, 304, false));
    nodeArray.push(new Node(278, 318, false));
    nodeArray.push(new Node(244, 324, false));
    nodeArray.push(new Node(209, 317, false));
    nodeArray.push(new Node(173, 307, false));
    nodeArray.push(new Node(147, 292, false));
    nodeArray.push(new Node(118, 282, false));
    nodeArray.push(new Node(91, 282, false));
    nodeArray.push(new Node(66, 303, false));
    nodeArray.push(new Node(61, 330, false));
    nodeArray.push(new Node(70, 356, false));
    nodeArray.push(new Node(87, 367, false));
    nodeArray.push(new Node(111, 377, false));
    nodeArray.push(new Node(157, 388, false));
    nodeArray.push(new Node(183, 404, false));
    nodeArray.push(new Node(200, 417, false));
    nodeArray.push(new Node(247, 427, false));
    nodeArray.push(new Node(276, 424, false));
    nodeArray.push(new Node(309, 410, false));
    nodeArray.push(new Node(323, 397, false));
    nodeArray.push(new Node(329, 372, false));
    nodeArray.push(new Node(336, 353, false));
    nodeArray.push(new Node(360, 328, false));
    nodeArray.push(new Node(388, 317, false));
    nodeArray.push(new Node(434, 297, false));
    nodeArray.push(new Node(426, 280, false));
    nodeArray.push(new Node(398, 231, false));
    nodeArray.push(new Node(385, 212, false));
    nodeArray.push(new Node(437, 197, false));
    nodeArray.push(new Node(524, 208, false));
    nodeArray.push(new Node(569, 226, false));
    nodeArray.push(new Node(611, 243, false));
    nodeArray.push(new Node(661, 272, false));
    nodeArray.push(new Node(679, 309, false));
    nodeArray.push(new Node(677, 327, false));
    nodeArray.push(new Node(667, 350, false));
    nodeArray.push(new Node(650, 363, false));
    nodeArray.push(new Node(630, 366, false));
    nodeArray.push(new Node(605, 364, false));
    nodeArray.push(new Node(583, 352, false));
    nodeArray.push(new Node(549, 338, false));
    nodeArray.push(new Node(526, 338, false));
    nodeArray.push(new Node(499, 350, false));
    nodeArray.push(new Node(479, 369, false));
    nodeArray.push(new Node(469, 402, false));
    nodeArray.push(new Node(474, 417, false));
    nodeArray.push(new Node(497, 429, false));
    nodeArray.push(new Node(542, 447, false));
    nodeArray.push(new Node(574, 447, false));
    nodeArray.push(new Node(608, 436, false));
    nodeArray.push(new Node(646, 427, false));
    nodeArray.push(new Node(669, 428, false));
    nodeArray.push(new Node(700, 442, false));
    nodeArray.push(new Node(730, 455, true));
    nodeArray[0].start = true;
};

// Renders the path the enemies will take. Param - array of nodes
function renderNodePath() {
	ctx.strokeStyle = "rgba(0,0,0,.3)";
	ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(game.nodeArray[0].x, game.nodeArray[0].y);
	//loop till last node.
    for (var i = 1; i < game.nodeArray.length; i++) {
        ctx.lineTo(game.nodeArray[i].x, game.nodeArray[i].y);
		//if last node break;
        if (game.nodeArray[i].ending === true) {
            ctx.stroke()
            ctx.closePath();
            break;
        };
    };
};