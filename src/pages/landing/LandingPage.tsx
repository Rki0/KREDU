import React from "react";

import Layout from "../../layout/Layout";
import AnimationTitle from "./AnimationTitle";
import ExampleFileDownload from "./ExampleFileDownload";
import ExampleYoutube from "./ExampleYoutube";
import MainDescription from "./MainDescription";

function LandingPage() {
  return (
    <Layout>
      <AnimationTitle />

      <MainDescription />

      <ExampleFileDownload />

      <ExampleYoutube />
    </Layout>
  );
}

export default LandingPage;
