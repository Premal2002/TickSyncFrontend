
import Footer from "../../components/Footer"
import HeroSection from "../../components/Hero/index";
import Navbar from "../../components/Navbar/index";
import SpecialCategoryDisplay from "../../components/SpecialCategory";
import SubNavbar from "../../components/SubNavbar/index";


const LandingPage = () => {
    return <div>
        <SubNavbar />
        <HeroSection />
        <SpecialCategoryDisplay title="Trending" bgColor = "bg-zinc-500"/>
        <SpecialCategoryDisplay title="Recommended Movies" bgColor = "bg-slate-800"/>
    </div>
};


export default LandingPage;