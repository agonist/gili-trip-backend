import React from "react";
import { Pane, Icon, Table } from "evergreen-ui";

import Container from "../components/Container";
import Header from "../components/Header";
import H1 from "../components/H1";
import H2 from "../components/H2";
import P from "../components/P";
import { Mobile } from "../components/Media";

import { ITEM_SPACE } from "../constants";
import companyLogo from "../assets/wahana-logo.png";

const logoWidth = 150;

const rates = [
  {
    location: "Jimbaran",
    time: "06:00am-06:30am",
    price:"Included",
  },
  {
    location: "Canggu",
    time: "06:00am-06:30am",
    price:"Included",
  },
  {
      location: "Ubud, Sanur, Kuta, Airport, Seminyak and Legian	",
      time: "06:30am-07:00am",
      price:"Included",
    },
];
const WahanaPage = () => (
  <div className="Page Page--wahana">
    <Header />

    <Container>
      <H1 marginBottom={ITEM_SPACE}>Wahana Gili Ocean</H1>

      <Mobile>
        {isMobile => (
          <Pane display={isMobile ? "block" : "flex"}>
            <Pane
              width={isMobile ? "100%" : logoWidth}
              flexShrink={0}
              paddingRight={ITEM_SPACE}
            >
              <img src={companyLogo} alt="Wahana Gili Ocean" />
            </Pane>

            <P>
              Wahana Gili Ocean is the fast boat company that started its
              operation in 2010. Based on Klungkung area, Bali. Wahana Gili
              Ocean fast boat are driven by strong commitment by its management
              and staff to provide a safe, comfortable, fast, and reliable
              service to ensure complete customer satisfaction.
            </P>
          </Pane>
        )}
      </Mobile>

      <P>
        As of today the company offer daily trips from Bali to Gili Trawangan,
        Gili Air and Lombok. They operate with 116 and 180 seats vessel
        depending on the frequentation. Traveling from Bali to the Gili islands
        take more or less 1h30.
      </P>


      <H2>Hotel transfer</H2>
        <P>
          Wahana Gili Ocean offer as well free transfer from your hotel in Bali to
          the harbor in Padangbai (the name of the harbor), you can also be
          dropped off after the return trip at your hotel. If you are staying
          outside of the free transfer area, you can still get picked up but you
          will be charged with additional fees (see details below). If you have a
          doubt, do not hesitate to contact us for further details.
        </P><br/>
        <Table
          backgroundColor="#fff"
          borderTop="1px solid #E4E7EB"
          borderLeft="1px solid #E4E7EB"
          borderRight="1px solid #E4E7EB"
        >
          <Table.Head>
            <Table.TextHeaderCell>Location</Table.TextHeaderCell>
            <Table.TextHeaderCell>Pickup time</Table.TextHeaderCell>
            <Table.TextHeaderCell>Price</Table.TextHeaderCell>
          </Table.Head>

          <Table.Body>
          {rates.map(({ location, time, price }) => (
            <Table.Row>
              <Table.TextCell>{location}</Table.TextCell>
              <Table.TextCell>{time}</Table.TextCell>
              <Table.TextCell>{price}</Table.TextCell>
            </Table.Row>
          ))}

          </Table.Body>
        </Table>
      <H2>Cancellation policy</H2>
      <ul>
        <li><P>3 days or more before departure: <b>full refund</b></P></li>
        <li><P>The day before departure: <b>50% refund</b></P></li>
        <li><P>Not showing: <b>No refund</b></P></li>
        <li><P>You can change your travel date for free up to 48h before departure. You can contact Wahana directly for that</P></li>

      </ul>
      <H2>Contact</H2>
      <P><b>Head office</b><br/>
      <Icon icon="map-marker"/> Jl. Rama No.4 – Klungkung, Bali<br/>
      <Icon icon="phone"/> +62 366 – 559 6044 / 532 2603<br/>
      <Icon icon="envelope"/><a href="mailto:reservation@wahanagiliocean.com"> reservation@wahanagiliocean.com</a> / <a href="info@wahanagiliocean.com">info@wahanagiliocean.com</a><br/>
      <Icon icon="globe-network"/> <a href="www.wahanagiliocean.com"> www.wahanagiliocean.com</a></P>

      <P><b>Branch Padangbai</b><br/>
      Kerti Beach Inn<br/>
        Jl. Silayukti, Padangbai</P>

      <P><b>Branch Gili </b><br/>
      Jl. Sama Sama Rege Bar Gili Trawangan<br/>
        <Icon icon="phone"/> +62 366 – 559 6044 / 532 2603<br/></P>

    </Container>
  </div>
);

export default WahanaPage;
