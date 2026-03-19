---
title: "Instalando fuentes de Microsoft en Fedora 13"
description: "Estos son los pasos que hay que seguir para instalar las fuentes de Microsoft en Fedora 13 para usar con OpenOffice: Como root instalamos las dependencias: # yum -y install rpm-bui"
publishedAt: 2010-06-18
updatedAt: 2010-06-18
tags:
  - fedora
  - fonts
  - fuentes
  - openoffice
  - technical
legacySourceUrl: https://mkreder.com/2010/06/18/instalando-fuentes-de-microsoft-en-fedora-13/
---
Estos son los pasos que hay que seguir para instalar las fuentes de Microsoft en Fedora 13 para usar con OpenOffice:

Como root instalamos las dependencias:

<code>#  yum -y install rpm-build cabextract ttmkfdir xorg-x11-xfs
#  yum install http://dl.atrpms.net/f13-x86_64/atrpms/stable/chkfontpath-1.10.1-2.fc13.x86_64.rpm --nogpgcheck</code>

Como usuario normal armamos el rpm con las fuentes:

<code>mkdir -p $HOME/rpmbuild/SPECS
cd $HOME/rpmbuild/SPECS
wget  http://pfrields.fedorapeople.org/packages/SPECS/msttcorefonts-2.0-1.1.spec
rpmbuild -bb msttcorefonts-2.0-1.1.spec
</code>

Como root instalamos el rpm:

<code>rpm -ivh $HOME/rpmbuild/RPMS/noarch/msttcorefonts-2.0-1.1.noarch.rpm</code>

Luego iniciar OpenOffice y ya deberíamos ser capaces de utilizar Arial, Times New Roman, etc.

<strong>English</strong>

These are the required step to install Microsoft fonts in Fedora 13 for OpenOffice:

We would need to install all the required dependencies, as root:

<code>#  yum -y install rpm-build cabextract ttmkfdir xorg-x11-xfs
#  yum install http://dl.atrpms.net/f13-x86_64/atrpms/stable/chkfontpath-1.10.1-2.fc13.x86_64.rpm --nogpgcheck</code>

We make the rpm package (as a normal user):

<code>mkdir -p $HOME/rpmbuild/SPECS
cd $HOME/rpmbuild/SPECS
wget  http://pfrields.fedorapeople.org/packages/SPECS/msttcorefonts-2.0-1.1.spec
rpmbuild -bb msttcorefonts-2.0-1.1.spec
</code>

Then, as root again, we should install the rpm:

<code>rpm -ivh $HOME/rpmbuild/RPMS/noarch/msttcorefonts-2.0-1.1.noarch.rpm</code>

Then we launch OpenOffice and we would be able to use Arial, Times New Roman, etc.
