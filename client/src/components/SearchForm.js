import React from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import { Form, Field } from "react-final-form";
import dateFns from "date-fns";
import {
  Button,
  IconButton,
  Pane,
  Popover,
  Radio,
  SelectField,
  TextInputField,
  majorScale,
} from "evergreen-ui";

import {
  ITEM_HEIGHT,
  ITEM_SPACE,
  LOCATIONS,
  TODAY_DATE,
  TRAVEL_TYPES,
} from "../constants";

import { formatDate, formValidations, hasReturn } from "../helpers";

import { Mobile, Tablet, Desktop } from "./Media";

const DEFAULT_DEPARTURE_ID = "1";
const DEFAULT_ARRIVAL_ID = "3";
const DEFAULT_QUANTITY = 1;

const SPACING = majorScale(1);

const baseDate = dateFns.addDays(TODAY_DATE, 1);

const inputProps = {
  inputHeight: ITEM_HEIGHT,
  marginBottom: 0,
};

const paneProps = {
  flexGrow: 1,
  marginRight: SPACING,
};

const radioProps = {
  size: 16,
  marginRight: ITEM_SPACE,
};

const { required } = formValidations;

const renderLocations = () =>
  LOCATIONS.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

const swapMutator = (_, { fields, formState }) => {
  const { from, to } = fields;
  const { values } = formState;

  to.change(values.from);
  from.change(values.to);
};

const renderTravelType = () => (
  <Pane display="flex" alignItems="flex-end">
    <Field name="travel_type" type="radio" value={TRAVEL_TYPES.ONE_WAY}>
      {({ input }) => <Radio label="One way" {...input} {...radioProps} />}
    </Field>
    <Field name="travel_type" type="radio" value={TRAVEL_TYPES.ROUND}>
      {({ input }) => <Radio label="Return" {...input} {...radioProps} />}
    </Field>
  </Pane>
);

const renderFrom = () => (
  <Field name="from" validate={required}>
    {({ input, meta }) => (
      <Pane flexGrow={1} {...paneProps}>
        <SelectField
          {...input}
          {...inputProps}
          required
          label="From"
          isInvalid={meta.error && meta.touched}
        >
          {renderLocations()}
        </SelectField>
      </Pane>
    )}
  </Field>
);

const renderLocationSwapper = form => (
  <Pane className="swap-locations" marginRight={SPACING}>
    <IconButton
      icon="swap-horizontal"
      height={ITEM_HEIGHT}
      appearance="minimal"
      type="button"
      onClick={form.mutators.swap}
    />
  </Pane>
);

const renderTo = () => (
  <Field name="to" validate={required}>
    {({ input, meta }) => (
      <Pane flexGrow={1} {...paneProps}>
        <SelectField
          {...input}
          {...inputProps}
          required
          label="To"
          isInvalid={meta.error && meta.touched}
        >
          {renderLocations()}
        </SelectField>
      </Pane>
    )}
  </Field>
);

const renderDepartureDate = (travel_type, arrival_date) => (
  <Field name="departure_date" validate={required}>
    {({ input: { value, ...input }, meta }) => (
      <Popover
        content={({ close }) => (
          <DayPicker
            {...input}
            selectedDays={[value, hasReturn(travel_type) && arrival_date]}
            disabledDays={{ before: baseDate }}
            onDayClick={day => {
              if (dateFns.isBefore(day, baseDate)) return;
              input.onChange(day);
              close();
            }}
          />
        )}
      >
        <Pane {...paneProps}>
          <TextInputField
            {...input}
            {...inputProps}
            label="Departure"
            placeholder={formatDate(baseDate)}
            required
            readOnly
            value={value && formatDate(value)}
            isInvalid={meta.error && meta.touched}
          />
        </Pane>
      </Popover>
    )}
  </Field>
);

