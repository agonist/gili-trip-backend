import React from "react";
import { Pane, Icon, Table, Ul, Li, Link } from "evergreen-ui";

import Container from "../components/Container";
import Header from "../components/Header";
import H1 from "../components/H1";
import H2 from "../components/H2";
import H3 from "../components/H3";
import P from "../components/P";

import useMedia from "../hooks/useMedia";
import companyLogo from "../assets/wahana-logo.png";
import { ITEM_SPACE } from "../constants";

const logoWidth = 150;

const iconProps = {
  size: 12,
  marginRight: 4,
};

const ratesPickupMorning = [
  {
    location: "Jimbaran",
    time: "05:30am-06:30am",
  },
  {
    location: "Canggu",
    time: "06:00am-06:30am",
  },
  {
    location: "Ubud, Kuta, Sanur, Airport, Seminyak, Legian",
    time: "06:30am-07:00am",
  },
  {
    location: "Other areas",
    time: "-",
  },
];

const ratesPickupAfternoon = [
  {
    location: "Jimbaran",
    time: "9:30am-10:00am",
  },
  {
    location: "Canggu",
    time: "9:30am-10:00am",
  },
  {
    location: "Ubud, Kuta, Sanur, Airport, Seminyak, Legian",
    time: "10:00am-10:30am",
  },
  {
    location: "Other areas",
    time: "-",
  },
];

const WahanaPage = () => {
  const { isMobile } = useMedia();

  return (
    <div className="Page Page--wahana">
      <Header />

      <Container>
        <H1 marginBottom={ITEM_SPACE}>Wahana Gili Ocean</H1>

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
            operation in 2010 and is based in the Klungkung area of Bali.
            Wahana Gili Ocean speed boats are driven by a strong commitment to provide a safe, fast,
            and reliable service to ensure complete customer satisfaction.
          </P>
        </Pane>

        <P>
          Currently, Wahana Gili Ocean offers daily trips from Bali to Gili Trawangan,
           Gili Air and Lombok. They operate with 116 and 180 seat vessels depending on the customer demand.
            Traveling from Bali to the Gili islands takes around 1h30.
        </P>

        <H2>Hotel transfer</H2>
        <P>
          Wahana Gili Ocean offers a free transfer from your hotel in Bali to the harbour in Padangbai and from the Padangbai harbour to your hotel on your return trip.
          If you are staying outside of the free transfer area, you can still book a transfer but you will be charged with additional fees (see details below).
          If you have any queries, do not hesitate to contact us for further details.
        </P>

        <H3>9:00am boat</H3>
        <Table
          backgroundColor="#fff"
          borderTop="1px solid #E4E7EB"
          borderLeft="1px solid #E4E7EB"
          borderRight="1px solid #E4E7EB"
        >
          <Table.Head>
            <Table.TextHeaderCell>Location</Table.TextHeaderCell>
            <Table.TextHeaderCell>Pickup time</Table.TextHeaderCell>
          </Table.Head>

          <Table.Body>
            {ratesPickupMorning.map(({ location, time }) => (
              <Table.Row key={location}>
                <Table.TextCell>{location}</Table.TextCell>
                <Table.TextCell>{time}</Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <H3>1:00pm boat</H3>
        <Table
          backgroundColor="#fff"
          borderTop="1px solid #E4E7EB"
          borderLeft="1px solid #E4E7EB"
          borderRight="1px solid #E4E7EB"
        >
          <Table.Head>
            <Table.TextHeaderCell>Location</Table.TextHeaderCell>
            <Table.TextHeaderCell>Pickup time</Table.TextHeaderCell>
          </Table.Head>

          <Table.Body>
            {ratesPickupAfternoon.map(({ location, time }) => (
              <Table.Row key={location}>
                <Table.TextCell>{location}</Table.TextCell>
                <Table.TextCell>{time}</Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <H2>Cancellation policy</H2>
        <Ul>
          <Li>
            3 days or more before departure: <b>full refund</b>
          </Li>
          <Li>
            The day before departure: <b>50% refund</b>
          </Li>
          <Li>
            Not showing: <b>No refund</b>
          </Li>
          <Li>
            You can change your travel date for free up to 48h before departure.
            Please contact Wahana directly for all departure date changes.
          </Li>
        </Ul>

        <H2>Contact</H2>
        <H3>Head office</H3>
        <P>
          <Icon {...iconProps} icon="map-marker" /> Jl. Rama No.4 – Klungkung,
          Bali
        </P>
        <P>
          <Icon {...iconProps} icon="phone" /> +62 366 – 559 6044 / 532 2603
        </P>
        <P>
          <Icon {...iconProps} icon="envelope" />{" "}
          <Link href="mailto:reservation@wahanagiliocean.com">
            reservation@wahanagiliocean.com
          </Link>{" "}
          /{" "}
          <Link href="info@wahanagiliocean.com">info@wahanagiliocean.com</Link>
        </P>
        <P>
          <Icon {...iconProps} icon="globe-network" />{" "}
          <Link href="www.wahanagiliocean.com">www.wahanagiliocean.com</Link>
        </P>

        <H3>Branch Padangbai</H3>
        <P>
          Kerti Beach Inn
          <br />
          Jl. Silayukti, Padangbai
        </P>

        <H3>Branch Gili </H3>
        <P>
          Jl. Sama Sama Rege Bar Gili Trawangan
          <br />
          <Icon {...iconProps} icon="phone" /> +62 366 – 559 6044 / 532 2603
        </P>
      </Container>
    </div>
  );
};

export default WahanaPage;
