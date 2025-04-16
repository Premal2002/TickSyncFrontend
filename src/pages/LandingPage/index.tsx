
import Footer from "../Footer"
import HeroSection from "../Hero/index";
import Navbar from "../Navbar/index";
import SpecialCategoryDisplay from "../SpecialCategory";
import SubNavbar from "../SubNavbar/index";


const LandingPage = () => {
    return <div>
        <Navbar />
        <SubNavbar />
        <HeroSection />
        <SpecialCategoryDisplay title="Trending" bgColor = "bg-zinc-500"/>
        <SpecialCategoryDisplay title="Recommended Movies" bgColor = "bg-slate-800"/>
        <Footer />
    </div>
};


export default LandingPage;