import React from "react";
import SliderMainZero from "../../components/SliderMainZero";
import Footer from "../../components/footer";
import Particle from "../Particle";
import image from "../../../assets/images/dancing.jpg";
import PartySliderMain from "./party-slider-main";
import Header from "../../menu/header";
import CustomFooter from "../home/CustomFooter";

const Party = () => (
  <div>
    <section
      className="jumbotron no-bg"
      style={{ backgroundImage: `url(${"./img/background/16.jpg"})` }}
    >
      <h1></h1>
      <PartySliderMain />
    </section>
    <section className=" no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <img src={image} />
        </div>
      </div>
    </section>

    <CustomFooter />
  </div>
);
export default Party;
