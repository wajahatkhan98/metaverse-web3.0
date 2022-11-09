import React from "react";
import SliderMainZero from "../../components/SliderMainZero";
import Footer from "../../components/footer";
import Particle from "../Particle";
import image from "../../../assets/images/Image1.jpg";
import image2 from "../../../assets/images/businessmeet.webp";
import BUsinessMeetingSlider from "./business-meeting-slider";
import Header from "../../menu/header";
import CustomFooter from "../home/CustomFooter";

const BusinessMeeting = () => (
  <div>
    <section
      className="jumbotron no-bg"
      style={{ backgroundImage: `url(${image2})` }}
    >
      <BUsinessMeetingSlider />
    </section>
    <section className=" no-bottom">
      <div className="row">
        <div className="col-lg-12"></div>
        <div className="nft_pic_wrap">
          <img src={image} className="lazy img-fluid" alt="" />
        </div>
      </div>
    </section>

    <CustomFooter />
  </div>
);
export default BusinessMeeting;
