---
title: "unrealircd hacked =("
description: "Hace un par de días descubrí en mi servidor de IRC unos archivos \"raros\" en el /tmp, que obviamente yo no había generado: -rw------- 1 ircd ircd 17251 Jul 8 09:10 robot.txt -rw----"
publishedAt: 2010-07-30
updatedAt: 2010-07-30
tags:
  - hack
  - linux
  - robottxt
  - technical
  - unrealircd
legacySourceUrl: https://mkreder.com/2010/07/30/unrealircd-hacked-2/
---
Hace un par de días descubrí en mi servidor de IRC unos archivos "raros" en el /tmp, que obviamente yo no había generado:

<code>-rw-------  1 ircd    ircd      17251 Jul  8 09:10 robot.txt
-rw-------  1 ircd    ircd      17251 Jul  8 09:10 robot.txt.1</code>

El contenido de estos archivos era un script.
La explicación de mas o menos que es lo que hace dicho script, la pueden ver en este <a href="http://archive.cert.uni-stuttgart.de/incidents/2004/09/msg00008.html">link</a>

En definitiva, unrealircd reporto hace poco (el 12 de junio), en su foro el <a href="http://forums.unrealircd.com/viewtopic.php?f=1&amp;t=6562&amp;sid=bc723f88941b31914a708cba50378122">problema</a>. Al parecer, alguien cambio el .tar.gz en los mirrors de unrealircd por uno que contenía un backdoor (esto paso en Noviembre 2009), el cual permitía a cualquier persona ejecutar cualquier comando como el usuario con el corría el ircd (esos nos sigue enseñando a todos que no hay que correr servicios como root). Así que alguien, muy vivo, exploto esta falla en nuestro IRC (irc.xterm.com.ar), pero al parecer mucha maldad no hizo.

Si tu unrealircd esta comprometido o no, se puede probar de estas 2 formas:

Verificar el checksum md5 si todavia tienen el .tar.gz:
(MALA) es: 752e46f2d873c1679fa99de3f52a274d
Versión Oficial (BUENA) es: 7b741e94e867c0a7370553fd01506c66

La otra forma es pararse en el directorio donde lo compilamos y correr:
<code>grep DEBUG3_DOLOG_SYSTEM include/struct.h</code>
Si, el resultado son 2 lineas entonces tenemos la versión mala, si el resultado es nada entonces es la buena.

La solución es re-descargar el unrealircd y validar que sea el correcto por GPG o MD5/SHA1.

Deberé seguir confiando en unrealircd? o deberíamos mudarnos a otro?

<strong>English</strong>:

Some days ago I found in my IRC server, a couple of "weird" files in the /tmp directory, that obviously I did not create.

<code>-rw-------  1 ircd    ircd      17251 Jul  8 09:10 robot.txt
-rw-------  1 ircd    ircd      17251 Jul  8 09:10 robot.txt.1</code>

The content of these files was a malicious script.
The explanation about what does this script does can be reached at this <a href="http://archive.cert.uni-stuttgart.de/incidents/2004/09/msg00008.html">link</a>

unrealircd reported some days ago (June 12) in their forum the <a href="http://forums.unrealircd.com/viewtopic.php?f=1&amp;t=6562&amp;sid=bc723f88941b31914a708cba50378122">problem</a>. Apparently someone changed the .tar.gz package in their mirrors for one that contained a backdoor (this happened in November 2009). This backdoor allowed any person to run any command with the privileges of the user running the service (this is still remember us that we must not run services as root) .
Someone exploited this bug in our IRC (irc.xterm.com.ar), but apparently nothing bad happened for us.

If you need to check if your unrealircd is compromised or not, you can try this with one of these two ways:

Verifying the MD5 checksum of the .tar.gz package:
(BAD) is: 752e46f2d873c1679fa99de3f52a274d
Official version (GOOD) is: 7b741e94e867c0a7370553fd01506c66

The other way, is change to the directory where we compiled the source code and then run:
<code>grep DEBUG3_DOLOG_SYSTEM include/struct.h</code>
If it outputs 2 lines, then you're hacked.
if it outputs nothing, then you're good.

The solution is re-download unrealircd and validate that it's the good package by checking GPG or MD5/SHA1 checksum

May I continue using unrealircd? or do I need to move to a new one?
