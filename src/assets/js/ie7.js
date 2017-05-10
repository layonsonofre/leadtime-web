/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'leadtime\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-agenda': '&#xe903;',
		'icon-caminhao': '&#xe904;',
		'icon-card-background': '&#xe905;',
		'icon-carga-fim': '&#xe906;',
		'icon-carga-inicio': '&#xe907;',
		'icon-carga-previsao': '&#xe908;',
		'icon-descarga-fim': '&#xe909;',
		'icon-descarga-inicio': '&#xe90a;',
		'icon-descarga-previsao': '&#xe90b;',
		'icon-destino': '&#xe90c;',
		'icon-documento': '&#xe90d;',
		'icon-mercadoria': '&#xe90e;',
		'icon-observacao': '&#xe90f;',
		'icon-origem': '&#xe910;',
		'icon-pessoa': '&#xe911;',
		'icon-relogio1': '&#xe912;',
		'icon-relogio2': '&#xe913;',
		'icon-rodovia': '&#xe914;',
		'icon-telefone': '&#xe915;',
		'icon-terno': '&#xe916;',
		'icon-tipo1': '&#xe917;',
		'icon-tipo2': '&#xe918;',
		'icon-transit-time': '&#xe900;',
		'icon-descarga': '&#xe901;',
		'icon-carga': '&#xe902;',
		'icon-home': '&#xe919;',
		'icon-key': '&#xe98d;',
		'icon-lock': '&#xe98f;',
		'icon-unlocked': '&#xe990;',
		'icon-wrench': '&#xe991;',
		'icon-equalizer': '&#xe992;',
		'icon-cog': '&#xe994;',
		'icon-bin': '&#xe9ac;',
		'icon-switch': '&#xe9b6;',
		'icon-plus': '&#xea0a;',
		'icon-minus': '&#xea0b;',
		'icon-cross': '&#xea0f;',
		'icon-checkmark': '&#xea10;',
		'icon-loop2': '&#xea2e;',
		'icon-filter': '&#xea5b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
