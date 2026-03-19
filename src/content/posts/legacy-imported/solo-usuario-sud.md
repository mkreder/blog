---
title: "How to allow a user to run a single command as root via sudo"
description: "In order to allow a user to run a single command as root using sudo run the following as root: echo \"user ALL= NOPASSWD : /bin/file\" &gt;&gt; /etc/sudoers Where user is the specifi"
publishedAt: 2011-06-16
updatedAt: 2011-06-16
tags:
  - fedora
  - linux
  - rhel
  - sudo
  - tech
legacySourceUrl: https://mkreder.com/2011/06/16/solo-usuario-sud/
---
<!--:en-->In order to allow a user to run a single command as root using sudo run the following as root:

<code>echo "user ALL= NOPASSWD : /bin/file" &gt;&gt; /etc/sudoers</code>

Where user is the specified username and /bin/file if the path to the binary that we are allowing this user to run.

If you want to do further changes to the sudoers file it's recommended to use the command 'visudo' to do so.

<strong>Español</strong>

<!--:--><!--:es-->Para poder hacer esta tarea solo tenemos que ejecutar el siguiente comando como root:

<code>echo "user  ALL=  NOPASSWD : /bin/file" &gt;&gt; /etc/sudoers</code>

Donde user es el usuario al que le queremos dar permisos y /bin/file es la dirección o path es el archivo binario que le vamos a permitir ejecutar.

Para hacer más cambios al archivo sudoers es recomendable utilizar el comando 'visudo'.
<!--:-->
