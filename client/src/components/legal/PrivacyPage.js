import React from "react";
import { Link } from "evergreen-ui";

import Container from "../Container";
import Header from "../Header";
import H1 from "../H1";
import H2 from "../H2";
import H3 from "../H3";
import P from "../P";

const PrivacyPage = () => (
  <div className="Page Page--privacy">
    <Header />

    <Container>
      <H1>Privacy Policy</H1>
      <P>
        Your privacy is important to us. It is Gili Hidup Bebas{"'"} policy to
        respect your privacy regarding any information we may collect from you
        across our website,{" "}
        <Link href="http://gilitrip.com" target="_blank">
          http://gilitrip.com
        </Link>
        , and other sites we own and operate.
      </P>

      <H2>Information we collect</H2>
      <H3>Log data</H3>
      <P>
        When you visit our website, our servers may automatically log the
        standard data provided by your web browser. This data is considered
        “non-identifying information”, as it does not personally identify you on
        its own. It may include your computer’s Internet Protocol (IP) address,
        your browser type and version, the pages you visit, the time and date of
        your visit, the time spent on each page, and other details.
      </P>
      <H3>Personal information</H3>
      <P>
        We may ask for personal information, such as your name and email
        address. This data is considered “identifying information”, as it can
        personally identify you. We only request personal information relevant
        to providing you with a service, and only use it to help provide or
        improve this service.
      </P>
      <H3>How we collect information</H3>
      <P>
        We collect information by fair and lawful means, with your knowledge and
        consent. We also let you know why we’re collecting it and how it will be
        used. You are free to refuse our request for this information, with the
        understanding that we may be unable to provide you with some of your
        desired services without it.
      </P>
      <H2>Use of information</H2>
      <P>
        We may use a combination of identifying and non-identifying information
        to understand who our visitors are, how they use our services, and how
        we may improve their experience of our website in future. We do not
        disclose the specifics of this information publicly, but may share
        aggregated and anonymised versions of this information, for example, in
        website and customer usage trend reports.
      </P>
      <H2>Data processing and storage</H2>
      <P>
        We only retain personal information for as long as necessary to provide
        a service, or to improve our services in future. While we retain this
        data, we will protect it within commercially acceptable means to prevent
        loss and theft, as well as unauthorised access, disclosure, copying, use
        or modification. That said, we advise that no method of electronic
        transmission or storage is 100% secure, and cannot guarantee absolute
        data security.
      </P>
      <H2>Cookies</H2>
      <P>
        We use “cookies” to collect information about you and your activity
        across our site. A cookie is a small piece of data that our website
        stores on your computer, and accesses each time you visit so we can
        understand how you use our site and serve you content based on
        preferences you have specified.
      </P>
      <P>
        If you do not wish to accept cookies from us, you should instruct your
        browser to refuse cookies from our website, understanding that we may be
        unable to provide you with some of your desired services without them.
        This policy covers only the use of cookies between your computer and our
        website; it does not cover the use of cookies by any third-party
        services we use on our site.
      </P>
      <H2>Third-party access to information</H2>
      <P>
        We may use third-party services for our website and marketing activity.
        These services may access our data solely for the purpose of performing
        specific tasks on our behalf. We do not share any personally identifying
        information with these services without your explicit consent. We do not
        give these services permission to disclose or use any of our data for
        any other purpose.
      </P>
      <P>
        We will refuse government and law enforcement requests for data if we
        believe a request is too broad or unrelated to its stated purpose.
        However, we may cooperate if we believe the requested information is
        necessary and appropriate to comply with legal process, to protect our
        own rights and property, to protect the safety of the public and any
        person, to prevent a crime, or to prevent what we reasonably believe to
        be illegal, legally actionable, or unethical activity.
      </P>
      <P>
        We do not otherwise share or supply personal information to third
        parties. We do not sell or rent your personal information to marketers
        or third parties.
      </P>
      <H2>Children’s Privacy</H2>
      <P>
        This website does not knowingly target or collect personal information
        from children. As a parent/guardian, please contact us if you believe
        your child is participating in an activity involving personal
        information on our website, and you have no received a notification or
        request for consent. We do not use your supplied contact details for
        marketing or promotional purposes.
      </P>
      <H2>Limits of our policy</H2>
      <P>
        This privacy policy only covers Gili Hidup Bebas{"'"} own collecting and
        handling of data. We only work with partners, affiliates and third-party
        providers whose privacy policies align with ours, however we cannot
        accept responsibility or liability for their respective privacy
        practices.
      </P>
      <P>
        Our website may link to external sites that are not operated by us.
        Please be aware that we have no control over the content and policies of
        those sites, and cannot accept responsibility or liability for their
        respective privacy practices.
      </P>
      <H2>Changes to this policy</H2>
      <P>
        At our discretion, we may update this policy to reflect current
        acceptable practices. We will take reasonable steps to let users know
        about changes via our website. Your continued use of this site after any
        changes to this policy will be regarded as acceptance of our practices
        around data and personal information.
      </P>
      <H2>Your rights and responsibilities</H2>
      <P>
        As our user, you have the right to be informed about how your data is
        collected and used. You are entitled to know what data we collect about
        you, and how it is processed. You are entitled to correct and update any
        personal information about you, and to request this information be
        deleted.
      </P>
      <P>
        You are entitled to restrict or object to our use of your data, while
        retaining the right to use your personal information for your own
        purposes. You have the right to opt out of data about you being used in
        decisions based solely on automated processing.
      </P>
      <P>
        Feel free to contact us if you have any concerns or questions about how
        we handle your data and personal information.
      </P>
      <P>This policy is effective as of 1 May 2019.</P>
    </Container>
  </div>
);

export default PrivacyPage;
