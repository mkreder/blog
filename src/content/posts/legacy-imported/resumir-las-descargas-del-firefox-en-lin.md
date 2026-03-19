---
title: "Resumir las descargas del firefox en Linux o cualquier Unix"
description: "Lamentablemente, cuando cancelamos una descarga con firefox, no hay modo de volverla a iniciar desde el navegador y eso es bastante molesto, ya que si por ejemplo estamos en una la"
publishedAt: 2008-11-18
updatedAt: 2008-11-18
tags:
  - download
  - firefox
  - linux
  - technical
  - unix
legacySourceUrl: https://mkreder.com/2008/11/18/resumir-las-descargas-del-firefox-en-lin/
---
Lamentablemente, cuando cancelamos una descarga con firefox, no hay modo de volverla a iniciar desde el navegador y eso es bastante molesto, ya que si por ejemplo estamos en una laptop y nos queremos ir hacia otro lugar o simplemente cambiar de red wifi, perdemos lo que sea que estamos descargando.

Por esto mismo, es muy buena esta función y es muy sencillo, que en caso de estar bajando el archivo ftp://sunsite.doc.ic.ac.uk/ls-lR.Z luego de interrumpirlo con el firefox, posicionarnos en el directorio donde se encuentra el archivo, ejecutamos:
<code>
wget -c ftp://sunsite.doc.ic.ac.uk/ls-lR.Z</code>

Espero que les sirva,

d.
