import React from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import { Form, Field } from "react-final-form";
import dateFns from "date-fns";
import {
  Checkbox,
  IconButton,
  Pane,
  Popover,
  Radio,
  SelectField,
  TextInputField,
  majorScale,
} from "evergreen-ui";

import ButtonPrimary from "./ButtonPrimary";

import {
  ITEM_HEIGHT,
  ITEM_SPACE,
  LOCATIONS,
  TODAY_DATE,
  BOOKING_TYPES,
} from "../constants";

import useMedia from "../hooks/useMedia";
import { formatDate, formValidations, hasReturn } from "../helpers";

const DEFAULT_DEPARTURE_ID = "1";
const DEFAULT_ARRIVAL_ID = "3";
const DEFAULT_QUANTITY = 1;

const SPACING = majorScale(1);

const baseDate = dateFns.setHours(dateFns.addDays(TODAY_DATE, 1), 0);

const inputProps = {
  inputHeight: ITEM_HEIGHT,
  marginBottom: 0,
};

const paneProps = {
  flex: 1,
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
    <Field name="booking_type" type="radio" value={BOOKING_TYPES.ONE_WAY}>
      {({ input }) => <Radio label="One way" {...input} {...radioProps} />}
    </Field>
    <Field name="booking_type" type="radio" value={BOOKING_TYPES.ROUND}>
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

const renderDepartureDate = (booking_type, arrival_date) => (
  <Field name="departure_date" validate={required}>
    {({ input: { value, ...input }, meta }) => (
      <Popover
        content={({ close }) => (
          <DayPicker
            {...input}
            selectedDays={[value, hasReturn(booking_type) && arrival_date]}
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

const renderArrivalDate = (departure_date, open_return) => (
  <Pane {...paneProps}>
    {open_return ? (
      <TextInputField {...inputProps} label="Return" disabled value="-" />
    ) : (
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
            <TextInputField
              {...inputProps}
              label="Return"
              placeholder={formatDate(dateFns.addDays(baseDate, 7))}
              required
              readOnly
              isInvalid={meta.error && meta.touched}
              value={value && formatDate(value)}
            />
          </Popover>
        )}
      </Field>
    )}

    <Field name="open_return" type="checkbox">
      {({ input }) => (
        <Checkbox
          {...input}
          value={String(input.value)}
          label="I don’t know my return date yet"
          flexShrink={0}
          marginTop={ITEM_SPACE}
          marginBottom={0}
        />
      )}
    </Field>
  </Pane>
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
    <ButtonPrimary
      width="100%"
      height={ITEM_HEIGHT}
      isLoading={submitting || isLoading}
      type="submit"
      justifyContent="center"
    >
      Search
    </ButtonPrimary>
  </Pane>
);

const SearchForm = ({ formData, isLoading, onSubmit }) => {
  const { isMobile } = useMedia();

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ swap: swapMutator }}
      initialValues={{
        from: DEFAULT_DEPARTURE_ID,
        to: DEFAULT_ARRIVAL_ID,
        quantity: DEFAULT_QUANTITY,
        booking_type: BOOKING_TYPES.ROUND,
        ...formData,
      }}
    >
      {({
        form,
        handleSubmit,
        submitting,
        values: { arrival_date, departure_date, booking_type, open_return },
      }) => (
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {renderTravelType()}

          <Pane display="flex" marginBottom={ITEM_SPACE} alignItems="flex-end">
            {renderFrom()}
            {!isMobile && renderLocationSwapper(form)}
            {renderTo()}
          </Pane>

          {isMobile ? (
            <>
              <Pane display="flex">
                {renderDepartureDate(booking_type, arrival_date)}
                {hasReturn(booking_type) &&
                  renderArrivalDate(departure_date, open_return)}
              </Pane>

              <Pane display="flex" alignItems="flex-end">
                <Pane flex={1}>{renderQuantity()}</Pane>
                <Pane flex={1}>{renderSubmit(submitting, isLoading)}</Pane>
              </Pane>
            </>
          ) : (
            <>
              <Pane display="flex">
                {renderDepartureDate(booking_type, arrival_date)}
                {hasReturn(booking_type) &&
                  renderArrivalDate(departure_date, open_return)}
                {renderQuantity()}

                <Pane flex={1} marginTop={24}>
                  {renderSubmit(submitting, isLoading)}
                </Pane>
              </Pane>
            </>
          )}
        </form>
      )}
    </Form>
  );
};

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
