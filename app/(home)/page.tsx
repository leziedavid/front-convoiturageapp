import SectionFive from '../components/home/SectionFive'
import SectionFour from '../components/home/SectionFour'
import SectionSix from '../components/home/SectionSix'
import SectionTwo from '../components/home/SectionTwo'
import ActionItems from '../components/home/ActionItems'
import { Hero3 } from '@/components/Hero3'
import { Feature4 } from '@/components/Feature4'
import { Footer } from '@/components/Footer'
import { Pub } from '@/components/Pub'

export default function page() {
    return (
        <>
            <Hero3/>
            <ActionItems/>
            <Pub/>
            {/* <Feature4/> */}
            <Footer/>
            
            {/* <SectionZero/>
            <SectionTwo/>
            <SectionFour/>
            <SectionSix/> */}
        </>

    )
}
