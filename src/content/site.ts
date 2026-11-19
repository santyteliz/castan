/**
 * Contenido editable del sitio.
 * Todos los textos, datos y fotos son los que envió la veterinaria.
 * Lo que figura entre corchetes ([...]) se muestra como contenido provisional.
 */

/** Mientras sea `true`, el sitio muestra las notas de contenido provisional. */
export const DEMO_MODE = false

export const site = {
  name: 'Veterinaria Castán',
  city: 'Miramar',
  region: 'Buenos Aires',

  /** Número en formato internacional, solo dígitos, para los enlaces wa.me */
  whatsappNumber: '5492291411543',
  whatsappDisplay: '+54 9 2291 41-1543',

  address: 'Calle 38 N.º 1125',
  addressNote: 'Miramar, Buenos Aires',

  hours: [
    { days: 'Lunes a sábado', time: '9:30 a 12:30' },
    { days: 'Por la tarde', time: 'Con turno previo' },
    { days: 'Domingos', time: 'Cerrado' },
  ],
  hoursNote:
    'Te recomendamos escribirnos antes de venir: podemos estar en cirugía o atendiendo cirugías en Mar del Plata.',
  emergencies: 'No realizamos guardias.',

  /** Ficha de Google de la veterinaria (enviada por el cliente) */
  googleUrl: 'https://maps.app.goo.gl/MBHMFz5ZNMX9eiSa9',
  googleRating: '4,7',
  googleReviewCount: 128,

  mapsQuery: 'Veterinaria Castan cirugía y rehabilitación, Calle 38 1125, Miramar, Buenos Aires',
}

