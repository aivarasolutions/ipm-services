import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock,
  Send,
  CheckCircle
} from 'lucide-react'

const Contact = () => {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: 'inquiry'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const translations = {
    en: {
      contactUs: 'Contact Us',
      intro: 'Ready to maximize your property\'s potential? Get in touch with our expert team for personalized property management solutions.',
      messageSent: 'Message Sent!',
      thankYou: 'Thank you for contacting IPM. We\'ll get back to you within 24 hours.',
      sendAnother: 'Send Another Message',
      phoneSupport: '24/7 Phone Support',
      phoneDesc: 'Call us anytime for immediate assistance',
      emailUs: 'Email Us',
      emailDesc: 'Send us a detailed message',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Quick messaging for instant responses',
      chatWithUs: 'Chat with us',
      sendMessage: 'Send Us a Message',
      officeHours: 'Office Hours',
      emergency: 'Emergency Support: Available 24/7 for urgent property issues',
      ourLocations: 'Our Locations',
      playaDelCarmen: 'Playa del Carmen',
      playaAddress: 'Riviera Maya, Quintana Roo, Mexico',
      playaDesc: 'Our primary office serving the Riviera Maya region',
      tulum: 'Tulum',
      tulumAddress: 'Tulum, Quintana Roo, Mexico',
      tulumDesc: 'Local presence for Tulum properties',
      lakeNorman: 'Lake Norman',
      lakeAddress: 'North Carolina, USA',
      lakeDesc: 'US operations for Lake Norman properties',
      monFri: 'Monday - Friday: 8:00 AM - 8:00 PM',
      sat: 'Saturday: 9:00 AM - 6:00 PM',
      sun: 'Sunday: 10:00 AM - 4:00 PM',
      fullName: 'Full Name *',
      fullNamePlaceholder: 'Your full name',
      emailAddress: 'Email Address *',
      emailPlaceholder: 'your@email.com',
      phoneNumber: 'Phone Number',
      phonePlaceholder: '+1 (555) 123-4567',
      inquiryType: 'Inquiry Type',
      generalInquiry: 'General Inquiry',
      propertyManagement: 'Property Management',
      bookingQuestion: 'Booking Question',
      propertyEvaluation: 'Property Evaluation',
      support: 'Support',
      subject: 'Subject *',
      subjectPlaceholder: 'Brief subject of your message',
      message: 'Message *',
      messagePlaceholder: 'Tell us about your property or inquiry...',
      sending: 'Sending...',
      ready: 'Ready to Get Started?',
      readyDesc: 'Join 30+ property owners who trust IPM to manage their vacation rentals. Schedule a consultation today and see how we can maximize your property\'s potential.',
      scheduleConsultation: 'Schedule Consultation'
    },
    es: {
      contactUs: 'Contáctenos',
      intro: '¿Listo para maximizar el potencial de su propiedad? Comuníquese con nuestro equipo experto para soluciones personalizadas de gestión de propiedades.',
      messageSent: '¡Mensaje Enviado!',
      thankYou: 'Gracias por contactar a IPM. Nos comunicaremos con usted dentro de 24 horas.',
      sendAnother: 'Enviar Otro Mensaje',
      phoneSupport: 'Soporte Telefónico 24/7',
      phoneDesc: 'Llámenos en cualquier momento para asistencia inmediata',
      emailUs: 'Envíenos un Correo',
      emailDesc: 'Envíenos un mensaje detallado',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Mensajería rápida para respuestas instantáneas',
      chatWithUs: 'Chatea con nosotros',
      sendMessage: 'Envíenos un Mensaje',
      officeHours: 'Horario de Oficina',
      emergency: 'Soporte de Emergencia: Disponible 24/7 para problemas urgentes de propiedades',
      ourLocations: 'Nuestras Ubicaciones',
      playaDelCarmen: 'Playa del Carmen',
      playaAddress: 'Riviera Maya, Quintana Roo, México',
      playaDesc: 'Nuestra oficina principal que sirve la región de Riviera Maya',
      tulum: 'Tulum',
      tulumAddress: 'Tulum, Quintana Roo, México',
      tulumDesc: 'Presencia local para propiedades de Tulum',
      lakeNorman: 'Lake Norman',
      lakeAddress: 'Carolina del Norte, USA',
      lakeDesc: 'Operaciones estadounidenses para propiedades de Lake Norman',
      monFri: 'Lunes - Viernes: 8:00 AM - 8:00 PM',
      sat: 'Sábado: 9:00 AM - 6:00 PM',
      sun: 'Domingo: 10:00 AM - 4:00 PM',
      fullName: 'Nombre Completo *',
      fullNamePlaceholder: 'Su nombre completo',
      emailAddress: 'Dirección de Correo Electrónico *',
      emailPlaceholder: 'su@correo.com',
      phoneNumber: 'Número de Teléfono',
      phonePlaceholder: '+1 (555) 123-4567',
      inquiryType: 'Tipo de Consulta',
      generalInquiry: 'Consulta General',
      propertyManagement: 'Gestión de Propiedad',
      bookingQuestion: 'Pregunta de Reserva',
      propertyEvaluation: 'Evaluación de Propiedad',
      support: 'Soporte',
      subject: 'Asunto *',
      subjectPlaceholder: 'Breve descripción del asunto',
      message: 'Mensaje *',
      messagePlaceholder: 'Cuéntenos sobre su propiedad o consulta...',
      sending: 'Enviando...',
      ready: '¿Listo para Comenzar?',
      readyDesc: 'Únase a 30+ propietarios que confían en IPM para gestionar sus alquileres vacacionales. Programe una consulta hoy y vea cómo podemos maximizar el potencial de su propiedad.',
      scheduleConsultation: 'Agendar Consulta'
    },
    fr: {
      contactUs: 'Nous Contacter',
      intro: 'Prêt à maximiser le potentiel de votre propriété? Contactez notre équipe d\'experts pour des solutions de gestion de propriété personnalisées.',
      messageSent: 'Message Envoyé!',
      thankYou: 'Merci de contacter IPM. Nous vous répondrons dans les 24 heures.',
      sendAnother: 'Envoyer un Autre Message',
      phoneSupport: 'Support Téléphonique 24/7',
      phoneDesc: 'Appelez-nous à tout moment pour une assistance immédiate',
      emailUs: 'Nous Envoyer un Email',
      emailDesc: 'Envoyez-nous un message détaillé',
      whatsapp: 'WhatsApp',
      whatsappDesc: 'Messagerie rapide pour des réponses instantanées',
      chatWithUs: 'Chattez avec nous',
      sendMessage: 'Envoyez-Nous un Message',
      officeHours: 'Heures d\'Ouverture',
      emergency: 'Support d\'Urgence: Disponible 24/7 pour les problèmes urgents de propriété',
      ourLocations: 'Nos Emplacements',
      playaDelCarmen: 'Playa del Carmen',
      playaAddress: 'Riviera Maya, Quintana Roo, Mexique',
      playaDesc: 'Notre bureau principal desservant la région de Riviera Maya',
      tulum: 'Tulum',
      tulumAddress: 'Tulum, Quintana Roo, Mexique',
      tulumDesc: 'Présence locale pour les propriétés de Tulum',
      lakeNorman: 'Lake Norman',
      lakeAddress: 'Caroline du Nord, USA',
      lakeDesc: 'Opérations américaines pour les propriétés du Lac Norman',
      monFri: 'Lundi - Vendredi: 8:00 AM - 8:00 PM',
      sat: 'Samedi: 9:00 AM - 6:00 PM',
      sun: 'Dimanche: 10:00 AM - 4:00 PM',
      fullName: 'Nom Complet *',
      fullNamePlaceholder: 'Votre nom complet',
      emailAddress: 'Adresse Email *',
      emailPlaceholder: 'votre@email.com',
      phoneNumber: 'Numéro de Téléphone',
      phonePlaceholder: '+1 (555) 123-4567',
      inquiryType: 'Type de Demande',
      generalInquiry: 'Demande Générale',
      propertyManagement: 'Gestion de Propriété',
      bookingQuestion: 'Question de Réservation',
      propertyEvaluation: 'Évaluation de Propriété',
      support: 'Support',
      subject: 'Sujet *',
      subjectPlaceholder: 'Sujet court de votre message',
      message: 'Message *',
      messagePlaceholder: 'Parlez-nous de votre propriété ou de votre demande...',
      sending: 'Envoi...',
      ready: 'Prêt à Commencer?',
      readyDesc: 'Rejoignez 30+ propriétaires qui font confiance à IPM pour gérer leurs locations de vacances. Planifiez une consultation aujourd\'hui et découvrez comment nous pouvons maximiser le potentiel de votre propriété.',
      scheduleConsultation: 'Agendar une Consultation'
    }
  }

  const t = translations[language] || translations.en

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        console.log('Form submitted successfully:', result)
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          propertyType: 'inquiry'
        })
      } else {
        console.error('Form submission error:', result.error)
        alert('Error submitting form: ' + result.error)
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Phone,
      title: t.phoneSupport,
      description: t.phoneDesc,
      contact: '+1 310-400-0032',
      link: 'tel:+13104000032'
    },
    {
      icon: Mail,
      title: t.emailUs,
      description: t.emailDesc,
      contact: 'info@richaf.global',
      link: 'mailto:info@richaf.global'
    },
    {
      icon: MessageCircle,
      title: t.whatsapp,
      description: t.whatsappDesc,
      contact: t.chatWithUs,
      link: 'https://wa.me/13104000032'
    }
  ]

  const locations = [
    {
      name: t.playaDelCarmen,
      address: t.playaAddress,
      description: t.playaDesc
    },
    {
      name: t.tulum,
      address: t.tulumAddress,
      description: t.tulumDesc
    },
    {
      name: t.lakeNorman,
      address: t.lakeAddress,
      description: t.lakeDesc
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.messageSent}</h2>
            <p className="text-gray-600 mb-6">{t.thankYou}</p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="w-full"
            >
              {t.sendAnother}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{t.contactUs}</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{t.intro}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <a 
                      href={method.link}
                      target={method.link.startsWith('http') ? '_blank' : undefined}
                      rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {method.contact}
                    </a>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.sendMessage}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t.fullName}</label>
                        <Input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder={t.fullNamePlaceholder} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t.emailAddress}</label>
                        <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder={t.emailPlaceholder} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t.phoneNumber}</label>
                        <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t.phonePlaceholder} />
                      </div>
                      <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">{t.inquiryType}</label>
                        <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white">
                          <option value="inquiry">{t.generalInquiry}</option>
                          <option value="management">{t.propertyManagement}</option>
                          <option value="booking">{t.bookingQuestion}</option>
                          <option value="evaluation">{t.propertyEvaluation}</option>
                          <option value="support">{t.support}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">{t.subject}</label>
                      <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder={t.subjectPlaceholder} />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t.message}</label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} placeholder={t.messagePlaceholder} />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                      {isSubmitting ? (
                        <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>{t.sending}</> 
                      ) : (
                        <><Send className="h-5 w-5 mr-2" />{t.sendMessage}</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{t.officeHours}</h3>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div>{t.monFri}</div>
                    <div>{t.sat}</div>
                    <div>{t.sun}</div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">{t.emergency}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{t.ourLocations}</h3>
                  </div>
                  <div className="space-y-4">
                    {locations.map((location, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-semibold text-gray-900">{location.name}</h4>
                        <p className="text-gray-600 text-sm">{location.address}</p>
                        <p className="text-gray-500 text-xs mt-1">{location.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t.ready}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">{t.readyDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                {t.scheduleConsultation}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
