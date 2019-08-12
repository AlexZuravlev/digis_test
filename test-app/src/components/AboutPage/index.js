import React from 'react';
import AuthorIcon from "./AuthorIcon";
import './About.sass'
import Name from "./Name";
import AboutText from "./AboutText";

const AboutPage = () => (
    <section className="about">
        <AuthorIcon/>
        <Name/>
        <AboutText/>
    </section>
);

export default AboutPage
