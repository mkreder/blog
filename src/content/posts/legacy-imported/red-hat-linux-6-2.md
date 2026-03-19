---
title: "Red Hat Linux 6.2"
description: "I remember like if it was today the first time I installed Linux in my computer. I was 12 years ago and I bought a magazine, from Spain, that came with the CD of Red Hat 6.1. I com"
publishedAt: 2011-02-15
updatedAt: 2011-02-15
tags:
  - fedora
  - kvm
  - linux
  - redhat
  - tech
  - vm
legacySourceUrl: https://mkreder.com/2011/02/15/red-hat-linux-6-2/
---
<p>I remember like if it was today the first time I installed Linux in my computer. I was 12 years ago and I bought a magazine, from Spain, that came with the CD of Red Hat 6.1.</p>
<p>I completely destroyed my partition table with Disk Druid, that I don't know how could recover later. Once the installation was complete,  several days after the issue, I started to fight with my monitor to use 1024 x 768, the only way was using a very low horizontal frequency between 50-60 Hz, but I had to fight with Vertical frequency as well to get it working. Once working as the frequency was low it wasn't really good for my eyes but it looked nice for screenshots. I used to take lots of screenshots that I have to find some day to post them.</p>
<p>I'm sharing this VM with the world, I'm planning to start uploading VM's of old Linux distributions, so everyone can see how GNU/Linux was 10 years ago or maybe when it started.</p>
<p>How to install it?</p>
<p>As root:</p>
<p>*Note: The files hosted on mkreder.com are no longer available.*</p>
<p><code># wget http://mkreder.com/vms/redhat/6.2/redhat62.xml -O /etc/libvirt/qemu/redhat62.xml<br />
# wget http://mkreder.com/vms/redhat/6.2/redhat62.img.gz -O /var/lib/libvirt/images/redhat62.img.gz<br />
# gzip -d /var/lib/libvirt/images/redhat62.img.gz<br />
# restorecon -R /etc/libvirt/qemu/<br />
# restorecon -R /var/lib/libvirt/images </code></p>
<p><strong>Español</strong></p>
<p>Me acuerdo como si fuese hoy la primera vez que instale Linux en mi PC. Yo tenia 12 años y había comprado una revista española que venia con el CD de Red Hat Linux 6.1.</p>
<p>Destruí completamente mi tabla de particiones con Disk Druid, todavía no se como hice para recuperarla. Una vez que complete la instalación, después de varios días. Empece a pelearme con mi monitor para que funcione a 1024x768, la único que pude hacer para que funcione fue usar una frecuencia horizontal entre 50-60 Hz, pero aun así tenia que pelearme con la vertical. Una vez que funcionaba, parpadeaba un poco, no era lo mejor para mis ojos, pero podía sacar mejores screenshots, me encantaba coleccionar screenshots. Algún día cuando las encuentre las posteare.</p>
<p>Subí esta VM para que cualquiera pueda bajarla y usarla. Quizás empiece a subir VM's de distros viejas así todos pueden ver como era GNU/Linux 10 años atrás o quizás cuando empezó.</p>
<p>Como la consigo?</p>
<p>Como root:</p>
<p>*Note: The files hosted on mkreder.com are no longer available.*</p>
<p><code># wget http://mkreder.com/vms/redhat/6.2/redhat62.xml -O /etc/libvirt/qemu/redhat62.xml<br />
# wget http://mkreder.com/vms/redhat/6.2/redhat62.img.gz -O /var/lib/libvirt/images/redhat62.img.gz<br />
# gzip -d /var/lib/libvirt/images/redhat62.img.gz<br />
# restorecon -R /etc/libvirt/qemu/<br />
# restorecon -R /var/lib/libvirt/images </code></p>

![](/images/legacy/wp/cropped-screenshot-rh62-virtual-machine-4-1.png)

![](/images/legacy/wp/screenshot-rh62-virtual-machine-2.png)

![](/images/legacy/wp/screenshot-rh62-virtual-machine-3.png)

![](/images/legacy/wp/screenshot-rh62-virtual-machine-4.png)
