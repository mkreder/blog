---
title: "How to build Microsoft fonts for OpenOffice"
description: "These are the required step to install Microsoft fonts in Fedora 13 for OpenOffice: We would need to install all the required dependencies, as root: # yum -y install rpm-build cabe"
publishedAt: 2010-06-18
updatedAt: 2010-06-18
tags:
  - fedora
  - fonts
  - microsoft
  - openoffice
  - tech
legacySourceUrl: https://mkreder.com/2010/06/18/how-to-build-microsoft-fonts-for-openoffice/
---
These are the required step to install Microsoft fonts in Fedora 13 for OpenOffice:

We would need to install all the required dependencies, as root:

# yum -y install rpm-build cabextract ttmkfdir xorg-x11-xfs
# yum install http://dl.atrpms.net/f13-x86_64/atrpms/stable/chkfontpath-1.10.1-2.fc13.x86_64.rpm --nogpgcheck

We make the rpm package (as a normal user):

mkdir -p $HOME/rpmbuild/SPECS
cd $HOME/rpmbuild/SPECS
wget http://pfrields.fedorapeople.org/packages/SPECS/msttcorefonts-2.0-1.1.spec
rpmbuild -bb msttcorefonts-2.0-1.1.spec

Then, as root again, we should install the rpm:

rpm -ivh $HOME/rpmbuild/RPMS/noarch/msttcorefonts-2.0-1.1.noarch.rpm

Then we launch OpenOffice and we would be able to use Arial, Times New Roman, etc.
