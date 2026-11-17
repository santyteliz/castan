/**
 * Contenido editable del sitio.
 * Los textos de bienvenida, forma de trabajar, servicios y equipo son los que envió la veterinaria.
 * Todo lo que figura entre corchetes ([...]) es provisional y debe confirmarlo la veterinaria.
 */

/** Mientras sea `true`, el sitio muestra las notas de contenido provisional. Pasar a `false` al publicar. */
export const DEMO_MODE = true

export const site = {
  name: 'Veterinaria Castán',
  city: 'Miramar',
  region: 'Buenos Aires',

  /** Número en formato internacional, solo dígitos, para los enlaces wa.me */
  whatsappNumber: '5492291411543',
  whatsappDisplay: '+54 9 2291 41-1543',

  address: '[Completar dirección]',
  addressNote: 'Miramar, Buenos Aires',

  hours: [
    { days: 'Lunes a viernes', time: '[Completar horario]' },
    { days: 'Sábados', time: '[Completar horario]' },
    { days: 'Domingos y feriados', time: '[Completar horario]' },
  ],
  emergencies: '[Confirmar si ofrecen guardias o urgencias]',

  email: '[Completar email]',

  /** Búsqueda en Google Maps: abre la ficha de la veterinaria cuando Google la encuentra */
  mapsQuery: 'Veterinaria Castán, Miramar, Buenos Aires',
}

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=15&output=embed`

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
  /** true cuando la especialidad todavía no fue confirmada por la veterinaria */
  roleToConfirm?: boolean
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
    role: 'Rehabilitación veterinaria',
    roleToConfirm: true,
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
  { src: '/img/real/galeria-equino', label: 'Cirugía en equinos', alt: 'Cirugía en un equino anestesiado sobre la mesa de operaciones', tall: true },
  { src: '/img/real/galeria-paciente-recuperado', label: 'En plena recuperación', alt: 'Perro comiendo al aire libre durante su recuperación' },
  { src: '/img/real/galeria-rehabilitacion-circuito', label: 'Circuito de rehabilitación', alt: 'Perro haciendo un circuito de rehabilitación con conos y colchoneta', tall: true },
  { src: '/img/real/galeria-cirugia', label: 'Precisión en el quirófano', alt: 'Cirujano trabajando sobre el campo quirúrgico' },
  { src: '/img/real/galeria-equino-quirofano', label: 'Grandes animales', alt: 'Equipo quirúrgico preparando a un equino en el quirófano' },
]

/** Reseñas de muestra: se reemplazan por las reseñas reales de la ficha de Google. */
export const sampleReviews = [
  {
    initials: 'A',
    text: 'Espacio para una reseña real de Google. Acá se muestra el comentario del cliente tal como aparece en la ficha de Castán.',
  },
  {
    initials: 'B',
    text: 'Texto de muestra. Las opiniones se toman de Google con el nombre que el cliente eligió mostrar, sin editarlas.',
  },
  {
    initials: 'C',
    text: 'Texto de muestra. Podemos destacar las reseñas que mejor cuentan cómo es la atención en la veterinaria.',
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
