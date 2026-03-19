---
title: "Mic. input broken on an Acer 1410"
description: "Thanks to Mathieu Bouffard, he helped me to to workaround the issue with my mic in Acer Aspire One 1410. Issue: Somehow the ALSA driver is trying to pass to PulseAudio an stereo ou"
publishedAt: 2011-06-01
updatedAt: 2011-06-01
tags:
  - acer
  - alsa
  - aspire
  - fedora
  - jack
  - pulse
  - pulseaudio
  - tech
legacySourceUrl: https://mkreder.com/2011/06/01/solucion-mic-roto-en-acer-1410/
---
<!--:en-->Thanks to Mathieu Bouffard, he helped me to to workaround the issue with my mic in Acer Aspire One 1410.

<strong>Issue:</strong>

Somehow the ALSA driver is trying to pass to PulseAudio an stereo output that PulseAudio doesn't understand.

<strong>Solution:</strong>

Use jackd as a "proxy" between ALSA and PulseAudio, jackd will capture the input in mono from the ALSA driver, and pass it to PulseAudio.

Download his module for PulseAudio:

<code># yum install pulseaudio-module-jack</code>

Configure PulseAudio to no auto respawn when killed.

<code>echo "autospawn = no" &gt; ~/.pulse/client.conf</code>

Create a file in our home directory ~/jackd.pa

<code>#!/usr/bin/pulseaudio -nF</code>
<code>
###
# these modules will connect to JACK
load-module module-jack-sink
load-module module-jack-source</code>

<code>###
#add-autoload-sink output module-jack-sink channels=2
#add-autoload-source input module-jack-source channels=2
#load-module module-esound-protocol-unix
load-module module-native-protocol-unix
load-module module-volume-restore
#load-module module-stream-restore
load-module module-rescue-streams
.nofail</code>
<code>
###
load-module module-x11-publish
load-module module-gconf</code>

<code>###
# Load LIRC for Pulse
# load-module module-lirc sink=jack_out config=/home/mbouffard/.lircrc</code>

Create the config file for ALSA: ~/.asoundrc

<code># .asoundrc</code>

<code>pcm.!default {
type pulse
hint.description "Default Audio Device"
}
ctl.!default {
type pulse
}</code>

and last but not least, create a mini-script to launch PulseAudio using this configuration. I called it ~/pulsejack:

<code>killall jackd ; pulseaudio --kill
/usr/bin/jackd -S -v -r -dalsa -dhw:0 -r48000 -p1024 -n2 &amp;
pulseaudio -n -F jackd.pa
while [ $? -eq 137 ]; do
sleep 5; #sometimes after get started pulseaudio got killed somehow
pulseaudio -n -F jackd.pa
done
</code>

We run our script:

<code>chmod +x ~/pulsejack
~/pulsejack</code>

A patch was submitted to the alsa devel team to fix this problem at ALSA level.

<strong>Español</strong>

<!--:--><!--:es-->Gracias a Mathieu Bouffard, él me ayudo a a configurar mi micrófono en mi Acer Aspire One 1410.

<strong>Problema:</strong>

De algún modo el driver de ALSA esta tratando de pasarle a PulseAudio una salida stereo que PulseAudio no entiende.

<strong>Solución:</strong>

Usando jackd como un "proxy" entre ALSA y PulseAudio. Jackd va a capturar la entrada mono desde el driver de ALSA y se lo va a pasar a PulseAudio

Descargamos el siguiente modulo de PulseAudio:

<code># yum install pulseaudio-module-jack</code>

Configuramos PulseAUdio para no auto-reiniciarse cuando lo matamos.

<code>echo "autospawn = no" &gt; ~/.pulse/client.conf</code>

Creamos el siguiente archivo en nuestro home: ~/jackd.pa

<code>#!/usr/bin/pulseaudio -nF</code>
<code>
###
# these modules will connect to JACK
load-module module-jack-sink
load-module module-jack-source</code>

<code>###
#add-autoload-sink output module-jack-sink channels=2
#add-autoload-source input module-jack-source channels=2
#load-module module-esound-protocol-unix
load-module module-native-protocol-unix
load-module module-volume-restore
#load-module module-stream-restore
load-module module-rescue-streams
.nofail</code>
<code>
###
load-module module-x11-publish
load-module module-gconf</code>

<code>###
# Load LIRC for Pulse
# load-module module-lirc sink=jack_out config=/home/mbouffard/.lircrc</code>

Creamos el archivo de configuración para ALSA: ~/.asoundrc

<code># .asoundrc</code>

<code>pcm.!default {
type pulse
hint.description "Default Audio Device"
}
ctl.!default {
type pulse
}</code>

Y por ultimo, creamos un mini-script para lanzar PulseAudio usando esta configuración. Yo lo llame ~/pulsejack:

<code>killall jackd ; pulseaudio --kill
/usr/bin/jackd -S -v -r -dalsa -dhw:0 -r48000 -p1024 -n2 &amp;
pulseaudio -n -F jackd.pa
while [ $? -eq 137 ]; do
sleep 5; # a veces despues de iniciar alguien o algo mata a pulseaudio
pulseaudio -n -F jackd.pa
done
</code>

Ejecutamos nuestro script:

<code>chmod +x ~/pulsejack
~/pulsejack</code>

Un patch fue enviado al team de ALSA para solucionar este problema desde el driver.<!--:-->
