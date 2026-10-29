/**
 * Contenido editable del sitio.
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
  instagram: '[Completar si suman redes]',

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
  return `Hola Castán, quisiera consultar por el servicio de ${service}. Mi mascota es [perro/gato] y quería consultar por [motivo].`
}

export type IconName =
  | 'stethoscope'
  | 'calendar'
  | 'syringe'
  | 'pill'
  | 'paw'
  | 'heart'
  | 'users'
  | 'info'
  | 'chat'

export type Service = {
  id: string
  title: string
  /** Nombre que se usa dentro del mensaje de WhatsApp */
  messageName: string
  description: string
  icon: IconName
  image: string
  imageAlt: string
}

/** Servicios de ejemplo: categorías habituales, a confirmar por la veterinaria. */
export const services: Service[] = [
  {
    id: 'consultas',
    title: 'Consultas veterinarias',
    messageName: 'consultas veterinarias',
    description:
      'Revisión clínica y orientación para el cuidado de tu mascota, con tiempo para escucharte y responder tus dudas.',
    icon: 'stethoscope',
    image: 'consultas',
    imageAlt: 'Perro shih tzu con moño rojo mirando a cámara',
  },
  {
    id: 'preventiva',
    title: 'Medicina preventiva',
    messageName: 'medicina preventiva',
    description:
      'Controles periódicos para acompañar cada etapa de su vida y anticiparse a los problemas de salud.',
    icon: 'calendar',
    image: 'preventiva',
    imageAlt: 'Cachorro de corgi recostado sobre fondo claro',
  },
  {
    id: 'vacunacion',
    title: 'Vacunación',
    messageName: 'vacunación',
    description:
      'Planificación del calendario de vacunas según la edad, la especie y el estilo de vida de tu mascota.',
    icon: 'syringe',
    image: 'vacunacion',
    imageAlt: 'Tres gatitos atigrados juntos mirando a cámara',
  },
  {
    id: 'desparasitacion',
    title: 'Desparasitación',
    messageName: 'desparasitación',
    description:
      'Indicaciones claras para la desparasitación interna y externa, con la frecuencia adecuada para cada caso.',
    icon: 'pill',
    image: 'desparasitacion',
    imageAlt: 'Perro beagle sonriendo con la lengua afuera',
  },
  {
    id: 'perros-gatos',
    title: 'Atención para perros y gatos',
    messageName: 'atención para perros y gatos',
    description:
      'Un trato cuidadoso y respetuoso, pensado para que cada visita sea lo más tranquila posible para ellos.',
    icon: 'paw',
    image: 'perros-gatos',
    imageAlt: 'Un gato y un perro descansando juntos sobre el pasto',
  },
]

export const trustPoints: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'Atención personalizada',
    text: 'Cada mascota es única. Nos tomamos el tiempo de conocerla y entender su historia.',
    icon: 'heart',
  },
  {
    title: 'Acompañamiento en su cuidado',
    text: 'Te acompañamos antes, durante y después de cada consulta.',
    icon: 'users',
  },
  {
    title: 'Información clara',
    text: 'Te explicamos cada indicación con palabras simples, para que sepas qué hacer en casa.',
    icon: 'info',
  },
  {
    title: 'Comunicación directa',
    text: 'Un canal simple para tus consultas: escribinos por WhatsApp desde cualquier parte de la web.',
    icon: 'chat',
  },
]

/** Fotos ilustrativas: reemplazar por fotos reales del lugar, el equipo y sus pacientes. */
export const gallery = [
  { image: 'galeria-1', alt: 'Perro corriendo feliz en la orilla del mar' },
  { image: 'galeria-3', alt: 'Gato levantando la pata sobre fondo verde agua' },
  { image: 'galeria-2', alt: 'Cachorro de golden retriever caminando al atardecer' },
  { image: 'galeria-4', alt: 'Perro de pelo blanco y marrón sonriendo' },
  { image: 'galeria-6', alt: 'Golden retriever mirando a cámara con expresión tranquila' },
  { image: 'galeria-5', alt: 'Gato atigrado de ojos verdes mirando hacia arriba' },
]

/** Perfiles del equipo: reemplazar con nombres, roles, matrícula y foto reales. */
export const team = [
  { role: '[Especialidad o rol]' },
  { role: '[Especialidad o rol]' },
  { role: '[Especialidad o rol]' },
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
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#opiniones', label: 'Opiniones' },
  { href: '#contacto', label: 'Contacto' },
]
