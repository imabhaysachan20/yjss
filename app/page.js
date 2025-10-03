import AboutHome from "@/components/AboutHome";
import Banner_below_options from "@/components/banner_below_options";
import Container from "@/components/Container";
import GoogleTranslate from "@/components/GoogleTranslate";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import TwitterWidget from "@/components/TwitterWidget";
import RecentImages from "@/components/RecentImages";
import RecentNews from "@/components/RecentNews";
import RecentVideos from "@/components/RecentVideos";



export default function Home() {

  return (
    <div>
    <div className="-z-10 mt-[3px]">
      <video src="/banner.mp4" autoPlay muted loop playsInline  className="w-full"></video>  
    </div>
      <Container>
      <Banner_below_options/>
      <AboutHome/>
      <RecentNews />
      <RecentVideos />
      <RecentImages/>
      <TwitterWidget/>
      </Container>
      </div>
  );
}
