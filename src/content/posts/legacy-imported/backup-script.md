---
title: "My smart backup script"
description: "I was used to have a rsync call in my crontab to perform backup from my laptop to my desktop. My idea was to backup my laptop everyday even if I wasn't at home, so before the time "
publishedAt: 2011-06-18
updatedAt: 2011-06-18
tags:
  - backup
  - expect
  - fedora
  - openwrt
  - rsync
  - wol
  - xdialog
legacySourceUrl: https://mkreder.com/2011/06/18/backup-script/
---
<!--:en-->I was used to have a rsync call in my crontab to perform backup from my laptop to my desktop. My idea was to backup my laptop everyday even if I wasn't at home, so before the time that the rsync ran I had to make sure that I was connected to my home network via OpenVPN and that my desktop was on.

If the day was calm, no problem, but when I was busy at work that meant no backup for that day.

I decided to code my own script to solve this problem.

<code>
#!/bin/bash
export DISPLAY=:0</code>

<code><code></code></code>

#Vars for remote computer

<code><code></code></code>

DSTUSR=user
DSTROOT=root
DSTIP=192.168.1.2
DSTFOLDER=/path/to/destionation/backup/folder/

<code><code></code></code>

#Vars for my OpenWrt router
LINKSYS=192.168.1.1
LINKSSHPORT=22
LINKUSER=root

<code><code></code></code>

PCTRL=0
PCTRL2=0

<code><code></code></code>

#this part checks if I'm on my LAN, if not it tries to connect to
# my OpenVPN server running in my Linksys with OpenWrt

<code><code></code></code>

echo "Checking if my router is on this network"
ssh $LINKSYS -p $LINKSSHPORT -l $LINKUSER ls &amp;&gt; /dev/null
PSTATE1=$?;
while [ ! $PSTATE1 -eq 0 ]; do
echo "it isn't"
if [ ! -f /var/lock/subsys/openvpn ]; then
echo "openvpn is down, let's try to connect"
$HOME/vpn $(Xdialog --stdout --title "OpenVPN password" --no-close \
--screen-center --password --inputbox "Password" 10 100);
fi
sleep 20;
ssh $LINKSYS -p $LINKSSHPORT -l $LINKUSER ls &amp;&gt; /dev/null;
PSTATE1=$?;
PCTRL=`expr $PCTRL + 1`
if [ $PCTRL -eq 5 ]; then
notify-send "connection failed"
exit 1
fi
done

<code><code></code></code>

#this part checks if my home computer is up, if not, it will
#try to turn it on by WOL from my OpenWrt router.

<code><code></code></code>

echo "hmmm, is my Computer up?"
ssh $DSTROOT@$DSTIP ls
PSTATE2=$?;
while [ ! $PSTATE2 -eq 0 ]; do
echo "it's not.."
ssh -l $LINKUSER -p $LINKSSHPORT $LINKSYS /root/wakeup &amp;&gt; /dev/null
sleep 30;
ssh $DSTROOT@$DSTIP ls
PSTATE2=$?;
PCTRL2=`expr $PCTRL2 + 1`
if [ $PCTRL2 -eq 5 ]; then
notify-send "cannot power on remote computer";
exit 2 ;
fi
done
echo "it's now"

<code><code></code></code>

# backup part

<code><code></code></code>

echo "starting backup..."
notify-send "starting backup..."

<code><code></code></code>

date
rsync -vaHx --progress --numeric-ids $HOME/ $DSTUSR@$DSTIP:$DSTFOLDER
notify-send "backup done"
#here it asks me if I want to turn off my home computer

<code>
</code>

<code>Xdialog --title --stdout "remote computer is on..." --screen-center --yesno \
"Turn off computer?" 10 50
if [ $? -eq 0 ]; then
#the following line will set something in my Ethernet card that allows me to
#wake up my computer with WOL
ssh $DSTROOT@$DSTIP /sbin/ethtool -s eth0 wol g &amp;&gt; /dev/null
ssh $DSTROOT@$DSTIP poweroff &amp;&gt; /dev/null
fi
</code>
for the dialogs, I had to install 'xdialog'

Also, I'm calling another script called 'vpn' that I made with expect, it's used to connect to my OpenVPN server with the passphrase I specify with a parameter.

<code>
#!/usr/bin/expect</code>

if $argcsend_user "usage: \n"
send_user "$argv0 password \n"
send_user ""
exit
}

spawn sudo /usr/sbin/openvpn --config /etc/openvpn/openvpn.conf --daemon
expect "Enter Private Key Password:"
send "[lindex $argv 0]\r"
interact

In my router I made an script called 'wakeup' that only runs:

Hope you can use it for something, if not, you have a good example of how to use Xdialog, expect and some other things.

<strong>Español</strong>

<!--:--><!--:es-->Todo comenzó cuando tenia configurado un script de rsync en el cron, el cual me permitía hacer backup desde mi laptop a mi desktop. Mi idea era hacer backup diariamente, incluso aquellos dias en los que no estaba en casa. Con este propósito, antes de que mi script se ejecutase tenia que preparar el entorno, iniciar la VPN y asegurarme que mi PC de casa estuviese prendida.

