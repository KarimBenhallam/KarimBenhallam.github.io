import React, { useRef, useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { useLanguageContext } from '../contexts/language-context';
import { getTextFromJSON } from '../utils/languageUtils';
import { useIntersectionObserver } from 'primereact/hooks';
import { classNames } from 'primereact/utils';
import { Carousel } from 'primereact/carousel';





const About = () => {
    const context = useLanguageContext();

    //useState makes it clear which tab is active, preventing bugs with the animations
    const [activeIndex, setActiveIndex] = useState(0);


    //tab titles
    const overview = getTextFromJSON(context.language, "about_content.overview");
    const more = getTextFromJSON(context.language, "about_content.more");

    //1st tab content
    const wcc_title = getTextFromJSON(context.language, "about_content.wcc_title");
    const wdev_title = getTextFromJSON(context.language, "about_content.wdev_title");
    const fstack_title = getTextFromJSON(context.language, "about_content.fstack_title");
    const capstone_title = getTextFromJSON(context.language, "about_content.capstone_title");
    const ra_title = getTextFromJSON(context.language, "about_content.ra_title");

    const wcc = getTextFromJSON(context.language, "about_content.wcc");
    const wdev = getTextFromJSON(context.language, "about_content.wdev");
    const fstack = getTextFromJSON(context.language, "about_content.fstack");
    const capstone = getTextFromJSON(context.language, "about_content.capstone");
    const ra = getTextFromJSON(context.language, "about_content.ra");

    //1st tab refs and bools
    const wcc_ref = useRef(null);
    const wdev_ref = useRef(null);
    const fstack_ref = useRef(null);
    const capstone_ref = useRef(null);
    const ra_ref = useRef(null);

    const wcc_visible = useIntersectionObserver(wcc_ref);
    const wdev_visible = useIntersectionObserver(wdev_ref);
    const fstack_visible = useIntersectionObserver(fstack_ref);
    const capstone_visible = useIntersectionObserver(capstone_ref);
    const ra_visible = useIntersectionObserver(ra_ref);

    //2nd tab images
    const imageTemplate = (img: string) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <img src={`${img}`} alt="" className="w-6 shadow-2" />
            </div>
        );
    };
    const mor_images: string[] = [
        './about_images/lunch.webp',
        './about_images/flag.webp',
        './about_images/view.webp',
        './about_images/couscous.jpeg',
        './about_images/meat.jpeg',
        './about_images/beach.jpeg',
        './about_images/breakfast.jpg',
        './about_images/sheep.jpeg',
        './about_images/sunset.webp',
        './about_images/camel.jpeg',
        './about_images/sea.jpeg',
        './about_images/palm.jpeg',
        './about_images/beautiful.jpeg',
        './about_images/restaurant.jpeg',
        './about_images/nice_sunset.jpeg',
        './about_images/hassan2.jpeg',
    ];

    const gym_images: string[] = [
        './about_images/calisthenics.jpg',
        './about_images/squat.jpg',
        './about_images/handstand.jpg',
        './about_images/pullup.jpg',
    ];

    const socc_images: string[] = [
        './about_images/shoes.jpg',
        './about_images/ping.jpg',
        './about_images/game.webp',
        './about_images/street.jpg',
        './about_images/wcup.webp',
        './about_images/amrabat.webp',
    ];

    const me_images: string[] = [
        './about_images/duo.jpg',
        './about_images/bday.webp',
        './about_images/dogs.jpg',
        './about_images/glasses.jpg',
    ];

    //2nd tab content
    const morocco_title = getTextFromJSON(context.language, "about_content.morocco_title");
    const me_title = getTextFromJSON(context.language, "about_content.me_title");
    const soccer_title = getTextFromJSON(context.language, "about_content.soccer_title");
    const gym_title = getTextFromJSON(context.language, "about_content.gym_title");


    const morocco = getTextFromJSON(context.language, "about_content.morocco");
    const me = getTextFromJSON(context.language, "about_content.me")
    const soccer = getTextFromJSON(context.language, "about_content.soccer");
    const gym = getTextFromJSON(context.language, "about_content.gym");



    //2nd tab refs and bools
    const morocco_ref = useRef(null);
    const me_ref = useRef(null);
    const soccer_ref = useRef(null);
    const gym_ref = useRef(null);


    const morocco_visible = useIntersectionObserver(morocco_ref);
    const me_visible = useIntersectionObserver(me_ref);
    const soccer_visible = useIntersectionObserver(soccer_ref);
    const gym_visible = useIntersectionObserver(gym_ref);




    return (
        <TabView activeIndex={activeIndex} onTabChange={e => setActiveIndex(e.index)}>
            <TabPanel header={overview} leftIcon="pi pi-search mr-2">
                <Card title={wcc_title} ref={wcc_ref} className={classNames('col-6 bg-gray-800 shadow-8', { 'fadeinleft animation-duration-1000 animation-iteration-1': wcc_visible },
                    { 'fadeoutleft animation-duration-1000 animation-iteration-1': !wcc_visible })}>
                    <img src="./uottawa.png" alt='' className='mb-1 right-100 sticky max-h-4rem max-w-4rem' />
                    <div dangerouslySetInnerHTML={{ __html: wcc! }} />
                </Card>
                <Card title={wdev_title} ref={wdev_ref} className={classNames('col-offset-6 bg-gray-800 shadow-8', { 'fadeinright animation-duration-1000 animation-iteration-1': wdev_visible },
                    { 'fadeoutright animation-duration-1000 animation-iteration-1': !wdev_visible })}>
                    <img src="./innovapost.jpg" alt="" className='mb-1 right-100 sticky max-h-5rem max-w-7rem' />
                    <div dangerouslySetInnerHTML={{ __html: wdev! }} />
                </Card>
                <Card title={fstack_title} ref={fstack_ref} className={classNames('col-6 bg-gray-800 shadow-8', { 'fadeinleft animation-duration-1000 animation-iteration-1': fstack_visible },
                    { 'fadeoutleft animation-duration-1000 animation-iteration-1': !fstack_visible })}>
                    <img src="./conceptio.png" alt="" className='mb-1 right-100 sticky max-h-5rem w-7rem' />
                    <div dangerouslySetInnerHTML={{ __html: fstack! }} />
                </Card>
                <Card title={capstone_title} ref={capstone_ref} className={classNames('col-offset-6 bg-gray-800 shadow-8', { 'fadeinright animation-duration-1000 animation-iteration-1': capstone_visible },
                    { 'fadeoutright animation-duration-1000 animation-iteration-1': !capstone_visible })}>
                    <img src="./uottawa.png" alt='' className='mb-1 right-100 sticky max-h-4rem max-w-4rem' />
                    <div dangerouslySetInnerHTML={{ __html: capstone! }} />
                </Card>
                <Card title={ra_title} ref={ra_ref} className={classNames('col-6 bg-gray-800 shadow-8', { 'fadeinleft animation-duration-1000 animation-iteration-1': ra_visible },
                    { 'fadeoutleft animation-duration-1000 animation-iteration-1': !ra_visible })}>
                    <img src="./uottawa.png" alt='' className='mb-1 right-100 sticky max-h-4rem max-w-4rem' />
                    <div dangerouslySetInnerHTML={{ __html: ra! }} />
                </Card>
            </TabPanel>
            <TabPanel header={more} leftIcon="pi pi-plus mr-2">
            <Card title={morocco_title} ref={morocco_ref} className={classNames('col-7 bg-gray-800 shadow-8 mb-2', { 'fadeinleft animation-duration-1000 animation-iteration-1': morocco_visible },
                    { 'fadeoutleft animation-duration-1000 animation-iteration-1': !morocco_visible })}>
                        <div className='grid'>
                            <div className='col-6'>
                        <div dangerouslySetInnerHTML={{ __html: morocco! }} />
                            </div>
                            <div className='col-6'>
                    <Carousel value={mor_images} numVisible={1} numScroll={1} className="custom-carousel" circular
                        autoplayInterval={1500} itemTemplate={imageTemplate} />
                            </div>
                        </div>
                </Card>
                <Card title={me_title} ref={me_ref} className={classNames('col-offset-5 bg-gray-800 shadow-8 mb-2', { 'fadeinright animation-duration-1000 animation-iteration-1': me_visible },
                    { 'fadeoutright animation-duration-1000 animation-iteration-1': !me_visible })}>
                        <div className='grid'>
                            <div className='col-6'>
                        <div dangerouslySetInnerHTML={{ __html: me! }} />
                            </div>
                            <div className='col'>
                    <Carousel value={me_images} numVisible={1} numScroll={1} className="custom-carousel" circular
                        autoplayInterval={1500} itemTemplate={imageTemplate} />
                            </div>
                        </div>
                </Card>
                <Card title={soccer_title} ref={soccer_ref} className={classNames('col-7 bg-gray-800 shadow-8 mb-2', { 'fadeinleft animation-duration-1000 animation-iteration-1': soccer_visible },
                    { 'fadeoutleft animation-duration-1000 animation-iteration-1': !soccer_visible })}>
                        <div className='grid'>
                            <div className='col-6'>
                        <div dangerouslySetInnerHTML={{ __html: soccer! }} />
                            </div>
                            <div className='col'>
                    <Carousel value={socc_images} numVisible={1} numScroll={1} className="custom-carousel" circular
                        autoplayInterval={1500} itemTemplate={imageTemplate} />
                            </div>
                        </div>
                </Card>
                <Card title={gym_title} ref={gym_ref} className={classNames('col-offset-5 bg-gray-800 shadow-8', { 'fadeinright animation-duration-1000 animation-iteration-1': gym_visible },
                    { 'fadeoutright animation-duration-1000 animation-iteration-1': !gym_visible })}>
                        <div className='grid'>
                            <div className='col-6'>
                        <div dangerouslySetInnerHTML={{ __html: gym! }} />
                            </div>
                            <div className='col'>
                    <Carousel value={gym_images} numVisible={1} numScroll={1} className="custom-carousel" circular
                        autoplayInterval={1500} itemTemplate={imageTemplate} />
                            </div>
                        </div>
                </Card>
            </TabPanel>
        </TabView>
    )
}

export default About;