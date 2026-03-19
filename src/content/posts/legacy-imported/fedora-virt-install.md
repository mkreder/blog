---
title: "Installing a Fedora VM from Internet"
description: "There is a powerful tool shipped with libvirt called virt-install. This tool is inside the python-virtinst package and it allows us to install any GNU/Linux distribution directly f"
publishedAt: 2012-11-21
updatedAt: 2012-11-21
tags:
  - fedora
  - kvm
  - tech
  - virt-install
  - virt-manager
legacySourceUrl: https://mkreder.com/2012/11/21/fedora-virt-install/
---
<!--:en-->There is a powerful tool shipped with libvirt called <strong>virt-install.</strong> This tool is inside the <strong>python-virtinst</strong> package and it allows us to install any GNU/Linux distribution directly from the command line.
For example, the following command will create a VM and install Fedora 17 (32 bits) on it.

virt-install --name f17_i686 --ram 1024 --disk path=/dev/vg_data/f17_i686,size=15 --location="http://dl.fedoraproject.org/pub/fedora/linux/releases/17/Fedora/i386/os/" --graphics vnc

<em>The arguments are:</em>

name = name of the VM
ram = amount of RAM memory on MB
disk = lthe path and size of the virtual disk
location = the media to install, in this case the F17 URL.
graphics = the graphic card to use

After running this command, we can user <strong>virt-manager</strong> to continue with the installation process graphically.

<strong>How can we automate this task?</strong>

There are 2 different ways:

1. Every time you install Fedora, you will find on the /root directory a file called <strong>anaconda-ks.cfg.</strong> This file can be used to perform an unattended installation equal to the one you have.
You can take that file and modify the parts you need.
2. You can <a href="http://docs.fedoraproject.org/en-US/Fedora/13/html/Installation_Guide/sn-automating-installation.html">write</a> a kickstart file from scratch.

This kickstart file can be used for any Fedora installation <a href="http://mkreder.com/vms/ks/fedora.ks">fedora.ks</a>.
You can modify this file and upload it to your own HTTP/FTP/NFS server, leave it on a disk or burn it on a CD.
You can try to install a VM directly using this command:

<code>virt-install --name f17_x86_64 --ram 1024 --disk path=/dev/vg_data/f17_x86_64,size=15 --location="http://dl.fedoraproject.org/pub/fedora/linux/releases/17/Fedora/x86_64/os/" --extra-args "ks=http://mkreder.com/vms/ks/fedora.ks console=ttyS0,9600"
#you should modify the ram and disk arguments as needed</code>

It will install Fedora 17 x86_64 on a VM on a completely unattended way.
The root password for this VM will be "fedora".

<strong>Español</strong>

<!--:--><!--:es-->Una herramienta muy util que viene con libvirt es <strong>virt-install</strong>. Esta herramienta se encuentra en el paquete <strong>python-virtinst</strong> y nos permite iniciar la instalación de cualquier GNU/Linux desde la linea de comandos. Por ejemplo, el siguiente comando crea una VM y realiza la instalación de Fedora 17 (32 bits):
<code>
virt-install --name f17_i686 --ram 1024 --disk path=/dev/vg_data/f17_i686,size=15 --location="http://dl.fedoraproject.org/pub/fedora/linux/releases/17/Fedora/i386/os/" --graphics vnc</code>
<em>
Los argumentos son:
name = nombre de nuestra VM
ram = la cantidad de memoria RAM a asignar en MB
disk = la dirección en donde queremos crear el archivo o LV (path) y el tamaño (size)
location = el medio de instalación, en este caso la URL de Fedora 17 32 bits
graphics = el modo gráfico a utilizar</em>

Luego de haber ejecutado virt-install podemos utilizar <strong>virt-manager</strong> para seguir el proceso de instalación gráfica eligiendo como configurar cada parte de la instalación.

<strong>¿Cómo automatizar esta tarea?</strong>
Hay 2 formas básicas de automatizar la instalación.
1. Todas las instalaciones de Fedora dejan en /root/ un archivo llamado <strong>anaconda-ks.cfg,</strong> el mismo sirve para realizar en forma desatendida una instalación idéntica a la que tenemos. También podemos tomar este archivo como ejemplo y modificar las partes que nos interesen.
2. Podemos <a href="http://docs.fedoraproject.org/en-US/Fedora/13/html/Installation_Guide/sn-automating-installation.html">escribir</a> nuestro propio archivo kickstart desde cero.

Les dejo un archivo básico de kickstart que sirve para cualquier instalación de Fedora <a href="http://mkreder.com/vms/ks/fedora.ks">fedora.ks</a>.
Este archivo lo podemos subir a un sitio HTTP/FTP/NFS o puede grabarse en algún disco o cdrom.

Para instalar directamente de este archivo sin modificarlo:

<code>virt-install --name f17_x86_64 --ram 1024 --disk path=/dev/vg_data/f17_x86_64,size=15 --location="http://dl.fedoraproject.org/pub/fedora/linux/releases/17/Fedora/x86_64/os/" --extra-args "ks=http://mkreder.com/vms/ks/fedora.ks console=ttyS0,9600"
#modificar los argumentos disk y ram si es necesario
</code>

Se instalara Fedora 17 x86_64 en una VM sin ningún tipo de intervención.
La password de root encriptada en el archivo kickstart es "fedora"<!--:-->
