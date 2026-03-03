import Navbar from '@/components/Navbar'
import Hero3D from '@/components/Hero3D'
import CeFacem from '@/components/CeFacem'
import Galerie from '@/components/Galerie'
import CumFunctioneaza from '@/components/CumFunctioneaza'
import Suprafete from '@/components/Suprafete'
import FormularEstimare from '@/components/FormularEstimare'
import DespreNoi from '@/components/DespreNoi'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero3D />
        <CeFacem />
        <Galerie />
        <CumFunctioneaza />
        <Suprafete />
        <FormularEstimare />
        <DespreNoi />
      </main>
      <Footer />
    </>
  )
}