const renderArrivalDate = departure_date => (
  <Field name="arrival_date" validate={required}>
    {({ input: { value, ...input }, meta }) => (
      <Popover
        content={({ close }) => (
          <DayPicker
            selectedDays={[value, departure_date]}
            disabledDays={{
              before: departure_date || baseDate,
            }}
            onDayClick={day => {
              if (dateFns.isBefore(day, departure_date || baseDate)) return;
              input.onChange(day);
              close();
            }}
          />
        )}
      >
        <Pane {...paneProps}>
          <TextInputField
            {...inputProps}
            label="Return"
            placeholder={formatDate(dateFns.addDays(baseDate, 7))}
            required
            readOnly
            isInvalid={meta.error && meta.touched}
            value={value && formatDate(value)}
          />
        </Pane>
      </Popover>
    )}
  </Field>
);

const renderQuantity = () => (
  <Field name="quantity" validate={required}>
    {({ input, meta }) => (
      <Pane {...paneProps} minWidth={80} flexShrink={0}>
        <SelectField
          {...input}
          {...inputProps}
          required
          label="Quantity"
          isInvalid={meta.error && meta.touched}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </SelectField>
      </Pane>
    )}
  </Field>
);

const renderSubmit = (submitting, isLoading) => (
  <Pane {...paneProps} flexShrink={0}>
    <Button
      width="100%"
      height={ITEM_HEIGHT}
      appearance="primary"
      isLoading={submitting || isLoading}
      type="submit"
      justifyContent="center"
    >
      SEARCH
    </Button>
  </Pane>
);

const SearchForm = ({ formData, isLoading, onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    mutators={{ swap: swapMutator }}
    initialValues={{
      from: DEFAULT_DEPARTURE_ID,
      to: DEFAULT_ARRIVAL_ID,
      quantity: DEFAULT_QUANTITY,
      travel_type: TRAVEL_TYPES.ROUND,
      ...formData,
    }}
  >
    {({
      form,
      handleSubmit,
      submitting,
      values: { arrival_date, departure_date, travel_type },
    }) => (
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        {renderTravelType()}

        <Desktop>
          <Pane display="flex" alignItems="flex-end">
            {renderFrom()}
            {renderLocationSwapper(form)}
            {renderTo()}

            {renderDepartureDate(travel_type, arrival_date)}
            {hasReturn(travel_type) && renderArrivalDate(departure_date)}

            {renderQuantity()}
            {renderSubmit(submitting, isLoading)}
          </Pane>
        </Desktop>

        <Tablet>
          <React.Fragment>
            <Pane
              display="flex"
              alignItems="flex-end"
              marginBottom={ITEM_SPACE}
            >
              {renderFrom()}
              {renderLocationSwapper(form)}
              {renderTo()}
            </Pane>

            <Pane display="flex" alignItems="flex-end">
              {renderDepartureDate(travel_type, arrival_date)}
              {hasReturn(travel_type) && renderArrivalDate(departure_date)}

              {renderQuantity()}
              {renderSubmit(submitting, isLoading)}
            </Pane>
          </React.Fragment>
        </Tablet>

        <Mobile>
          <React.Fragment>
            <Pane
              display="flex"
              alignItems="flex-end"
              marginBottom={ITEM_SPACE}
            >
              {renderFrom()}
              {renderTo()}
            </Pane>

            <Pane
              display="flex"
              alignItems="flex-end"
              marginBottom={ITEM_SPACE}
            >
              {renderDepartureDate(travel_type, arrival_date)}
              {hasReturn(travel_type) && renderArrivalDate(departure_date)}
            </Pane>

            <Pane display="flex" alignItems="flex-end">
              <Pane width="50%">{renderQuantity()}</Pane>
              <Pane width="50%">{renderSubmit(submitting, isLoading)}</Pane>
            </Pane>
          </React.Fragment>
        </Mobile>
      </form>
    )}
  </Form>
);

SearchForm.propTypes = {
  formData: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  formData: {},
  isLoading: false,
};

export default SearchForm;
