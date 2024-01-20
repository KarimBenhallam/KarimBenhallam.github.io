import React, { useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Card } from 'primereact/card';
import { useLanguageContext } from '../contexts/language-context';
import { getTextFromJSON } from '../utils/languageUtils';
import { useIntersectionObserver} from 'primereact/hooks';
import { classNames } from 'primereact/utils';




const About = () => {
    const context = useLanguageContext();

    const overview = getTextFromJSON(context.language, "about_content.overview");
    const more = getTextFromJSON(context.language, "about_content.more");

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

    return (
        <TabView>
            <TabPanel header={overview} leftIcon="pi pi-search mr-2">
                <Card title={wcc_title} ref={wcc_ref} className={classNames('col-6 bg-gray-800 shadow-8', {'fadeinleft animation-duration-1000 animation-iteration-1' : wcc_visible},
                 {'fadeoutleft animation-duration-1000 animation-iteration-1' : !wcc_visible})}>
                    <img src="./uottawa.png" alt='' className='mb-1 right-100 sticky max-h-4rem max-w-4rem' />
                    <div dangerouslySetInnerHTML={{ __html: wcc! }} />
                </Card>
                <Card title={wdev_title} ref={wdev_ref} className={classNames('col-offset-6 bg-gray-800 shadow-8',  {'fadeinright animation-duration-1000 animation-iteration-1': wdev_visible},
                {'fadeoutright animation-duration-1000 animation-iteration-1': !wdev_visible})}>
                    <img src="./innovapost.jpg" alt="" className='mb-1 right-100 sticky max-h-5rem max-w-7rem' />
                    <div dangerouslySetInnerHTML={{ __html: wdev! }} />
                </Card>
                <Card title={fstack_title} ref={fstack_ref} className={classNames('col-6 bg-gray-800 shadow-8', {'fadeinleft animation-duration-1000 animation-iteration-1' : fstack_visible},
                 {'fadeoutleft animation-duration-1000 animation-iteration-1' : !fstack_visible})}>
                <img src="./conceptio.png" alt="" className='mb-1 right-100 sticky max-h-5rem w-7rem' />
                    <div dangerouslySetInnerHTML={{ __html: fstack! }} />
                </Card>
                <Card title={capstone_title} ref={capstone_ref} className={classNames('col-offset-6 bg-gray-800 shadow-8',  {'fadeinright animation-duration-1000 animation-iteration-1': capstone_visible},
                {'fadeoutright animation-duration-1000 animation-iteration-1': !capstone_visible})}>
                    <img src="./uottawa.png" alt='' className='mb-1 right-100 sticky max-h-4rem max-w-4rem' />
                    <div dangerouslySetInnerHTML={{ __html: capstone! }} />
                </Card>
                <Card title={ra_title} ref={ra_ref} className={classNames('col-6 bg-gray-800 shadow-8', {'fadeinleft animation-duration-1000 animation-iteration-1' : ra_visible},
                 {'fadeoutleft animation-duration-1000 animation-iteration-1' : !ra_visible})}>
                    <img src="./uottawa.png" alt='' className='mb-1 right-100 sticky max-h-4rem max-w-4rem'/>
                    <div dangerouslySetInnerHTML={{ __html: ra! }} />
                </Card>
            </TabPanel>
            <TabPanel header={more} leftIcon="pi pi-plus mr-2">
                <p className="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                </p>
            </TabPanel>
        </TabView>
    )
}

export default About;