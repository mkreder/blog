---
title: "Ocultando nuestra version de Apache"
description: "Buenas, vamos con mi primer post técnico. Estas 2 pequeñas lineas nos pueden ayudar a ocultar la version de apache que tenemos instalado en nuestro webserver. La linea: ServerSigna"
publishedAt: 2008-11-04
updatedAt: 2008-11-04
tags:
  - apache
  - centos
  - fedora
  - rhel
  - technical
  - version
legacySourceUrl: https://mkreder.com/2008/11/04/ocultando-nuestra-version-de-apache/
---
Buenas, vamos con mi primer post técnico.
Estas 2 pequeñas lineas nos pueden ayudar a ocultar la version de apache que tenemos instalado en nuestro webserver.
La linea:
<code>
ServerSignature Off</code>

Borra completamente la varsion de Apache y Sistema Operativo que tenemos instalados, no la muestra.
Pero también podemos personalizar esta firma:

<code>ServerTokens Prod[uctOnly]
    El servidor va a mostrar por ejemplo: Apache

ServerTokens Major
    El servidor va a mostrar por ejemplo:: Apache/2

ServerTokens Minor
    El servidor va a mostrar por ejemplo: Apache/2.0

ServerTokens Min[imal]
    El servidor va a mostrar por ejemplo: Apache/2.0.41

ServerTokens OS
    El servidor va a mostrar por ejemplo: Apache/2.0.41 (Unix)

ServerTokens Full (o sin especificar)
    El servidor va a mostrar por ejemplo: Apache/2.0.41 (Unix) PHP/4.2.2 MyMod/1.2 
</code>
Esto nos evita que alguien con mucho tiempo libre empiece a jugar con xploits o vulnerabilidades sobre nuestro apache, es una pequeña cosa mas para dormir tranquilo, aunque parezca una estupidez, me parece que es importante.

Les dejo dos links interesantes para leer:

Tips de seguridad de apache:
http://httpd.apache.org/docs/2.0/misc/security_tips.html

Asegurando apache paso a paso:
http://www.securityfocus.com/infocus/1694 (muy interesante, explica como hacer un chroot, para aislar nuestro servidor del filesystem)

Buenos, espero que les haya gustado la nota.
Hasta la próxima.
