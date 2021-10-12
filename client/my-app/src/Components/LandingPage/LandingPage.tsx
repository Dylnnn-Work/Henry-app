import React from 'react';
import Features from './Features';
import Header from './Header';
import Testimonials from './Testimonials';
import img1 from './Images/img1.png';
import img2 from './Images/img2.png';
import img3 from './Images/img3.png';
import img4 from './Images/img4.png';
import Footer from './Footer';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-grayHenry to-gray-500 min-h-screen p-0 m-0">
            <div>
                <Header />
            </div>
            <div className="mt-48">
                <Testimonials />
            </div>
            <div className="mt-48">
                <Features img={img1} title={'HIGH LEVEL OF CANDIDATES'} />
                <Features img={img2} title={'DIRECT CONTACT'} />
                <Features img={img3} title={'SOFT SKILLS'} />
                <Features img={img4} title={'LATEST TECNOLOGIES'} />
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
