---
title: "Becoming a Fedora packager."
description: "Buenas! Aquí estamos, desempolvando el blog después de algún tiempo..Como ustedes sabrán he estado participando en el Proyecto Fedora como Embajador para Argentina, y algunos otros"
publishedAt: 2013-09-07
updatedAt: 2013-09-07
tags:
  - fedora
  - keepass
  - kpcli
  - rpm
  - tech
legacySourceUrl: https://mkreder.com/2013/09/07/fedora-packager/
---
<!--:es-->Buenas! Aquí estamos, desempolvando el blog después de algún tiempo..Como ustedes sabrán he estado participando en el Proyecto Fedora como <a href="https://fedoraproject.org/wiki/User:Delete"> Embajador para  Argentina,</a>  y algunos otros proyectos como FreeMedia, Marketing y Social Media.
Me he decidido por empezar a participar como empaquetador, ya que he usado distribuciones basadas en Red Hat desde niño y Fedora desde hace varios años.
En Enero, Empaqueté <a href="http://vertx.io/">vert.x </a> (BZ <a href="https://bugzilla.redhat.com/show_bug.cgi?id=894119">#894119</a>) pero ya que el proyecto esta teniendo algunos problemas legales decidí no continuar con el proceso.
La semana pasada, buscando una manera de abrir mi base de keepass en una consola, encontré un script de 3000 lineas en perl llamado <a href="http://kpcli.sourceforge.net/">kpcli.</a>  (<a href="http://keepass.info/">keepass</a>  es una herramienta visual para guardar contraseñas de forma segura en una base de datos encriptada). Cree el archivo spec para kpcli (BZ <a href="https://bugzilla.redhat.com/show_bug.cgi?id=1002324">#1002324</a>) y recorrí  todos los pasos del <a href="https://fedoraproject.org/wiki/Join_the_package_collection_maintainers?rd=PackageMaintainers/Join">proceso de empaquetamiento</a>. Solo falta que un patrocinador me apruebe para poder subir este paquete a los repositorios.
También empaquete 2 dependencias para esta paquete, perl-Term-ShellUI (BZ <a href="https://bugzilla.redhat.com/show_bug.cgi?id=1002319">#1002319</a>) y perl-File-KeePass (BZ <a href="https://bugzilla.redhat.com/show_bug.cgi?id=1002321">#1002321</a>).

<strong>English</strong>

<!--:--><!--:en-->Hi! I'm back in the blogging world after some time. As you may or may not know, I have been participating in the Fedora Project for a while as an <a href="https://fedoraproject.org/wiki/User:Delete">Ambassador for Argentina</a>. I've also been involved in FreeMedia, Marketing and Social Media.
As I have been using Red Hat based distributions since I was a kid and Fedora for the last few years, I decided to start getting into the engineering process of Fedora and become a packager.
On January, I started to package <a href="http://vertx.io/">vert.x </a> (BZ <a href="https://bugzilla.redhat.com/show_bug.cgi?id=894119">#894119</a>) but since this project has some legal problems I didn't continue with the review process.
Last week, looking for a way to open my keepass database in a console, I found a 3k lines perl script called <a href="http://kpcli.sourceforge.net/">kpcli</a> that did exactly what I needed. (<a href="http://keepass.info/">keepass</a> is a GUI tool that lets you store passwords safety into an encrypted database). I created a kpcli spec file (BZ <a href="https://bugzilla.redhat.com/show_bug.cgi?id=1002324">#1002324</a>) and went to all the steps in the packaging <a href="https://fedoraproject.org/wiki/Join_the_package_collection_maintainers?rd=PackageMaintainers/Join">process</a>. I'm waiting for a sponsor to approve me as a packager in order to push it into the repositories.
I also packaged 2 required dependencies for its package, perl-Term-ShellUI (BZ <a href="https://bugzilla.redhat.com/show_bug.cgi?id=1002319">#1002319</a>) and perl-File-KeePass (BZ <a href="https://bugzilla.redhat.com/show_bug.cgi?id=1002321">#1002321</a>).<!--:-->
