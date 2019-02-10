import React from "react";
import PropTypes from "prop-types";
import DayPicker from "react-day-picker";
import { Form, Field } from "react-final-form";
import dateFns from "date-fns";
import {
  Autocomplete,
  Button,
  IconButton,
  Pane,
  Popover,
  Radio,
  TextInputField,
  majorScale,
} from "evergreen-ui";

import {
  DATE_FORMAT,
  ITEM_HEIGHT,
  ITEM_SPACE,
  LOCATIONS,
  TODAY_DATE,
  TRAVEL_TYPES,
} from "../constants";

const inputProps = {
  inputHeight: ITEM_HEIGHT,
  marginBottom: 0,
};

const paneProps = {
  marginRight: majorScale(1),
};

const radioProps = {
  size: 16,
  marginRight: ITEM_SPACE,
};

const getLocation = id => LOCATIONS.find(({ id: _id }) => _id === id).name;
const hasArrivalDate = ({ travel_type }) => travel_type === TRAVEL_TYPES.ROUND;
const formatLocations = locations => locations.map(({ name }) => name);
const formatDate = date => dateFns.format(date, DATE_FORMAT);
const required = value => (value ? undefined : "Required");

const swapMutator = (_, { fields, formState }) => {
  const { from, to } = fields;
  const { values } = formState;

  to.change(values.from);
  from.change(values.to);
};

const SearchForm = ({ formData, isLoading, onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    mutators={{ swap: swapMutator }}
    initialValues={{
      travel_type: TRAVEL_TYPES.ROUND,
      ...formData,
    }}
  >
    {({ form, handleSubmit, submitting, values }) => (
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Pane display="flex">
          <Field name="travel_type" type="radio" value={TRAVEL_TYPES.ROUND}>
            {({ input }) => (
              <Radio label="Round trip" {...input} {...radioProps} />
            )}
          </Field>

          <Field name="travel_type" type="radio" value={TRAVEL_TYPES.ONE_WAY}>
            {({ input }) => (
              <Radio label="One way" {...input} {...radioProps} />
            )}
          </Field>
        </Pane>

        <Pane display="flex" alignItems="flex-end">
          <Field name="from" validate={required}>
            {({ input, meta }) => (
              <Pane flexGrow={1} {...paneProps}>
                <Autocomplete
                  {...input}
                  itemSize={ITEM_HEIGHT}
                  items={formatLocations(LOCATIONS)}
                  selectedItem={input.value}
                >
                  {({ getInputProps, getRef, inputValue, openMenu }) => (
                    <TextInputField
                      {...inputProps}
                      {...getInputProps({ onFocus: openMenu })}
                      label="From"
                      required
                      placeholder={`${getLocation("loc-1")}, ${getLocation(
                        "loc-2",
                      )}...`}
                      value={inputValue}
                      innerRef={getRef}
                      isInvalid={meta.error && meta.touched}
                    />
                  )}
                </Autocomplete>
              </Pane>
            )}
          </Field>

          <Pane className="swap-locations" {...paneProps}>
            <IconButton
              icon="swap-horizontal"
              height={ITEM_HEIGHT}
              appearance="minimal"
              type="button"
              onClick={form.mutators.swap}
            />
          </Pane>

          <Field name="to" validate={required}>
            {({ input, meta }) => (
              <Pane flexGrow={1} {...paneProps}>
                <Autocomplete
                  {...input}
                  itemSize={ITEM_HEIGHT}
                  items={formatLocations(LOCATIONS)}
                  selectedItem={input.value}
                >
                  {({ getInputProps, getRef, inputValue, openMenu }) => (
                    <TextInputField
                      {...inputProps}
                      {...getInputProps({ onFocus: openMenu })}
                      label="To"
                      required
                      placeholder={`${getLocation("loc-4")}, ${getLocation(
                        "loc-1",
                      )}...`}
                      value={inputValue}
                      innerRef={getRef}
                      isInvalid={meta.error && meta.touched}
                    />
                  )}
                </Autocomplete>
              </Pane>
            )}
          </Field>

          <Field name="departure_date" validate={required}>
            {({ input: { value, ...input }, meta }) => (
              <Popover
                content={({ close }) => (
                  <DayPicker
                    {...input}
                    selectedDays={[value, values.arrival_date]}
                    disabledDays={{ before: TODAY_DATE }}
                    onDayClick={day => {
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
                    placeholder={formatDate(TODAY_DATE)}
                    required
                    readOnly
                    value={value && formatDate(value)}
                    isInvalid={meta.error && meta.touched}
                  />
                </Pane>
              </Popover>
            )}
          </Field>

          {hasArrivalDate(values) && (
            <Field name="arrival_date" validate={required}>
              {({ input: { value, ...input }, meta }) => (
                <Popover
                  content={({ close }) => (
                    <DayPicker
                      selectedDays={[value, values.departure_date]}
                      disabledDays={{
                        before: values.departure_date || TODAY_DATE,
                      }}
                      onDayClick={day => {
                        input.onChange(day);
                        close();
                      }}
                    />
                  )}
                >
                  <Pane {...paneProps}>
                    <TextInputField
                      {...inputProps}
                      label="Arrival"
                      placeholder={formatDate(dateFns.addDays(TODAY_DATE, 7))}
                      required
                      readOnly
                      isInvalid={meta.error && meta.touched}
                      value={value && formatDate(value)}
                    />
                  </Pane>
                </Popover>
              )}
            </Field>
          )}

          <Pane className="submit" {...paneProps} flexShrink={0}>
            <Button
              height={ITEM_HEIGHT}
              appearance="primary"
              isLoading={submitting || isLoading}
              type="submit"
            >
              Search trips
            </Button>
          </Pane>
        </Pane>
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
