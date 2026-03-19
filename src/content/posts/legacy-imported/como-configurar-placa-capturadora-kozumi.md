---
title: "Como configurar placa capturadora kozumi KTV-01C (con chip bt878 rev11)"
description: "Me llevo un par de días asi que lo comparto con ustedes, ya que le puede beneficiar a alguien mas En este caso yo lo configure con gentoo 2008, quizás haya distribuciones, en las q"
publishedAt: 2010-02-21
updatedAt: 2010-02-21
tags:
  - bttv
  - capturadora
  - capturer
  - kozumi
  - ktv01-c
  - technical
legacySourceUrl: https://mkreder.com/2010/02/21/como-configurar-placa-capturadora-kozumi/
---
Me llevo un par de días asi que lo comparto con ustedes, ya que le puede beneficiar a alguien mas

En este caso yo lo configure con gentoo 2008, quizás haya distribuciones, en las que les sea aun mas fácil configurar este dispositivo.

La placa en cuestión es:

<code>04:09.0 Multimedia video controller: Brooktree Corporation Bt878 Video Capture (rev 11)
04:09.1 Multimedia controller: Brooktree Corporation Bt878 Audio Capture (rev 11)
</code>
Que funciona con el modulo bt878
<code>
  Device Drivers  ---]    
   [M] Video For Linux        
   [*]   Enable Video For Linux API 1 compatible Layer       
   [*]   Video capture adapters  ---]          
      [M]   BT848 Video For Linux                    
      [*]     DVB/ATSC Support for bt878 based TV cards   

make &amp;&amp; make modules_install</code>

Editamos /etc/modprobe.conf o /etc/modprobe.d/bttv y agregamos los datos del modulo:
<code>
alias char-major-81 videodev
alias char-major-81-0 bttv
options bttv pll=1 card=120 radio=1 tuner=38 remote=1 bttv_verbose=1 gbuffers=4
options ir_common debug=1
</code>
Ahora podemos probar con:

<code>modprobe bttv
modprobe tuner</code>

Podemos verificar que los modulos esten arriba:

<code> # dmesg | grep bttv
bttv: driver version 0.9.17 loaded
bttv: using 4 buffers with 2080k (520 pages) each for capture
bttv: Bt8xx card found (0).
bttv0: Bt878 (rev 17) at 0000:04:09.0, irq: 17, latency: 32, mmio: 0xfdaff000
bttv0: using: Conceptronic CONTVFMi [card=120,insmod option]
bttv0: gpio: en=00000000, out=00000000 in=007fc0ff [init]
bttv0: tuner type=38
bttv0: i2c: checking for MSP34xx @ 0x80... not found
bttv0: i2c: checking for TDA9875 @ 0xb0... not found
bttv0: i2c: checking for TDA7432 @ 0x8a... not found
bttv0: registered device video0
bttv0: registered device vbi0
bttv0: registered device radio0
bttv0: PLL: 28636363 =] 35468950 .. ok
input: bttv IR (card=120) as /class/input/input4
bttv0: PLL can sleep, using XTAL (28636363).

# dmesg | grep tuner
bttv0: tuner type=38
tuner' 0-0060: chip found @ 0xc0 (bt878 #0 [sw])
tuner-simple 0-0060: type set to 38 (Philips PAL/SECAM multi (FM1216ME MK3))

</code>
Instalamos tvtime:
<code>
emerge tvtime</code>

configuramos la norma PAl-Nc para nuestro usuario:

<code>$ tvtime-configure  -n PAL-Nc
$ tvtime-scanner</code>

Y si todo salio bien, deberíamos ver una salida como esta:

<code>Scanning using TV standard PAL-NC.
Scanning from  44.00 MHz to 958.00 MHz.
Found a channel at  54.50 MHz (52.50 - 56.25 MHz), adding to channel list.
Found a channel at  66.50 MHz (64.25 - 68.50 MHz), adding to channel list.
Checking  79.00 MHz:  - No signal          
</code>
Por ultimo agregamos a /etc/modules.autoload.d/kernel-2.6 tuner:

<code>echo "tuner" ]] /etc/modules.autoload.d/kernel-2.6
</code>
Y ya esta, para configurar el control remoto, hay que editar el mapeo de las teclas dentro del modulo del kernel compilado (haga una copia de seguridad de este antes de editar el modulo):

editamos 
$source/drivers/media/common/ir-keymaps.c:

Y donde esta definido IR_KEYTAB_TYPE ir_codes_pixelview[IR_KEYTAB_SIZE]:

borramos todas las keys y lo dejamos asi:
<code>
IR_KEYTAB_TYPE ir_codes_pixelview[IR_KEYTAB_SIZE] = {
        [ 0x00 ] = KEY_0,
        [ 0x01 ] = KEY_1,
        [ 0x02 ] = KEY_2,
        [ 0x03 ] = KEY_3,
        [ 0x04 ] = KEY_4,
        [ 0x05 ] = KEY_5,
        [ 0x06 ] = KEY_6,
        [ 0x07 ] = KEY_7,
        [ 0x08 ] = KEY_8,
        [ 0x09 ] = KEY_9,
        [ 0x1c ] = KEY_RADIO,          /* FM Radio */
        [ 0x0a ] = KEY_BACKSPACE,      /* Recall */
        [ 0x12 ] = KEY_ESC,            /* POWER */
        [ 0x18 ] = KEY_LEFT,           /* VOL- */
        [ 0x0c ] = KEY_RIGHT,          /* VOL+ */
        [ 0x16 ] = KEY_ENTER,          /* OK */
        [ 0x17 ] = KEY_D,              /* Plus */
        [ 0x10 ] = KEY_F,              /* Mode */
        [ 0x0b ] = KEY_UP,             /* CH+ */
        [ 0x0b ] = KEY_UP,             /* CH+ */
        [ 0x15 ] = KEY_DOWN,           /* CH- */
        [ 0x14 ] = KEY_H,              /* OSD */
        [ 0x13 ] = KEY_MUTE,           /* Mute */
        [ 0x0f ] = KEY_BACKSPACE,      /* Prev */
        [ 0x0e ] = KEY_STOP,           /* Stop */
        [ 0x1f ] = KEY_PLAY,           /* Play */
        [ 0x1e ] = KEY_PAUSE,          /* Pause */
        [ 0x1d ] = KEY_RECORD,         /* Record */
        [ 0x1a ] = KEY_F7,             /* Next */
        [ 0x0f ] = KEY_A,              /*  */
        [ 0x1b ] = KEY_F5,             /* Time Shift */
        [ 0x19 ] = KEY_S,              /* Snapshot */
        [ 0x0f ] = KEY_F6,             /* Prev */
        [ 0x0d ] = KEY_E,              /* Stereo */
        [ 0x11 ] = KEY_I               /* Source */
};

EXPORT_SYMBOL_GPL(ir_codes_pixelview);
</code>
luego en la raiz del<code> kernel ejecutamos nuevamente:

make &amp;&amp; make modules_install y listo.</code>

Eso fue todo.

Ya pueden usar su placa con cualquier programa de captura de video, pueden usar Tvtime, ya que sabemos que detecto los canales.

D.

Un poco de ayuda de:

http://www.linuxforums.org/forum/peripherals-hardware/91984-remote-controller-bt878-kozumi-ktv-01c.html
