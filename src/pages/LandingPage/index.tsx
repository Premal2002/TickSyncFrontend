
import HeroSection from "../Hero/index";
import Navbar from "../Navbar/index";
import SpecialCategoryDisplay from "../SpecialCategory";
import SubNavbar from "../SubNavbar/index";


const LandingPage = () => {
    return <div>
        <Navbar />
        <SubNavbar />
        <HeroSection />
        <SpecialCategoryDisplay title="Trending" />
    </div>
};


export default LandingPage;