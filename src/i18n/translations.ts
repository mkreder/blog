export const languages = { en: "English", es: "Español" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.community": "Community",
    "nav.archive": "Archive",
    "nav.about": "About",

    // Hero
    "hero.greeting": "Hey, I'm Matias",
    "hero.title.line1": "I share ideas about cloud, AI,",
    "hero.title.line2": "and building software.",
    "hero.desc":
      "CTO, AWS Community Builder, AWS User Group Leader, DeepRacer finalist, and professor based in Buenos Aires.",

    // Sections
    "section.latest": "Latest posts",
    "section.community": "Community",
    "section.archive": "From the archive",
    "section.viewAll": "View all",
    "section.highlights": "Highlights",
    "section.timeline": "Timeline",
    "section.certifications": "Certifications",

    // Links
    "link.expires": "Expires",

    // Archive page
    "archive.title": "Archive",
    "archive.desc":
      "Legacy posts imported from WordPress. New posts are published on dev.to.",
    "archive.empty": "No posts yet.",

    // About page
    "about.label": "About",
    "about.bio1":
      "CTO and engineering leader based in Buenos Aires. I work at the intersection of AI products, cloud-native architecture, and practical systems that teams can actually operate.",
    "about.bio2":
      "Over 20 years across infrastructure, software engineering, architecture, DevOps, and AI product delivery. CTO roles at MechanizedAI and Selehann. Led a successful exit from ATADATA to Deloitte as Engineering Manager of a cloud migration product I helped create. Hands-on with Python, React, cloud-native AWS systems, and agentic AI workflows.",
    "about.bio3":
      "I teach application integration and artificial intelligence at UADE. I'm an AWS Community Builder, multiple AWS DeepRacer League finalist, and a regular speaker on AI engineering and cloud.",

    // Talks page
    "talks.title": "Talks, workshops, and community",
    "talks.titleLine2": "engagement across the region.",
    "talks.desc":
      "I'm an AI engineering community builder and user group leader based in Buenos Aires. I give talks, run workshops, and collaborate with other communities across Argentina, LATAM, and the broader AWS and AI ecosystem.",

    // Feed
    "feed.unavailable":
      "dev.to feed is currently unavailable. Posts will appear here automatically at build time.",

    // Meta
    "meta.pageTitle": "Cloud, AI & Engineering",
    "meta.pageDescription":
      "Cloud, AI, and engineering writing from Matias Kreder on agentic AI, platform engineering, AWS, and practical software delivery.",
    "meta.aboutDescription":
      "About Matias Kreder, CTO, engineering leader, professor, AWS Community Builder, and speaker focused on AI and cloud.",
    "meta.archiveDescription":
      "Archive of blog posts by Matias Kreder, including cloud, AI, engineering, and legacy WordPress content.",
    "meta.talksDescription":
      "Community activity, talks, workshops, and sessions by Matias Kreder across Argentina, LATAM, and global AWS and AI communities."
  },
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.community": "Comunidad",
    "nav.archive": "Archivo",
    "nav.about": "Acerca",

    // Hero
    "hero.greeting": "Hola, soy Matias",
    "hero.title.line1": "Comparto ideas sobre cloud, IA,",
    "hero.title.line2": "y desarrollo.",
    "hero.desc":
      "CTO, AWS Community Builder, AWS User Group leader, finalista DeepRacer y profesor. Vivo en Buenos Aires.",

    // Sections
    "section.latest": "Últimos posts",
    "section.community": "Comunidad",
    "section.archive": "Del archivo",
    "section.viewAll": "Ver todo",
    "section.highlights": "Destacados",
    "section.timeline": "Cronología",
    "section.certifications": "Certificaciones",

    // Links
    "link.expires": "Vence",

    // Archive page
    "archive.title": "Archivo",
    "archive.desc":
      "Posts legacy importados desde WordPress. Los nuevos posts se encuentran en dev.to.",
    "archive.empty": "No hay posts aún.",

    // About page
    "about.label": "Acerca",
    "about.bio1":
      "Soy un CTO y engineering leader de Buenos Aires. Trabajo en la intersección de productos de IA, arquitectura cloud-native y sistemas que los equipos pueden operar.",
    "about.bio2":
      "Tengo más de 20 años en infraestructura, ingeniería de software, arquitectura, DevOps y delivery de productos de IA. Con roles de CTO en MechanizedAI y Selehann. Lideré un exit exitoso de ATADATA a Deloitte como Engineering Manager de un producto de migración cloud que ayudé a crear. Trabajo con Python, React, sistemas cloud-native en AWS y flujos de agentic IA.",
    "about.bio3":
      "Enseño integración de aplicaciones e inteligencia artificial en UADE. Soy AWS Community Builder, finalista múltiple del AWS DeepRacer League y speaker frecuente sobre IA y Cloud.",

    // Talks page
    "talks.title": "Charlas, workshops y participación",
    "talks.titleLine2": "en comunidad en la región.",
    "talks.desc":
      "Soy community builder de ingeniería de IA y co-líder de user group en Buenos Aires. Doy charlas, organizo workshops y colaboro con otras comunidades en Argentina, LATAM y el ecosistema global de AWS e IA.",

    // Feed
    "feed.unavailable":
      "El feed de dev.to no está disponible. Los posts aparecerán automáticamente cuando se construya el sitio.",

    // Meta
    "meta.pageTitle": "Cloud, IA & Ingeniería",
    "meta.pageDescription":
      "Escritos sobre cloud, IA e ingeniería de Matias Kreder sobre IA agéntica, platform engineering, AWS y delivery de software.",
    "meta.aboutDescription":
      "Sobre Matias Kreder, CTO, líder de ingeniería, profesor, AWS Community Builder y speaker enfocado en IA y cloud.",
    "meta.archiveDescription":
      "Archivo de posts de Matias Kreder, incluyendo cloud, IA, ingeniería y contenido legacy importado de WordPress.",
    "meta.talksDescription":
      "Actividad comunitaria, charlas, workshops y sesiones de Matias Kreder en Argentina, LATAM y comunidades globales de AWS e IA."
  }
} as const;
