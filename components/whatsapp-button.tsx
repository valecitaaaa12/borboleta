'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export function WhatsAppButton() {
  const url = getWhatsAppUrl()

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25d366]/50"
      aria-label="Chatear por WhatsApp con Borboleta"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse ring */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25d366] opacity-30" />
      <MessageCircle className="h-7 w-7 fill-white stroke-white" />
    </motion.a>
  )
}
