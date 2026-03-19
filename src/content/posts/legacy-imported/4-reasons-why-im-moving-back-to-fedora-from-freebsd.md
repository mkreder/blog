---
title: "4 reasons why I'm moving back to Fedora from Freebsd"
description: "I had FreeBSD as a home server working well. One day I decided to merge my 2 computers, as I'm concerned about global warming and climate change. I had a workstation with Fedora an"
publishedAt: 2011-05-01
updatedAt: 2011-05-01
tags:
  - freebsd
  - kozumi
  - problems
  - tech
legacySourceUrl: https://mkreder.com/2011/05/01/4-reasons-why-im-moving-back-to-fedora-from-freebsd/
---
I had FreeBSD as a home server working well. One day I decided to merge my 2 computers, as I'm concerned about global warming and climate change. I had a workstation with Fedora and my home server with FreeBSD. I decided to leave FreeBSD as single OS (big mistake!).

After 1 month of being used FreeBSD as a desktop, today I decided to move all my data back from ZFS/UFS to ext4, and install Fedora on it.

These are the problems that I had:

	Kozumi ktv-01c TV synthesizer not working. These was obvious I didn't expect it to work, I tried the driver that freebsd has called bktr, tried all possible configurations without success.
	Sound card working partially!!. My sound card HDA Analog Devices AD1986A is working partially. The spearkers works ok. The front input and output for headsets are not. The mic in just have white noise. The line in was not working also. After posting in the FreeBSD forum and sending emails to the mailing list, they help me to change some kernel parameters to be able to record from line. But anyway, sound was not being routed to speakers, so I could not use my mixer and listen what I was mixing.
	Sometimes I got a kernel panic or something like that. I had to hard reboot my PC. After the reboot I could have 2 ugly behaviors. 1. I have a RAID1 mirror with all my data, after the crash a resynchronization started. While it was resynchronizing I could not use my keyboard. Furthermore, I could not use my computer. 2. UFS is a girl, it remembered as ext2, for anything it's requires an fsck, and I didn't enjoy to fsck a filesystem will all my data on it.
	A ugly bug with my network nvidia card. Sometimes when I rebooted my PC I got a message and my network card was useless. I had to turn off my PC, unplug the power core so all the buffers were clean and boot it again.

Conclusion:

I wouldn't use FreeBSD as a desktop any more. I will miss features like jails that make me feel secure, it was great to run applications that I don't trust like tranmission or aMule inside a jail, but it's no big deal comparing that with all the cons I found.
