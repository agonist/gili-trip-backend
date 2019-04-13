import React from "react";
import PropTypes from "prop-types";
import { Heading,Paragraph,Card, Icon, majorScale, Pane } from "evergreen-ui";

const TaglineItem = ({icon, title, text, ...props }) => (

  <Pane
  width={250}
  display="flex"
  flexDirection="row"
  justifyContent="center"
  flex={1}
  marginLeft={majorScale(2)}
  marginRight={majorScale(2)}
>
  <Icon icon={icon} size={majorScale(6)} color="#34d1b6" marginLeft={majorScale(2)}/>
  <Pane>
   <Heading marginLeft={majorScale(2)} marginTop={10}><b>{title}</b></Heading>
   <Paragraph marginLeft={majorScale(2)}  marginTop={majorScale(1)}>{text}</Paragraph>
  </Pane>
</Pane>
);

TaglineItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TaglineItem;