export const mapsSearchUrl = site.googleUrl
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`
/** Coordenadas exactas de la ficha de Google */
export const mapsEmbedUrl = 'https://maps.google.com/maps?q=-38.2659103,-57.8444063&z=16&output=embed'

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const generalMessage = 'Hola Castán, quería hacer una consulta.'

export function serviceMessage(service: string) {
  return `Hola Castán, quisiera consultar por ${service}. Mi mascota es [perro/gato] y quería consultar por [motivo].`
}

export type IconName = 'scalpel' | 'scan' | 'heartPulse' | 'activity' | 'heart' | 'users' | 'search' | 'clipboard' | 'repeat'

export type Service = {
  id: string
  title: string
  /** Cómo se nombra el servicio dentro del mensaje de WhatsApp */
  messageName: string
  icon: IconName
  items: string[]
  /** Foto real (ruta dentro de /img, sin extensión) y encuadre */
  photo?: string
  photoPosition?: string
  photoAlt?: string
}

export const servicesIntro =
  'Brindamos atención integral y especializada, combinando diagnóstico, tratamiento quirúrgico y rehabilitación para ofrecer a cada paciente la mejor alternativa de atención.'

export const services: Service[] = [
  {
    id: 'cirugia',
    title: 'Cirugía veterinaria',
    messageName: 'cirugía veterinaria',
    icon: 'scalpel',
    items: ['Cirugía general', 'Cirugía traumatológica y ortopédica'],
    photo: 'real/cirugia-equipo',
    photoPosition: '22% 50%',
    photoAlt: 'Dos cirujanos operando en el quirófano',
  },
  {
    id: 'imagenes',
    title: 'Diagnóstico por imágenes',
    messageName: 'diagnóstico por imágenes',
    icon: 'scan',
    items: ['Estudios de diagnóstico por imágenes', 'Ecografía general', 'Ecografía especializada'],
    photo: 'equipo/luis-vaudana-ecografia',
    photoPosition: '50% 40%',
    photoAlt: 'Luis Vaudaña realizando una ecografía a un perro',
  },
  {
    id: 'cardiologia',
    title: 'Cardiología clínica',
    messageName: 'cardiología clínica',
    icon: 'heartPulse',
    items: ['Evaluación cardiológica', 'Ecocardiografía'],
  },
  {
    id: 'rehabilitacion',
    title: 'Evaluación y rehabilitación',
    messageName: 'evaluación y rehabilitación',
    icon: 'activity',
    items: ['Evaluación zookinésica', 'Fisiatría veterinaria', 'Rehabilitación física', 'Ozonoterapia'],
    photo: 'real/rehabilitacion-electro',
    photoPosition: '0% 50%',
    photoAlt: 'Sesión de rehabilitación con equipos de electroestimulación',
  },
]

/** Lista corrida que se muestra en la cinta animada debajo del hero */
export const marquee = [
  'Cirugía general',
  'Traumatología y ortopedia',
  'Ecografía',
  'Ecocardiografía',
  'Cardiología clínica',
  'Evaluación zookinésica',
  'Fisiatría veterinaria',
  'Rehabilitación física',
  'Ozonoterapia',
]

/** Foto o video que acompaña cada paso. `src` es la ruta pública sin extensión. */
export type Media = { type: 'image' | 'video'; src: string; alt: string; caption: string }

export const process: { title: string; text: string; icon: IconName; media: Media }[] = [
  {
    title: 'Evaluación y diagnóstico',
    text: 'Escuchamos a los tutores, evaluamos al paciente y analizamos cada caso para determinar las mejores alternativas de tratamiento.',
    icon: 'search',
    media: {
      type: 'image',
      src: '/img/real/paciente-consulta',
      alt: 'Perro border collie sentado sobre la camilla del consultorio',
      caption: 'Evaluación del paciente en consulta',
    },
  },
  {
    title: 'Planificación quirúrgica',
    text: 'Cuando la cirugía es necesaria, planificamos cada procedimiento de acuerdo con las necesidades particulares del paciente.',
    icon: 'clipboard',
    media: {
      type: 'image',
      src: '/img/real/rx-fractura',
      alt: 'Radiografía de una fractura de hueso largo',
      caption: 'Estudio radiográfico para planificar la cirugía',
    },
  },
  {
    title: 'Seguimiento y recuperación',
    text: 'El trabajo no termina en el quirófano. Realizamos el seguimiento correspondiente y acompañamos la evolución de cada paciente.',
    icon: 'repeat',
    media: {
      type: 'image',
      src: '/img/real/rx-placa',
      alt: 'Radiografía de control con una placa ortopédica y un clavo',
      caption: 'Control radiográfico después de la cirugía',
    },
  },
  {
    title: 'Rehabilitación veterinaria',
    text: 'Buscamos recuperar la movilidad, favorecer la funcionalidad y mejorar la calidad de vida mediante un plan de rehabilitación individualizado.',
    icon: 'activity',
    media: {
      type: 'video',
      src: '/video/rehabilitacion-electro',
      alt: 'Sesión de electroestimulación en un perro',
      caption: 'Electroestimulación durante la rehabilitación',
    },
  },
]

/** Radiografías de cirugías traumatológicas y ortopédicas (sección "Traumatología en imágenes"). */
export const xrays = [
  { src: '/img/real/rx-1', label: 'Osteosíntesis con placas' },
  { src: '/img/real/rx-3', label: 'Fijador externo' },
  { src: '/img/real/rx-6', label: 'Placa ortopédica' },
  { src: '/img/real/rx-2', label: 'Osteosíntesis con placa' },
  { src: '/img/real/rx-8', label: 'Fijador externo' },
  { src: '/img/real/rx-4', label: 'Osteosíntesis con placa' },
  { src: '/img/real/rx-7', label: 'Cirugía de pelvis' },
  { src: '/img/real/rx-5', label: 'Placa y tornillos' },
]

export type TeamMember = {
  name: string
  role: string
  /** Matrícula provincial */
  license: string
  photo: string
  photoAlt: string
}

export const team: TeamMember[] = [
  {
    name: 'Diego Alejandro Ozán',
    role: 'Cirugía general y traumatología',
    license: 'M.P. 12912',
    photo: 'diego-ozan',
    photoAlt: 'Diego Alejandro Ozán en el quirófano, con ropa quirúrgica, haciendo un gesto de pulgar arriba',
  },
  {
    name: 'Gabriela Idiarte Borda',
    role: 'Fisiatría y ozonoterapia',
    license: 'M.P. 10879',
    photo: 'gabriela-idiarte-borda',
    photoAlt: 'Gabriela Idiarte Borda realizando una sesión de rehabilitación a un perro',
  },
  {
    name: 'Luis Vaudaña',
    role: 'Especialista en Ecografías y Cardiología',
    license: 'M.P. 12685',
    photo: 'luis-vaudana',
    photoAlt: 'Luis Vaudaña realizando una ecografía a un perro',
  },
]

/** Fotos reales enviadas por la veterinaria. `tall` ocupa dos filas en el mosaico. */
export const gallery = [
  { src: '/img/real/galeria-equipo-quirofano', label: 'Equipo quirúrgico en acción', alt: 'Equipo quirúrgico durante una cirugía' },
  { src: '/img/real/galeria-control', label: 'Control posquirúrgico', alt: 'Perro yorkshire en la camilla durante un control después de la cirugía', tall: true },
  { src: '/img/real/galeria-paciente-recuperado', label: 'En plena recuperación', alt: 'Perro comiendo al aire libre durante su recuperación' },
  { src: '/img/real/galeria-rehabilitacion-circuito', label: 'Circuito de rehabilitación', alt: 'Perro haciendo un circuito de rehabilitación con conos y colchoneta', tall: true },
  { src: '/img/real/galeria-cirugia', label: 'Precisión en el quirófano', alt: 'Cirujano trabajando sobre el campo quirúrgico' },
  { src: '/img/real/galeria-quirofano', label: 'Cuidado en cada detalle', alt: 'Cirujano trabajando con pinzas sobre el campo quirúrgico' },
]

/** Reseñas reales de la ficha de Google, copiadas sin editar (todas de 5 estrellas). */
export const reviews = [
  {
    name: 'Camila Salinas',
    text: 'El Dr. Diego operó con éxito a mi gatito Tito que tenía una pata trasera quebrada y con una laceración importante. Estoy muy contenta con su profesionalismo, se encargó de explicarme cada detalle de la operación y dejarme tranquila de que Tito estaba en buenas manos. Gracias Doc!',
  },
  {
    name: 'Sara Ramos Mejia',
    text: 'A mi perra la atropellaron y le quebraron mano, pierna ( desecha) y la cadera. Nunca crei que volvería a caminar. Y gracias al Veterinario Diego se esta recuperando muy bien y rápido',
  },
  {
    name: 'Tomas Ongania',
    text: 'Excelentes profesionales, lleve a mi gatita que tenía una piedra en la vejiga muy grande y la operación fue un lujo, Diego atento siempre a cada inquietud, utilizan además sistemas de anestesia que dejan a uno también mucho más tranquilo, así que un laburo excelente también de parte del anestesista y de todo el equipo, recomendadisimo!',
  },
  {
    name: 'Laureano Landaburu',
    text: '"Rita" fue atacada por otro animal y perdió medio maxilar inferior. Diego como cirujano y Mariano como anestesista le reconstruyeron la mordida y le devolvieron la posibilidad de alimentarse! Rita recuperó ya su peso, mastica bien, y se encuentra en óptimas condiciones de regresar a su ámbito natural. Diego y Mariano son increíbles veterinarios y personas muy valiosas. Agradecidos de haberlos encontrado para salvar a Rita.',
  },
]

export const nav = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#forma-de-trabajar', label: 'Cómo trabajamos' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#opiniones', label: 'Opiniones' },
  { href: '#contacto', label: 'Contacto' },
]
