import { NextResponse } from 'next/server'
import { calculeazaEstimare } from '@/lib/estimare'

const PLACEHOLDER_URL = 'https://PLACEHOLDER_REPLACE_WITH_YOUR_N8N_URL'
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE ?? '10485760', 10)
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    // Validate required text fields
    const required = ['numeFull', 'email', 'telefon', 'tipProiect', 'descriere', 'latime', 'inaltime']
    for (const field of required) {
      const value = formData.get(field)
      if (!value || String(value).trim() === '') {
        return NextResponse.json(
          { success: false, error: `Câmpul "${field}" este obligatoriu` },
          { status: 400 }
        )
      }
    }

    // Validate tipProiect
    const tipProiect = String(formData.get('tipProiect'))
    if (!['rezidential', 'comercial'].includes(tipProiect)) {
      return NextResponse.json(
        { success: false, error: 'Tip proiect invalid' },
        { status: 400 }
      )
    }

    // Validate image if present
    const image = formData.get('image')
    if (image instanceof File && image.size > 0) {
      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: 'Imaginea nu poate depăși 10MB' },
          { status: 400 }
        )
      }
      if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
        return NextResponse.json(
          { success: false, error: 'Format invalid. Acceptăm JPG, PNG, WEBP.' },
          { status: 400 }
        )
      }
    }

    // Calculate estimate
    const latime = parseFloat(String(formData.get('latime')))
    const inaltime = parseFloat(String(formData.get('inaltime')))
    const estimare = calculeazaEstimare({
      latime,
      inaltime,
      tip: tipProiect as 'rezidential' | 'comercial',
    })

    // Forward to n8n (fire-and-forget)
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl && webhookUrl !== PLACEHOLDER_URL) {
      fetch(webhookUrl, { method: 'POST', body: formData }).catch((err: unknown) => {
        console.error('[n8n webhook error]', err)
      })
    }

    return NextResponse.json({ success: true, estimare })
  } catch (err: unknown) {
    console.error('[/api/quote]', err)
    return NextResponse.json(
      { success: false, error: 'Eroare internă. Te rugăm să încerci din nou.' },
      { status: 500 }
    )
  }
}
