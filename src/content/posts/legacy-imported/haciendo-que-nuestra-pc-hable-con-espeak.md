---
title: "haciendo que nuestra pc hable con espeakc"
description: "espeak es un software sintetizador de voz con el podemos hacer cosas muy interesantes, para instalarlo en fedora tendremos que ejecutar: yum install espeak Una vez instalado podemo"
publishedAt: 2010-02-16
updatedAt: 2010-02-16
tags:
  - comando
  - ejemplos
  - espeak
  - hable
  - pc
  - technical
legacySourceUrl: https://mkreder.com/2010/02/16/haciendo-que-nuestra-pc-hable-con-espeak/
---
<p><a href="http://espeak.sourceforge.net/">espeak</a> es un software sintetizador de voz con el podemos hacer cosas muy interesantes, para instalarlo en fedora tendremos que ejecutar:</p>
<p><code>yum install espeak</code></p>
<p>Una vez instalado podemos hacer cosas divertidas como contar botellas de cerveza:</p>
<p><code>echo {1..199}" bottles of beer on the wall, cold bottle of beer, take one down, pass it around, one less bottle of beer on the wall,, " | espeak -v english -s 140</code></p>
<p>Contar elefantes:</p>
<p><code>echo {1..199}" elefantes se balanceaban sobre la tela de una araña, como veían que rustían fueron a buscar a otro elefante,, " | espeak -v spanish -s 140</code></p>
<p>Nos lea una frase de la fortuna:</p>
<p><code>fortune | espeak -v english -s 140</code></p>
<p>Podemos hacer por ejemplo que espeak nos lea los logs:</p>
<p><code>tail -f -n1 /var/log/messages | espeak -v english -s 150</code></p>
<p>También jugando con awk, podemos por ejemplo filtrar el log de <a href="http://www.irssi.org">irssi</a>, para que espeak interprete todas las lineas que alguien en el IRC escribe:</p>
<p><code>tail -n 1 -f #channel.log | awk -F '&gt;' '/nick_a_interpretar&gt;/{print $2 | "tee file"}' &amp;<br />tail -f -n1 file | espeak -v spanish</code></p>
<p>basándose en estos ejemplos hay un gran numero de cosas que se pueden hacer. Enjoy!</p>
