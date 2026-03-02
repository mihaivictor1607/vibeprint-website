'use client'

import { useState, useRef } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { calculeazaEstimare, type EstimareResult } from '@/lib/estimare'

const schema = z.object({
  numeFull: z.string().min(3, 'Minimum 3 caractere'),
  email: z.string().email('Email invalid'),
  telefon: z.string().min(10, 'Număr de telefon invalid'),
  tipProiect: z.enum(['rezidential', 'comercial'], {
    error: 'Selectează tipul proiectului',
  }),
  descriere: z.string().min(20, 'Descrie designul în cel puțin 20 de caractere'),
  latime: z.coerce.number().positive('Lățimea trebuie să fie pozitivă'),
  inaltime: z.coerce.number().positive('Înălțimea trebuie să fie pozitivă'),
  budget: z.string().optional(),
  gdprConsent: z.literal(true, {
    error: 'Consimțământul este obligatoriu pentru a trimite cererea',
  }),
})

type FormData = z.infer<typeof schema>
type Step = 'form' | 'estimate' | 'success'

function InputField({ label, error, required, children }: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-text-secondary mb-1">
        {label} {required && <span className="text-brand-teal">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

const inputClass = "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-teal transition-colors"

export default function FormularEstimare() {
  const [step, setStep] = useState<Step>('form')
  const [estimate, setEstimate] = useState<EstimareResult | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) as Resolver<FormData> })

  const width = watch('latime')
  const height = watch('inaltime')
  const liveArea = width > 0 && height > 0
    ? Math.round(width * height * 100) / 100
    : null

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const est = calculeazaEstimare({
        latime: data.latime,
        inaltime: data.inaltime,
        tip: data.tipProiect,
      })
      setEstimate(est)

      const formData = new FormData()
      formData.append('numeFull', data.numeFull)
      formData.append('email', data.email)
      formData.append('telefon', data.telefon)
      formData.append('tipProiect', data.tipProiect)
      formData.append('descriere', data.descriere)
      formData.append('latime', String(data.latime))
      formData.append('inaltime', String(data.inaltime))
      if (data.budget) formData.append('budget', data.budget)
      if (imageFile) formData.append('image', imageFile)

      const res = await fetch('/api/quote', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Server error')

      setStep('estimate')
    } catch {
      setSubmitError('A apărut o eroare. Te rugăm să încerci din nou.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="formular" className="py-24 px-4 bg-gradient-to-b from-brand-surface/50 to-brand-bg">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Cere o estimare gratuită
          </h2>
          <p className="text-brand-text-secondary text-lg">
            Completează formularul și îți calculăm estimarea în câteva secunde.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
              noValidate
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Nume complet" error={errors.numeFull?.message} required>
                  <input {...register('numeFull')} className={inputClass} placeholder="Ion Popescu" />
                </InputField>
                <InputField label="Email" error={errors.email?.message} required>
                  <input {...register('email')} type="email" className={inputClass} placeholder="email@exemplu.ro" />
                </InputField>
              </div>

              {/* Phone */}
              <InputField label="Telefon" error={errors.telefon?.message} required>
                <input {...register('telefon')} type="tel" className={inputClass} placeholder="07xx xxx xxx" />
              </InputField>

              {/* Project type */}
              <InputField label="Tip proiect" error={errors.tipProiect?.message} required>
                <div className="flex gap-6 mt-1">
                  {[
                    { value: 'rezidential', label: '🏠 Rezidențial' },
                    { value: 'comercial', label: '🏢 Comercial' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-white">
                      <input
                        {...register('tipProiect')}
                        type="radio"
                        value={opt.value}
                        className="accent-brand-teal w-4 h-4"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </InputField>

              {/* Dimensions */}
              <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">
                  Dimensiuni perete (metri) <span className="text-brand-teal">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    {...register('latime')}
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="Lățime"
                    className={inputClass}
                  />
                  <span className="text-brand-text-secondary font-bold text-lg">×</span>
                  <input
                    {...register('inaltime')}
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="Înălțime"
                    className={inputClass}
                  />
                </div>
                {liveArea && (
                  <p className="text-brand-teal text-sm mt-2">
                    ✓ Suprafață calculată: <strong>~{liveArea} m²</strong>
                  </p>
                )}
                {(errors.latime || errors.inaltime) && (
                  <p className="text-red-400 text-xs mt-1">Dimensiunile sunt obligatorii și trebuie să fie pozitive</p>
                )}
              </div>

              {/* Description */}
              <InputField label="Descrie designul dorit" error={errors.descriere?.message} required>
                <textarea
                  {...register('descriere')}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Ex: Vreau o pădure abstractă în nuanțe de verde și albastru, stil minimalist, pe peretele din sufragerie..."
                />
              </InputField>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-2">
                  Budget estimat (opțional)
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: 'sub500', label: 'Sub 500 EUR' },
                    { value: '500-1000', label: '500 – 1.000 EUR' },
                    { value: 'peste1000', label: 'Peste 1.000 EUR' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-white text-sm">
                      <input {...register('budget')} type="radio" value={opt.value} className="accent-brand-teal" />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">
                  Foto design (opțional, max. 10MB)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null
                    if (file && file.size > 10 * 1024 * 1024) {
                      alert('Imaginea depășește 10MB. Te rugăm să alegi un fișier mai mic.')
                      e.target.value = ''
                      setImageFile(null)
                    } else {
                      setImageFile(file)
                    }
                  }}
                  className="w-full text-brand-text-secondary text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-brand-teal/20 file:text-brand-teal hover:file:bg-brand-teal/30 cursor-pointer"
                />
                {imageFile && (
                  <p className="text-brand-teal text-xs mt-1">✓ {imageFile.name}</p>
                )}
              </div>

              {/* GDPR consent */}
              <div className="flex items-start gap-3">
                <input
                  {...register('gdprConsent')}
                  type="checkbox"
                  id="gdpr"
                  value="true"
                  className="mt-1 accent-brand-teal w-4 h-4 flex-shrink-0"
                />
                <label htmlFor="gdpr" className="text-brand-text-secondary text-sm leading-relaxed">
                  Am citit și sunt de acord cu{' '}
                  <a href="/politica-confidentialitate" target="_blank" className="text-brand-teal underline hover:text-brand-teal/80">
                    Politica de Confidențialitate
                  </a>{' '}
                  și consimț la prelucrarea datelor mele personale în scopul procesării cererii de ofertă.{' '}
                  <span className="text-brand-teal">*</span>
                </label>
              </div>
              {errors.gdprConsent && (
                <p className="text-red-400 text-xs -mt-4">{errors.gdprConsent.message}</p>
              )}

              {submitError && (
                <p className="text-red-400 text-sm text-center bg-red-400/10 rounded-lg py-3 px-4">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-teal text-brand-bg font-bold py-4 rounded-full text-lg hover:bg-brand-teal/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-bg"
              >
                {isSubmitting ? 'Se calculează...' : 'Calculează estimarea →'}
              </button>
            </motion.form>
          )}

          {step === 'estimate' && estimate && (
            <motion.div
              key="estimate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-brand-teal/30 rounded-2xl p-8 text-center"
            >
              <div className="text-brand-teal text-5xl mb-4">✓</div>
              <h3 className="text-white font-extrabold text-2xl mb-2">Estimarea ta</h3>

              <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-xl p-6 mb-6">
                <p className="text-brand-text-secondary text-sm mb-1">
                  Suprafață: <strong className="text-white">{estimate.suprafata} m²</strong>
                </p>
                <p className="text-white text-3xl md:text-4xl font-extrabold my-2">
                  {estimate.display}
                </p>
                <p className="text-brand-text-secondary text-xs">
                  * Prețul final se confirmă după consultarea cu echipa noastră.
                  Estimarea este orientativă.
                </p>
              </div>

              <p className="text-brand-text-secondary mb-6 text-lg">
                Vrei să discutăm detaliile proiectului tău?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="tel:+40700000000"
                  className="flex items-center justify-center gap-2 bg-brand-teal text-brand-bg font-bold px-6 py-3 rounded-full hover:bg-brand-teal/90 transition-colors"
                >
                  📞 Programează un apel
                </a>
                <a
                  href="tel:+40700000000"
                  className="flex items-center justify-center gap-2 border border-brand-teal text-brand-teal font-bold px-6 py-3 rounded-full hover:bg-brand-teal/10 transition-colors"
                >
                  🎥 Video call
                </a>
              </div>

              <button
                onClick={() => setStep('success')}
                className="text-brand-text-secondary text-sm underline hover:text-white transition-colors"
              >
                Trimite cererea și vă contactați voi cu mine →
              </button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center"
            >
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-white font-extrabold text-2xl mb-3">
                Cererea a fost trimisă!
              </h3>
              <p className="text-brand-text-secondary text-lg">
                Te contactăm în maxim 24 de ore pentru a discuta detaliile
                proiectului tău.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
