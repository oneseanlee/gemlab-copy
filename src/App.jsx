import Header from './components/Header/Header'
import ProductHero from './components/ProductHero/ProductHero'
import AccordionSection from './components/AccordionSection/AccordionSection'
import BenefitsTimeline from './components/Benefits/BenefitsTimeline'
import ScientificValidation from './components/ScientificValidation/ScientificValidation'
import RitualSection from './components/RitualSection/RitualSection'
import RefillBanner from './components/RefillBanner/RefillBanner'
import StatsSection from './components/StatsSection/StatsSection'
import Testimonials from './components/Testimonials/Testimonials'
import LogoCarousel from './components/LogoCarousel/LogoCarousel'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
    return (
        <div className="app-container">
            <Header />
            <ProductHero />
            <AccordionSection />
            <BenefitsTimeline />
            <ScientificValidation />
            <RitualSection />
            <RefillBanner />
            <StatsSection />
            <Testimonials />
            <LogoCarousel />
            <Footer />
            <ScrollToTop />
        </div>
    )
}

export default App
