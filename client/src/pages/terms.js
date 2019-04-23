import React from "react";
import { Li, Link, Ol } from "evergreen-ui";

import Container from "../components/Container";
import Header from "../components/Header";
import H1 from "../components/H1";
import H2 from "../components/H2";
import P from "../components/P";

const TermsPage = () => {
  return (
    <div className="Page Page--tos">
      <Header />

      <Container>
        <H1>Gili Hidup Bebas Terms of Service</H1>
        <H2>Terms</H2>
        <P>
          By accessing the website at{" "}
          <Link href="http://gilitrip.com" target="_blank">
            http://gilitrip.com
          </Link>
          , you are agreeing to be bound by these terms of service, all
          applicable laws and regulations, and agree that you are responsible
          for compliance with any applicable local laws. If you do not agree
          with any of these terms, you are prohibited from using or accessing
          this site. The materials contained in this website are protected by
          applicable copyright and trademark law.
        </P>

        <H2>Use License</H2>
        <P>
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Gili Hidup Bebas{"'"} website
          for personal, non-commercial transitory viewing only. This is the
          grant of a license, not a transfer of title, and under this license
          you may not:
        </P>
        <Ol listStyle="a">
          <Li>Modify or copy the materials;</Li>
          <Li>
            Use the materials for any commercial purpose, or for any public
            display (commercial or non-commercial);
          </Li>
          <Li>
            Attempt to decompile or reverse engineer any software contained on
            Gili Hidup Bebas{"'"} website;
          </Li>
          <Li>
            Remove any copyright or other proprietary notations from the
            materials; or
          </Li>
          <Li>
            Transfer the materials to another person or {"'"}mirror{"'"} the
            materials on any other server.
          </Li>
        </Ol>

        <P>
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Gili Hidup Bebas at any time.
          Upon terminating your viewing of these materials or upon the
          termination of this license, you must destroy any downloaded materials
          in your possession whether in electronic or printed format.
        </P>

        <H2>Disclaimer</H2>
        <P>
          The materials on Gili Hidup Bebas{"'"} website are provided on an{" "}
          {"'"}as is{"'"} basis. Gili Hidup Bebas makes no warranties, expressed
          or implied, and hereby disclaims and negates all other warranties
          including, without limitation, implied warranties or conditions of
          merchantability, fitness for a particular purpose, or non-infringement
          of intellectual property or other violation of rights.
        </P>
        <P>
          Further, Gili Hidup Bebas does not warrant or make any representations
          concerning the accuracy, likely results, or reliability of the use of
          the materials on its website or otherwise relating to such materials
          or on any sites linked to this site.
        </P>

        <H2>Limitations</H2>
        <P>
          In no event shall Gili Hidup Bebas or its suppliers be liable for any
          damages (including, without limitation, damages for loss of data or
          profit, or due to business interruption) arising out of the use or
          inability to use the materials on Gili Hidup Bebas{"'"} website, even
          if Gili Hidup Bebas or a Gili Hidup Bebas authorized representative
          has been notified orally or in writing of the possibility of such
          damage. Because some jurisdictions do not allow limitations on implied
          warranties, or limitations of liability for consequential or
          incidental damages, these limitations may not apply to you.
        </P>

        <H2>Accuracy of materials</H2>
        <P>
          The materials appearing on Gili Hidup Bebas{"'"} website could include
          technical, typographical, or photographic errors. Gili Hidup Bebas
          does not warrant that any of the materials on its website are
          accurate, complete or current. Gili Hidup Bebas may make changes to
          the materials contained on its website at any time without notice.
          However Gili Hidup Bebas does not make any commitment to update the
          materials.
        </P>

        <H2>Links</H2>
        <P>
          Gili Hidup Bebas has not reviewed all of the sites linked to its
          website and is not responsible for the contents of any such linked
          site. The inclusion of any link does not imply endorsement by Gili
          Hidup Bebas of the site. Use of any such linked website is at the user
          {"'"}s own risk.
        </P>

        <H2>Modifications</H2>
        <P>
          Gili Hidup Bebas may revise these terms of service for its website at
          any time without notice. By using this website you are agreeing to be
          bound by the then current version of these terms of service.
        </P>

        <H2>Governing Law</H2>
        <P>
          These terms and conditions are governed by and construed in accordance
          with the laws of Indonesia and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </P>
      </Container>
    </div>
  );
};

export default TermsPage;
