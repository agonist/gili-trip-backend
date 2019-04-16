import React from "react";
import { Link } from "evergreen-ui";

import Container from "../Container";
import Header from "../Header";
import H1 from "../H1";
import H2 from "../H2";
import P from "../P";

const CookiesPage = () => {
  return (
    <div className="Page Page--cookies">
      <Header />

      <Container>
        <H1>Cookie Policy</H1>
        <P>
          We use cookies to help improve your experience of{" "}
          <Link href="http://gilitrip.com" target="_blank">
            http://gilitrip.com
          </Link>
          . This cookie policy is part of Gili Hidup Bebas{"'"} privacy policy,
          and covers the use of cookies between your device and our site.
        </P>
        <P>
          If you don’t wish to accept cookies from us, you should instruct your
          browser to refuse cookies from{" "}
          <Link href="http://gilitrip.com" target="_blank">
            http://gilitrip.com
          </Link>
          , with the understanding that we may be unable to provide you with
          some of your desired content and services.
        </P>
        <H2>What is a cookie?</H2>
        <P>
          A cookie is a small piece of data that a website stores on your device
          when you visit, typically containing information about the website
          itself, a unique identifier that allows the site to recognise your web
          browser when you return, additional data that serves the purpose of
          the cookie, and the lifespan of the cookie itself.
        </P>
        <P>
          Cookies are used to enable certain features (eg. logging in), to track
          site usage (eg. analytics), to store your user settings (eg. timezone,
          notification preferences), and to personalise your content (eg.
          advertising, language).
        </P>
        <P>
          Cookies set by the website you are visiting are normally referred to
          as “first-party cookies”, and typically only track your activity on
          that particular site. Cookies set by other sites and companies (ie.
          third parties) are called “third-party cookies”, and can be used to
          track you on other websites that use the same third-party service.
        </P>
        <H2>How you can control or opt out of cookies</H2>
        <P>
          If you do not wish to accept cookies from us, you can instruct your
          browser to refuse cookies from our website. Most browsers are
          configured to accept cookies by default, but you can update these
          settings to either refuse cookies altogether, or to notify you when a
          website is trying to set or update a cookie.
        </P>
        <P>
          If you browse websites from multiple devices, you may need to update
          your settings on each individual device.
        </P>
        <P>
          Although some cookies can be blocked with little impact on your
          experience of a website, blocking all cookies may mean you are unable
          to access certain features and content across the sites you visit.
        </P>
      </Container>
    </div>
  );
};

export default CookiesPage;
