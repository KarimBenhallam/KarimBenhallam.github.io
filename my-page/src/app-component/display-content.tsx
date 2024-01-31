import { classNames } from "primereact/utils";
import { useContentContext } from "../contexts/content_context";
import Home from "./home";
import About from "./about";
import Resume from "./resume";
import Work from "./work-samples";

const DisplayContent = () => {
    const { content, setContent } = useContentContext();


    return (
        <div>
        <div className={classNames({ 'fadein animation-duration-1000 animation-iteration-1': content === "home" },
            { 'hidden': content !== "home" })}>
            <Home />
        </div>
        <div className={classNames({ 'fadein animation-duration-1000 animation-iteration-1': content === "about" },
            { 'hidden': content !== "about" })}>
            <About />
        </div>
        <div className={classNames({ 'fadein animation-duration-1000 animation-iteration-1': content === "resume" },
            { 'hidden': content !== "resume" })}>
            <Resume />
        </div>
        <div className={classNames({ 'fadein animation-duration-1000 animation-iteration-1': content === "work" },
            { 'hidden': content !== "work" })}>
            <Work />
        </div>

        </div>
        
    );
};

export default DisplayContent;