---
title: "Crear un repositorio local “read-only” de un DVD de RHEL 5 y otros"
description: "En esta entrega vamos a analizar como crear un repositorio local a partir de un DVD de RHEL 5 o Fedora. Para empezar tendremos que tener montado en nuestro sistema el DVD de RHEL 5"
publishedAt: 2008-12-25
updatedAt: 2008-12-25
tags:
  - dvd
  - local
  - repositorio
  - rhel
  - technical
legacySourceUrl: https://mkreder.com/2008/12/25/crear-un-repositorio-local-read-only-de/
---
En esta entrega vamos a analizar como crear un repositorio local a partir de un DVD de RHEL 5 o Fedora.

<img src="http://www.ellinux.com.ar/media/blogs/ellinux/rhel-pkg-group-cut.PNG" alt="RHEL" title="RHEL Package Manager" />

Para empezar tendremos que tener montado en nuestro sistema el DVD de RHEL 5, que contiene todos los paquetes rpm que vamos a necesitar para crear nuestro repositorio.

Si no no han montado automáticamente, pueden montarlo desde línea de comando, de la siguiente manera:
mount /dev/cdrom /media

Luego necesitaremos instalar el utilitario/paquete createrepo (yum install createrepo)

Una vez instalado deberemos ejecutar lo siguiente.
<code>createrepo -u file://media/Server -p -o /etc/yum.repos.d/RHEL51 /media/Server/</code>
 
-u  indica la ubicación física base (baseurl) para todos nuestros archivos
-o  me dice donde va a guardar el directorio repodata/ resultante con toda la info de los paquetes. (Deberán tener creado el directorio RHEL51 previamente)
-p  genera un archivo XML en un formato mas legible
El último parámetro /media/Server será la ubicación actual de nuestros paquetes RPMs a partir de los cuales vamos a efectuar el repositorio
 

Una vez ejecutado esto (vamos a tener que esperar un tiempo, dependiendo de la cantidad de paquetes. Por ejemplo, 2159 en RHEL51), obtendremos en  /etc/yum.repos.d/RHEL51/repodata toda la información necesaria para armar nuestro repositorio local.

Finalmente nos resta crear un archivo de texto .repo para que yum lo tenga en cuenta a la hora de actualizar o instalar paquetes.

Vamos a crear un archivo /etc/yum.repos.d/rhel-media con el siguiente contenido:
<code>[rhel-media]
name=Red Hat Enterprise Linux 5.1 - Media
baseurl=file:///etc/yum.respos.d/RHEL51/
gpgcheck=1
enabled=1
</code>
 De esta forma podremos contar con un repositorio local para yum de RHEL 5 o alguna otra versión, incluso de Fedora, sin tener que copiar todo el contenido al disco o modificar repositorios existentes.

Espero les resulte de utilidad

Sin mas, hasta el próximo post.

Extraido de:

http://blog.franciosi.com.ar