Si el día estaba tranquilo, no había problema, pero si era un día complicado me quedaba sin backup.

Decidí hacer un script para solucionar este problema

<code>
#!/bin/bash
export DISPLAY=:0</code>

<code><code></code></code>

#Variables sobre mi computadora remota

<code><code></code></code>

DSTUSR=usuario
DSTROOT=root
DSTIP=192.168.1.2
DSTFOLDER=/path/a/la/carpeta/donde/backupear/

<code><code></code></code>

#Variables de mi router
LINKSYS=192.168.1.1
LINKSSHPORT=22
LINKUSER=root

<code><code></code></code>

PCTRL=0
PCTRL2=0

<code><code></code></code>

#Esta parte verifica si mi PC esta en mi red hogareña, si no esta
#intenta conectar utilizando OpenVPN

<code><code></code></code>

echo "Chequeando si mi router esta en esta red"
ssh $LINKSYS -p $LINKSSHPORT -l $LINKUSER ls &amp;&gt; /dev/null
PSTATE1=$?;
while [ ! $PSTATE1 -eq 0 ]; do
echo "no esta"
if [ ! -f /var/lock/subsys/openvpn ]; then
echo "openvpn esta abajo, tratamos de conectar"
$HOME/vpn $(Xdialog --stdout --title "OpenVPN password" --no-close \
--screen-center --password --inputbox "Password" 10 100);
fi
sleep 20;
ssh $LINKSYS -p $LINKSSHPORT -l $LINKUSER ls &amp;&gt; /dev/null;
PSTATE1=$?;
PCTRL=`expr $PCTRL + 1`
if [ $PCTRL -eq 5 ]; then
notify-send "conexion fallida"
exit 1
fi
done

<code><code></code></code>

#esta parta chequea si mi PC esta prendida, si no esta
#va a tratar de prenderla por WOL a través de mi router con OpenWrt

<code><code></code></code>

echo "hmmm, esta prendida mi PC?"
ssh $DSTROOT@$DSTIP ls
PSTATE2=$?;
while [ ! $PSTATE2 -eq 0 ]; do
echo "no esta...."
ssh -l $LINKUSER -p $LINKSSHPORT $LINKSYS /root/wakeup &amp;&gt; /dev/null
sleep 30;
ssh $DSTROOT@$DSTIP ls
PSTATE2=$?;
PCTRL2=`expr $PCTRL2 + 1`
if [ $PCTRL2 -eq 5 ]; then
notify-send "no se puede prender la PC";
exit 2 ;
fi
done
echo "Lo esta ahora"

<code><code></code></code>

# parte del backup

<code><code></code></code>

echo "Iniciando backup.."
notify-send "Iniciando backup.."

<code><code></code></code>

date
rsync -vaHx --progress --numeric-ids $HOME/ $DSTUSR@$DSTIP:$DSTFOLDER
notify-send "backup listo"
#luego pregunta si quiero apagar mi PC

<code>
</code>

<code>Xdialog --title --stdout "la computadora esta prendida.."  --screen-center  \
--yesno "Apagar computadora remota?" 10 50
if [ $? -eq 0 ]; then
#la siguiente linea configura algo en mi placa de red para que pueda
#prenderla por WOL
ssh $DSTROOT@$DSTIP /sbin/ethtool -s eth0 wol g &amp;&gt; /dev/null
ssh $DSTROOT@$DSTIP poweroff &amp;&gt; /dev/null
fi
</code>

Para los diálogos tuve que instalar el programa 'xdialog'

También estoy utilizando otro script llamado 'vpn' que hice con expect. La función de este script es conectarme a mi servidor OpenVPN con la password que le paso como parámetro.

<code>
#!/usr/bin/expect</code>

<code><code></code></code>

if $argc&lt;1 {
send_user "Modo de uso\n"
send_user "$argv0 password \n"
send_user ""
exit
}

<code>
</code>

<code>spawn sudo /usr/sbin/openvpn --config /etc/openvpn/openvpn.conf  --daemon
expect "Enter Private Key Password:"
send "[lindex $argv 0]\r"
interact
</code>

En mi router, hice un script que se llama 'wakeup' que solo contiene la siguiente linea:
<code>
etherwake AA:BB:CC:DD:EE:FF
</code>

Donde AA:BB:CC:DD:EE:FF es la MAC address de mi PC de escritorio.

<strong>"No soy una persona técnica! que esta haciendo esto?" </strong>
Básicamente, esta viendo si mi laptop esta en mi red hogareña. De no estarlo trata de establecer una conexión con mi red hogareña a través de una VPN. Una vez en la red, se fija si mi computadora esta prendida. Si no esta prendida, trata de prenderla por WOL. Cuando todo esta OK, hace un backup diferencial entre mi laptop y mi computadora de casa.

Espero que puedan usar el script para algo, sino, es un buen ejemplo de como usar Xdialog, expect y otras cosillas...<!--:-->
