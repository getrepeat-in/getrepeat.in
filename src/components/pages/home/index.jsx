import Faqs from "./fragments/faqs";
import { Hero } from "./fragments/hero";
import FeaturesSection from "./fragments/features";
import Testimonials from "./fragments/reviews";
import PricingSection from "./fragments/pricing";

const Home = () => {
    return (
        <div>
            <Hero />
            <FeaturesSection />
            <PricingSection />
            <Testimonials />
            <Faqs />
        </div>
    )
}

export default Home;