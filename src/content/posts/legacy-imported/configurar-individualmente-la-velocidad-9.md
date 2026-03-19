---
title: "Configurar individualmente la velocidad del touchpad y el mouse (Fedora 9)"
description: "Configurar individualmente la velocidad del touchpad y el mouse (Fedora 9) Para los que poseen laptops, en esta oportunidad vamos a presentar los pasos necesarios para configurar l"
publishedAt: 2008-11-04
updatedAt: 2008-11-04
tags:
  - fedora
  - mouse
  - speed
  - technical
  - touchpad
  - velocidad
legacySourceUrl: https://mkreder.com/2008/11/04/configurar-individualmente-la-velocidad-9/
---
Configurar individualmente la velocidad del touchpad y el mouse (Fedora 9)

Para los que poseen laptops, en esta oportunidad vamos a presentar los pasos necesarios para configurar la velocidad y sensibilidad de los dispositivos de entrada de manera separada y sin que uno afecte al otro, lo cual puede resultar muy incómodo cuando trabajamos con distintos dispositivos.

mouse

Para comenzar deberemos instalar el paquete gsynaptics (en mi caso 0.9.14-2.fc9)
<code>  yum install gsynaptics</code>

Luego de instalar este componente será necesario que modifiquemos manualmente nuestro archivo  de configuración del entorno gráfico X, ubicado en /etc/X11/xorg.conf

En primer lugar, tendremos que agregar la siguiente línea dentro de la sección <code>“ServerLayout”:
     InputDevice    “Synaptics” “CorePointer”</code>

A continuación, deberán agregar la siguiente sección “InputDevice” completa:
<code> Section “InputDevice”
    Identifier “Synaptics”
    Driver “synaptics”
    Option “TapButton1&#8243; “1&#8243;
    Option “TapButton2&#8243; “2&#8243;
    Option “TapButton3&#8243; “3&#8243;
    Option “SendCoreEvents”
    Option “Device” “/dev/input/mice”
    Option “Protocol” “auto-dev”
    Option “Emulate3Buttons” “yes”
    Option “SHMConfig” “true”
EndSection</code>

Una vez realizado esto deberán grabar el archivo y reiniciar el entorno gráfico, ya sea haciendo un log out o presionando Ctrl-Alt-Backspace.

Al loguearse nuevamente van a encontrar una nueva opción de configuración dentro del menu “System” / “Preferences” / “Hardware” llamado  “Touchpad”.

Accediendo al mismo podrán configurar diversas opciones vinculadas al touchpad sin afectar las características del mouse.

Nota: En caso de que al intentar acceder al programa aparezca un mensaje de error advirtiendo que es necesario establecer la opción “SHMConfig” en “true”, vuelvan a revisar los pasos anteriores, sobre todo los de la configuración del archivo xorg.conf.

Extracto desde el blog de un amigo:

Fuente:

http://blog.franciosi.com.ar/?p=40
