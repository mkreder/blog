---
title: "“checksum failure downloading vmlinuz” while upgrading with preupgrade"
description: "Updating to Fedora 13 with preupgrade I faced some issues. The first one, which apparently is not documented, is that while downloading release info, I got an error message telling"
publishedAt: 2010-05-08
updatedAt: 2010-05-08
tags:
  - fedora
  - issue
  - mirror
  - preupgrade
  - problem
  - uncategorized
legacySourceUrl: https://mkreder.com/2010/05/08/checksum-failure-downloading-vmlinuz-while-upgrading-with-preupgrade/
---
Updating to Fedora 13 with preupgrade I faced some issues. The first one, which apparently is not documented, is that while downloading release info, I got an error message telling me that there was a problem with the mirror.

running preupgrade in a terminal, I saw the following error:

checksum failure downloading vmlinuz

There was definitely a problem with the mirror. I tried several times getting the same error, so I decided to ask in #fedora-qa about it.

And this is the fix:

wget http://mirrors.fedoraproject.org/releases.txt

edit releases.txt, comment mirrorlist and uncomment baseurl, setting the URL of the mirror that we choose, or leaving the default URL download.fedora.redhat.com.

Then run preupgrade with releases.txt in our $PWD

Another issue that I had was reported in BZ 573451

I'm stilling updating and I hope it ends successfully.

"delete: it'll only work if you blog about it and tell others how to do it! :)"
