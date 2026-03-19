---
title: "obtener la temperatura de Buenos Aires desde la linea de comandos"
description: "Con este comando podemos obtener la temperatura de Buenos Aires desde la linea de comandos de cualquier *nix conectado a internet. echo \"Temperatura $(curl -s \"http://www.google.co"
publishedAt: 2010-02-14
updatedAt: 2010-02-14
tags:
  - api
  - clima
  - comando
  - ejemplo
  - google
  - technical
  - weather
legacySourceUrl: https://mkreder.com/2010/02/14/obtener-la-temperatura-de-buenos-aires-desde-la-linea-de-comandos/
---
<p>Con este comando podemos obtener la temperatura de Buenos Aires desde la linea de comandos de cualquier *nix conectado a internet.</p>
<p><code>echo "Temperatura $(curl -s "http://www.google.com/ig/api?weather=Buenos%20Aires" | sed 's|.*&lt;temp_c data="([^"]*)"/&gt;.*|1|') grados en Buenos Aires</code>"</p>
<p>desarmando el comando de la salida de</p>
<p><code>curl -s "http://www.google.com/ig/api?weather=Buenos%20Aires"</code></p>
<p>Obtenemos el siguiente XML:</p>
<p><code>&lt;xml_api_reply version="1"&gt;<br />&#8722;<br />&lt;weather module_id="0" tab_id="0" mobile_row="0" mobile_zipped="1" row="0" section="0"&gt;<br />&#8722;<br />&lt;forecast_information&gt;<br />&lt;city data="Buenos Aires"/&gt;<br />&lt;postal_code data="Buenos Aires"/&gt;<br />&lt;latitude_e6 data=""/&gt;<br />&lt;longitude_e6 data=""/&gt;<br />&lt;forecast_date data="2010-02-12"/&gt;<br />&lt;current_date_time data="2010-02-12 20:00:00 +0000"/&gt;<br />&lt;unit_system data="US"/&gt;<br />&lt;/forecast_information&gt;<br />&#8722;<br />&lt;current_conditions&gt;<br />&lt;condition data="Clear"/&gt;<br />&lt;temp_f data="88"/&gt;<br />&lt;temp_c data="31"/&gt;<br />&lt;humidity data="Humidity: 52%"/&gt;<br />&lt;icon data="/ig/images/weather/sunny.gif"/&gt;<br />&lt;wind_condition data="Wind: NE at 8 mph"/&gt;<br />&lt;/current_conditions&gt;<br />&#8722;<br />&lt;forecast_conditions&gt;<br />&lt;day_of_week data="Fri"/&gt;<br />&lt;low data="64"/&gt;<br />&lt;high data="86"/&gt;<br />&lt;icon data="/ig/images/weather/sunny.gif"/&gt;<br />&lt;condition data="Clear"/&gt;<br />&lt;/forecast_conditions&gt;<br />&#8722;<br />&lt;forecast_conditions&gt;<br />&lt;day_of_week data="Sat"/&gt;<br />&lt;low data="60"/&gt;<br />&lt;high data="87"/&gt;<br />&lt;icon data="/ig/images/weather/sunny.gif"/&gt;<br />&lt;condition data="Clear"/&gt;<br />&lt;/forecast_conditions&gt;<br />&#8722;<br />&lt;forecast_conditions&gt;<br />&lt;day_of_week data="Sun"/&gt;<br />&lt;low data="57"/&gt;<br />&lt;high data="73"/&gt;<br />&lt;icon data="/ig/images/weather/chance_of_rain.gif"/&gt;<br />&lt;condition data="Chance of Rain"/&gt;<br />&lt;/forecast_conditions&gt;<br />&#8722;<br />&lt;forecast_conditions&gt;<br />&lt;day_of_week data="Mon"/&gt;<br />&lt;low data="57"/&gt;<br />&lt;high data="73"/&gt;<br />&lt;icon data="/ig/images/weather/chance_of_rain.gif"/&gt;<br />&lt;condition data="Chance of Rain"/&gt;<br />&lt;/forecast_conditions&gt;<br />&lt;/weather&gt;<br />&lt;/xml_api_reply&gt;</code></p>
<p>Para este caso lo que buscamos es esta parte,</p>
<p><code>&lt;temp_c data="31"/&gt;</code></p>
<p><code>$ curl -s "http://www.google.com/ig/api?weather=Buenos%20Aires" | sed 's|.*&lt;temp_c data="([^"]*)"/&gt;.*|1|'<br />31</code></p>
<p>el sed nos sirve para limpiar de ahi solamente el 31, y finalmente el echo arma la frase mas linda.</p>
<p><code>$ echo "Temperatura $(curl -s "http://www.google.com/ig/api?weather=Buenos%20Aires" | sed 's|.*&lt;temp_c data="([^"]*)"/&gt;.*|1|') grados en Buenos Aires"<br />Temperatura 31 grados en Buenos Aires</code></p>
<p><code> </code></p>
