const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const axios = require('axios');
const xml2js = require('xml2js');

app.use(express.json())

app.get('/news', async (req, res) => {
  const response = await axios.get('https://www.meneame.net/rss')
  const xmlText = response.data;
  // transform xml to json
  const feed = await new Promise((resolve, reject) => {
    xml2js.parseString(xmlText, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
  const [channel] = feed.rss.channel;
  // map rss json to our own structure
  const news = channel.item.map((item) => ({
    title: item.title[0],
    link: item.link[0],
    pubDate: item.pubDate[0],
    description: item.description[0],
    image: item["media:thumbnail"]?.[0].$.url,
    category: item["meneame:sub"]?.[0],
    votes: item["meneame:votes"],
  }));
  res.json(news);
});

app.listen(port, () => {
  console.log(`REST server listening on port ${port}`)
})

app.use(express.static('build'));

/*
const xmlText = `
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:georss="http://www.georss.org/georss"
	xmlns:media="http://search.yahoo.com/mrss/"
	xmlns:meneame="http://meneame.net/faq-es.php"
 >
<channel>
	<title>Menéame: publicadas</title>
	<atom:link href="http://www.meneame.net/rss" rel="self" type="application/rss+xml" />
	<link>http://www.meneame.net</link>
	<image><title>Menéame: publicadas</title><link>http://www.meneame.net</link><url>http://mnmstatic.net/img/mnm/eli-rss.png</url></image>
	<description>Sitio colaborativo de publicación y comunicación entre blogs</description>
	<pubDate>Mon, 03 Oct 2022 15:45:02 +0000</pubDate>
	<generator>http://blog.meneame.net/</generator>
	<language>es</language>
	<atom:link rel="hub" href="http://pubsubhubbub.appspot.com/"/>
	<item>
		<meneame:link_id>3730979</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>cd_autoreverse</meneame:user>
		<meneame:clicks>126</meneame:clicks>
		<meneame:votes>34</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>489</meneame:karma>
		<meneame:comments>16</meneame:comments>
		<meneame:url>https://www.meneame.net/story/asi-vida-perros-caza-espana?utm_source=meneame_rss</meneame:url>
		<title>Así es la vida de los perros de caza en España</title>
		<link>https://www.meneame.net/story/asi-vida-perros-caza-espana</link>
		<comments>https://www.meneame.net/story/asi-vida-perros-caza-espana</comments>
		<pubDate>Mon, 03 Oct 2022 15:45:19 +0000</pubDate>
		<dc:creator>cd_autoreverse</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[vida de perros]]></category>
		<category><![CDATA[caza en españa]]></category>
		<guid>https://www.meneame.net/story/asi-vida-perros-caza-espana</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3730979.jpeg?1664790246' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>En enero de 2022, AnimaNaturalis y CAS International documentaron 28 cheniles de perros utilizados para la caza...</p><p><strong>etiquetas</strong>: vida de perros, caza en españa</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730979" >noticia original</a> (www.youtube.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3730979.jpeg?1664790246" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730979</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730952</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Chabelitaenanita</meneame:user>
		<meneame:clicks>443</meneame:clicks>
		<meneame:votes>83</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>755</meneame:karma>
		<meneame:comments>33</meneame:comments>
		<meneame:url>https://www.meneame.net/story/pesan-dudas-sobre-credit-suisse-estamos-ante-nuevo-lehman?utm_source=meneame_rss</meneame:url>
		<title>Pesan las dudas sobre Credit Suisse ¿estamos ante el nuevo Lehman Europeo?</title>
		<link>https://www.meneame.net/story/pesan-dudas-sobre-credit-suisse-estamos-ante-nuevo-lehman</link>
		<comments>https://www.meneame.net/story/pesan-dudas-sobre-credit-suisse-estamos-ante-nuevo-lehman</comments>
		<pubDate>Mon, 03 Oct 2022 15:20:21 +0000</pubDate>
		<dc:creator>Chabelitaenanita</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[cds]]></category>
		<category><![CDATA[crisis]]></category>
		<category><![CDATA[lehman]]></category>
		<category><![CDATA[credit]]></category>
		<category><![CDATA[suisse]]></category>
		<category><![CDATA[economía]]></category>
		<category><![CDATA[crisis]]></category>
		<guid>https://www.meneame.net/story/pesan-dudas-sobre-credit-suisse-estamos-ante-nuevo-lehman</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3730952.jpeg?1664786946' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Credit Suisse ha visto cómo sus CDS han aumentado con fuerza mientras el precio de las acciones caen ante las dudas sobre el capital e impagos de la entidad. ¿Desatará un nuevo Lehman en Europa?</p><p><strong>etiquetas</strong>: cds, crisis, lehman, credit, suisse, economía, crisis</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730952" >noticia original</a> (www.estrategiasdeinversion.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3730952.jpeg?1664786946" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730952</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3731105</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>FatherKarras</meneame:user>
		<meneame:clicks>592</meneame:clicks>
		<meneame:votes>176</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>1433</meneame:karma>
		<meneame:comments>52</meneame:comments>
		<meneame:url>https://www.meneame.net/story/jimmy-carter-desde-normalizamos-relaciones-china-1979-estados-ha?utm_source=meneame_rss</meneame:url>
		<title>Jimmy Carter:&#34;Desde que normalizamos las relaciones con China en 1979, Estados Unidos ha estado en guerra constante. China no ha estado en combate con nadie&#34;.</title>
		<link>https://www.meneame.net/story/jimmy-carter-desde-normalizamos-relaciones-china-1979-estados-ha</link>
		<comments>https://www.meneame.net/story/jimmy-carter-desde-normalizamos-relaciones-china-1979-estados-ha</comments>
		<pubDate>Mon, 03 Oct 2022 15:05:19 +0000</pubDate>
		<dc:creator>FatherKarras</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[jimmy carter]]></category>
		<category><![CDATA[china]]></category>
		<category><![CDATA[1979]]></category>
		<category><![CDATA[eeuu]]></category>
		<category><![CDATA[guerra]]></category>
		<category><![CDATA[constante]]></category>
		<guid>https://www.meneame.net/story/jimmy-carter-desde-normalizamos-relaciones-china-1979-estados-ha</guid>
		<description><![CDATA[<p>&quot;Y si vas por el mundo y le preguntas a la gente cuál es el país más belicoso de la Tierra, ¿cuál crees que responden? Estados Unidos. Desde que salimos de la Segunda Guerra Mundial, e incluso antes, pero desde que salimos de la Segunda Guerra Mundial, Estados Unidos ha estado casi constantemente en guerra en alguna parte del mundo&quot;.</p><p><strong>etiquetas</strong>: jimmy carter, china, 1979, eeuu, guerra, constante</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3731105" >noticia original</a> (twitter.com)</p>]]></description>
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3731105</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730973</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>cathan</meneame:user>
		<meneame:clicks>480</meneame:clicks>
		<meneame:votes>84</meneame:votes>
		<meneame:negatives>2</meneame:negatives>
		<meneame:karma>739</meneame:karma>
		<meneame:comments>44</meneame:comments>
		<meneame:url>https://www.meneame.net/story/menor-14-anos-apunala-companero-instituto-aguilas?utm_source=meneame_rss</meneame:url>
		<title>Un menor de 14 años apuñala a un compañero en su instituto de Águilas</title>
		<link>https://www.meneame.net/story/menor-14-anos-apunala-companero-instituto-aguilas</link>
		<comments>https://www.meneame.net/story/menor-14-anos-apunala-companero-instituto-aguilas</comments>
		<pubDate>Mon, 03 Oct 2022 14:45:03 +0000</pubDate>
		<dc:creator>cathan</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[instituto]]></category>
		<category><![CDATA[alumnos]]></category>
		<category><![CDATA[puñalada]]></category>
		<category><![CDATA[sucesos]]></category>
		<category><![CDATA[águilas]]></category>
		<guid>https://www.meneame.net/story/menor-14-anos-apunala-companero-instituto-aguilas</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3730973.jpeg?1664789527' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Los hechos tuvieron lugar sobre las nueve y media de la mañana, hora a la que Emergencias recibía varias llamadas para alertar de que un menor precisaba de ayuda sanitaria urgente, porque había sido acuchillado por otro joven. El escenario, el Instituto de Educación Secundaria Alfonso Escámez, en el municipio costero de Águilas. El acuchillamiento se produjo dentro del aula, confirma la Guardia Civil, Cuerpo que se ha hecho cargo de la investigación. Según apuntaron las mismas fuentes, uno de los menores atacó al otro por la espalda.</p><p><strong>etiquetas</strong>: instituto, alumnos, puñalada, sucesos, águilas</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730973" >noticia original</a> (www.laopiniondemurcia.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3730973.jpeg?1664789527" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730973</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3731097</meneame:link_id>
		<meneame:sub>tecnología</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Pilfer</meneame:user>
		<meneame:clicks>5451</meneame:clicks>
		<meneame:votes>200</meneame:votes>
		<meneame:negatives>2</meneame:negatives>
		<meneame:karma>2011</meneame:karma>
		<meneame:comments>148</meneame:comments>
		<meneame:url>https://www.meneame.net/story/parece-meneame-ya-sufrido-hackeo?utm_source=meneame_rss</meneame:url>
		<title>Parece que meneame ha sufrido un hackeo</title>
		<link>https://www.meneame.net/story/parece-meneame-ya-sufrido-hackeo</link>
		<comments>https://www.meneame.net/story/parece-meneame-ya-sufrido-hackeo</comments>
		<pubDate>Mon, 03 Oct 2022 14:15:19 +0000</pubDate>
		<dc:creator>Pilfer</dc:creator>
		<category><![CDATA[tecnología]]></category>
		<category><![CDATA[meneame]]></category>
		<category><![CDATA[hack]]></category>
		<guid>https://www.meneame.net/story/parece-meneame-ya-sufrido-hackeo</guid>
		<description><![CDATA[<p>Parece que por la captura de pantalla  @meneame_net ha sufrido un hackeo</p><p><strong>etiquetas</strong>: meneame, hack</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3731097" >noticia original</a> (twitter.com)</p>]]></description>
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3731097</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3731085</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Ratoncolorao</meneame:user>
		<meneame:clicks>1767</meneame:clicks>
		<meneame:votes>243</meneame:votes>
		<meneame:negatives>5</meneame:negatives>
		<meneame:karma>1757</meneame:karma>
		<meneame:comments>82</meneame:comments>
		<meneame:url>https://www.meneame.net/story/asociacion-pro-derechos-humanos-andalucia-alerta-irregularidades?utm_source=meneame_rss</meneame:url>
		<title>La Asociación Pro Derechos Humanos de Andalucía alerta de &#34;irregularidades&#34; en la detención de la actriz María León</title>
		<link>https://www.meneame.net/story/asociacion-pro-derechos-humanos-andalucia-alerta-irregularidades</link>
		<comments>https://www.meneame.net/story/asociacion-pro-derechos-humanos-andalucia-alerta-irregularidades</comments>
		<pubDate>Mon, 03 Oct 2022 14:00:20 +0000</pubDate>
		<dc:creator>Ratoncolorao</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[maria león]]></category>
		<category><![CDATA[detención]]></category>
		<category><![CDATA[policía]]></category>
		<category><![CDATA[identidad]]></category>
		<guid>https://www.meneame.net/story/asociacion-pro-derechos-humanos-andalucia-alerta-irregularidades</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3731085.jpeg?1664803686' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>La asociación apunta que la difusión &quot;cada vez más frecuente de la identidad de una persona investigada por parte de las autoridades vulnera la presunción de inocencia&quot;</p><p><strong>etiquetas</strong>: maria león, detención, policía, identidad</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3731085" >noticia original</a> (www.eldiario.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3731085.jpeg?1664803686" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3731085</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3731074</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>onainigo</meneame:user>
		<meneame:clicks>770</meneame:clicks>
		<meneame:votes>298</meneame:votes>
		<meneame:negatives>3</meneame:negatives>
		<meneame:karma>1993</meneame:karma>
		<meneame:comments>77</meneame:comments>
		<meneame:url>https://www.meneame.net/story/pp-dice-tras-fracaso-bajada-impuestos-reino-unido-propuesta-no?utm_source=meneame_rss</meneame:url>
		<title>El PP dice tras el fracaso de la bajada de impuestos en Reino Unido que su propuesta no es bajar sino &#34;no subir&#34;</title>
		<link>https://www.meneame.net/story/pp-dice-tras-fracaso-bajada-impuestos-reino-unido-propuesta-no</link>
		<comments>https://www.meneame.net/story/pp-dice-tras-fracaso-bajada-impuestos-reino-unido-propuesta-no</comments>
		<pubDate>Mon, 03 Oct 2022 13:45:20 +0000</pubDate>
		<dc:creator>onainigo</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[truss]]></category>
		<category><![CDATA[impuestos]]></category>
		<category><![CDATA[bravo]]></category>
		<category><![CDATA[pp]]></category>
		<guid>https://www.meneame.net/story/pp-dice-tras-fracaso-bajada-impuestos-reino-unido-propuesta-no</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3731074.jpeg?1664801465' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>La debacle de la economía británica tras el anuncio de una bajada masiva de impuestos ha provocado que Juan Bravo tenga que matizar los planes del PP Rel <a href="https://www.meneame.net/story/truss-da-marcha-atras-plan-fiscal-renuncia-bajar-tramo-alto-irpf" title="www.meneame.net/story/truss-da-marcha-atras-plan-fiscal-renuncia-bajar-tramo-alto-irpf" rel="nofollow">www.meneame.net/story/truss-da-marcha-atras-plan-fiscal-renuncia-bajar</a></p><p><strong>etiquetas</strong>: truss, impuestos, bravo, pp</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3731074" >noticia original</a> (www.lavozdelsur.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3731074.jpeg?1664801465" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3731074</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730960</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>liztorra</meneame:user>
		<meneame:clicks>2817</meneame:clicks>
		<meneame:votes>155</meneame:votes>
		<meneame:negatives>2</meneame:negatives>
		<meneame:karma>1193</meneame:karma>
		<meneame:comments>112</meneame:comments>
		<meneame:url>https://www.meneame.net/story/horror-industria-porno-frances-actores-productores-son-40?utm_source=meneame_rss</meneame:url>
		<title>Horror en la industria del porno francés: Actores y productores son investigados por violaciones a 40 mujeres</title>
		<link>https://www.meneame.net/story/horror-industria-porno-frances-actores-productores-son-40</link>
		<comments>https://www.meneame.net/story/horror-industria-porno-frances-actores-productores-son-40</comments>
		<pubDate>Mon, 03 Oct 2022 13:25:21 +0000</pubDate>
		<dc:creator>liztorra</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[pornografía]]></category>
		<category><![CDATA[violación]]></category>
		<category><![CDATA[explotación sexual]]></category>
		<guid>https://www.meneame.net/story/horror-industria-porno-frances-actores-productores-son-40</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3730960.jpeg?1664788326' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Desde el estallido de este caso, ya se acusó a 12 hombres (actores, directores, productores), que en su mayoría se encuentran en prisión preventiva. Unas cuarenta víctimas se constituyeron como partes civiles. La investigación busca aclarar el grado de consentimiento de las mujeres a los diferentes servicios sexuales presentados, ya que en algunas escenas estas se oponían verbalmente a las prácticas que se les imponían. “En todas las escenas, me paso el tiempo empujándolos, diciendo que no. Estoy encima de él, y él me está sujetando...&quot;</p><p><strong>etiquetas</strong>: pornografía, violación, explotación sexual</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730960" >noticia original</a> (www.launion.digital)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3730960.jpeg?1664788326" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730960</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730853</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Esteban_Rosador</meneame:user>
		<meneame:clicks>613</meneame:clicks>
		<meneame:votes>260</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>1679</meneame:karma>
		<meneame:comments>26</meneame:comments>
		<meneame:url>https://www.meneame.net/story/condenado-cura-hermano-seis-anos-prision-abusar-joven?utm_source=meneame_rss</meneame:url>
		<title>Condenado un cura y su hermano a seis años de prisión por abusar de un joven con discapacidad</title>
		<link>https://www.meneame.net/story/condenado-cura-hermano-seis-anos-prision-abusar-joven</link>
		<comments>https://www.meneame.net/story/condenado-cura-hermano-seis-anos-prision-abusar-joven</comments>
		<pubDate>Mon, 03 Oct 2022 12:50:19 +0000</pubDate>
		<dc:creator>Esteban_Rosador</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[abusos]]></category>
		<category><![CDATA[león]]></category>
		<category><![CDATA[cura]]></category>
		<guid>https://www.meneame.net/story/condenado-cura-hermano-seis-anos-prision-abusar-joven</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730853.jpeg?1664773986' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>La Audiencia Provincial de León impone dos años y tres meses de prisión a un sacerdote por “tocar&quot; las &quot;partes íntimas&quot; de la víctima &quot;por encima de la ropa” y “masturbarle hasta eyacular”. También condena a cuatro años y seis meses a su familiar</p><p><strong>etiquetas</strong>: abusos, león, cura</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730853" >noticia original</a> (www.eldiario.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730853.jpeg?1664773986" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730853</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730963</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Sapocamuflado</meneame:user>
		<meneame:clicks>651</meneame:clicks>
		<meneame:votes>191</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>1436</meneame:karma>
		<meneame:comments>28</meneame:comments>
		<meneame:url>https://www.meneame.net/story/cellebrite-software-vigilancia-israeli-ertzaintza-acceder?utm_source=meneame_rss</meneame:url>
		<title>Cellebrite, el software de vigilancia israelí de la Ertzaintza para acceder a teléfonos móviles</title>
		<link>https://www.meneame.net/story/cellebrite-software-vigilancia-israeli-ertzaintza-acceder</link>
		<comments>https://www.meneame.net/story/cellebrite-software-vigilancia-israeli-ertzaintza-acceder</comments>
		<pubDate>Mon, 03 Oct 2022 12:15:03 +0000</pubDate>
		<dc:creator>Sapocamuflado</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[euskadi]]></category>
		<category><![CDATA[policía]]></category>
		<category><![CDATA[espionaje]]></category>
		<guid>https://www.meneame.net/story/cellebrite-software-vigilancia-israeli-ertzaintza-acceder</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3730963.jpeg?1664788146' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El Departamento de Seguridad del Gobierno Vasco, liderado por Josu Erkoreka, ha adquirido tecnologías utilizadas tanto para espiar a ERC como al extesorero del PP Luis Bárcenas. Esta tecnología presta apoyo a la deportación de refugiados y el hostigamiento de periodistas, activistas de derechos civiles, disidentes y minorías en todo el mundo.</p><p><strong>etiquetas</strong>: euskadi, policía, espionaje</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730963" >noticia original</a> (www.elsaltodiario.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3730963.jpeg?1664788146" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730963</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730706</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>japego</meneame:user>
		<meneame:clicks>2893</meneame:clicks>
		<meneame:votes>96</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>657</meneame:karma>
		<meneame:comments>30</meneame:comments>
		<meneame:url>https://www.meneame.net/story/plan-alfonso-xiii-hacerse-portugal?utm_source=meneame_rss</meneame:url>
		<title>El plan de Alfonso XIII para hacerse con Portugal</title>
		<link>https://www.meneame.net/story/plan-alfonso-xiii-hacerse-portugal</link>
		<comments>https://www.meneame.net/story/plan-alfonso-xiii-hacerse-portugal</comments>
		<pubDate>Mon, 03 Oct 2022 13:15:12 +0000</pubDate>
		<dc:creator>japego</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[plan]]></category>
		<category><![CDATA[alfonso xiii]]></category>
		<category><![CDATA[hacerse. portugal]]></category>
		<category><![CDATA[historia]]></category>
		<guid>https://www.meneame.net/story/plan-alfonso-xiii-hacerse-portugal</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730706.jpeg?1664727186' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Antes de la Gran Guerra, Alfonso XIII estuvo moviendo hilos para anexionarse el país vecino. Fue un enrevesado baile diplomático del que los lusos se salvaron por la campana</p><p><strong>etiquetas</strong>: plan, alfonso xiii, hacerse. portugal, historia</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730706" >noticia original</a> (www.lavanguardia.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730706.jpeg?1664727186" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730706</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3731026</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>zanguangaco</meneame:user>
		<meneame:clicks>3367</meneame:clicks>
		<meneame:votes>268</meneame:votes>
		<meneame:negatives>2</meneame:negatives>
		<meneame:karma>2131</meneame:karma>
		<meneame:comments>177</meneame:comments>
		<meneame:url>https://www.meneame.net/story/actriz-maria-leon-niega-haber-agredido-policia-sevilla-denuncia?utm_source=meneame_rss</meneame:url>
		<title>La actriz María León niega haber agredido a una policía en Sevilla y denuncia abuso policial</title>
		<link>https://www.meneame.net/story/actriz-maria-leon-niega-haber-agredido-policia-sevilla-denuncia</link>
		<comments>https://www.meneame.net/story/actriz-maria-leon-niega-haber-agredido-policia-sevilla-denuncia</comments>
		<pubDate>Mon, 03 Oct 2022 11:25:28 +0000</pubDate>
		<dc:creator>zanguangaco</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[maría león]]></category>
		<category><![CDATA[niega]]></category>
		<category><![CDATA[agresión]]></category>
		<category><![CDATA[policía]]></category>
		<category><![CDATA[sevilla]]></category>
		<category><![CDATA[abuso policial]]></category>
		<guid>https://www.meneame.net/story/actriz-maria-leon-niega-haber-agredido-policia-sevilla-denuncia</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3731026.jpeg?1664795106' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>La sevillana difunde un comunicado en redes sociales en el que asegura haber vivido 48 horas «verdaderamente difíciles»</p><p><strong>etiquetas</strong>: maría león, niega, agresión, policía, sevilla, abuso policial</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3731026" >noticia original</a> (sevilla.abc.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3731026.jpeg?1664795106" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3731026</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730949</meneame:link_id>
		<meneame:sub>tecnología</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>ccguy</meneame:user>
		<meneame:clicks>1624</meneame:clicks>
		<meneame:votes>156</meneame:votes>
		<meneame:negatives>2</meneame:negatives>
		<meneame:karma>1294</meneame:karma>
		<meneame:comments>59</meneame:comments>
		<meneame:url>https://www.meneame.net/story/out-run-cuando-todos-ninos-tuvimos-ferrari?utm_source=meneame_rss</meneame:url>
		<title>‘Out Run’, cuando todos los niños tuvimos un Ferrari</title>
		<link>https://www.meneame.net/story/out-run-cuando-todos-ninos-tuvimos-ferrari</link>
		<comments>https://www.meneame.net/story/out-run-cuando-todos-ninos-tuvimos-ferrari</comments>
		<pubDate>Mon, 03 Oct 2022 11:00:10 +0000</pubDate>
		<dc:creator>ccguy</dc:creator>
		<category><![CDATA[tecnología]]></category>
		<category><![CDATA[out run]]></category>
		<category><![CDATA[recreativas]]></category>
		<guid>https://www.meneame.net/story/out-run-cuando-todos-ninos-tuvimos-ferrari</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ee/media_thumb-link-3730949.jpeg?1664786586' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Sumidos en este delirio, también muy influenciados por Miami Vice, llegó a los bares, espacio donde los niños pasábamos el tiempo libre entre señores que se fumaban cuatro paquetes diarios y desayunaban aguardiente, la recreativa definitiva: el Out Run. Una máquina, que así se llamaban, con volante, palanca de cambios y pedales. Para mayor realismo a la hora de recrear la sensación de conducir un descapotable con tupé al viento, gafas de sol (...) el protagonista del videojuego iba acompañado de una rubia.</p><p><strong>etiquetas</strong>: out run, recreativas</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730949" >noticia original</a> (www.jotdown.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ee/media_thumb-link-3730949.jpeg?1664786586" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730949</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730805</meneame:link_id>
		<meneame:sub>politica</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>TonyIniesta</meneame:user>
		<meneame:clicks>4346</meneame:clicks>
		<meneame:votes>453</meneame:votes>
		<meneame:negatives>48</meneame:negatives>
		<meneame:karma>2470</meneame:karma>
		<meneame:comments>168</meneame:comments>
		<meneame:url>https://www.meneame.net/story/plan-acabar-rusia-informe-rand-corporation-2019?utm_source=meneame_rss</meneame:url>
		<title>El plan para acabar con Rusia: el informe de Rand Corporation (2019)</title>
		<link>https://www.meneame.net/story/plan-acabar-rusia-informe-rand-corporation-2019</link>
		<comments>https://www.meneame.net/story/plan-acabar-rusia-informe-rand-corporation-2019</comments>
		<pubDate>Mon, 03 Oct 2022 10:25:04 +0000</pubDate>
		<dc:creator>TonyIniesta</dc:creator>
		<category><![CDATA[politica]]></category>
		<category><![CDATA[rand]]></category>
		<category><![CDATA[rusia]]></category>
		<category><![CDATA[gas]]></category>
		<category><![CDATA[europa]]></category>
		<guid>https://www.meneame.net/story/plan-acabar-rusia-informe-rand-corporation-2019</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730805.jpeg?1664744046' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>En 2019, un organismo, think tank, del Pentágono, publicó un informe sobre cómo debilitar a Rusia. Atacar el gas que vende a Europa. Imponer sanciones económicas.</p><p><strong>etiquetas</strong>: rand, rusia, gas, europa</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730805" >noticia original</a> (www.elconfidencial.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730805.jpeg?1664744046" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730805</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730903</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>aiounsoufa</meneame:user>
		<meneame:clicks>1288</meneame:clicks>
		<meneame:votes>385</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>2601</meneame:karma>
		<meneame:comments>113</meneame:comments>
		<meneame:url>https://www.meneame.net/story/empresas-no-ofrezcan-teletrabajo-ya-saben-atenerse-25-menos?utm_source=meneame_rss</meneame:url>
		<title>Las empresas que no ofrezcan teletrabajo ya saben a qué atenerse: un 25% menos de talento disponible</title>
		<link>https://www.meneame.net/story/empresas-no-ofrezcan-teletrabajo-ya-saben-atenerse-25-menos</link>
		<comments>https://www.meneame.net/story/empresas-no-ofrezcan-teletrabajo-ya-saben-atenerse-25-menos</comments>
		<pubDate>Mon, 03 Oct 2022 10:05:19 +0000</pubDate>
		<dc:creator>aiounsoufa</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[teletrabajo]]></category>
		<category><![CDATA[empresas]]></category>
		<category><![CDATA[talento]]></category>
		<guid>https://www.meneame.net/story/empresas-no-ofrezcan-teletrabajo-ya-saben-atenerse-25-menos</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730903.jpeg?1664781846' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Que cerrar las puertas al teletrabajo tiene un coste en talento y oportunidades es algo que las compañías intuyen desde hace ya bastante tiempo. Al fin y al cabo el número de candidatos baja de forma considerable cuando, además de competencias, un perfil concreto y experiencia, la empresa les exige un requisito fundamental: que residan en la misma ciudad en la que está el puesto vacante o, en caso que vivan lejos, estén dispuestos a hacer las maletas y mudarse.</p><p><strong>etiquetas</strong>: teletrabajo, empresas, talento</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730903" >noticia original</a> (www.xataka.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730903.jpeg?1664781846" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730903</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730902</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>cromax</meneame:user>
		<meneame:clicks>884</meneame:clicks>
		<meneame:votes>350</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>2523</meneame:karma>
		<meneame:comments>132</meneame:comments>
		<meneame:url>https://www.meneame.net/story/truss-da-marcha-atras-plan-fiscal-renuncia-bajar-tramo-alto-irpf?utm_source=meneame_rss</meneame:url>
		<title>Truss da marcha atrás en su plan fiscal y renuncia a bajar el tramo alto de su IRPF</title>
		<link>https://www.meneame.net/story/truss-da-marcha-atras-plan-fiscal-renuncia-bajar-tramo-alto-irpf</link>
		<comments>https://www.meneame.net/story/truss-da-marcha-atras-plan-fiscal-renuncia-bajar-tramo-alto-irpf</comments>
		<pubDate>Mon, 03 Oct 2022 09:35:03 +0000</pubDate>
		<dc:creator>cromax</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[liz]]></category>
		<category><![CDATA[truss]]></category>
		<category><![CDATA[irpf]]></category>
		<category><![CDATA[plan]]></category>
		<category><![CDATA[fiscal]]></category>
		<category><![CDATA[reino]]></category>
		<category><![CDATA[unido]]></category>
		<category><![CDATA[impuestos]]></category>
		<guid>https://www.meneame.net/story/truss-da-marcha-atras-plan-fiscal-renuncia-bajar-tramo-alto-irpf</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730902.jpeg?1664781966' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El ministro de Economía del Reino Unido no aplicará la bajada del tramo más alto de su impuesto sobre la renta, que pretendía bajar del 45% al 40%, tras la respuesta de los mercados y la rebelión en su partido. El ministro británico de Economía, Kwasi Kwarteng, da marcha atrás a su polémico plan de minorar el tramo más alto de su impuesto sobre la renta y renuncia a su bajada del 45% al 40%, según ha anunciado este lunes, una decisión que había suscitado una rebelión en las propias filas conservadoras. &quot;Está claro que la abolición de la tasa de</p><p><strong>etiquetas</strong>: liz, truss, irpf, plan, fiscal, reino, unido, impuestos</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730902" >noticia original</a> (www.lainformacion.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730902.jpeg?1664781966" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730902</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730837</meneame:link_id>
		<meneame:sub>tecnología</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>ccguy</meneame:user>
		<meneame:clicks>1186</meneame:clicks>
		<meneame:votes>163</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>1350</meneame:karma>
		<meneame:comments>23</meneame:comments>
		<meneame:url>https://www.meneame.net/story/llega-linux-6-eng?utm_source=meneame_rss</meneame:url>
		<title>Llega Linux 6.0 (ENG)</title>
		<link>https://www.meneame.net/story/llega-linux-6-eng</link>
		<comments>https://www.meneame.net/story/llega-linux-6-eng</comments>
		<pubDate>Mon, 03 Oct 2022 09:30:10 +0000</pubDate>
		<dc:creator>ccguy</dc:creator>
		<category><![CDATA[tecnología]]></category>
		<category><![CDATA[linux]]></category>
		<guid>https://www.meneame.net/story/llega-linux-6-eng</guid>
		<description><![CDATA[<p>Las características principales de la versión 6.0 incluyen una serie de mejoras en io_uring, como la compatibilidad con escrituras en búfer en sistemas de archivos XFS y la transmisión de red sin copias, un mecanismo de controlador de bloques basado en io_uring, el subsistema de verificación en tiempo de ejecución y mucho más.</p><p><strong>etiquetas</strong>: linux</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730837" >noticia original</a> (lwn.net)</p>]]></description>
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730837</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730898</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>ccguy</meneame:user>
		<meneame:clicks>1552</meneame:clicks>
		<meneame:votes>133</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>952</meneame:karma>
		<meneame:comments>24</meneame:comments>
		<meneame:url>https://www.meneame.net/story/nodicia-kesos-posible-precedente-protorromance-castellano?utm_source=meneame_rss</meneame:url>
		<title>Nodicia de Kesos, el posible precedente protorromance del castellano o el asturleonés</title>
		<link>https://www.meneame.net/story/nodicia-kesos-posible-precedente-protorromance-castellano</link>
		<comments>https://www.meneame.net/story/nodicia-kesos-posible-precedente-protorromance-castellano</comments>
		<pubDate>Mon, 03 Oct 2022 10:05:25 +0000</pubDate>
		<dc:creator>ccguy</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[protorromance]]></category>
		<category><![CDATA[nodicia de kesos]]></category>
		<guid>https://www.meneame.net/story/nodicia-kesos-posible-precedente-protorromance-castellano</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730898.jpeg?1664781066' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>A priori parece estrambótico, casi ridículo; un modesto inventario de quesos sin valor jurídico, realizado por el despensero de un monasterio, no parece algo que tenga gran trascendencia histórica. Sin embargo, se trata de uno de los documentos más importantes que conserva el Archivo Catedralicio de León, ya que está escrito en una lengua protorromance, predecesora del asturleonés y muy anterior al castellano. Datado en el siglo X, se lo conoce con el arcaico y divertido nombre de Nodicia de kesos.</p><p><strong>etiquetas</strong>: protorromance, nodicia de kesos</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730898" >noticia original</a> (www.labrujulaverde.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730898.jpeg?1664781066" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730898</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730859</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Javier_Lothbrok</meneame:user>
		<meneame:clicks>2270</meneame:clicks>
		<meneame:votes>220</meneame:votes>
		<meneame:negatives>4</meneame:negatives>
		<meneame:karma>1615</meneame:karma>
		<meneame:comments>22</meneame:comments>
		<meneame:url>https://www.meneame.net/story/getafe-lanza-campana-merchandising-contra-plastico-bolsas?utm_source=meneame_rss</meneame:url>
		<title>Getafe lanza una campaña de merchandising contra el plástico, con bolsas de plástico</title>
		<link>https://www.meneame.net/story/getafe-lanza-campana-merchandising-contra-plastico-bolsas</link>
		<comments>https://www.meneame.net/story/getafe-lanza-campana-merchandising-contra-plastico-bolsas</comments>
		<pubDate>Mon, 03 Oct 2022 08:30:03 +0000</pubDate>
		<dc:creator>Javier_Lothbrok</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[getafe]]></category>
		<category><![CDATA[plástico]]></category>
		<category><![CDATA[greenwashing]]></category>
		<guid>https://www.meneame.net/story/getafe-lanza-campana-merchandising-contra-plastico-bolsas</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730859.jpeg?1664776506' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Sin duda, el cuidado del medio ambiente se ha convertido en una de las grandes preocupaciones de los madrileños. También de las distintas administraciones públicas de Madrid, que siguen apostando por los materiales reutilizables y por la movilidad sostenible. Sin embargo, esta apuesta por la reutilización y por una ciudad “libre de plástico” parecen haberle jugado una mala pasada al Ayuntamiento de Getafe.</p><p><strong>etiquetas</strong>: getafe, plástico, greenwashing</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730859" >noticia original</a> (www.que.madrid)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730859.jpeg?1664776506" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730859</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730828</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Vrygtyp</meneame:user>
		<meneame:clicks>2023</meneame:clicks>
		<meneame:votes>124</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>922</meneame:karma>
		<meneame:comments>25</meneame:comments>
		<meneame:url>https://www.meneame.net/story/arbol-milenario-nos-conecta-mas-alla?utm_source=meneame_rss</meneame:url>
		<title>El árbol milenario que nos conecta con el más allá</title>
		<link>https://www.meneame.net/story/arbol-milenario-nos-conecta-mas-alla</link>
		<comments>https://www.meneame.net/story/arbol-milenario-nos-conecta-mas-alla</comments>
		<pubDate>Mon, 03 Oct 2022 09:10:09 +0000</pubDate>
		<dc:creator>Vrygtyp</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[tejo]]></category>
		<category><![CDATA[árbol]]></category>
		<category><![CDATA[milenario]]></category>
		<guid>https://www.meneame.net/story/arbol-milenario-nos-conecta-mas-alla</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730828.jpeg?1664750826' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El tejo negro o tejo común (Taxus baccata) es una conífera que se puede encontrar en los sistemas montañosos septentrionales de la península Ibérica. De forma característica tiene hojas lineales, que se asemejan a agujas, dispuestas en dos hileras opuestas. Cuando la semilla madura aparece rodeada casi en su totalidad por un anillo o esferoide carnoso, de color rojo traslúcido, que se conoce como arilo.</p><p><strong>etiquetas</strong>: tejo, árbol, milenario</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730828" >noticia original</a> (www.abc.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730828.jpeg?1664750826" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730828</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730671</meneame:link_id>
		<meneame:sub>ciencia</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>felpeyu2</meneame:user>
		<meneame:clicks>8696</meneame:clicks>
		<meneame:votes>150</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>1172</meneame:karma>
		<meneame:comments>61</meneame:comments>
		<meneame:url>https://www.meneame.net/story/sorprendente-comportamiento-presentan-grupo-hormigas-guerreras?utm_source=meneame_rss</meneame:url>
		<title>El sorprendente comportamiento que presentan un grupo de hormigas guerreras al separarse del grupo</title>
		<link>https://www.meneame.net/story/sorprendente-comportamiento-presentan-grupo-hormigas-guerreras</link>
		<comments>https://www.meneame.net/story/sorprendente-comportamiento-presentan-grupo-hormigas-guerreras</comments>
		<pubDate>Mon, 03 Oct 2022 07:55:02 +0000</pubDate>
		<dc:creator>felpeyu2</dc:creator>
		<category><![CDATA[ciencia]]></category>
		<category><![CDATA[hormigas]]></category>
		<category><![CDATA[william beebe]]></category>
		<guid>https://www.meneame.net/story/sorprendente-comportamiento-presentan-grupo-hormigas-guerreras</guid>
		<description><![CDATA[<p>En concreto, cada hormiga sigue a la que está delante suyo y lo continúa haciendo a no ser que algo salga mal, ahí es cuando se comenzará a formar la espiral de la muerte, perdiendo la vida como si de un efecto dominó se tratase. Este fenómeno fue descrito por primera vez por el naturalista estadounidense William Beebe en 1921, quien observó una espiral gigantesca de 370 metros de circunferencia.</p><p><strong>etiquetas</strong>: hormigas, william beebe</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730671" >noticia original</a> (es.noticias.yahoo.com)</p>]]></description>
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730671</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730875</meneame:link_id>
		<meneame:sub>ocio</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Gringogo</meneame:user>
		<meneame:clicks>4017</meneame:clicks>
		<meneame:votes>379</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>2611</meneame:karma>
		<meneame:comments>29</meneame:comments>
		<meneame:url>https://www.meneame.net/story/error-judicial?utm_source=meneame_rss</meneame:url>
		<title>Error judicial</title>
		<link>https://www.meneame.net/story/error-judicial</link>
		<comments>https://www.meneame.net/story/error-judicial</comments>
		<pubDate>Mon, 03 Oct 2022 07:30:03 +0000</pubDate>
		<dc:creator>Gringogo</dc:creator>
		<category><![CDATA[ocio]]></category>
		<category><![CDATA[error judicial]]></category>
		<category><![CDATA[bernardo vergara]]></category>
		<category><![CDATA[viñeta]]></category>
		<category><![CDATA[sobreseimiento]]></category>
		<guid>https://www.meneame.net/story/error-judicial</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730875.jpeg?1664777886' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>A veces pienso que este partido tiene una flor en el culo.</p><p><strong>etiquetas</strong>: error judicial, bernardo vergara, viñeta, sobreseimiento</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730875" >noticia original</a> (www.eldiario.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730875.jpeg?1664777886" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730875</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730886</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>nereira</meneame:user>
		<meneame:clicks>1601</meneame:clicks>
		<meneame:votes>201</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>1596</meneame:karma>
		<meneame:comments>82</meneame:comments>
		<meneame:url>https://www.meneame.net/story/fallecido-varios-heridos-tiroteo-discoteca-fuenlabrada-madrid?utm_source=meneame_rss</meneame:url>
		<title>Un fallecido y varios heridos por un tiroteo en una discoteca de Fuenlabrada (Madrid)</title>
		<link>https://www.meneame.net/story/fallecido-varios-heridos-tiroteo-discoteca-fuenlabrada-madrid</link>
		<comments>https://www.meneame.net/story/fallecido-varios-heridos-tiroteo-discoteca-fuenlabrada-madrid</comments>
		<pubDate>Mon, 03 Oct 2022 07:25:19 +0000</pubDate>
		<dc:creator>nereira</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[fuenlabrada (madrid)]]></category>
		<category><![CDATA[discoteca]]></category>
		<category><![CDATA[tiroteo]]></category>
		<guid>https://www.meneame.net/story/fallecido-varios-heridos-tiroteo-discoteca-fuenlabrada-madrid</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730886.jpeg?1664779506' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Un joven de 21 años ha fallecido y cuatro personas han resultado heridas en la madrugada de este lunes tras un tiroteo en una discoteca en Fuenlabrada. El SUMMA 112 también ha atendido a un joven de 31 años por herida de arma de fuego en un hombro.También han atendido a dos jóvenes de 18 años, uno con herida de arma de fuego en un brazo y una contusión en la cabeza, y el otro con carácter leve, con cortes en la mano y en la cabeza</p><p><strong>etiquetas</strong>: fuenlabrada (madrid), discoteca, tiroteo</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730886" >noticia original</a> (www.europapress.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730886.jpeg?1664779506" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730886</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730757</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>doctoragridulce</meneame:user>
		<meneame:clicks>2198</meneame:clicks>
		<meneame:votes>223</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>1611</meneame:karma>
		<meneame:comments>44</meneame:comments>
		<meneame:url>https://www.meneame.net/story/aqui-vive-gente-1?utm_source=meneame_rss</meneame:url>
		<title>Aquí vive gente</title>
		<link>https://www.meneame.net/story/aqui-vive-gente-1</link>
		<comments>https://www.meneame.net/story/aqui-vive-gente-1</comments>
		<pubDate>Mon, 03 Oct 2022 06:50:19 +0000</pubDate>
		<dc:creator>doctoragridulce</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[canarias]]></category>
		<category><![CDATA[puerto rico]]></category>
		<category><![CDATA[bad bunny]]></category>
		<category><![CDATA[el apagón]]></category>
		<category><![CDATA[tenerife]]></category>
		<category><![CDATA[vecinos]]></category>
		<guid>https://www.meneame.net/story/aqui-vive-gente-1</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730757.jpeg?1664734806' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>(...) En el caso de Canarias, pasan por subvencionar a los ciudadanos alemanes para venir a Canarias a “refugiarse” del frío ante un invierno con escasez de recursos energéticos, o promocionan la isla como lugar ideal para la inversión y el teletrabajo por su calidad de vida. Pero esto es solo fachada: lo que de verdad atrae la llegada de población foránea dispuesta a invertir y teletrabajar desde aquí es la conocida como Zona Especial Canaria, un área de baja tributación fiscal para empresas que solo pagan el 4% en el Impuesto de sociedades.</p><p><strong>etiquetas</strong>: canarias, puerto rico, bad bunny, el apagón, tenerife, vecinos</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730757" >noticia original</a> (www.elsaltodiario.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730757.jpeg?1664734806" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730757</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730841</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>candonga1</meneame:user>
		<meneame:clicks>1653</meneame:clicks>
		<meneame:votes>1281</meneame:votes>
		<meneame:negatives>16</meneame:negatives>
		<meneame:karma>8159</meneame:karma>
		<meneame:comments>198</meneame:comments>
		<meneame:url>https://www.meneame.net/story/moreno-pide-gobierno-mil-millones-euros-combatir-sequia-tras-900?utm_source=meneame_rss</meneame:url>
		<title>Moreno pide al Gobierno mil millones de euros para combatir la sequía tras renunciar a 900 millones en impuestos propios</title>
		<link>https://www.meneame.net/story/moreno-pide-gobierno-mil-millones-euros-combatir-sequia-tras-900</link>
		<comments>https://www.meneame.net/story/moreno-pide-gobierno-mil-millones-euros-combatir-sequia-tras-900</comments>
		<pubDate>Mon, 03 Oct 2022 05:55:20 +0000</pubDate>
		<dc:creator>candonga1</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[moreno]]></category>
		<category><![CDATA[mil millones]]></category>
		<category><![CDATA[sequía]]></category>
		<category><![CDATA[renuncia]]></category>
		<category><![CDATA[impuestos propios]]></category>
		<guid>https://www.meneame.net/story/moreno-pide-gobierno-mil-millones-euros-combatir-sequia-tras-900</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730841.jpeg?1664770386' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>“¡Pongan el dinero de una vez por todas, que nos morimos de sed!”. Con este grito, Juan Manuel Moreno desató este domingo el aplauso unánime de los militantes convocados a la clausura del congreso del PP de Sevilla. El presidente de Andalucía acababa de cerrar un discurso en el que empezó sacando pecho por su polémica reforma fiscal -que ha puesto patas arriba el debate de política nacional y que detraerá 900 millones de euros de las arcas públicas andaluzas- y culminó reclamando al Gobierno central entre 500 y mil millones de euros ...</p><p><strong>etiquetas</strong>: moreno, mil millones, sequía, renuncia, impuestos propios</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730841" >noticia original</a> (www.eldiario.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730841.jpeg?1664770386" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730841</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730838</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>norton</meneame:user>
		<meneame:clicks>1281</meneame:clicks>
		<meneame:votes>318</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>2341</meneame:karma>
		<meneame:comments>81</meneame:comments>
		<meneame:url>https://www.meneame.net/story/brasil-segunda-vuelta-lula-gana-cuatro-puntos-bolsonaro?utm_source=meneame_rss</meneame:url>
		<title>Brasil, a segunda vuelta: Lula gana por cuatro puntos a un Bolsonaro reforzado</title>
		<link>https://www.meneame.net/story/brasil-segunda-vuelta-lula-gana-cuatro-puntos-bolsonaro</link>
		<comments>https://www.meneame.net/story/brasil-segunda-vuelta-lula-gana-cuatro-puntos-bolsonaro</comments>
		<pubDate>Mon, 03 Oct 2022 05:20:26 +0000</pubDate>
		<dc:creator>norton</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[bolsonaro]]></category>
		<category><![CDATA[lula]]></category>
		<category><![CDATA[brasil]]></category>
		<category><![CDATA[elecciones]]></category>
		<category><![CDATA[presidente]]></category>
		<category><![CDATA[segunda vuelta]]></category>
		<guid>https://www.meneame.net/story/brasil-segunda-vuelta-lula-gana-cuatro-puntos-bolsonaro</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730838.jpeg?1664759587' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El político ultraderechista ha desafiado todos los sondeos y ha mantenido durante horas una ventaja consistente sobre su adversario, hasta que el dirigente izquierdista ha logrado empatar y lograr casi cuatro puntos de margen.</p><p><strong>etiquetas</strong>: bolsonaro, lula, brasil, elecciones, presidente, segunda vuelta</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730838" >noticia original</a> (elpais.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730838.jpeg?1664759587" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730838</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730674</meneame:link_id>
		<meneame:sub>tecnología</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>sinelo</meneame:user>
		<meneame:clicks>5487</meneame:clicks>
		<meneame:votes>283</meneame:votes>
		<meneame:negatives>2</meneame:negatives>
		<meneame:karma>1929</meneame:karma>
		<meneame:comments>67</meneame:comments>
		<meneame:url>https://www.meneame.net/story/qwant-buscador-no-sabe-nada-ti-eso-cambia-todo?utm_source=meneame_rss</meneame:url>
		<title>Qwant: el buscador que no sabe nada de ti, ¡y eso lo cambia todo!</title>
		<link>https://www.meneame.net/story/qwant-buscador-no-sabe-nada-ti-eso-cambia-todo</link>
		<comments>https://www.meneame.net/story/qwant-buscador-no-sabe-nada-ti-eso-cambia-todo</comments>
		<pubDate>Mon, 03 Oct 2022 04:55:07 +0000</pubDate>
		<dc:creator>sinelo</dc:creator>
		<category><![CDATA[tecnología]]></category>
		<category><![CDATA[buscador]]></category>
		<category><![CDATA[privacidad]]></category>
		<category><![CDATA[francés]]></category>
		<guid>https://www.meneame.net/story/qwant-buscador-no-sabe-nada-ti-eso-cambia-todo</guid>
		<description><![CDATA[<p>Estamos contentos de no conocerte (juego de palabras, original: Glad we didn't get to know you) El buscador que no sabe nada de ti: a) no se registran tus búsquedas b) no se vende tu información personal c) no se registra tu navegación con fines de márketing Tus datos personales son tunegocio. El uso del buscador qwant es totalmente confidencial</p><p><strong>etiquetas</strong>: buscador, privacidad, francés</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730674" >noticia original</a> (www.qwant.com)</p>]]></description>
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730674</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730814</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>me_joneo_pensando_en_ti</meneame:user>
		<meneame:clicks>2193</meneame:clicks>
		<meneame:votes>115</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>622</meneame:karma>
		<meneame:comments>4</meneame:comments>
		<meneame:url>https://www.meneame.net/story/somos-documentales-avion-novias?utm_source=meneame_rss</meneame:url>
		<title>Somos documentales - El avión de las novias</title>
		<link>https://www.meneame.net/story/somos-documentales-avion-novias</link>
		<comments>https://www.meneame.net/story/somos-documentales-avion-novias</comments>
		<pubDate>Mon, 03 Oct 2022 08:10:08 +0000</pubDate>
		<dc:creator>me_joneo_pensando_en_ti</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[documental]]></category>
		<category><![CDATA[rtve]]></category>
		<category><![CDATA[iglesia]]></category>
		<category><![CDATA[australia]]></category>
		<category><![CDATA[franquismo]]></category>
		<category><![CDATA[inmigración]]></category>
		<guid>https://www.meneame.net/story/somos-documentales-avion-novias</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730814.jpeg?1664746326' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>De 1959 a 1964, la Operación Marta, un programa de inmigración iniciado por la Iglesia Católica de Australia llevó 700 españolas a aquel país en un viaje lleno de incertidumbres del que era muy difícil volver. Sesenta años después, exploramos aquella singular aventura con algunas de sus protagonistas.</p><p><strong>etiquetas</strong>: documental, rtve, iglesia, australia, franquismo, inmigración</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730814" >noticia original</a> (www.rtve.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730814.jpeg?1664746326" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730814</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730766</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>skout</meneame:user>
		<meneame:clicks>733</meneame:clicks>
		<meneame:votes>368</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>2341</meneame:karma>
		<meneame:comments>48</meneame:comments>
		<meneame:url>https://www.meneame.net/story/denuncian-vandalizacion-cuatro-vehiculos-ecologistas-trassierra?utm_source=meneame_rss</meneame:url>
		<title>Denuncian la vandalización de cuatro vehículos de ecologistas en Trassierra</title>
		<link>https://www.meneame.net/story/denuncian-vandalizacion-cuatro-vehiculos-ecologistas-trassierra</link>
		<comments>https://www.meneame.net/story/denuncian-vandalizacion-cuatro-vehiculos-ecologistas-trassierra</comments>
		<pubDate>Mon, 03 Oct 2022 00:00:37 +0000</pubDate>
		<dc:creator>skout</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[ecologistas]]></category>
		<category><![CDATA[córdoba]]></category>
		<category><![CDATA[vandalizan]]></category>
		<category><![CDATA[vehículos]]></category>
		<category><![CDATA[caminos públicos]]></category>
		<guid>https://www.meneame.net/story/denuncian-vandalizacion-cuatro-vehiculos-ecologistas-trassierra</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730766.jpeg?1664736786' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Este  domingo, integrantes de la plataforma ecologista A Desalambrar, que trabaja desde hace dos décadas por el tránsito libre en los caminos públicos y vías pecuarias de Córdoba, habían organizado una de sus rutas reivindicativas por la barriada periférica de Santa María de Trassierra. Al finalizar la misma, han hallado cuatro de sus vehículos vandalizados, con las ruedas pinchadas, además de inscripciones rayadas donde se podía leer la palabra 'Vox' e intermitentes rotos</p><p><strong>etiquetas</strong>: ecologistas, córdoba, vandalizan, vehículos, caminos públicos</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730766" >noticia original</a> (cordopolis.eldiario.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730766.jpeg?1664736786" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730766</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730783</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Beltenebros</meneame:user>
		<meneame:clicks>377</meneame:clicks>
		<meneame:votes>280</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>1872</meneame:karma>
		<meneame:comments>44</meneame:comments>
		<meneame:url>https://www.meneame.net/story/colombia-diez-grupos-armados-anuncian-cese-fuego-unilateral-paz?utm_source=meneame_rss</meneame:url>
		<title>Colombia: diez grupos armados anuncian un cese al fuego unilateral para negociar la paz</title>
		<link>https://www.meneame.net/story/colombia-diez-grupos-armados-anuncian-cese-fuego-unilateral-paz</link>
		<comments>https://www.meneame.net/story/colombia-diez-grupos-armados-anuncian-cese-fuego-unilateral-paz</comments>
		<pubDate>Mon, 03 Oct 2022 00:00:03 +0000</pubDate>
		<dc:creator>Beltenebros</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[colombia]]></category>
		<category><![CDATA[grupos armados]]></category>
		<category><![CDATA[farc]]></category>
		<category><![CDATA[clan del golfo]]></category>
		<category><![CDATA[petro]]></category>
		<guid>https://www.meneame.net/story/colombia-diez-grupos-armados-anuncian-cese-fuego-unilateral-paz</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730783.jpeg?1664741046' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Al menos 10 grupos armados, incluidas las dos disidencias de las FARC y el Clan del Golfo, iniciaron un cese al fuego unilateral en Colombia como parte de la exploración del gobierno de Gustavo Petro para alcanzar &quot;una paz total&quot;, anunció el miércoles al máximo responsable de los acercamientos con esas organizaciones. Entre los grupos armados que han expresado su voluntad de cese al fuego y de suspender la violencia se encuentran las dos disidencias de la antigua guerrilla de las Fuerzas Armadas Revolucionarias de Colombia (FARC) ...</p><p><strong>etiquetas</strong>: colombia, grupos armados, farc, clan del golfo, petro</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730783" >noticia original</a> (www.ambito.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730783.jpeg?1664741046" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730783</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730794</meneame:link_id>
		<meneame:sub>politica</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Andaui</meneame:user>
		<meneame:clicks>868</meneame:clicks>
		<meneame:votes>284</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>1853</meneame:karma>
		<meneame:comments>30</meneame:comments>
		<meneame:url>https://www.meneame.net/story/quienes-somos-aragon-labordeta-fue-mas-todos-hombres?utm_source=meneame_rss</meneame:url>
		<title>Para quienes somos de Aragón, Labordeta fue el más de todos los hombres</title>
		<link>https://www.meneame.net/story/quienes-somos-aragon-labordeta-fue-mas-todos-hombres</link>
		<comments>https://www.meneame.net/story/quienes-somos-aragon-labordeta-fue-mas-todos-hombres</comments>
		<pubDate>Sun, 02 Oct 2022 23:30:02 +0000</pubDate>
		<dc:creator>Andaui</dc:creator>
		<category><![CDATA[politica]]></category>
		<category><![CDATA[políticos]]></category>
		<category><![CDATA[labordeta]]></category>
		<category><![CDATA[aragón]]></category>
		<guid>https://www.meneame.net/story/quienes-somos-aragon-labordeta-fue-mas-todos-hombres</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730794.jpeg?1664742366' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Fue uno de esos escasos políticos que lucía una alta cultura de ramalazos tabernarios, frente a la baja cultura de ramalazos esnobistas que muchos otros despachan. Labordeta fue un erudito de almuerzo al sol y no un sabelotodo de menú de degustación.</p><p><strong>etiquetas</strong>: políticos, labordeta, aragón</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730794" >noticia original</a> (www.elconfidencial.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730794.jpeg?1664742366" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730794</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730780</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Beltenebros</meneame:user>
		<meneame:clicks>473</meneame:clicks>
		<meneame:votes>464</meneame:votes>
		<meneame:negatives>3</meneame:negatives>
		<meneame:karma>2896</meneame:karma>
		<meneame:comments>48</meneame:comments>
		<meneame:url>https://www.meneame.net/story/fuerzas-ocupacion-israelies-asaltan-escuela-primaria-jalil?utm_source=meneame_rss</meneame:url>
		<title>Fuerzas de ocupación israelíes asaltan una escuela primaria en Al-Jalil (Hebrón) y golpean a maestros y alumnos</title>
		<link>https://www.meneame.net/story/fuerzas-ocupacion-israelies-asaltan-escuela-primaria-jalil</link>
		<comments>https://www.meneame.net/story/fuerzas-ocupacion-israelies-asaltan-escuela-primaria-jalil</comments>
		<pubDate>Sun, 02 Oct 2022 23:00:21 +0000</pubDate>
		<dc:creator>Beltenebros</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[palestina]]></category>
		<category><![CDATA[israel]]></category>
		<category><![CDATA[hebrón]]></category>
		<category><![CDATA[escuela]]></category>
		<category><![CDATA[maestros]]></category>
		<category><![CDATA[alumnos]]></category>
		<guid>https://www.meneame.net/story/fuerzas-ocupacion-israelies-asaltan-escuela-primaria-jalil</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730780.jpeg?1664739546' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El director general del Departamento de Educación de Al-Jalil, Atef al-Yaqmal, declaró que las tropas israelíes asaltaron la escuela primaria Al-Hayriya el jueves e irrumpieron en las aulas, causando pánico y miedo entre los estudiantes. Agregó que las fuerzas golpearon a maestros y estudiantes y les rociaron la cara con pimienta mientras estos empujaban hacia atrás a los soldados israelíes. Un maestro, identificado como Ihab al-Raybi, sufrió contusiones en la mano. Los soldados también detuvieron e interrogaron a dos escolares después de...</p><p><strong>etiquetas</strong>: palestina, israel, hebrón, escuela, maestros,  alumnos</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730780" >noticia original</a> (spanish.almanar.com.lb)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730780.jpeg?1664739546" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730780</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730798</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Gotsel</meneame:user>
		<meneame:clicks>5067</meneame:clicks>
		<meneame:votes>548</meneame:votes>
		<meneame:negatives>16</meneame:negatives>
		<meneame:karma>3616</meneame:karma>
		<meneame:comments>316</meneame:comments>
		<meneame:url>https://www.meneame.net/story/respuesta-piikara-sobre-prostituta-porque-da-gana-estoy-hasta?utm_source=meneame_rss</meneame:url>
		<title>La respuesta de Piikara sobre por qué es prostituta: &#34;Porque me da la gana, estoy hasta el higo de tener tres trabajos a la vez&#34;</title>
		<link>https://www.meneame.net/story/respuesta-piikara-sobre-prostituta-porque-da-gana-estoy-hasta</link>
		<comments>https://www.meneame.net/story/respuesta-piikara-sobre-prostituta-porque-da-gana-estoy-hasta</comments>
		<pubDate>Sun, 02 Oct 2022 22:40:20 +0000</pubDate>
		<dc:creator>Gotsel</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[prostitución]]></category>
		<category><![CDATA[precariedad laboral]]></category>
		<category><![CDATA[trabajo]]></category>
		<guid>https://www.meneame.net/story/respuesta-piikara-sobre-prostituta-porque-da-gana-estoy-hasta</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730798.jpeg?1664747102' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>&quot;Porque me da la gana&quot;, responde rotunda Piikara, que afirma que &quot;el trabajo es precario&quot;: &quot;Estoy hasta el higo de tener tres trabajos a la vez. Me he levantado a las 6 de la mañana y he llegado a mi casa a las 11 de la noche y he librado 1 día cada 14. Hay un estado capitalista que me dice que tengo unas necesidades y que me explota. El sistema capitalista es el proxeneta&quot;</p><p><strong>etiquetas</strong>: prostitución, precariedad laboral, trabajo</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730798" >noticia original</a> (www.lasexta.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730798.jpeg?1664747102" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730798</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730775</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>IndominusRex</meneame:user>
		<meneame:clicks>1135</meneame:clicks>
		<meneame:votes>98</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>1056</meneame:karma>
		<meneame:comments>11</meneame:comments>
		<meneame:url>https://www.meneame.net/story/noche-miedo-fright-night-1985?utm_source=meneame_rss</meneame:url>
		<title>Noche de Miedo (Fright Night, 1985)</title>
		<link>https://www.meneame.net/story/noche-miedo-fright-night-1985</link>
		<comments>https://www.meneame.net/story/noche-miedo-fright-night-1985</comments>
		<pubDate>Sun, 02 Oct 2022 22:25:24 +0000</pubDate>
		<dc:creator>IndominusRex</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[cine]]></category>
		<category><![CDATA[terror]]></category>
		<category><![CDATA[fright night]]></category>
		<category><![CDATA[noche de miedo]]></category>
		<category><![CDATA[clásico]]></category>
		<category><![CDATA[vampiros]]></category>
		<category><![CDATA[1985]]></category>
		<guid>https://www.meneame.net/story/noche-miedo-fright-night-1985</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730775.jpeg?1664738406' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Noche de miedo es un título clave para redefinir la actualización del vampiro en el cine. La película producida por Columbia Pictures en 1985 mezcla de manera eficiente los géneros del terror y la comedia, tirando más hacia el homenaje que hacia la parodia. La dirigió Tom Holland además de escribir el guion. Cuenta con las actuaciones de Roddy McDowall, Chris Sarandon, William Ragsdale, Amanda Bearse y Stephen Geoffreys.</p><p><strong>etiquetas</strong>: cine, terror, fright night, noche de miedo, clásico, vampiros, 1985</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730775" >noticia original</a> (lamirillac.blogspot.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730775.jpeg?1664738406" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730775</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730759</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Lastcause</meneame:user>
		<meneame:clicks>2512</meneame:clicks>
		<meneame:votes>198</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>363</meneame:karma>
		<meneame:comments>16</meneame:comments>
		<meneame:url>https://www.meneame.net/story/redescubren-turquia-planta-medicinal-milagrosa-desaparecida-hace?utm_source=meneame_rss</meneame:url>
		<title>Redescubren en Turquía una planta medicinal &#34;milagrosa&#34; desaparecida hace 2.000 años</title>
		<link>https://www.meneame.net/story/redescubren-turquia-planta-medicinal-milagrosa-desaparecida-hace</link>
		<comments>https://www.meneame.net/story/redescubren-turquia-planta-medicinal-milagrosa-desaparecida-hace</comments>
		<pubDate>Sun, 02 Oct 2022 22:15:21 +0000</pubDate>
		<dc:creator>Lastcause</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[turquia]]></category>
		<category><![CDATA[especie]]></category>
		<category><![CDATA[desaparecida]]></category>
		<category><![CDATA[silfio]]></category>
		<category><![CDATA[redescubren]]></category>
		<category><![CDATA[grecia]]></category>
		<category><![CDATA[roma]]></category>
		<guid>https://www.meneame.net/story/redescubren-turquia-planta-medicinal-milagrosa-desaparecida-hace</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730759.jpeg?1664735766' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>En la antigua Grecia se usaba como especia, perfume, afrodisíaco, anticonceptivo y medicina</p><p><strong>etiquetas</strong>: turquia, especie, desaparecida, silfio, redescubren, grecia, roma</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730759" >noticia original</a> (www.levante-emv.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730759.jpeg?1664735766" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730759</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730811</meneame:link_id>
		<meneame:sub>ocio</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Ariesun24</meneame:user>
		<meneame:clicks>1324</meneame:clicks>
		<meneame:votes>118</meneame:votes>
		<meneame:negatives>2</meneame:negatives>
		<meneame:karma>967</meneame:karma>
		<meneame:comments>36</meneame:comments>
		<meneame:url>https://www.meneame.net/story/parodia-nacional-constantino-romero-1996?utm_source=meneame_rss</meneame:url>
		<title>&#34;La parodia nacional&#34; con Constantino Romero (1996)</title>
		<link>https://www.meneame.net/story/parodia-nacional-constantino-romero-1996</link>
		<comments>https://www.meneame.net/story/parodia-nacional-constantino-romero-1996</comments>
		<pubDate>Sun, 02 Oct 2022 22:15:02 +0000</pubDate>
		<dc:creator>Ariesun24</dc:creator>
		<category><![CDATA[ocio]]></category>
		<category><![CDATA[parodia]]></category>
		<category><![CDATA[nacional]]></category>
		<category><![CDATA[constantino]]></category>
		<category><![CDATA[romero]]></category>
		<guid>https://www.meneame.net/story/parodia-nacional-constantino-romero-1996</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730811.jpeg?1664745247' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Un programa de formato humorístico-musical presentado por Constantino Romero en Antena 3.</p><p><strong>etiquetas</strong>: parodia, nacional, constantino, romero</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730811" >noticia original</a> (www.youtube.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730811.jpeg?1664745247" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730811</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730816</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Lastcause</meneame:user>
		<meneame:clicks>6802</meneame:clicks>
		<meneame:votes>142</meneame:votes>
		<meneame:negatives>2</meneame:negatives>
		<meneame:karma>1283</meneame:karma>
		<meneame:comments>16</meneame:comments>
		<meneame:url>https://www.meneame.net/story/hubble-vs-james-webb-nasa-apunto-misma-galaxia-ambos-telescopios?utm_source=meneame_rss</meneame:url>
		<title>&#34;Hubble vs James Webb&#34;: NASA apuntó a la misma galaxia con ambos telescopios y este fue el resultado</title>
		<link>https://www.meneame.net/story/hubble-vs-james-webb-nasa-apunto-misma-galaxia-ambos-telescopios</link>
		<comments>https://www.meneame.net/story/hubble-vs-james-webb-nasa-apunto-misma-galaxia-ambos-telescopios</comments>
		<pubDate>Sun, 02 Oct 2022 21:50:25 +0000</pubDate>
		<dc:creator>Lastcause</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[nasa]]></category>
		<category><![CDATA[hubble]]></category>
		<category><![CDATA[vs]]></category>
		<category><![CDATA[james webb]]></category>
		<category><![CDATA[comparación]]></category>
		<category><![CDATA[resultado]]></category>
		<guid>https://www.meneame.net/story/hubble-vs-james-webb-nasa-apunto-misma-galaxia-ambos-telescopios</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730816.jpeg?1664746626' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>La NASA capturó imágenes de la galaxia espiral IC 5332 con el telescopio Hubble y el James Webb, comparando así las capacidades de cada uno y como se complementan.</p><p><strong>etiquetas</strong>: nasa, hubble, vs,  james webb, comparación, resultado</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730816" >noticia original</a> (www.biobiochile.cl)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730816.jpeg?1664746626" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730816</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730810</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>luspagnolu</meneame:user>
		<meneame:clicks>888</meneame:clicks>
		<meneame:votes>339</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>2284</meneame:karma>
		<meneame:comments>49</meneame:comments>
		<meneame:url>https://www.meneame.net/story/sevilla-declara-este-lunes-alerta-sequia-prohibe-usar-agua-fines?utm_source=meneame_rss</meneame:url>
		<title>Sevilla declara este lunes la alerta por sequía y prohibe usar agua para fines no esenciales</title>
		<link>https://www.meneame.net/story/sevilla-declara-este-lunes-alerta-sequia-prohibe-usar-agua-fines</link>
		<comments>https://www.meneame.net/story/sevilla-declara-este-lunes-alerta-sequia-prohibe-usar-agua-fines</comments>
		<pubDate>Sun, 02 Oct 2022 21:45:20 +0000</pubDate>
		<dc:creator>luspagnolu</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[sevilla]]></category>
		<category><![CDATA[lunes]]></category>
		<category><![CDATA[alerta]]></category>
		<category><![CDATA[sequía]]></category>
		<category><![CDATA[prohibición]]></category>
		<category><![CDATA[agua]]></category>
		<guid>https://www.meneame.net/story/sevilla-declara-este-lunes-alerta-sequia-prohibe-usar-agua-fines</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730810.jpeg?1664744586' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>La empresa metropolitana de abastecimiento y saneamiento de Sevilla (Emasesa) anuncia una medida que implica la prohibición del uso del agua para fines ornamentales o recreativos, contemplando un régimen sancionador.</p><p><strong>etiquetas</strong>: sevilla, lunes, alerta, sequía, prohibición, agua</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730810" >noticia original</a> (www.eldiario.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730810.jpeg?1664744586" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730810</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730746</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>exducados</meneame:user>
		<meneame:clicks>1913</meneame:clicks>
		<meneame:votes>398</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>2591</meneame:karma>
		<meneame:comments>41</meneame:comments>
		<meneame:url>https://www.meneame.net/story/secretario-tesoro-britanico-celebro-presupuesto-ricos-champan?utm_source=meneame_rss</meneame:url>
		<title>El secretario del Tesoro británico celebró el &#34;presupuesto de los ricos&#34; con champán en una fiesta de financieros</title>
		<link>https://www.meneame.net/story/secretario-tesoro-britanico-celebro-presupuesto-ricos-champan</link>
		<comments>https://www.meneame.net/story/secretario-tesoro-britanico-celebro-presupuesto-ricos-champan</comments>
		<pubDate>Sun, 02 Oct 2022 21:15:02 +0000</pubDate>
		<dc:creator>exducados</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[secretario]]></category>
		<category><![CDATA[tesoro]]></category>
		<category><![CDATA[británico]]></category>
		<category><![CDATA[celebró]]></category>
		<category><![CDATA[presupuesto]]></category>
		<category><![CDATA[ricos]]></category>
		<guid>https://www.meneame.net/story/secretario-tesoro-britanico-celebro-presupuesto-ricos-champan</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730746.jpeg?1664732106' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El secretario del Tesoro británico, Kwasi Kwarteng, celebró con champán y en una fiesta de financieros la presentación del así llamado &quot;presupuesto de los ricos&quot;...</p><p><strong>etiquetas</strong>: secretario, tesoro, británico, celebró, presupuesto, ricos</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730746" >noticia original</a> (www.elmundo.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730746.jpeg?1664732106" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730746</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730473</meneame:link_id>
		<meneame:sub>politica</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Achtung</meneame:user>
		<meneame:clicks>602</meneame:clicks>
		<meneame:votes>224</meneame:votes>
		<meneame:negatives>5</meneame:negatives>
		<meneame:karma>1493</meneame:karma>
		<meneame:comments>88</meneame:comments>
		<meneame:url>https://www.meneame.net/story/congresistas-estadounidenses-piden-sanciones-argelia?utm_source=meneame_rss</meneame:url>
		<title>Congresistas estadounidenses piden sanciones para Argelia</title>
		<link>https://www.meneame.net/story/congresistas-estadounidenses-piden-sanciones-argelia</link>
		<comments>https://www.meneame.net/story/congresistas-estadounidenses-piden-sanciones-argelia</comments>
		<pubDate>Sun, 02 Oct 2022 20:45:03 +0000</pubDate>
		<dc:creator>Achtung</dc:creator>
		<category><![CDATA[politica]]></category>
		<category><![CDATA[eeuu]]></category>
		<category><![CDATA[sanciones]]></category>
		<category><![CDATA[argelia]]></category>
		<guid>https://www.meneame.net/story/congresistas-estadounidenses-piden-sanciones-argelia</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ec/media_thumb-link-3730473.jpeg?1664665686' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Veintisiete congresistas estadounidenses pidieron una acción &quot;inmediata&quot; para sancionar al gobierno argelino por su participación en la compra de armas rusas. En una carta bipartidista dirigida al Secretario de Estado Antony Blinken el jueves, congresistas de ambos lados del pasillo recordaron la extravagante compra de armas rusas por parte de Argelia, que sólo el año pasado ascendió a 7.000 millones de dólares.</p><p><strong>etiquetas</strong>: eeuu, sanciones, argelia</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730473" >noticia original</a> (www.moroccoworldnews.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ec/media_thumb-link-3730473.jpeg?1664665686" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730473</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730748</meneame:link_id>
		<meneame:sub>ciencia</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Lastcause</meneame:user>
		<meneame:clicks>6642</meneame:clicks>
		<meneame:votes>247</meneame:votes>
		<meneame:negatives>23</meneame:negatives>
		<meneame:karma>1465</meneame:karma>
		<meneame:comments>18</meneame:comments>
		<meneame:url>https://www.meneame.net/story/plena-sequia-historica-estamos-recurriendo-tecnologia-medieval?utm_source=meneame_rss</meneame:url>
		<title>En plena sequía histórica, estamos recurriendo a una tecnología medieval casi olvidada: &#34;sembrar&#34; agua</title>
		<link>https://www.meneame.net/story/plena-sequia-historica-estamos-recurriendo-tecnologia-medieval</link>
		<comments>https://www.meneame.net/story/plena-sequia-historica-estamos-recurriendo-tecnologia-medieval</comments>
		<pubDate>Sun, 02 Oct 2022 20:25:02 +0000</pubDate>
		<dc:creator>Lastcause</dc:creator>
		<category><![CDATA[ciencia]]></category>
		<category><![CDATA[sembrar]]></category>
		<category><![CDATA[agua]]></category>
		<category><![CDATA[tecnica]]></category>
		<category><![CDATA[medieval]]></category>
		<category><![CDATA[tecnología]]></category>
		<guid>https://www.meneame.net/story/plena-sequia-historica-estamos-recurriendo-tecnologia-medieval</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730748.jpeg?1664732406' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Una tecnología medieval... que funciona A diferencia de las acequias normales, las acequias de careo no sirven para distribuir &quot;espacialmente&quot; el agua. Su principal función no es llevar el preciado líquido de los ríos, estanques y torrentes a los terrenos de cultivo. Su objetivo es que</p><p><strong>etiquetas</strong>: sembrar, agua, tecnica, medieval, tecnología</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730748" >noticia original</a> (www.xataka.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730748.jpeg?1664732406" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730748</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730673</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>MikeR</meneame:user>
		<meneame:clicks>4291</meneame:clicks>
		<meneame:votes>189</meneame:votes>
		<meneame:negatives>0</meneame:negatives>
		<meneame:karma>1330</meneame:karma>
		<meneame:comments>26</meneame:comments>
		<meneame:url>https://www.meneame.net/story/cuando-ingenieros-informaticos-comenzaron-tirarse-desde-quinta?utm_source=meneame_rss</meneame:url>
		<title>Cuando los ingenieros informáticos comenzaron a tirarse desde la quinta planta</title>
		<link>https://www.meneame.net/story/cuando-ingenieros-informaticos-comenzaron-tirarse-desde-quinta</link>
		<comments>https://www.meneame.net/story/cuando-ingenieros-informaticos-comenzaron-tirarse-desde-quinta</comments>
		<pubDate>Sun, 02 Oct 2022 20:30:08 +0000</pubDate>
		<dc:creator>MikeR</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[cómic]]></category>
		<category><![CDATA[renault]]></category>
		<category><![CDATA[suicidios]]></category>
		<guid>https://www.meneame.net/story/cuando-ingenieros-informaticos-comenzaron-tirarse-desde-quinta</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ec/media_thumb-link-3730673.jpeg?1664721546' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El cómic 'Cuando el trabajo mata' recoge la historia del suicidio de un trabajador de Renault en 2006 por el cual la empresa fue condenada</p><p><strong>etiquetas</strong>: cómic, renault, suicidios</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730673" >noticia original</a> (www.elconfidencial.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ec/media_thumb-link-3730673.jpeg?1664721546" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730673</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730601</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Achtung</meneame:user>
		<meneame:clicks>3204</meneame:clicks>
		<meneame:votes>240</meneame:votes>
		<meneame:negatives>6</meneame:negatives>
		<meneame:karma>1616</meneame:karma>
		<meneame:comments>121</meneame:comments>
		<meneame:url>https://www.meneame.net/story/acabo-chollo-devolver-compras-internet-dejara-ser-gratis?utm_source=meneame_rss</meneame:url>
		<title>Se acabó el chollo: devolver las compras de Internet dejará de ser gratis</title>
		<link>https://www.meneame.net/story/acabo-chollo-devolver-compras-internet-dejara-ser-gratis</link>
		<comments>https://www.meneame.net/story/acabo-chollo-devolver-compras-internet-dejara-ser-gratis</comments>
		<pubDate>Sun, 02 Oct 2022 20:05:02 +0000</pubDate>
		<dc:creator>Achtung</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[devoluciones]]></category>
		<category><![CDATA[compras]]></category>
		<category><![CDATA[internet]]></category>
		<category><![CDATA[gratis]]></category>
		<guid>https://www.meneame.net/story/acabo-chollo-devolver-compras-internet-dejara-ser-gratis</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ec/media_thumb-link-3730601.jpeg?1664706426' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Llegó el día que muchos compradores por Internet no querían, las devoluciones gratuitas parecen estar llegando a su fin. Si hasta ahora las compras online ofrecían devoluciones totalmente gratis, dependiendo del producto que hubiésemos comprado, lo cierto es que ya son varias las empresas que se han ido sumando a cobrar por estos gastos debido al coste de la logística.</p><p><strong>etiquetas</strong>: devoluciones, compras, internet, gratis</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730601" >noticia original</a> (www.adslzone.net)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ec/media_thumb-link-3730601.jpeg?1664706426" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730601</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730769</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>ccguy</meneame:user>
		<meneame:clicks>1658</meneame:clicks>
		<meneame:votes>73</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>537</meneame:karma>
		<meneame:comments>40</meneame:comments>
		<meneame:url>https://www.meneame.net/story/raras-fotos-levantamiento-varsovia-1944-eng?utm_source=meneame_rss</meneame:url>
		<title>Raras fotos del levantamiento de Varsovia de 1944 [ENG]</title>
		<link>https://www.meneame.net/story/raras-fotos-levantamiento-varsovia-1944-eng</link>
		<comments>https://www.meneame.net/story/raras-fotos-levantamiento-varsovia-1944-eng</comments>
		<pubDate>Mon, 03 Oct 2022 01:15:06 +0000</pubDate>
		<dc:creator>ccguy</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[varsovia]]></category>
		<category><![CDATA[levantamiento]]></category>
		<guid>https://www.meneame.net/story/raras-fotos-levantamiento-varsovia-1944-eng</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730769.jpeg?1664736606' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El Levantamiento de Varsovia de 1944 fue una heroica y trágica lucha de 63 días para liberar Varsovia de la ocupación alemana en la Segunda Guerra Mundial. El levantamiento comenzó el 1 de agosto de 1944 como parte de la Operación Tempestad, lanzada a nivel nacional en el momento de la ofensiva soviética de Lublin-Brest. Los principales objetivos polacos eran expulsar a los alemanes de Varsovia y ayudar a los aliados a derrotar a Alemania. Un objetivo político adicional del Estado Clandestino Polaco era liberar la capital de Polonia (...)</p><p><strong>etiquetas</strong>: varsovia, levantamiento</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730769" >noticia original</a> (rarehistoricalphotos.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730769.jpeg?1664736606" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730769</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730562</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Maneutics</meneame:user>
		<meneame:clicks>1588</meneame:clicks>
		<meneame:votes>222</meneame:votes>
		<meneame:negatives>5</meneame:negatives>
		<meneame:karma>1657</meneame:karma>
		<meneame:comments>77</meneame:comments>
		<meneame:url>https://www.meneame.net/story/espana-francia-alemania-nuevos-poderes-europa-eng?utm_source=meneame_rss</meneame:url>
		<title>España, Francia y Alemania: ¿los nuevos poderes de Europa? [Eng]</title>
		<link>https://www.meneame.net/story/espana-francia-alemania-nuevos-poderes-europa-eng</link>
		<comments>https://www.meneame.net/story/espana-francia-alemania-nuevos-poderes-europa-eng</comments>
		<pubDate>Sun, 02 Oct 2022 19:30:03 +0000</pubDate>
		<dc:creator>Maneutics</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[españa]]></category>
		<category><![CDATA[francia]]></category>
		<category><![CDATA[alemania]]></category>
		<category><![CDATA[europa]]></category>
		<guid>https://www.meneame.net/story/espana-francia-alemania-nuevos-poderes-europa-eng</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ec/media_thumb-link-3730562.jpeg?1664701266' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Con el Reino Unido fuera, hay un espacio en Europa para que un nuevo país entre en el &quot;top 3&quot; no oficial. En este vídeo explicamos por qué España podría ser el país que ocupe ese lugar, analizando su liderazgo, sus políticas y su falta de euroescepticismo.</p><p><strong>etiquetas</strong>: españa, francia, alemania, europa</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730562" >noticia original</a> (www.youtube.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ec/media_thumb-link-3730562.jpeg?1664701266" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730562</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730753</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>falcoblau</meneame:user>
		<meneame:clicks>647</meneame:clicks>
		<meneame:votes>267</meneame:votes>
		<meneame:negatives>27</meneame:negatives>
		<meneame:karma>289</meneame:karma>
		<meneame:comments>91</meneame:comments>
		<meneame:url>https://www.meneame.net/story/castellers-vilafranca-ganan-concurs-castells-2022?utm_source=meneame_rss</meneame:url>
		<title>Los Castellers de Vilafranca ganan el Concurs de Castells 2022</title>
		<link>https://www.meneame.net/story/castellers-vilafranca-ganan-concurs-castells-2022</link>
		<comments>https://www.meneame.net/story/castellers-vilafranca-ganan-concurs-castells-2022</comments>
		<pubDate>Sun, 02 Oct 2022 19:10:23 +0000</pubDate>
		<dc:creator>falcoblau</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[castells]]></category>
		<category><![CDATA[castellers de vilafranca]]></category>
		<category><![CDATA[tarragona]]></category>
		<guid>https://www.meneame.net/story/castellers-vilafranca-ganan-concurs-castells-2022</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ed/media_thumb-link-3730753.jpeg?1664733426' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Los Castellers de Vilafranca se han proclamado ganadores del Concurs de castells de Tarragona 2022, destronando así al Colla Vella dels Xiquets de Valls, ganadores en la última edición celebrada en el 2018. &quot;Els Verds&quot; han descargado el 3 de 10 con folre y manilles y el 5 de 9 con folre. También han cargado el 4 de 9 net en una decisiva cuarta ronda. El podio lo completan la Colla Joves Xiquets de Valls, en segunda posición, y el Colla Vella dels Xiquets de Valls, en tercera.</p><p><strong>etiquetas</strong>: castells, castellers de vilafranca, tarragona</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730753" >noticia original</a> (www.elnacional.cat)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ed/media_thumb-link-3730753.jpeg?1664733426" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730753</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730654</meneame:link_id>
		<meneame:sub>actualidad</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>karma_burner</meneame:user>
		<meneame:clicks>3659</meneame:clicks>
		<meneame:votes>252</meneame:votes>
		<meneame:negatives>21</meneame:negatives>
		<meneame:karma>1526</meneame:karma>
		<meneame:comments>43</meneame:comments>
		<meneame:url>https://www.meneame.net/story/mujer-rusa-hizo-famosa-despues-acosar-refugiados-ucranianos-sera?utm_source=meneame_rss</meneame:url>
		<title>La mujer rusa que se hizo famosa después de acosar a los refugiados ucranianos en las calles de Europa será deportada de Alemania</title>
		<link>https://www.meneame.net/story/mujer-rusa-hizo-famosa-despues-acosar-refugiados-ucranianos-sera</link>
		<comments>https://www.meneame.net/story/mujer-rusa-hizo-famosa-despues-acosar-refugiados-ucranianos-sera</comments>
		<pubDate>Sun, 02 Oct 2022 18:45:03 +0000</pubDate>
		<dc:creator>karma_burner</dc:creator>
		<category><![CDATA[actualidad]]></category>
		<category><![CDATA[rusia]]></category>
		<category><![CDATA[ucrania]]></category>
		<category><![CDATA[karma]]></category>
		<category><![CDATA[jajaja]]></category>
		<guid>https://www.meneame.net/story/mujer-rusa-hizo-famosa-despues-acosar-refugiados-ucranianos-sera</guid>
		<description><![CDATA[<p>La mujer rusa que se hizo famosa después de acosar a los refugiados ucranianos en las calles de Europa finalmente está siendo deportada a Rusia desde Alemania.</p><p><strong>etiquetas</strong>: rusia, ucrania, karma, jajaja</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730654" >noticia original</a> (twitter.com)</p>]]></description>
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730654</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730544</meneame:link_id>
		<meneame:sub>tecnología</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>geralt_</meneame:user>
		<meneame:clicks>2158</meneame:clicks>
		<meneame:votes>146</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>613</meneame:karma>
		<meneame:comments>65</meneame:comments>
		<meneame:url>https://www.meneame.net/story/malware-nunca-visto-ha-infectado-cientos-dispositivos-linux-eng?utm_source=meneame_rss</meneame:url>
		<title>Un malware nunca visto ha infectado cientos de dispositivos Linux y Windows [ENG]</title>
		<link>https://www.meneame.net/story/malware-nunca-visto-ha-infectado-cientos-dispositivos-linux-eng</link>
		<comments>https://www.meneame.net/story/malware-nunca-visto-ha-infectado-cientos-dispositivos-linux-eng</comments>
		<pubDate>Mon, 03 Oct 2022 03:10:08 +0000</pubDate>
		<dc:creator>geralt_</dc:creator>
		<category><![CDATA[tecnología]]></category>
		<category><![CDATA[chaos]]></category>
		<category><![CDATA[malware]]></category>
		<category><![CDATA[black lotus labs]]></category>
		<category><![CDATA[windows]]></category>
		<category><![CDATA[linux]]></category>
		<guid>https://www.meneame.net/story/malware-nunca-visto-ha-infectado-cientos-dispositivos-linux-eng</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ec/media_thumb-link-3730544.jpeg?1664698566' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>&quot;La potencia del malware Chaos se debe a varios factores&quot;, escribieron los investigadores de Black Lotus Labs. &quot;En primer lugar, está diseñado para funcionar en varias arquitecturas, incluyendo: ARM, Intel (i386), MIPS y PowerPC, además de los sistemas operativos Windows y Linux. En segundo lugar, a diferencia de las redes de bots de distribución de ransomware a gran escala, como Emotet, que aprovechan el spam para propagarse y crecer, Chaos se propaga a través de CVEs conocidos y forzados, así como de claves SSH robadas&quot;.</p><p><strong>etiquetas</strong>: chaos, malware, black lotus labs, windows, linux</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730544" >noticia original</a> (arstechnica.com)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ec/media_thumb-link-3730544.jpeg?1664698566" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730544</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730540</meneame:link_id>
		<meneame:sub>ocio</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Andaui</meneame:user>
		<meneame:clicks>3648</meneame:clicks>
		<meneame:votes>101</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>975</meneame:karma>
		<meneame:comments>16</meneame:comments>
		<meneame:url>https://www.meneame.net/story/historia-espana-contada-11-000-fotos-carne?utm_source=meneame_rss</meneame:url>
		<title>La historia de España contada en 11.000 fotos de carné</title>
		<link>https://www.meneame.net/story/historia-espana-contada-11-000-fotos-carne</link>
		<comments>https://www.meneame.net/story/historia-espana-contada-11-000-fotos-carne</comments>
		<pubDate>Sun, 02 Oct 2022 17:50:19 +0000</pubDate>
		<dc:creator>Andaui</dc:creator>
		<category><![CDATA[ocio]]></category>
		<category><![CDATA[historia]]></category>
		<category><![CDATA[españa]]></category>
		<category><![CDATA[fotos de carné]]></category>
		<category><![CDATA[documento nacional]]></category>
		<guid>https://www.meneame.net/story/historia-espana-contada-11-000-fotos-carne</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/ec/media_thumb-link-3730540.jpeg?1664698266' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>El proyecto 'Documento Nacional' recoge una selección de imágenes encontradas en un contenedor, procedentes de un estudio fotográfico que cerró sus puertas en la década de 1990. Una noche de finales de los 90, posiblemente un viernes, Alberto García Sáenz regresaba a su casa después de haber tomado algo con unos amigos. Al llegar a la Plaza del Ángel, en pleno centro de Madrid, se topó con un contenedor de obra que, además de escombros, albergaba algo más que, a pesar del desorden y la penumbra, le llamó poderosamente la atención.</p><p><strong>etiquetas</strong>: historia, españa, fotos de carné, documento nacional</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730540" >noticia original</a> (www.epe.es)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/ec/media_thumb-link-3730540.jpeg?1664698266" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730540</wfw:commentRss>	</item>

	<item>
		<meneame:link_id>3730425</meneame:link_id>
		<meneame:sub>cultura</meneame:sub>
		<meneame:status>published</meneame:status>
		<meneame:user>Cuchipanda</meneame:user>
		<meneame:clicks>1031</meneame:clicks>
		<meneame:votes>70</meneame:votes>
		<meneame:negatives>1</meneame:negatives>
		<meneame:karma>197</meneame:karma>
		<meneame:comments>35</meneame:comments>
		<meneame:url>https://www.meneame.net/story/pensamient-tentacular-antropoceno-capitaloceno-chthuluceno-1?utm_source=meneame_rss</meneame:url>
		<title>Pensamiento tentacular, antropoceno, capitaloceno, chthuluceno</title>
		<link>https://www.meneame.net/story/pensamient-tentacular-antropoceno-capitaloceno-chthuluceno-1</link>
		<comments>https://www.meneame.net/story/pensamient-tentacular-antropoceno-capitaloceno-chthuluceno-1</comments>
		<pubDate>Sun, 02 Oct 2022 17:50:02 +0000</pubDate>
		<dc:creator>Cuchipanda</dc:creator>
		<category><![CDATA[cultura]]></category>
		<category><![CDATA[donna haraway]]></category>
		<category><![CDATA[los derechos de los vivientes]]></category>
		<category><![CDATA[gaia]]></category>
		<guid>https://www.meneame.net/story/pensamient-tentacular-antropoceno-capitaloceno-chthuluceno-1</guid>
		<description><![CDATA[<img src='https://mnmstatic.net/cache/38/eb/media_thumb-link-3730425.jpeg?1664653206' width='155' height='155' alt='' class='thumbnail' style='float:right;margin-left: 3px' align='right' hspace='3'/><p>Tanto el Antropoceno como el Capitaloceno se prestan demasiado fácilmente al cinismo, el derrotismo y las predicciones complacientes y autocumplidas, como el discurso del «juego terminado, demasiado tarde», tanto en expertos como en discursos populares en los que las soluciones de la geoingeniería tecnoteocrática parecen coincidir con cualquier imaginación común. La primera de las imágenes perturbadoras de esta tarea será una araña, Pimoa cthulhu, que vive debajo de tocones de los bosques de secuoyas de los condados de Sonoma y Mendocino.</p><p><strong>etiquetas</strong>: donna haraway, los derechos de los vivientes, gaia</p><p>&#187;&nbsp;<a href="http://www.meneame.net/go?id=3730425" >noticia original</a> (www.revistaerrata.gov.co)</p>]]></description>
		<media:thumbnail url="https://mnmstatic.net/cache/38/eb/media_thumb-link-3730425.jpeg?1664653206" width='155' height='155' />
		<wfw:commentRss>http://www.meneame.net/comments_rss?id=3730425</wfw:commentRss>	</item>

</channel>
</rss>
`;
*/