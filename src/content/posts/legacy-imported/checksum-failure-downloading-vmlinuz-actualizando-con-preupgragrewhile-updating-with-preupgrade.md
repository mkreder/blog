---
title: "\"checksum failure downloading vmlinuz\" actualizando con preupgragre/while updating with preupgrade"
description: "Español Actualizando a Fedora 13 con preupgrade me encontré con varios issues. El primero, que no parece estar muy documentado, es que mientras descagarba la información de la rele"
publishedAt: 2010-05-08
updatedAt: 2010-05-08
tags:
  - choose
  - fedora
  - issue
  - mirror
  - preupgrade
  - problema
  - technical
legacySourceUrl: https://mkreder.com/2010/05/08/checksum-failure-downloading-vmlinuz-actualizando-con-preupgragrewhile-updating-with-preupgrade/
---
<strong>Español</strong>

Actualizando a Fedora 13 con preupgrade me encontré con varios issues. El primero, que no parece estar muy documentado, es que mientras descagarba la información de la release, obtenía un error que me decía que había un problema en el mirror.

Iniciando preupgrade en una terminal, pude ver que este era el error:

<code>checksum failure downloading vmlinuz</code>

Así que definitivamente si había un problema en el mirror, intente varias veces obteniendo el mismo error. Decidí consultar en #fedora-qa acerca de como resolver este problema.

Y la solución es esta:

<code>wget http://mirrors.fedoraproject.org/releases.txt</code>

editar el archivo releases.txt comentado mirrorlist y descomentado baseurl, configurando nosotros la URL del mirror que elegimos o la URL por defecto de download.fedora.redhat.com.

Luego ejecutar preupgrade en el mismo $PWD en el que se encuentra el archivo releases.txt modificado

Otro problema que tuve fue el reportado en <a href="https://bugzilla.redhat.com/show_bug.cgi?id=573451">BZ 573451</a>

Todavía estoy actualizando y espero que termine exitosamente.

"delete: it'll only work if you blog about it and tell others how to do it! :)"

<strong>English</strong>

Updating to Fedora 13 with preupgrade I faced some issues. The first one, which apparently is not documented, is that while downloading release info, I got an error message telling me that there was a problem with the mirror.

running preupgrade in a terminal, I saw the following error:

<code>checksum failure downloading vmlinuz</code>

There was definitely a problem with the mirror. I tried several times getting the same error, so I decided to ask in #fedora-qa about it. 

And this is the fix:

<code>wget http://mirrors.fedoraproject.org/releases.txt</code>

edit releases.txt, comment mirrorlist and uncomment baseurl, setting the URL of the mirror that we choose, or leaving the default URL download.fedora.redhat.com.

Then run preupgrade with releases.txt in our $PWD 

Another issue that I had was reported in <a href="https://bugzilla.redhat.com/show_bug.cgi?id=573451">BZ 573451</a>

I'm stilling updating and I hope it ends successfully.  

"delete: it'll only work if you blog about it and tell others how to do it! :)"
